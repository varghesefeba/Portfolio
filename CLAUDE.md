# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal portfolio workspace. Most of it is media (illustrations, edits, videos, banners). The
only source code is one interactive hero component in `Animate hero with world transitions/`. There
is no git repo, no `package.json`, no build system, and no test suite for the editable content.

## The hero component (the code that matters)

`Animate hero with world transitions/` holds a single-canvas WebGL "illustrated-world" hero. The
authoritative design brief for it is `Interactive Living Hero — Complete WebGL Build Specification.md`
at the repo root — read it before making behavioral changes; it defines the intended interaction,
the motion hierarchy, and an explicit "do not" list (no carousel, no crossfade, no glitch effects).

Three files, two of them editable:

- **`hero-webgl.js`** — the `<hero-webgl>` custom element. This is where all the real logic lives:
  a vertex + fragment GLSL shader pair (as template strings at the top of the file), texture
  loading, cursor-spring physics, the click transition state machine, and a single
  `requestAnimationFrame` loop (`_frame`). **Edit here for any visual/interaction change.**
- **`Interactive Hero.dc.html`** — a Design Component (`.dc.html`). It's the template + overlay
  copy + the tunable props (`cueText`, `previewScale`, `transitionSeconds`, `showCopy`). It imports
  `hero-webgl.js` via an `<x-import>` tag. Edit here for layout, copy, fonts, or exposed props.
- **`support.js`** — the DC runtime. **Generated, do not edit** (its header says: generated from
  `dc-runtime/src/*.ts`, rebuild with `cd dc-runtime && bun run build` — but that source is not in
  this repo). Treat it as a black-box dependency.

Assets: `assets/world-1-mumbai.png`, `world-2-mountain.png`, `world-3-arcade.png` are the three
fixed illustrations. `uploads/` is scratch/source imagery, not referenced by the component.

## Architecture invariants (breaking these breaks the concept)

- **One WebGL canvas, one quad, one fragment shader, three textures, one rAF loop.** Pointer events
  only write interaction targets (`this.p.tx/ty`, `hovering`, etc.); all rendering happens in
  `_frame`. Never call render from a pointer handler, and never add a second animation loop.
- **The girl is the visual anchor.** All three illustrations align her at the same position/scale,
  so a single `characterMask()` in the shader (an analytic approximation, meant to be swapped for a
  real grayscale mask later) protects her from displacement across every world. Displacement,
  parallax, pixel transition, and click shock are all attenuated by `(1 - mask)`.
- **World cycle is fixed 1 → 2 → 3 → 1**, driven by `this.cur`/`this.nxt` advancing on transition
  complete. The pixel field is the bridge between worlds — do not replace it with an opacity fade.
- **`prefers-reduced-motion`** is honored via the `uReduced` uniform and the `this.reduced` flag;
  keep both paths working when changing motion.
- Cleanup matters: `disconnectedCallback` deletes textures/program/buffer and disconnects the
  Resize/Intersection observers. Rendering pauses when off-screen (`IntersectionObserver`) or when
  the tab is hidden.

## Running / previewing

There is no dev-server script here. The DC runtime (`support.js`) auto-boots on `DOMContentLoaded`,
parses the `<x-dc>` block, and requires `window.React` and `window.ReactDOM` to be present. Because
the component loads `hero-webgl.js` and the PNG textures over relative paths, serve the folder over
HTTP (a `file://` open will fail on those fetches / WebGL texture loads) and open
`Interactive Hero.dc.html` in a host that also provides the React globals. When the tuning props
change, edit the `data-props` JSON and the `renderVals()` defaults in the `.dc.html` together.
