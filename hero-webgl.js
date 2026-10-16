/* <hero-webgl> — single-canvas WebGL illustrated-world hero.
   One quad, one fragment shader, three textures, one rAF loop.
   Pointer events only write interaction targets; all rendering happens in the loop. */
(function () {
  const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

  const FRAG = `
precision highp float;
varying vec2 vUv;

uniform sampler2D uCurrentTexture;
uniform sampler2D uNextTexture;
uniform vec2  uResolution;
uniform vec4  uMap;              // xy = cover scale, zw = cover offset (shared by all textures)
uniform vec2  uMouse;            // damped cursor, px
uniform vec2  uVelocity;         // damped cursor velocity, px/frame
uniform vec2  uPreviewPosition;  // px
uniform vec2  uClickPosition;    // px
uniform float uPreviewRadius;    // px
uniform float uPreviewOpacity;
uniform float uPixelSize;        // px block size for the pixel field
uniform float uExpansion;        // px, transition reveal radius
uniform float uTransition;       // 0..1
uniform float uClickVelocity;    // 0..1 energy envelope
uniform float uTime;
uniform float uReduced;          // 1.0 = prefers-reduced-motion
uniform vec3  uTrail[12];        // xy px, z life 0..1

float hash(vec2 p){ p = fract(p * vec2(127.1, 311.7)); p += dot(p, p + 41.7); return fract(p.x * p.y * 95.43); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

vec2 mapUv(vec2 uv){ return (uv - 0.5) * uMap.xy + 0.5 + uMap.zw; }

/* CHARACTER PROTECTION -------------------------------------------------------
   Soft approximation of the girl, in artwork UV space (y up). She is aligned
   identically in all three illustrations, so one mask serves every world.
   Swap the body of this function for texture2D(uCharacterMask, uv).r when a
   real grayscale character-mask.png exists. */
float characterMask(vec2 uv){
  vec2 p = uv - vec2(0.500, 0.430);
  p.x /= 0.105;
  p.y /= 0.430;
  float body = 1.0 - smoothstep(0.55, 1.20, length(p));
  vec2 h = (uv - vec2(0.500, 0.760)) / vec2(0.062, 0.105);
  float head = 1.0 - smoothstep(0.60, 1.25, length(h));
  return clamp(max(body, head), 0.0, 1.0);
}

void main(){
  vec2 frag = vUv * uResolution;
  float t   = uTransition;
  float rm  = uReduced;
  float mask = characterMask(mapUv(vUv));

  /* --- ambient life + parallax + click shock, all damped on the character --- */
  vec2 drift = vec2(
    vnoise(vUv * 3.1 + vec2(uTime * 0.043, 0.0)) - 0.5,
    vnoise(vUv * 2.6 + vec2(0.0, uTime * 0.031)) - 0.5
  ) * mix(0.0034, 0.0008, rm);
  drift *= smoothstep(0.05, 0.55, vUv.y);            // sky/foliage breathe more than the floor
  vec2 parallax = (uMouse / uResolution - 0.5) * mix(0.0065, 0.0, rm);

  vec2 dirC = frag - uClickPosition;
  float dC  = length(dirC);
  float ring = exp(-abs(dC - uExpansion) / (140.0 + 260.0 * t));
  vec2 push = normalize(dirC + vec2(0.0001)) * ring * uClickVelocity * mix(0.020, 0.0, rm);

  vec2 envUv = vUv + (drift + parallax + push) * (1.0 - mask * 0.94);
  vec3 cur = texture2D(uCurrentTexture, mapUv(envUv)).rgb;

  /* --- pixel field: the bridge between worlds --- */
  float turb = vnoise(frag * 0.0065 + uTime * 0.06) - 0.5;
  vec2  bias = uVelocity * 6.0 + uVelocity * 40.0 * uClickVelocity;
  float dn   = length(dirC - bias) / max(uExpansion, 1.0) + turb * mix(0.30, 0.0, rm);

  float px = max(1.0, floor(mix(uPixelSize, uPixelSize * 2.1, clamp(dn, 0.0, 1.4))));
  vec2  block = (floor(frag / px) + 0.5) * px;
  vec3  nxt = texture2D(uNextTexture, mapUv(block / uResolution)).rgb;
  float bh  = hash(floor(frag / px) + 3.17);

  float reveal = smoothstep(1.02, 0.60, dn + (bh - 0.5) * 0.55 * (1.0 - t) * (1.0 - rm));
  reveal *= smoothstep(0.0, 0.05, t);
  reveal = max(reveal, smoothstep(0.74, 1.0, t));      // guarantee a clean, complete world
  reveal = mix(reveal, smoothstep(0.0, 1.0, t), rm);

  /* --- water-bubble peek: a refractive droplet lens onto the next world --- */
  vec2  pc = frag - uPreviewPosition;          // px from droplet centre (y-up)
  float R  = max(uPreviewRadius, 1.0);
  float rC = length(pc);
  float r  = rC / R;                            // 0 centre -> 1 rim

  // surface-tension wobble, mostly near the rim, so the droplet feels alive
  float ang = atan(pc.y, pc.x);
  float wob = 0.05 * sin(ang * 3.0 + uTime * 1.7)
            + 0.05 * (vnoise(pc * 0.02 + uTime * 0.35) - 0.5);
  float rW  = r + wob * smoothstep(0.25, 1.0, r);

  vec2  nrm  = pc / max(rC, 1e-4);
  float rr   = clamp(rW, 0.0, 1.0);
  float zc   = sqrt(1.0 - rr * rr);            // dome height: 1 centre, 0 rim
  float bend = 1.0 - zc;                        // 0 centre, 1 rim

  float edge   = 1.0 - smoothstep(0.90, 1.02, rW);       // crisp meniscus
  float bubble = edge * uPreviewOpacity * (1.0 - rm);

  // trailing micro-droplets shed on fast movement (reuse existing trail data)
  float trailMask = 0.0;
  for (int i = 0; i < 12; i++) {
    vec3  tr = uTrail[i];
    float tR = R * (0.10 + 0.16 * tr.z);
    float td = length(frag - tr.xy);
    trailMask = max(trailMask, (1.0 - smoothstep(tR * 0.5, tR, td)) * tr.z);
  }
  float tShow = trailMask * uPreviewOpacity * (1.0 - rm) * 0.85;

  vec3 col = cur;
  if (bubble > 0.002 || tShow > 0.002) {
    // refraction: magnify toward centre, bend the view inward at the rim
    vec2 samplePx = uPreviewPosition + pc * 0.60 - nrm * bend * bend * R * 0.22;
    vec2 wUv = samplePx / uResolution;
    wUv += (vnoise(wUv * 42.0 + uTime * 0.8) - 0.5) * 0.0022 * zc;   // caustic shimmer

    // sample the next world through the water, with a whisper of rim dispersion
    float disp = bend * bend * bend * 1.4;
    vec2  dispDir = nrm / uResolution;
    vec3  water;
    water.r = texture2D(uNextTexture, mapUv(wUv + dispDir * disp)).r;
    water.g = texture2D(uNextTexture, mapUv(wUv)).g;
    water.b = texture2D(uNextTexture, mapUv(wUv - dispDir * disp)).b;

    // volume: fresnel rim, meniscus, glossy highlight + sparkle (upper-left key)
    float rim      = smoothstep(0.80, 0.97, rW) * (1.0 - smoothstep(0.97, 1.08, rW));
    float meniscus = smoothstep(0.62, 0.90, rW) - smoothstep(0.90, 1.0, rW);
    vec2  lightDir = normalize(vec2(-0.55, 0.75));
    float spec  = 1.0 - smoothstep(0.0, 0.34, length(pc / R - lightDir * 0.40));
    float spark = 1.0 - smoothstep(0.0, 0.12, length(pc / R - lightDir * 0.66));
    water += rim * 0.26 + spec * 0.75 + spark * 0.5;
    water -= meniscus * 0.05;

    // trailing droplets show the next world beneath them, lightly lifted
    vec3 trailCol = texture2D(uNextTexture, mapUv(frag / uResolution)).rgb + 0.10;

    col = mix(col, trailCol, clamp(tShow, 0.0, 1.0));
    col = mix(col, water,    clamp(bubble, 0.0, 1.0));
  }
  col = mix(col, nxt, clamp(reveal, 0.0, 1.0));

  float front = exp(-pow((dn - 1.0) * 4.0, 2.0)) * step(0.02, t) * (1.0 - t) * (1.0 - rm);
  col += front * 0.05;

  gl_FragColor = vec4(col, 1.0);
}`;

  const IMG_W = 1672, IMG_H = 941;
  const SRC = [
    'assets/world-1-mumbai.png',   // facing left
    'assets/world-3-arcade.png',   // facing center
    'assets/world-2-mountain.png'  // facing right
  ];
  const DUR = 1.28;                       // seconds, whole transformation
  const TRAIL = 12;

  const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
  const outCubic = v => 1 - Math.pow(1 - clamp01(v), 3);
  const inOutCubic = v => (v = clamp01(v)) < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
  const STEPS = [30, 24, 18, 13, 9, 6, 4, 2, 1];

  class HeroWebgl extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      this.style.position = this.style.position || 'relative';
      this.style.display = 'block';
      this.style.width = '100%';
      this.style.height = '100%';
      this.style.overflow = 'hidden';
      this.style.cursor = 'none';

      this.canvas = document.createElement('canvas');
      Object.assign(this.canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block' });
      this.appendChild(this.canvas);

      this.cue = document.createElement('div');
      this.cue.textContent = this.getAttribute('cue-text') || 'discover';
      Object.assign(this.cue.style, {
        position: 'absolute', left: '0', top: '0', pointerEvents: 'none', opacity: '0',
        font: '600 27px/1 "Caveat", cursive', letterSpacing: '0.01em',
        color: 'rgba(255,255,255,0.94)',
        textShadow: '0 1px 10px rgba(0,0,0,0.65)', transition: 'opacity 260ms ease', willChange: 'transform'
      });
      this.appendChild(this.cue);

      this.dot = document.createElement('div');
      Object.assign(this.dot.style, {
        position: 'absolute', left: '0', top: '0', width: '7px', height: '7px', marginLeft: '-3.5px',
        marginTop: '-3.5px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)',
        boxShadow: '0 0 12px rgba(255,255,255,0.5)', pointerEvents: 'none', opacity: '0',
        transition: 'opacity 200ms ease', willChange: 'transform'
      });
      this.appendChild(this.dot);

      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0;
      this.cur = 0;
      this.nxt = 1;
      this.tState = 0;
      this.active = false;
      this.hovering = false;
      this.discovered = false;
      this.visible = true;
      this.trail = new Float32Array(TRAIL * 3);
      this.trailAge = new Float32Array(TRAIL);
      this.trailIdx = 0;
      this.p = { tx: 0, ty: 0, x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0 };
      this.previewR = 0;
      this.previewO = 0;
      this.pixelSize = 22;
      this.expansion = 1;
      this.clickV = 0;
      this.clickPos = [0, 0];

      if (!this._initGL()) return;
      this._bindEvents();
      this._resize();
      this._loadTextures();
      this.last = performance.now();
      this.raf = requestAnimationFrame(this._frame);
    }

    disconnectedCallback() {
      cancelAnimationFrame(this.raf);
      this._unbind && this._unbind();
      this.ro && this.ro.disconnect();
      this.io && this.io.disconnect();
      const gl = this.gl;
      if (gl) {
        (this.texs || []).forEach(t => t && gl.deleteTexture(t));
        this.prog && gl.deleteProgram(this.prog);
        this.buf && gl.deleteBuffer(this.buf);
      }
    }

    _initGL() {
      const gl = this.canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' })
        || this.canvas.getContext('experimental-webgl');
      if (!gl) { this._fallback(); return false; }
      this.gl = gl;
      const sh = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src); gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
        return s;
      };
      const prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
      gl.useProgram(prog);
      this.prog = prog;

      this.buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'aPos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      this.u = {};
      ['uCurrentTexture', 'uNextTexture', 'uResolution', 'uMap', 'uMouse', 'uVelocity', 'uPreviewPosition',
        'uClickPosition', 'uPreviewRadius', 'uPreviewOpacity', 'uPixelSize', 'uExpansion', 'uTransition',
        'uClickVelocity', 'uTime', 'uReduced', 'uTrail[0]'].forEach(n => { this.u[n] = gl.getUniformLocation(prog, n); });
      gl.uniform1f(this.u.uReduced, this.reduced);

      this.texs = SRC.map(() => {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([12, 12, 16]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        return tex;
      });
      return true;
    }

    _fallback() {
      const img = document.createElement('img');
      img.src = SRC[0];
      Object.assign(img.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' });
      this.appendChild(img);
      this.style.cursor = 'default';
    }

    _loadTextures() {
      const gl = this.gl;
      SRC.forEach((src, i) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, this.texs[i]);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        };
        img.src = src;
      });
    }

    _bindEvents() {
      const rectPos = e => {
        const r = this.getBoundingClientRect();
        const dpr = this.dpr;
        this.p.tx = (e.clientX - r.left) * dpr;
        this.p.ty = (r.bottom - e.clientY) * dpr;   // y-up, matches shader space
        this.cssX = e.clientX - r.left;
        this.cssY = e.clientY - r.top;
      };
      const onMove = e => { rectPos(e); this.hovering = true; };
      const onEnter = e => { rectPos(e); this.p.x = this.p.tx; this.p.y = this.p.ty; this.hovering = true; };
      const onLeave = () => { this.hovering = false; };
      const onDown = e => { rectPos(e); this.hovering = true; this._trigger(); };
      const onTouch = e => {
        const tch = e.touches[0]; if (!tch) return;
        rectPos(tch); this.hovering = true;
      };
      const onTouchEnd = () => { this._trigger(); this.hovering = false; };
      const onKey = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._trigger(); } };

      this.addEventListener('pointermove', onMove, { passive: true });
      this.addEventListener('pointerenter', onEnter, { passive: true });
      this.addEventListener('pointerleave', onLeave, { passive: true });
      this.addEventListener('pointerdown', onDown);
      this.addEventListener('touchmove', onTouch, { passive: true });
      this.addEventListener('touchend', onTouchEnd, { passive: true });
      this.addEventListener('keydown', onKey);
      this.tabIndex = 0;
      this.style.outline = 'none';

      this.ro = new ResizeObserver(() => this._resize());
      this.ro.observe(this);
      this.io = new IntersectionObserver(es => { this.visible = es[0].isIntersecting; }, { threshold: 0.02 });
      this.io.observe(this);
      this._unbind = () => {
        this.removeEventListener('pointermove', onMove);
        this.removeEventListener('pointerenter', onEnter);
        this.removeEventListener('pointerleave', onLeave);
        this.removeEventListener('pointerdown', onDown);
        this.removeEventListener('touchmove', onTouch);
        this.removeEventListener('touchend', onTouchEnd);
        this.removeEventListener('keydown', onKey);
      };
    }

    _resize() {
      const r = this.getBoundingClientRect();
      if (!r.width || !r.height) return;
      this.dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.round(r.width * this.dpr), h = Math.round(r.height * this.dpr);
      this.canvas.width = w; this.canvas.height = h;
      this.W = w; this.H = h;
      this.gl.viewport(0, 0, w, h);
      // identical cover mapping for all three textures, biased to keep her feet in frame
      const ia = IMG_W / IMG_H, va = w / h;
      let sx = 1, sy = 1, oy = 0;
      if (va > ia) { sy = ia / va; oy = -(1 - sy) * 0.30; } else { sx = va / ia; }
      this.map = [sx, sy, 0, oy];
      const minD = Math.min(w, h);
      const ps = parseFloat(this.getAttribute('preview-scale'));
      this.baseR = Math.max(52, minD * 0.085) * 0.9 * (isFinite(ps) && ps > 0 ? ps : 1);
      this.maxR = Math.hypot(w, h) * 0.85;
    }

    _trigger() {
      if (this.active || this.reducedLock) return;
      this.active = true;
      this.tState = 0;
      this.discovered = true;
      this.clickPos = [this.p.x, this.p.y];
      this.cue.style.opacity = '0';
    }

    _frame = (now) => {
      this.raf = requestAnimationFrame(this._frame);
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      if (!this.visible || document.hidden || !this.W) return;
      const p = this.p;

      // cursor spring
      const k = this.reduced ? 0.30 : 0.16, damp = this.reduced ? 0.6 : 0.78;
      p.vx = (p.vx + (p.tx - p.x) * k) * damp;
      p.vy = (p.vy + (p.ty - p.y) * k) * damp;
      p.px = p.x; p.py = p.y;
      p.x += p.vx; p.y += p.vy;
      const speed = Math.hypot(p.x - p.px, p.y - p.py);

      // preview breathing + fade
      const wantO = this.hovering && !this.active ? 1 : 0;
      this.previewO += (wantO - this.previewO) * (wantO ? 0.12 : 0.14);
      const breathe = 1 + Math.min(0.45, speed * 0.016) + Math.sin(now * 0.0016) * 0.035;
      const targetR = this.baseR * breathe;
      this.previewR += (targetR - this.previewR) * 0.14;

      // trail pixels
      for (let i = 0; i < TRAIL; i++) if (this.trailAge[i] > 0) {
        this.trailAge[i] = Math.max(0, this.trailAge[i] - dt / 0.32);
        this.trail[i * 3 + 2] = this.trailAge[i] * this.trailAge[i];
      }
      if (!this.active && this.previewO > 0.35 && speed > 6 && Math.random() < 0.55) {
        const i = this.trailIdx = (this.trailIdx + 1) % TRAIL;
        this.trail[i * 3] = p.px + (Math.random() - 0.5) * this.previewR * 0.7;
        this.trail[i * 3 + 1] = p.py + (Math.random() - 0.5) * this.previewR * 0.7;
        this.trailAge[i] = 1;
      }

      // transition state machine
      let pixel, expansion, clickV, previewPos = [p.x, p.y];
      if (this.active) {
        const dur = parseFloat(this.getAttribute('duration'));
        this.tState = Math.min(1, this.tState + dt / (isFinite(dur) && dur > 0.4 ? dur : DUR));
        const t = this.tState;
        const squash = 1 - Math.exp(-t / 0.05) * 0.0;
        const anticip = t < 0.10 ? 1 - 0.16 * Math.sin((t / 0.10) * Math.PI) : 1;
        const grow = outCubic((t - 0.09) / 0.62);
        expansion = (this.previewR * anticip * squash) + (this.maxR - this.previewR) * grow;
        const res = inOutCubic((t - 0.14) / 0.74);
        pixel = STEPS[Math.min(STEPS.length - 1, Math.floor(res * (STEPS.length - 0.001)))];
        clickV = Math.exp(-Math.pow((t - 0.22) / 0.20, 2)) * (1 - t * 0.3);
        previewPos = this.clickPos;
        this.previewO *= 0.82;
        if (t >= 1) {
          this.active = false;
          this.cur = this.nxt;
          this.nxt = (this.nxt + 1) % SRC.length;
          this.tState = 0;
          for (let i = 0; i < TRAIL; i++) { this.trailAge[i] = 0; this.trail[i * 3 + 2] = 0; }
        }
      } else {
        expansion = 1;
        pixel = Math.min(30, Math.max(16, Math.round(this.baseR * 0.34)));
        clickV = 0;
      }

      // dom cue (position only; no rendering here)
      if (this.cssX != null) {
        const off = 26;
        this.cue.style.transform = `translate3d(${this.cssX + off}px, ${this.cssY + off}px, 0)`;
        this.dot.style.transform = `translate3d(${this.cssX}px, ${this.cssY}px, 0)`;
      }
      const showCue = this.hovering && !this.active && !this.discovered && !this.reduced;
      this.cue.style.opacity = showCue ? '1' : '0';
      this.dot.style.opacity = this.hovering && !this.reduced ? '0.9' : '0';

      const gl = this.gl, u = this.u;
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.texs[this.cur]);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.texs[this.nxt]);
      gl.uniform1i(u.uCurrentTexture, 0);
      gl.uniform1i(u.uNextTexture, 1);
      gl.uniform2f(u.uResolution, this.W, this.H);
      gl.uniform4f(u.uMap, this.map[0], this.map[1], this.map[2], this.map[3]);
      gl.uniform2f(u.uMouse, p.x, p.y);
      gl.uniform2f(u.uVelocity, p.x - p.px, p.y - p.py);
      gl.uniform2f(u.uPreviewPosition, previewPos[0], previewPos[1]);
      gl.uniform2f(u.uClickPosition, this.clickPos[0], this.clickPos[1]);
      gl.uniform1f(u.uPreviewRadius, this.previewR);
      gl.uniform1f(u.uPreviewOpacity, this.previewO);
      gl.uniform1f(u.uPixelSize, pixel);
      gl.uniform1f(u.uExpansion, expansion);
      gl.uniform1f(u.uTransition, this.tState);
      gl.uniform1f(u.uClickVelocity, clickV);
      gl.uniform1f(u.uTime, now * 0.001);
      gl.uniform3fv(u['uTrail[0]'], this.trail);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
  }

  if (!customElements.get('hero-webgl')) customElements.define('hero-webgl', HeroWebgl);
})();
