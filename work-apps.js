/* ================================================================== */
/*  WORK + ABOUT ME app interfaces                                     */
/*  Figma (process) + Claude Code (case studies) share 3 projects;     */
/*  they cross-link project-to-project. Illustrator = visual gallery.  */
/* ================================================================== */
(function () {
  var overlays = {
    figjam:      document.getElementById('app-figjam'),
    claude:      document.getElementById('app-claude'),
    illustrator: document.getElementById('app-illustrator'),
    about:       document.getElementById('app-about'),
    netflix:     document.getElementById('app-netflix'),
    snapchat:    document.getElementById('app-snapchat'),
    resume:      document.getElementById('app-resume')
  };
  var lastFocus = null, openKey = null;

  /* ------------------------------------------------------------------ */
  /*  Shared project content — stored once, rendered into each view      */
  /* ------------------------------------------------------------------ */
  var PROJECTS = [
    {
      id: 'directory-automation',
      title: 'Directory automation',
      tag: 'Rotary International District 3055',
      thumb: 'linear-gradient(135deg,#1f7a66,#0c2a3a)',
      summary: 'From manual page layouts to an automated directory workflow — I designed the book and built the workflow for its digital output.',
      process: {
        intro: 'Having produced district directories manually, I knew how much of the work returned with every correction.',
        stages: [
          { h: 'The problem I noticed', body: 'Manual district directories ran past 250 pages — some over 800 — and every correction brought the work back. Earlier projects took three people three to four months.', img: 'early directory pages — to add' },
          { h: 'The direction I explored', body: 'Automate the repeated layout and production. The first useful step: generate a PDF from dynamic data while keeping it inside the design I had created.', img: 'old vs new workflow — to add' },
          { h: 'Decisions I made', body: 'I designed the cards, static pages, dynamic layouts and the whole book, then made them reusable components so one change could apply across the system.', img: 'card → populated page — to add' },
          { h: 'What I refined', body: 'I reviewed the export as a page, not just in the browser — fixed progress to report each sheet, and tuned long names, section colours and backgrounds.', img: 'export recording — to add' }
        ]
      },
      caseStudy: {
        meta: [
          'ROLE        Design and AI-assisted frontend development',
          'PROJECT     Rotary International District 3055 directory, 2026–27',
          'DURATION    ~2–3 weeks once content and data were ready',
          'TOOLS       Illustrator, Claude Code, React 18, Vite, TanStack Router',
          'OUTCOME     Digital directory delivered; generated PDF ready, not yet printed'
        ],
        sections: [
          { h: 'Project overview, role and collaborators', body: 'For Rotary International District 3055 I designed the book and used Claude Code to help build a workflow that generates the digital directory from reusable layouts and dynamic data. I coordinated the design and digital production as a link between the client, stakeholders and our team. Backend developers handled the APIs and data, support helped with the dynamic content, and other contributors supplied and reviewed written material.' },
          { h: 'What I built', body: 'I translated my designs into reusable components for member cards, club information, committees and leadership pages. Shared directory data populated the dynamic layouts, while static pages stayed part of the overall book. The workflow brings the pages into a combined PDF, with section-level exports too; framed B5 layouts and a section colour system connect the page types into one publication.', img: 'static and dynamic pages from the generated PDF — to add' },
          { h: 'How I used AI', body: 'I directed the development and automation through Claude Code, reviewing the output and refining how the designs worked with real content. The code was part of the process; my focus was the design, the real-content behaviour and the quality of the export.' },
          { h: 'Implementation challenges and refinements', body: 'One export issue was the progress feedback — it advanced by document, which could leave the bar stationary during a long section, so it was changed to report each rendered sheet. The output also needed refinement for long names, section colours and page backgrounds.', img: 'PDF generation recording — to add (generated PDF, not a printed book)' },
          { h: 'Outcome and current status', body: 'Used for one district so far; I handled design, development coordination, corrections and digital output in roughly two to three weeks once the complete data and content were ready. The digital directory has been delivered to the committee and can be shared with members on request. The automatically generated PDF is ready but has not yet been printed; previous manually produced directories were printed.' },
          { h: 'What I learned', body: 'Removing repeated work gave me more attention for the design and corrections that needed judgment. Next I want to refine the workflow further — automatic page fillers, a lighter export option, and accessibility improvements to the online experience.' }
        ]
      }
    },
    {
      id: 'dashboard-redesign',
      title: 'Kaizen Events dashboard redesign',
      tag: 'Event dashboard · ~40 admin screens',
      thumb: 'linear-gradient(135deg,#1e3a6b,#c9a227)',
      summary: 'Giving an event dashboard a more considered design — a clearer visual direction, implemented with Claude Code.',
      process: {
        intro: 'I wanted a more coherent design while keeping familiar workflows understandable for the people using them.',
        stages: [
          { h: 'The problem I noticed', body: 'The dashboard had drifted — inconsistent typography, spacing and components across roughly 40 admin screens — while people needed their familiar workflows to stay clear.', img: 'before screen — to add' },
          { h: 'The direction I explored', body: '“Give it a premium feel” was too vague and barely changed anything. I went back to examples and turned the impression I wanted into a specific design direction.', img: 'early AI result vs directed revision — to add' },
          { h: 'Decisions I made', body: 'Shared colour tokens, typography and reusable components; a navy, gold and red palette with light and dark themes; a colour-coded form-builder field library tied to its settings panel.', img: 'design system swatches — to add' },
          { h: 'What I refined', body: 'I iterated until it matched what I had in mind, and kept the redesign separate from feature work that is still in progress.', img: 'after screen — to add' }
        ]
      },
      caseStudy: {
        meta: [
          'ROLE          Interface design and AI-assisted frontend implementation',
          'DURATION      ~1 week for the redesign',
          'TOOLS         ChatGPT, Claude Code, React, Tailwind CSS, reusable UI components',
          'COLLABORATION Backend developers and internal daily users'
        ],
        sections: [
          { h: 'Project overview, role and collaborators', body: 'I redesigned the Kaizen Events dashboard, using ChatGPT to explore ideas and Claude Code to help implement the frontend. I directed the frontend changes and reviewed their appearance; backend developers remained responsible for the APIs and underlying data. Internal team members who use the forms and financial sections daily reviewed those areas.' },
          { h: 'What I built', body: 'A refreshed visual direction across the dashboard built on shared colour tokens, typography and reusable components — a navy, gold and red palette with light and dark themes. The form builder uses a colour-coded field library and a settings panel visually connected to the selected field.', img: 'before and after of the same screen — to add' },
          { h: 'How I used AI', body: 'The project taught me that asking AI for a better-looking product is only a starting point. A vague instruction gave a vague interpretation; once I developed the idea and made my preferences explicit, the iterations became more useful. The improvement came from doing more of the design thinking before asking for implementation.' },
          { h: 'Implementation challenges and refinements', body: 'Keeping familiar tasks understandable was a design consideration — changes needed reviewing alongside the tasks people complete, especially in the forms and financial sections. The wider update includes templates, layouts and additional field types still being developed, so I keep the redesign separate from that feature work.', img: 'form builder state — to add (incomplete feature work labelled)' },
          { h: 'Outcome and current status', body: 'The redesign established a more consistent visual direction and a shared frontend foundation. The roughly one-week period covers the redesign; feedback changes and parts of the feature expansion continue in the next update. Requested changes from daily users are still pending — the review is part of ongoing improvement, not evidence every issue is resolved. I have not yet measured changes in task completion or support requests.' },
          { h: 'What I learned', body: 'I take more time now to work out the direction, collect examples and explain what I want to change. The project strengthened my interest in visual design — the small choices that change how an interface feels — and reminded me to connect those choices to the people using the product.' }
        ]
      }
    },
    {
      id: 'company-website',
      title: 'Kaizen company website',
      tag: 'Kaizen Infotech Solutions',
      thumb: 'linear-gradient(135deg,#4b2f9c,#1a1340)',
      summary: 'Learning to turn animation ideas into a working website — motion explored in snippets, then a scroll-driven cube storyline integrated after the hero.',
      process: {
        intro: 'I explored motion as smaller sequences before bringing a chosen one into the site.',
        stages: [
          { h: 'The problem I noticed', body: 'The site needed to carry Kaizen’s story, and I wanted motion to be part of that — my first time getting polished animation flows through AI-assisted development.', img: 'hero reference — to add' },
          { h: 'The direction I explored', body: 'I explored animations as standalone snippets first. One followed a card sequence I specified: stack, then spread, then move through a spotlight.', img: 'card-deck prototype — to add (prototype)' },
          { h: 'Decisions I made', body: 'A cube storyline right after the hero — scrambled, to solved, breaking apart, into a circular form, with content revealed through scroll. I directed it and used Claude to implement.', img: 'cube storyboard — to add' },
          { h: 'What I refined', body: 'I adjusted card positions and scroll smoothness, then tuned animation speed after senior feedback. The card-deck stayed a separate prototype.', img: 'before/after smoothness — to add' }
        ]
      },
      caseStudy: {
        meta: [
          'ROLE       Website design, motion direction and AI-assisted development',
          'TIMELINE   February–October 2026, intermittent; ongoing as of 13 Oct',
          'CONTENT    Vansh, Marketing Head',
          'TOOLS      Claude Code, Claude Chat, Next.js, React, GSAP, Three.js'
        ],
        sections: [
          { h: 'Project overview, role and collaborators', body: 'I designed and developed the Kaizen Infotech Solutions website, using Claude Code for development and Claude Chat to explore specific scroll-based animations. I owned the website design, animation direction and AI-assisted development; Vansh, the marketing head, provided the content; senior colleagues reviewed the work and their feedback contributed to refinements in animation speed.' },
          { h: 'What I built', body: 'The company website implementation, with the cube storyline integrated into the homepage after the hero, plus standalone animation explorations that show how I developed the motion direction.', img: 'hero followed by the integrated cube storyline — to add' },
          { h: 'How I used AI', body: 'Claude Code supported development while Claude Chat helped with specific animation explorations. I defined what I wanted to see, reviewed the generated output and directed changes to the design and movement. My focus was the idea, the relationship between movement and content, and whether the result matched the experience I wanted.' },
          { h: 'Implementation challenges and refinements', body: 'An animation can be interesting on its own, but integrating it brings another set of decisions — the movement needs to sit alongside content and the pace needs to give that content room. Working in smaller pieces let me develop a flow, refine it, then bring it into the wider experience instead of solving everything in one instruction.', img: 'standalone card-deck exploration — to add (prototype)' },
          { h: 'Outcome and current status', body: 'The website is awaiting launch; I worked on it intermittently from February to October 2026, ongoing as of 13 October. The outcome I can show is the working implementation and the process behind it — visitor engagement and business results will need to be evaluated after release.' },
          { h: 'What I learned', body: 'Going straight to AI before developing an idea often left me asking for a result I could not clearly describe. Understanding the direction first let me give more precise instructions and make better use of the output. The project gave me a process to carry forward: work out the idea, explain it precisely, review the result, and refine it with feedback.' }
        ]
      }
    }
  ];
  var BY_ID = {};
  PROJECTS.forEach(function (p) { BY_ID[p.id] = p; });

  /* ---- small render helpers ---- */
  function imgPH(label) {
    return '<div class="img-ph"><span class="img-ph-ic">⌗</span><span>' + label + '</span></div>';
  }
  function projectCards() {
    return PROJECTS.map(function (p) {
      return '<button class="proj-card" type="button" data-id="' + p.id + '">' +
        '<span class="proj-thumb" style="background:' + p.thumb + '">' + p.title + '</span>' +
        '<span class="proj-info"><span class="proj-title">' + p.title + '</span>' +
        '<span class="proj-tag">' + p.tag + '</span>' +
        '<span class="proj-sum">' + p.summary + '</span></span></button>';
    }).join('');
  }
  var STAGE_TONE = ['y', 'b', 'g', 'pk'];
  function processBoard(p) {
    var html = '<div class="fj-titlecard"><span class="fj-kick">Thinking &amp; Process</span>' +
      '<h3>' + p.title + '</h3><p class="fj-tc-tag">' + p.tag + '</p>' +
      '<p class="fj-intro">' + p.process.intro + '</p></div>';
    p.process.stages.forEach(function (s, i) {
      html += '<div class="fj-stage"><div class="fj-stage-label ' + STAGE_TONE[i % 4] + '">' + s.h + '</div>' +
        '<div class="fj-note">' + s.body + '</div>' + imgPH(s.img) + '</div>';
    });
    html += '<div class="fj-crosscard"><p>See the full build, decisions and outcome in the case study.</p>' +
      '<button class="fj-cross" type="button" data-go="' + p.id + '">See how I built it →</button></div>';
    return html;
  }
  function caseStudy(p) {
    var html = '<div class="cl-msg-user">Walk me through ' + p.title + ' — the full story.</div>' +
      '<div class="cl-msg"><div class="cl-case-h"><h2>' + p.title + '</h2><span class="cl-case-tag">' + p.tag + '</span></div>' +
      '<div class="cl-code">' + p.caseStudy.meta.join('\n') + '</div>';
    p.caseStudy.sections.forEach(function (s) {
      html += '<h4>' + s.h + '</h4><p>' + s.body + '</p>';
      if (s.img) html += imgPH(s.img);
    });
    html += '<div class="cl-crossrow"><button class="cl-cross" type="button" data-go="' + p.id + '">Explore my design process →</button>' +
      '<button class="cl-backproj" type="button">‹ Back to projects</button></div></div>';
    return html;
  }
  function sidebarNav(currentId) {
    return PROJECTS.map(function (p) {
      return '<button class="cl-nav" type="button" data-id="' + p.id + '"' +
        (p.id === currentId ? ' aria-current="true"' : '') + '>' + p.title + '</button>';
    }).join('');
  }

  /* ------------------------------------------------------------------ */
  /*  open / close — the dock drives one content window at a time        */
  /* ------------------------------------------------------------------ */
  var board = document.getElementById('pinboard');      /* Inspiration pin-board */
  var boardOpen = false;
  var openedFrom = null;                                 /* control to refocus on close */
  var lastView = { figjam: null, claude: null };         /* remember each app's place */

  function focusInto(ov) { var c = ov.querySelector('.app-close'); if (c) c.focus(); }
  function hideOverlayInstant(ov) { ov.classList.remove('is-open'); ov.hidden = true; }
  function restoreView(key) {
    if (key === 'figjam') { lastView.figjam ? showFigmaProject(lastView.figjam) : showFigmaList(); }
    else if (key === 'claude') { lastView.claude ? showClaudeProject(lastView.claude) : showClaudeList(); }
  }
  function refocusOpener() {
    if (openedFrom && openedFrom.focus) { try { openedFrom.focus(); } catch (err) {} }
    openedFrom = null;
  }

  function openApp(key, trigger) {
    var ov = overlays[key];
    if (!ov) return;
    if (openKey === key && !boardOpen) { focusInto(ov); return; }   /* re-click active: focus, never reset */
    if (!openKey && !boardOpen) openedFrom = trigger || document.activeElement;
    if (boardOpen) hidePinboardInstant();
    if (openKey && openKey !== key && overlays[openKey]) hideOverlayInstant(overlays[openKey]);
    openKey = key;
    ov.hidden = false;
    void ov.offsetWidth;
    ov.classList.add('is-open');
    restoreView(key);
    document.addEventListener('keydown', onKey);
    setActive(key);
    focusInto(ov);
  }
  function closeApp() {
    if (!openKey) return;
    var ov = overlays[openKey];
    openKey = null;
    ov.classList.remove('is-open');
    document.removeEventListener('keydown', onKey);
    var hide = function (e) { if (e.target !== ov) return; ov.hidden = true; ov.removeEventListener('transitionend', hide); };
    ov.addEventListener('transitionend', hide);
    clearActive();
    refocusOpener();
  }
  function onKey(e) { if (e.key === 'Escape') { e.preventDefault(); closeApp(); } }

  /* ---- Inspiration pin-board (separate overlay pattern) ---- */
  function hidePinboardInstant() {
    boardOpen = false;
    if (board) { board.classList.remove('is-open'); board.hidden = true; }
    document.removeEventListener('keydown', onKeyBoard);
  }
  function openPinboard(trigger) {
    if (!board) return;
    if (boardOpen) { var cb0 = board.querySelector('.board-close'); if (cb0) cb0.focus(); return; }
    if (!openKey) openedFrom = trigger || document.activeElement;
    if (openKey && overlays[openKey]) { hideOverlayInstant(overlays[openKey]); openKey = null; document.removeEventListener('keydown', onKey); }
    boardOpen = true;
    board.hidden = false;
    void board.offsetWidth;
    board.classList.add('is-open');
    document.addEventListener('keydown', onKeyBoard);
    setActive('inspiration');
    var cb = board.querySelector('.board-close');
    if (cb) cb.focus();
  }
  function closePinboard() {
    if (!boardOpen) return;
    boardOpen = false;
    board.classList.remove('is-open');
    document.removeEventListener('keydown', onKeyBoard);
    var onHide = function (e) { if (e.target !== board) return; board.hidden = true; board.removeEventListener('transitionend', onHide); };
    board.addEventListener('transitionend', onHide);
    clearActive();
    refocusOpener();
  }
  function onKeyBoard(e) { if (e.key === 'Escape') { e.preventDefault(); closePinboard(); } }

  /* navigate to a project in a given view, bringing that app into focus */
  function openProject(id, view) {
    if (view === 'process') { openApp('figjam'); showFigmaProject(id); }
    else { openApp('claude'); showClaudeProject(id); }
  }

  /* ------------------------------------------------------------------ */
  /*  DOCK: active indicator, bring-into-view, swipe-vs-tap              */
  /* ------------------------------------------------------------------ */
  var dock = document.querySelector('.dock');
  var dockRow = dock ? dock.querySelector('.dock-row') : null;
  var dockItems = dock ? Array.prototype.slice.call(dock.querySelectorAll('.dock-item[data-app]')) : [];
  var swiping = false;
  var dockGameActive = false;        /* true while the icon-launch game is running */
  var stopMagnify = function () {};  /* assigned by the magnification module below */

  function setActive(key) {
    dockItems.forEach(function (it) {
      if (it.getAttribute('data-app') === key) it.setAttribute('aria-current', 'true');
      else it.removeAttribute('aria-current');
    });
    bringDockItemIntoView(key);
  }
  function clearActive() { dockItems.forEach(function (it) { it.removeAttribute('aria-current'); }); }
  function bringDockItemIntoView(key) {
    if (swiping || !dockRow) return;
    var it = null;
    dockItems.forEach(function (d) { if (d.getAttribute('data-app') === key) it = d; });
    if (it && it.scrollIntoView) { try { it.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (err) { it.scrollIntoView(); } }
  }
  function dockGo(key, trigger) { if (key === 'inspiration') openPinboard(trigger); else openApp(key, trigger); }

  dockItems.forEach(function (it) {
    it.addEventListener('click', function () { dockGo(it.getAttribute('data-app'), it); });
    it.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !openKey && !boardOpen) it.blur();   /* Esc dismisses the tooltip, closes nothing */
    });
  });

  /* a drag/scroll on the dock must not fire a navigation (distinguish swipe from tap) */
  if (dockRow) {
    var dX = 0, dY = 0, moved = false;
    dockRow.addEventListener('pointerdown', function (e) { dX = e.clientX; dY = e.clientY; moved = false; swiping = true; });
    dockRow.addEventListener('pointermove', function (e) {
      if (Math.abs(e.clientX - dX) > 8 || Math.abs(e.clientY - dY) > 8) moved = true;
    });
    var endSwipe = function () { setTimeout(function () { swiping = false; }, 80); };
    window.addEventListener('pointerup', endSwipe);
    window.addEventListener('pointercancel', endSwipe);
    dockRow.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  }

  /* ------------------------------------------------------------------ */
  /*  DOCK magnification — macOS-style fisheye, rAF-eased to flow        */
  /*  like water: the icon under the cursor grows most, neighbours ease   */
  /*  down with a raised-cosine falloff, and the row spreads to match.    */
  /* ------------------------------------------------------------------ */
  (function () {
    if (!dockRow) return;
    var fine = false, reduced = false;
    try { fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches; } catch (e) {}
    try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    if (!fine || reduced) return;

    var MAX = 1.55, RANGE = 150, EASE = 0.23;
    var nodes = [], restCenter = [], pitches = [], iconW = [];
    var curS = [], curX = [], tgtS = [], tgtX = [];
    var measured = false, raf = 0, active = false;

    function measure() {
      nodes = Array.prototype.slice.call(dockRow.children).filter(function (el) {
        return el.classList && (el.classList.contains('dock-item') || el.classList.contains('dock-sep'));
      });
      nodes.forEach(function (el) {
        el.style.transition = 'none'; el.style.transform = '';
        var ic = el.querySelector('.dock-ic'); if (ic) { ic.style.transition = 'none'; ic.style.transform = ''; }
      });
      void dockRow.offsetWidth;
      restCenter = []; iconW = [];
      nodes.forEach(function (el) {
        var r = el.getBoundingClientRect();
        restCenter.push(r.left + r.width / 2);
        var ic = el.querySelector('.dock-ic');
        iconW.push(ic ? ic.getBoundingClientRect().width : 0);
      });
      pitches = [];
      for (var i = 0; i < restCenter.length - 1; i++) pitches.push(restCenter[i + 1] - restCenter[i]);
      var avg = pitches.length ? pitches.reduce(function (a, b) { return a + b; }, 0) / pitches.length : 56;
      RANGE = avg * 2.6;
      curS = restCenter.map(function () { return 1; });
      curX = restCenter.map(function () { return 0; });
      tgtS = curS.slice(); tgtX = curX.slice();
      measured = true;
    }
    function falloff(d) { return d >= RANGE ? 0 : 0.5 * (1 + Math.cos(Math.PI * d / RANGE)); }
    function setTargets(cursorX) {
      var n = restCenter.length, s = new Array(n), i;
      for (i = 0; i < n; i++) {
        s[i] = nodes[i].classList.contains('dock-item')
          ? 1 + (MAX - 1) * falloff(Math.abs(restCenter[i] - cursorX)) : 1;
      }
      var newPitch = [], newCenter = [restCenter[0]];
      for (i = 0; i < n - 1; i++) {
        newPitch[i] = pitches[i] + (s[i] - 1) * iconW[i] / 2 + (s[i + 1] - 1) * iconW[i + 1] / 2;
        newCenter[i + 1] = newCenter[i] + newPitch[i];
      }
      var a = 0;
      while (a < n - 1 && restCenter[a + 1] <= cursorX) a++;
      var frac = (a < n - 1) ? Math.max(0, Math.min(1, (cursorX - restCenter[a]) / (pitches[a] || 1)))
                             : (cursorX > restCenter[n - 1] ? 1 : 0);
      var shift = cursorX - (newCenter[a] + frac * (newPitch[a] || 0));
      for (i = 0; i < n; i++) { tgtS[i] = s[i]; tgtX[i] = (newCenter[i] + shift) - restCenter[i]; }
    }
    function apply() {
      if (dockGameActive) { raf = 0; return; }   /* the launch game owns the icons while it runs */
      var done = true, i;
      for (i = 0; i < nodes.length; i++) {
        curS[i] += (tgtS[i] - curS[i]) * EASE;
        curX[i] += (tgtX[i] - curX[i]) * EASE;
        if (Math.abs(tgtS[i] - curS[i]) > 0.001 || Math.abs(tgtX[i] - curX[i]) > 0.04) done = false;
        var el = nodes[i], ic = el.querySelector('.dock-ic');
        el.style.transition = 'none';
        el.style.transform = 'translateX(' + curX[i].toFixed(2) + 'px)';
        if (ic) { ic.style.transition = 'none'; ic.style.transform = 'scale(' + curS[i].toFixed(3) + ')'; }
      }
      raf = 0;
      if (!done) { raf = requestAnimationFrame(apply); }
      else if (!active) { clearRest(); }   /* settled at rest → hand transforms back to CSS (focus-visible) */
    }
    function clearRest() {
      nodes.forEach(function (el) {
        el.style.transform = ''; el.style.transition = '';
        var ic = el.querySelector('.dock-ic'); if (ic) { ic.style.transform = ''; ic.style.transition = ''; }
      });
    }
    function kick() { cancelAnimationFrame(raf); raf = requestAnimationFrame(apply); }   /* always reschedule → can't deadlock on a dropped frame */
    stopMagnify = function () { cancelAnimationFrame(raf); raf = 0; clearRest(); };      /* the game calls this to take over */
    var resetTimer = 0;

    dockRow.addEventListener('pointerenter', function (e) {
      if (dockGameActive || (e.pointerType && e.pointerType !== 'mouse')) return;
      clearTimeout(resetTimer);
      if (!measured) measure();
      active = true; setTargets(e.clientX); kick();
    });
    dockRow.addEventListener('pointermove', function (e) {
      if (dockGameActive || !active || (e.pointerType && e.pointerType !== 'mouse')) return;
      setTargets(e.clientX); kick();
    });
    dockRow.addEventListener('pointerleave', function (e) {
      if (dockGameActive || (e.pointerType && e.pointerType !== 'mouse')) return;
      active = false;
      for (var i = 0; i < tgtS.length; i++) { tgtS[i] = 1; tgtX[i] = 0; }
      kick();
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {   /* definitive reset even if rAF is throttled (e.g. a background tab) */
        if (active) return;
        cancelAnimationFrame(raf); raf = 0;
        for (var i = 0; i < curS.length; i++) { curS[i] = 1; curX[i] = 0; }
        clearRest();
      }, 650);
    });
    window.addEventListener('resize', function () { measured = false; });
  })();

  /* ------------------------------------------------------------------ */
  /*  DOCK launch game — drag any icon and release to "fire" it; the shot  */
  /*  blasts the rest (near = knocked + fall, far = wind sway), then all   */
  /*  spring back to rest. Mouse / fine-pointer only; respects reduced-mo. */
  /* ------------------------------------------------------------------ */
  (function () {
    if (!dockRow) return;
    var fine = false, reduced = false;
    try { fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches; } catch (e) {}
    try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    if (!fine || reduced) return;

    var S = [], measured = false, raf = 0, drag = null;
    var startX = 0, startY = 0, moved = false, pX = 0, pY = 0, pT = 0, flvx = 0, flvy = 0;
    var K = 0.10, DP = 0.88, RK = 0.09, RD = 0.88;   /* spring stiffness / damping (pos + rotation) */

    function measure() {
      S = Array.prototype.slice.call(dockRow.querySelectorAll('.dock-item')).map(function (item) {
        var ic = item.querySelector('.dock-ic'), r = ic.getBoundingClientRect();
        return { item: item, ic: ic, cx: r.left + r.width / 2, cy: r.top + r.height / 2,
                 ox: 0, oy: 0, vx: 0, vy: 0, rot: 0, vrot: 0 };
      });
      measured = true;
    }
    function find(item) { for (var i = 0; i < S.length; i++) if (S[i].item === item) return S[i]; return null; }
    function render() {
      for (var i = 0; i < S.length; i++) {
        var o = S[i];
        if (o.ox || o.oy || o.rot || o === drag) {
          o.ic.style.transform = 'translate(' + o.ox.toFixed(1) + 'px,' + o.oy.toFixed(1) + 'px) rotate(' + o.rot.toFixed(1) + 'deg)' + (o === drag ? ' scale(1.12)' : '');
          o.item.style.zIndex = '60';
        } else { o.ic.style.transform = ''; o.item.style.zIndex = ''; }
      }
    }
    function step() {
      var moving = false, i, o;
      for (i = 0; i < S.length; i++) {
        o = S[i];
        if (o === drag) { moving = true; continue; }   /* held icon follows the cursor */
        o.vx = (o.vx - K * o.ox) * DP; o.vy = (o.vy - K * o.oy) * DP;
        o.ox += o.vx; o.oy += o.vy;
        o.vrot = (o.vrot - RK * o.rot) * RD; o.rot += o.vrot;
        if (Math.abs(o.ox) > 0.2 || Math.abs(o.oy) > 0.2 || Math.abs(o.vx) > 0.2 ||
            Math.abs(o.vy) > 0.2 || Math.abs(o.rot) > 0.3 || Math.abs(o.vrot) > 0.3) moving = true;
        else { o.ox = o.oy = o.vx = o.vy = o.rot = o.vrot = 0; }
      }
      render();
      if (moving || drag) { raf = requestAnimationFrame(step); }
      else { raf = 0; dockGameActive = false; }
    }
    function kick() { cancelAnimationFrame(raf); raf = requestAnimationFrame(step); }

    function launch(o, vx, vy) {
      o.vx = vx; o.vy = vy; o.vrot = Math.max(-18, Math.min(18, vx * 0.5));
      var sp = Math.sqrt(vx * vx + vy * vy) || 1, dx = vx / sp, dy = vy / sp, R = 340;
      for (var i = 0; i < S.length; i++) {
        var t = S[i]; if (t === o) continue;
        var ex = t.cx - o.cx, ey = t.cy - o.cy, d = Math.sqrt(ex * ex + ey * ey);
        var f = Math.max(0, 1 - d / R); if (f <= 0) continue;
        f = f * f;                                   /* sharpen: near ≫ far (far = faint "wind") */
        var rx = d ? ex / d : dx, ry = d ? ey / d : dy, mag = 48 * f;
        t.vx += (rx * 0.85 + dx * 0.4) * mag;           /* mostly pushed away from the shot, + a shot-dir bias */
        t.vy += (ry * 0.55 + dy * 0.4) * mag + 22 * f;  /* + downward so the near ones get knocked down / fall */
        t.vrot += (rx >= 0 ? 1 : -1) * 38 * f;
      }
      dockGameActive = true; kick();
    }

    dockRow.addEventListener('pointerdown', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (e.button != null && e.button !== 0) return;
      var item = e.target && e.target.closest ? e.target.closest('.dock-item') : null;
      if (!item) return;
      if (!measured) { stopMagnify(); measure(); }
      drag = find(item); if (!drag) return;
      startX = e.clientX; startY = e.clientY; moved = false;
      pX = e.clientX; pY = e.clientY; pT = e.timeStamp || 0; flvx = flvy = 0;
    });
    window.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      if (!moved && (dx * dx + dy * dy) > 64) {        /* >8px → it's a drag, not a click */
        moved = true; dockGameActive = true; stopMagnify();
        try { dockRow.setPointerCapture(e.pointerId); } catch (err) {}
        kick();
      }
      if (moved) {
        drag.ox = e.clientX - drag.cx; drag.oy = e.clientY - drag.cy;
        var t = e.timeStamp || (pT + 16), dt = Math.max(1, t - pT);
        flvx = (e.clientX - pX) / dt * 16; flvy = (e.clientY - pY) / dt * 16;
        pX = e.clientX; pY = e.clientY; pT = t; kick();
      }
    });
    window.addEventListener('pointerup', function (e) {
      if (!drag) return;
      var o = drag; drag = null;
      if (!moved) return;                              /* a tap → let the normal click open the app */
      var lvx = o.ox * 0.14 + flvx * 0.6, lvy = o.oy * 0.14 + flvy * 0.6;
      var sp = Math.sqrt(lvx * lvx + lvy * lvy), cap = 58;
      if (sp > cap) { lvx = lvx / sp * cap; lvy = lvy / sp * cap; }
      if (sp < 5) { kick(); return; }                  /* barely moved → just spring home */
      launch(o, lvx, lvy);
    });
    window.addEventListener('pointercancel', function () { if (drag) { drag = null; kick(); } });
    window.addEventListener('resize', function () { measured = false; });
  })();

  /* ---- hero: Explore my work (→ Case Studies list) / Get to know me (→ About) ---- */
  function exploreWork(trigger) {
    lastView.claude = null;
    if (openKey === 'claude') showClaudeList();
    else openApp('claude', trigger);
  }
  var heroExplore = document.querySelector('.hero-explore');
  var heroMeet = document.querySelector('.hero-meet');
  if (heroExplore) heroExplore.addEventListener('click', function () { exploreWork(heroExplore); });
  if (heroMeet) heroMeet.addEventListener('click', function () { openApp('about', heroMeet); });

  /* ---- any [data-open-app] control inside content (e.g. About → View résumé) ---- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-open-app]'), function (b) {
    b.addEventListener('click', function () { openApp(b.getAttribute('data-open-app'), b); });
  });

  /* ---- mobile "Change wallpaper" → advance the hero's world ---- */
  var wpBtn = document.querySelector('.wallpaper-btn');
  var heroEl = document.querySelector('hero-webgl');
  if (wpBtn && heroEl) {
    wpBtn.addEventListener('click', function () { if (typeof heroEl._trigger === 'function') heroEl._trigger(); });
  }

  /* ---- pin-board controls (close, backdrop, placeholder links) ---- */
  if (board) {
    var bClose = board.querySelector('.board-close');
    if (bClose) bClose.addEventListener('click', closePinboard);
    board.addEventListener('click', function (e) { if (e.target === board) closePinboard(); });
    Array.prototype.forEach.call(board.querySelectorAll('.polaroid'), function (a) {
      a.addEventListener('click', function (e) { if (a.getAttribute('href') === '#') e.preventDefault(); });
    });
  }

  /* ---- generic close wiring (every .app-close + backdrop click) ---- */
  Object.keys(overlays).forEach(function (k) {
    var ov = overlays[k];
    if (!ov) return;
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) ov._bgdown = true; });
    ov.addEventListener('click', function (e) {
      if (e.target === ov && ov._bgdown) closeApp();
      ov._bgdown = false;
    });
    Array.prototype.forEach.call(ov.querySelectorAll('.app-close'), function (c) {
      c.addEventListener('click', closeApp);
    });
  });

  /* ---- drag-to-pan + zoom ---- */
  function makePannable(viewport, opts) {
    if (!viewport) return null;
    var content = viewport.querySelector('.canvas-content');
    if (!content) return null;
    opts = opts || {};
    var ix = opts.x || 0, iy = opts.y || 0, iz = opts.z || 1;
    var tx = ix, ty = iy, z = iz;
    var minZ = opts.minZ || 0.25, maxZ = opts.maxZ || 2.5;
    var dragging = false, sx = 0, sy = 0, stx = 0, sty = 0;
    var pctEl = opts.pct || null;
    function apply() {
      content.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + z + ')';
      if (pctEl) pctEl.textContent = Math.round(z * 100) + '%';
    }
    apply();
    viewport.addEventListener('pointerdown', function (e) {
      if (e.target.closest && e.target.closest('button, a')) return;   /* let buttons/links click */
      dragging = true; sx = e.clientX; sy = e.clientY; stx = tx; sty = ty;
      try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
      viewport.classList.add('grabbing');
    });
    viewport.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      tx = stx + (e.clientX - sx); ty = sty + (e.clientY - sy); apply();
    });
    function end() { dragging = false; viewport.classList.remove('grabbing'); }
    viewport.addEventListener('pointerup', end);
    viewport.addEventListener('pointercancel', end);
    viewport.addEventListener('pointerleave', end);
    viewport.addEventListener('wheel', function (e) {
      e.preventDefault();
      var prev = z;
      z = Math.min(maxZ, Math.max(minZ, z * (e.deltaY < 0 ? 1.12 : 0.89)));
      var r = viewport.getBoundingClientRect();
      var cx = e.clientX - r.left, cy = e.clientY - r.top;
      tx = cx - (cx - tx) * (z / prev); ty = cy - (cy - ty) * (z / prev); apply();
    }, { passive: false });
    return {
      zoomBy: function (f) {
        var prev = z;
        z = Math.min(maxZ, Math.max(minZ, z * f));
        var r = viewport.getBoundingClientRect();
        var cx = r.width / 2, cy = r.height / 2;
        tx = cx - (cx - tx) * (z / prev); ty = cy - (cy - ty) * (z / prev); apply();
      },
      reset: function () { tx = ix; ty = iy; z = iz; apply(); }
    };
  }
  var fjPan = makePannable(document.querySelector('#app-figjam .fj-proc-viewport'),
    { x: 44, y: 40, z: 0.74, pct: document.querySelector('#app-figjam .pct') });
  var aiPan = makePannable(document.querySelector('.ai-viewport'),
    { x: -120, y: -120, z: 0.62, pct: document.querySelector('#app-illustrator .pct') });
  function wireZoom(sel, pan) {
    var box = document.querySelector(sel);
    if (!box || !pan) return;
    var btns = box.querySelectorAll('button');
    if (btns[0]) btns[0].addEventListener('click', function () { pan.zoomBy(0.83); });
    if (btns[1]) btns[1].addEventListener('click', function () { pan.zoomBy(1.2); });
  }
  wireZoom('#app-figjam .zoomctl', fjPan);
  wireZoom('#app-illustrator .zoomctl', aiPan);

  /* ------------------------------------------------------------------ */
  /*  FIGMA — Thinking & Process (project list + process board)          */
  /* ------------------------------------------------------------------ */
  var fj = overlays.figjam;
  function showFigmaList() {
    if (!fj) return;
    lastView.figjam = null;
    fj.querySelector('.fj-projects').hidden = false;
    fj.querySelector('.fj-proc').hidden = true;
    var crumb = fj.querySelector('.fj-crumb'); if (crumb) crumb.hidden = true;
  }
  function showFigmaProject(id) {
    if (!fj) return;
    var p = BY_ID[id]; if (!p) return;
    lastView.figjam = id;
    fj.querySelector('.fj-board').innerHTML = processBoard(p);
    fj.querySelector('.fj-projects').hidden = true;
    fj.querySelector('.fj-proc').hidden = false;
    var crumb = fj.querySelector('.fj-crumb'); if (crumb) crumb.hidden = false;
    if (fjPan) fjPan.reset();
  }
  if (fj) {
    fj.querySelector('.fj-projects').innerHTML =
      '<div class="proj-head"><span class="app-introline fj-introline">Before the pixels made sense 💭</span><h2>Thinking &amp; Process</h2><p>A guided look at how I approached each project — the problems I noticed, the directions I explored and the decisions I made. Open a project to explore its board.</p></div>' +
      projectCards();
    fj.addEventListener('click', function (e) {
      var card = e.target.closest('.proj-card'); if (card) { showFigmaProject(card.getAttribute('data-id')); return; }
      var cross = e.target.closest('.fj-cross'); if (cross) { openProject(cross.getAttribute('data-go'), 'case-study'); return; }
      var back = e.target.closest('.fj-backproj'); if (back) { showFigmaList(); }
    });
  }

  /* ------------------------------------------------------------------ */
  /*  CLAUDE CODE — Case Studies & Builds (project list + case study)    */
  /* ------------------------------------------------------------------ */
  var cl = overlays.claude;
  function showClaudeList() {
    if (!cl) return;
    lastView.claude = null;
    cl.querySelector('.cl-projects').hidden = false;
    cl.querySelector('.cl-case').hidden = true;
    cl.querySelector('.cl-proj-nav').innerHTML = sidebarNav(null);
    var doc = cl.querySelector('.cl-doc'); if (doc) doc.textContent = 'Case Studies & Builds';
    var sc = cl.querySelector('.cl-scroll'); if (sc) sc.scrollTop = 0;
  }
  function showClaudeProject(id) {
    if (!cl) return;
    var p = BY_ID[id]; if (!p) return;
    lastView.claude = id;
    cl.querySelector('.cl-case').innerHTML = caseStudy(p);
    cl.querySelector('.cl-projects').hidden = true;
    cl.querySelector('.cl-case').hidden = false;
    cl.querySelector('.cl-proj-nav').innerHTML = sidebarNav(id);
    var doc = cl.querySelector('.cl-doc'); if (doc) doc.textContent = p.title;
    var sc = cl.querySelector('.cl-scroll'); if (sc) sc.scrollTop = 0;
  }
  if (cl) {
    cl.querySelector('.cl-projects').innerHTML =
      '<div class="proj-head"><span class="app-introline cl-introline">I had a plan. Then we built it. 🛠️</span><h2>Case Studies &amp; Builds</h2><p>The full story of each project — what I built, how I used AI, the outcome and what I learned. Open a project to read its case study.</p></div>' +
      projectCards();
    cl.querySelector('.cl-proj-nav').innerHTML = sidebarNav(null);
    cl.addEventListener('click', function (e) {
      var card = e.target.closest('.proj-card'); if (card) { showClaudeProject(card.getAttribute('data-id')); return; }
      var nav = e.target.closest('.cl-nav'); if (nav) { showClaudeProject(nav.getAttribute('data-id')); return; }
      var cross = e.target.closest('.cl-cross'); if (cross) { openProject(cross.getAttribute('data-go'), 'process'); return; }
      var back = e.target.closest('.cl-backproj'); if (back) { showClaudeList(); var d = cl.querySelector('.cl-doc'); if (d) d.textContent = 'Case Studies & Builds'; }
    });
  }

  /* ------------------------------------------------------------------ */
  /*  ILLUSTRATOR — Visual Design gallery (standalone; its own projects, */
  /*  not cross-linked to Figma/Claude). Pan/zoom wired above.           */
  /* ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------ */
  /*  NETFLIX — one mixed row; the nav switches views: Home (all) /       */
  /*  Movies (films) / TV Shows (series) / Genre (a visual genre grid).   */
  /*  Side arrows scroll the row; click a poster to feature its review.   */
  /* ------------------------------------------------------------------ */
  (function () {
    var nf = overlays.netflix;
    if (!nf) return;
    var cards = Array.prototype.slice.call(nf.querySelectorAll('.nf-card'));
    var hero = nf.querySelector('.nf-hero');
    var tEl = nf.querySelector('.nf-title'), tagEl = nf.querySelector('.nf-tags'),
        mEl = nf.querySelector('.nf-meta'), rEl = nf.querySelector('.nf-review');
    var row = nf.querySelector('.nf-row');
    var rowwrap = nf.querySelector('.nf-rowwrap');
    var genres = nf.querySelector('.nf-genres');
    var win = nf.querySelector('.app-window');
    var headEl = nf.querySelector('.nf-rowhead h4');
    var edgeL = nf.querySelector('.nf-edge-l'), edgeR = nf.querySelector('.nf-edge-r');
    var links = Array.prototype.slice.call(nf.querySelectorAll('.nf-links [data-view]'));
    var VIEW_LABEL = { home: 'MY WATCHLIST', movies: 'FILMS I RETURN TO', tv: 'SERIES I GET LOST IN' };

    function toRGBA(hex, a) {
      var h = (hex || '').replace('#', '');
      if (h.length !== 6) return 'rgba(18,18,18,' + a + ')';
      return 'rgba(' + parseInt(h.substr(0,2),16) + ',' + parseInt(h.substr(2,2),16) + ',' + parseInt(h.substr(4,2),16) + ',' + a + ')';
    }
    function heroImageOf(card) {
      var p = card.querySelector('.nf-poster');
      var m = p && (p.style.backgroundImage || '').match(/url\(["']?([^"')]+)["']?\)/);
      return m ? m[1] : null;
    }
    /* hero backdrop = the title's image on the bottom-right, its colour fading in from the top,
       the left kept dark for the text (left-darkening lives in .nf-hero::after) */
    function applyHeroBg(card) {
      if (!hero) return;
      var bg = card.getAttribute('data-bg') || '';
      var hexes = bg.match(/#[0-9a-fA-F]{6}/g) || [];
      var accent = hexes.length ? hexes[hexes.length - 1] : '#2a2a2a';
      var dark = hexes.length ? hexes[0] : '#141414';
      var img = heroImageOf(card);
      if (img) {
        hero.style.background =
          'linear-gradient(to bottom, ' + toRGBA(accent, 0.8) + ' 0%, ' + toRGBA(accent, 0) + ' 46%), ' +     /* colour fades in from the top */
          'linear-gradient(to right, ' + toRGBA(dark, 1) + ' 24%, ' + toRGBA(dark, 0) + ' 64%), ' +           /* clean colour on the left (text) → image on the right */
          'url("' + img + '") no-repeat right bottom / auto 116%, ' + bg;
      } else {
        hero.style.background = bg;
      }
    }
    function selectCard(card) {
      if (!card) return;
      cards.forEach(function (c) { c.classList.remove('sel'); });
      card.classList.add('sel');
      if (tEl) tEl.textContent = card.getAttribute('data-title') || '';
      if (tagEl) tagEl.textContent = card.getAttribute('data-tags') || '';
      if (mEl) mEl.innerHTML = card.getAttribute('data-meta') || '';
      if (rEl) rEl.textContent = card.getAttribute('data-review') || '';
      applyHeroBg(card);
    }
    cards.forEach(function (card) {
      card.addEventListener('click', function () { selectCard(card); });
    });
    var _initSel = nf.querySelector('.nf-card.sel');
    if (_initSel) applyHeroBg(_initSel);

    function firstVisible() {
      for (var i = 0; i < cards.length; i++) { if (!cards[i].hidden) return cards[i]; }
      return null;
    }
    function applyView(view) {
      var isGenre = (view === 'genre');
      if (win) win.classList.toggle('genre-view', isGenre);   /* collapse the hero billboard → room for big square tiles */
      if (rowwrap) rowwrap.hidden = isGenre;      /* Genre view swaps the title row for the genre grid */
      if (genres) genres.hidden = !isGenre;
      if (isGenre) {
        if (hero) hero.style.background = '#0b0b0b';   /* clean strip behind the nav in genre view */
      } else {
        cards.forEach(function (c) {
          var kind = c.getAttribute('data-kind');
          var show = (view === 'home') || (view === 'movies' && kind === 'film') || (view === 'tv' && kind === 'series');
          c.hidden = !show;
        });
        if (headEl) headEl.textContent = VIEW_LABEL[view] || 'MY WATCHLIST';
        if (row) row.scrollLeft = 0;
        var cur = nf.querySelector('.nf-card.sel');
        if (!cur || cur.hidden) selectCard(firstVisible());
        else applyHeroBg(cur);   /* restore the featured backdrop when returning from genre */
      }
      updateEdges();
    }

    /* edge scroll "signs" show only when the row overflows (Home) — not when it fits (Movies/TV) */
    function updateEdges() {
      if (!row || !edgeL || !edgeR) return;
      var overflow = row.scrollWidth > row.clientWidth + 2;
      edgeL.hidden = !overflow;
      edgeR.hidden = !overflow;
    }
    if (window.ResizeObserver) { try { new ResizeObserver(updateEdges).observe(row); } catch (e) {} }
    window.addEventListener('resize', updateEdges);
    /* recompute the moment the Watchlist overlay opens (dimensions are ready immediately) */
    if (window.MutationObserver) {
      new MutationObserver(function () { if (!nf.hidden) requestAnimationFrame(updateEdges); })
        .observe(nf, { attributes: true, attributeFilter: ['hidden', 'class'] });
    }

    function setActiveLink(view) {
      links.forEach(function (a) {
        if (a.getAttribute('data-view') === view) a.classList.add('on');
        else a.classList.remove('on');
      });
    }
    links.forEach(function (a) {
      var handler = function (e) {
        if (e) e.preventDefault();
        var view = a.getAttribute('data-view');
        setActiveLink(view);
        applyView(view);
      };
      a.addEventListener('click', handler);
      a.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(e); } });
    });

    (function () {
      if (!row) return;
      function animScroll(delta) {
        var reduce = false;
        try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
        if (reduce) { row.scrollLeft += delta; return; }
        var start = row.scrollLeft, t0 = null, dur = 360;
        function frame(ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur);
          var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;   /* easeInOutQuad */
          row.scrollLeft = start + delta * e;
          if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      }
      function step(dir) { animScroll(dir * Math.max(300, Math.round(row.clientWidth * 0.8))); }
      if (edgeL) edgeL.addEventListener('click', function () { step(-1); });
      if (edgeR) edgeR.addEventListener('click', function () { step(1); });

      /* drag-to-scroll with the mouse (touch keeps its native horizontal swipe) */
      var dragging = false, startX = 0, startScroll = 0, moved = false;
      row.addEventListener('pointerdown', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        dragging = true; moved = false; startX = e.clientX; startScroll = row.scrollLeft;
      });
      row.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 4) {   /* promote to a drag only past the threshold — a plain click still selects a card */
          moved = true;
          row.classList.add('dragging');
          try { row.setPointerCapture(e.pointerId); } catch (err) {}
        }
        if (moved) row.scrollLeft = startScroll - dx;
      });
      function endDrag() { dragging = false; row.classList.remove('dragging'); }
      row.addEventListener('pointerup', endDrag);
      row.addEventListener('pointercancel', endDrag);
      row.addEventListener('click', function (e) {    /* a drag must not also select a card */
        if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
      }, true);
    })();
  })();

  /* ---- Snapchat: switch the Memories tabs (visual) ---- */
  (function () {
    var sc = overlays.snapchat;
    if (!sc) return;
    var tabs = sc.querySelectorAll('.sc-tab');
    Array.prototype.forEach.call(tabs, function (t) {
      t.addEventListener('click', function () {
        Array.prototype.forEach.call(tabs, function (x) { x.classList.remove('on'); });
        t.classList.add('on');
      });
    });
  })();

  /* ---- Resume: Download = print only the resume to a real-text PDF ---- */
  (function () {
    var rs = overlays.resume;
    if (!rs) return;
    var dl = rs.querySelector('.rs-dl');
    if (!dl) return;
    dl.addEventListener('click', function () {
      document.body.classList.add('printing-resume');
      window.print();
    });
    window.addEventListener('afterprint', function () {
      document.body.classList.remove('printing-resume');
    });
  })();
})();
