# Portfolio v3 — "The Lamp and the Idol"

One page. One signature interaction. Everything else stays quiet.

The hero holds two pixel-registered photographs of the same Nataraja bronze —
an oxidised near-black `nataraja-dark-1600.webp` and a warm, spotlit
`nataraja-gold-1600.webp`. A WebGL shader mixes between them inside a
flame-edged circle that follows the cursor. The metaphor: **the idol is
bronze — the light is yours.** You are the lamp exploring a temple at night.

Stack: React + Vite, Tailwind v4 tokens, one custom WebGL2 shader, ~2 KB of
custom CSS utilities, no runtime libraries beyond React itself.

---

## How the lamp works (the 60-second version)

`src/fx/lamp.js` parses both images to GPU textures, draws a fullscreen
triangle, and the fragment shader outputs per pixel:

```
color = mix(dark, gold, mask)
```

`mask` is a smoothstep ramp on an **aspect-correct distance field** of a
circle around the cursor. The circle edge is not a circle — two octaves of
value noise perturb the radius per angle-flute so the rim flickers like a
flame (±3.5% flutter), plus an exponential amber spill outside the rim and a
hot core inside. Grain and vignette are baked into the same shader so there's
exactly one GPU pass per frame.

Running elements:

- **Motion**: frame-rate-independent exponential smoothing —
  `p += (t − p) · (1 − e^(−dt/τ))`. Cursor τ ≈ 0.09s (feels glued but
  expensive-looking), idle drift τ = 1.6s.
- **Radius**: widens up to +14% with pointer speed (fast passes read as a
  stronger lamp), breathes ±4% when idle.
- **Idle**: after 2.6s the lamp drifts home to a fixed point above the
  statue's crown and the noise-flutter takes over — the hero is never dead.
- **Hotspots**: parts of the idol (damaru, fire, foot) answer when the lamp
  rests on them ≥0.5s (velocity < 450 px/s), printing a small caption strip.
- **Economy**: rAF pauses when the tab is hidden or the hero scrolls past 2%
  visibility (IntersectionObserver); device-pixel-ratio capped at 2.

## Touch, keyboard, and degraded paths

| Condition | Behavior |
|---|---|
| Touch | `touch-action: pan-y` — horizontal drag moves the lamp, vertical scroll always wins. `pointercancel` clears dragging state (mobile scroll-takeover would otherwise leave it stuck). |
| No WebGL2 / context loss | CSS-mask fallback layer: a radial-gradient gold image masked by `--lx/--ly/--lr`, driven at 30Hz from pointer events. Not the shader, but the interaction survives. |
| Reduced motion | Smoothing τ drops to ~0 (`k≈1`), idle breathing and flutter amplitude ~0, all CSS animations killed via `prefers-reduced-motion`. |
| Keyboard | All content is DOM text/links; the hero effect is decoration over semantic `<img>` + copy. Nothing important lives only in the canvas. |

The shader's texture sampling mirrors `object-fit: cover; object-position:
50% 45%` exactly (same cover math, same offsets), so the lit reveal and the
fallback `<img>` stay pixel-registered with the base image on any viewport.

## Debug/verification URL params (kept on purpose)

- `?lampdebug` — live badge: mode, texture state, sampled center pixel (via
  `readPixels` at 0/20/60 frames). Root-caused every launch bug with this.
- `?lampx&lampy` — pin the lamp at an image fraction (for screenshots).
- `?lampcolor=1` / `?lampred=1` — output raw gold / solid red fill to bisect
  texture vs mask problems.
- `?noreveal`, `?heroh=900`, `?goto=projects` — screenshot/test harness.

---

## The three bugs worth retelling in an interview

### 1. The image was upside down — `UNPACK_FLIP_Y_WEBGL` ignores ImageBitmap

First render was vertically flipped. `gl.pixelStorei(UNPACK_FLIP_Y_WEBGL,
true)` does **not** apply to `ImageBitmap` uploads (the spec says orientation
is handled at `createImageBitmap` time; some drivers honor the flag, some
don't — it ambushed me between test machines). Fix: pick one convention —
v increasing *down* the image — and encode it explicitly in the vertex
transform (`v = 0.5 − aPos.y·0.5`) and every CPU-side coordinate. No flip
flags anywhere. Lesson: never let WebGL pixel-store state be load-bearing.

### 2. The gold never appeared — a swallowed promise race

`createImageBitmap(el)` was called before the `<img>` finished decoding, and
a `.catch(()=>{})` upstream silently ate the failure. Classic async race
dressed as a rendering bug. The lamp went through three bisect passes
(`?lampred` → geometry fine, so texture; `?lampcolor` → gold texture fine but
mask dead; `?lampdebug` pixel reads → mask alive but texture black... the
mipmap story below). Final fix is a retry ladder:
`decode()` → `createImageBitmap(el)` → `fetch` + blob decode, 5 attempts,
700ms apart, errors surfaced to console instead of swallowed. Bonus
discipline: the *asset* loader and the *program* loader each get their own
retry loop — they fail independently.

### 3. Silent black — mipmaps on this texture pipeline

Enabling `generateMipmap` + `LINEAR_MIPMAP_LINEAR` with an RGBA8 texture
turned the whole texture black on this driver stack, with no GL error
surfaced. Rather than hunt an unreproducible driver interaction, I chose the
correct configuration for this use case anyway: the lamp texture is sampled
at no less than ~half resolution on screen, so plain `LINEAR` sampling is
visually identical and strictly simpler. Both changes together swapped black
→ correct; I kept both. Lesson: when a GPU path offers no diagnostics, bisect
with trivial solid-color textures and `readPixels` early instead of theorizing.

### 4. (Scroll reveal) — screenshots lied to me

Headless Chrome + virtual-time budget stalled my `.reveal → .is-in`
IntersectionObserver animations, making whole sections *look* black/missing
in screenshots while fine in a real browser. Built a `?noreveal` test switch
instead of "fixing" working code. Lesson: separate "screenshot harness truth"
from "browser truth" before changing production code for either.

## Accessibility & performance fixes (Lighthouse, desktop, `npm run preview`)

First run: Perf 99 / A11y 92 / BP 100 / SEO 92. Fixes:

- Copper token `#9a5b2d` → `#c07a42` (5.7:1 on the dark paper) — was failing
  contrast at small mono sizes while *passing* semantically at eyebrow sizes;
  fixed the token, not the symptom.
- Footer inline links got a real underline (1.4:1 "link in text block" relied
  on color alone).
- Added `robots.txt`.
- Touch: added the `pointercancel` listener described above.

Re-run: **Perf 98 / A11y 100 / Best Practices 100 / SEO 100** ·
LCP 0.9s · CLS 0.002 · TBT ≈0ms · FCP/SI 0.9s. Bundle ~259KB JS
(~82KB gzip), 24KB CSS (~6KB gzip), one shader pass per frame, DPR-cap 2.

## Verification method

No visual-regression tooling — I verified in pixels: headless Chrome
(`--headless=new --virtual-time-budget`) full-page screenshots at multiple
heights, banded crops via GDI+ in PowerShell, plus shader prosthetics
(`?lampdebug` center-pixel reads) to confirm the mask/texture state instead
of trusting eyes on a JPEG. Every section, the caption strip, and the
fallback paths were checked this way.

## Project structure

```
src/
  fx/lamp.js        ← the whole interaction (WebGL2 + fallback ladder)
  components/Hero.jsx  ← DOM layer, copy, hotspots, debug badges
  components/...       ← token-driven v2 sections (remounted on dark)
  index.css         ← dark token set (single source of visual truth)
  data.js           ← projects, coursework, stack — no filler
public/
  nataraja-{dark,gold}-1600.webp   ← pixel-registered pair
```

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build && npm run preview
```

Deployed on Vercel (or any static host — `npm run build` and serve `dist/`).

Built by Mahesh Uppala · VCE Hyderabad · IT '27 · [github.com/maheshuppala](https://github.com/maheshuppala)
