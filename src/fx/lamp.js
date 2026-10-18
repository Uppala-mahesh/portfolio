// ─────────────────────────────────────────────────────────────────────────
// lamp.js — the Nataraja lamp (v3 centrepiece)
//
// WHAT THIS IS
//   A cursor-driven "lamp" that reveals a spotlit gold layer of the same
//   photo over an oxidised dark layer. Two pixel-registered rasters of one
//   statue: dark is the world as it is, gold is what the visitor reveals.
//
// TECHNIQUE (why)
//   1. WebGL2 fragment shader (preferred): one GPU pass per frame. Soft
//      falloff, flame flicker (periodic value noise on the rim), warm core
//      bloom, film grain and parallax all live in the shader — constant
//      cost no matter the hero size, no giant DOM layer re-painting.
//   2. CSS mask fallback (no WebGL2 / context lost): the gold <img> is
//      revealed by a radial-gradient mask driven by custom properties.
//      Same physics, minus flicker and bloom.
//   3. No JS at all: the semantic dark <img> stays with real alt text.
//      The effect is decoration; content is never trapped in a canvas.
//
// COORDINATES (read before touching!)
//   EVERYTHING in this file uses one convention: v points DOWN.
//     • uv:  (0,0) = top-left of the hero box, (1,1) = bottom-right.
//     • ImageBitmaps upload top-row-first, and UNPACK_FLIP_Y_WEBGL is
//       IGNORED for ImageBitmap sources (WebGL spec) — so texture
//       v also points down. One convention, zero double-flips.
//     • The shader must reproduce exactly what `object-fit: cover;
//       object-position: 50% posY%` shows. cover() computes the crop:
//       window (in image css-px) = [posX·ex, posY·ey] → mapped to hero.
//
// THE MATH (interview-notes)
//   • Smoothing:  p ← p + (t − p) · (1 − e^(−dt/τ))
//     A per-frame lerp factor breaks when frame rate changes; deriving it
//     from dt makes the light's "weight" identical at 30 and 144 Hz.
//   • Light radius follows cursor speed (first-order filter): widen while
//     moving, contract at rest — the lamp has "mass" without springs.
//   • Flame rim: 2-octave value noise sampled on a CIRCLE (cos θ, sin θ)
//     so the noise is periodic — no seam at ±π where atan() wraps.
//   • A small uOverscan zoom hides crop edges when parallax nudges the
//     sampling window toward the image border.
// ─────────────────────────────────────────────────────────────────────────

const VS = `#version 300 es
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5); // v: top→bottom
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FS = `#version 300 es
precision highp float;

uniform sampler2D uDark;
uniform sampler2D uGold;
uniform vec2  uLight;       // lamp position in hero uv (v points down)
uniform float uAspect;      // hero width / height
uniform float uRadius;      // radius as a fraction of hero height
uniform float uMask;        // master reveal ramp 0..1
uniform float uTime;        // seconds — frozen under reduced motion
uniform float uFlick;       // 1 = animate (0 under reduced motion)
uniform float uOverscan;    // tiny zoom that hides crop edges while parallaxing
uniform vec2  uCoverScale;  // cover-crop mapping, positive (v points down)
uniform vec2  uCoverOffset;
uniform vec2  uPar;         // sampling offset in image-uv
uniform float uTest;        // diagnostic: 1 = raw gold (bypass mask), 2 = red fill
in vec2 vUv;
out vec4 outColor;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// smooth value noise — 2 octaves are enough for a flame rim
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash12(i),                 hash12(i + vec2(1.0, 0.0)), u.x),
    mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

void main() {
  vec2 uv = vUv;

  // cover-crop mapping, then a whisper of overscan so parallax never
  // samples past the texture edge
  vec2 sUV = uv * uCoverScale + uCoverOffset;
  sUV = (sUV - 0.5) * uOverscan + 0.5;

  // both layers shift together — they stay pixel-registered
  vec3 dark = texture(uDark, sUV + uPar).rgb;
  vec3 gold = texture(uGold, sUV + uPar).rgb;

  // diagnostic modes: ?lampred=1 → red fill (proves the canvas itself
  // paints); ?lampcolor=1 → raw gold (proves the texture upload)
  if (uTest > 1.5) {
    outColor = vec4(1.0, 0.1, 0.1, 1.0);
    return;
  }
  if (uTest > 0.5) {
    outColor = vec4(gold, 1.0);
    return;
  }

  // distance in aspect-corrected units so the pool stays circular
  vec2 dxy = (uv - uLight) * vec2(uAspect, 1.0);
  float d = length(dxy);

  // flame rim: periodic noise on a circle → no seam at ±π
  float w = 0.0;
  if (d > 1e-4) {
    float a = atan(dxy.y, dxy.x);
    float n = vnoise(vec2(cos(a), sin(a)) * 2.6 + uTime * 0.35);
    n += 0.5 * vnoise(vec2(cos(a), sin(a)) * 5.8 + uTime * 0.9 + 7.0);
    w = (n / 1.5 - 0.5) * 0.07;          // ±3.5% radius flutter
  }

  float rOuter = uRadius * (1.0 + w);
  float rInner = rOuter * 0.50;          // feathered edge, half the radius
  float m = 1.0 - smoothstep(rInner, rOuter, d);  // 1 inside, 0 outside

  vec3 warm = vec3(1.0, 0.78, 0.45);
  float spill = exp(-d * 3.0 / max(uRadius, 0.05)) * 0.10;   // halo past rim
  float core  = exp(-pow(d / max(rOuter * 0.35, 1e-4), 2.0)) * 0.12;
  float amt = m * uMask;

  vec3 col = mix(dark, gold, amt);
  col += warm * (spill * 0.35 * uMask + core * amt);

  // gentle vignette keeps the frame moody at the edges
  float radial = length((uv - 0.5) * vec2(uAspect, 1.0));
  col *= 1.0 - 0.16 * smoothstep(0.35, 0.85, radial);

  // film grain; uTime frozen under reduced motion → grain goes static
  float g = hash12(gl_FragCoord.xy * 0.7 + fract(uTime) * 437.58) - 0.5;
  col += g * 0.035;

  outColor = vec4(col, 1.0);
}`

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

// object-fit: cover — the exact crop the CSS <img> shows.
// ex/ey are how much scaled image overflows the box (css px).
function cover(iw, ih, bw, bh) {
  const s = Math.max(bw / iw, bh / ih)
  const sw = iw * s
  const sh = ih * s
  const ex = Math.max(0, sw - bw)
  const ey = Math.max(0, sh - bh)
  return { s, sw, sh, ex, ey, posX: 0.5, posY: 0.45 }
}

export function createLamp(opts) {
  return new Lamp(opts)
}

class Lamp {
  constructor({ mount, base, baseSrc, goldSrc, hotspots = [], onMode, onHotspot, debug = false }) {
    this.mount = mount
    this.base = base
    this.baseSrc = baseSrc
    this.goldSrc = goldSrc
    this.hotspots = hotspots.map((h) => ({ ...h }))
    this.onMode = onMode || (() => {})
    this.onHotspot = onHotspot || (() => {})
    this.debug = debug
    this.dead = false
    this.mode = null
    this.raf = 0
    this.paused = false
    this.visible = true
    this.iw = base.naturalWidth || 1600
    this.ih = base.naturalHeight || 1195
    this.vis = { w: 1, h: 1 }
    this.rect = { left: 0, top: 0 }
    this.dpr = clamp(devicePixelRatio || 1, 1, 2)

    // light simulation state
    this.pos = null                      // smoothed lamp position (css px, y down)
    this.target = null
    this.vel = 0                         // smoothed cursor speed, px/s
    this.lastInput = -1e9
    this.dragging = false
    this.mask = 0                        // reveal ramp
    this.gold = false
    this.t = 0
    this.frame = 0
    this._test = 0 // diagnostic level: 0 normal, 1 raw gold, 2 red fill
    if (typeof location !== 'undefined') {
      const sp = new URLSearchParams(location.search)
      if (sp.has('lampred')) this._test = 2
      else if (sp.has('lampcolor')) this._test = 1
    }
    this.gerr = 0 // texture-upload GL error count

    this.reduce = matchMedia('(prefers-reduced-motion: reduce)')
    this.home = null                     // idle "lamp stand" position (px)

    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
    this.onPointerCancel = this.onPointerCancel.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onVis = this.onVis.bind(this)
    this.onReduce = this.onReduce.bind(this)
    this.frameTick = this.frameTick.bind(this)

    this.setupListeners()
    this.attemptGL()
    this.measure()
    if (this.mode === 'webgl') this.resize()
    this.resume()
  }

  // ── wiring ────────────────────────────────────────────────────────────
  setupListeners() {
    const m = this.mount
    m.addEventListener('pointermove', this.onPointerMove, { passive: true })
    m.addEventListener('pointerdown', this.onPointerDown, { passive: true })
    m.addEventListener('pointerup', this.onPointerUp, { passive: true })
    m.addEventListener('pointercancel', this.onPointerCancel, { passive: true })
    window.addEventListener('scroll', this.onScroll, { passive: true })
    document.addEventListener('visibilitychange', this.onVis)
    this.reduce.addEventListener?.('change', this.onReduce)
    this.ro = new ResizeObserver(() => this.measure())
    this.ro.observe(m)
    this.io = new IntersectionObserver(
      (es) => {
        const r = es[es.length - 1]
        this.visible = r.intersectionRatio > 0.02
        if (this.visible && !document.hidden) this.resume()
      },
      { threshold: [0, 0.02, 0.2] }
    )
    this.io.observe(m)
    if (this.debug) {
      this.badge = document.createElement('div')
      this.badge.className = 'lamp-debug'
      this.mount.appendChild(this.badge)
    }
  }

  measure() {
    if (this.dead) return
    const r = this.mount.getBoundingClientRect()
    const bw = Math.max(1, r.width)
    const bh = Math.max(1, r.height)
    this.vis = { w: bw, h: bh }
    this.rect = { left: r.left, top: r.top }
    this.cov = cover(this.iw, this.ih, bw, bh)
    this.radiusBase = clamp(Math.min(bw, bh) * 0.46, 240, 640)
    this.home = this.imgToHeroUV(0.5, 0.14)      // just above the crown
    if (!this.pos) {
      this.pos = { x: this.home.x, y: this.home.y }
      this.target = { x: this.home.x, y: this.home.y }
    }
    if (this.mode === 'webgl' && this.gl) this.resize()
  }

  // image fraction (x, yTop) → hero px. Exact inverse of the shader:
  //   shader: sampled = (heroUV·coverScale + coverOffset − 0.5)·overscan + 0.5
  //   back:   raw = (imgUV − 0.5)/overscan + 0.5 ; heroUV = (raw − off)/scale
  imgToHeroUV(ix, iyTop) {
    const { sw, sh, ex, ey, posX, posY } = this.cov
    const csX = this.vis.w / sw
    const csY = this.vis.h / sh
    const coX = (posX * ex) / sw
    const coY = (posY * ey) / sh
    const sx = (ix - 0.5) / 1.015 + 0.5
    const sy = (iyTop - 0.5) / 1.015 + 0.5
    return {
      x: ((sx - coX) / csX) * this.vis.w,
      y: ((sy - coY) / csY) * this.vis.h,
    }
  }

  onScroll() {
    const r = this.mount.getBoundingClientRect()
    this.rect = { left: r.left, top: r.top }
  }

  onVis() {
    if (document.hidden) {
      this.paused = true
      if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0 }
    } else if (this.visible && !this.dead) {
      this.resume()
    }
  }

  onReduce() {
    if (this.reduce.matches) {
      this.mask = this.gold ? 1 : this.mask
      if (this.pos && this.target) this.pos = { ...this.target }
    }
  }

  // ── pointer ───────────────────────────────────────────────────────────
  setTargetFromEvent(e) {
    this.target = { x: e.clientX - this.rect.left, y: e.clientY - this.rect.top }
    this.lastInput = performance.now() / 1000
  }

  onPointerMove(e) {
    this.setTargetFromEvent(e)
  }

  onPointerDown(e) {
    this.setTargetFromEvent(e)
    if (e.pointerType !== 'mouse') {
      this.dragging = true
      try { this.mount.setPointerCapture(e.pointerId) } catch { /* fine */ }
    }
  }

  onPointerUp() {
    this.dragging = false
  }

  // mobile: if a touch-drag becomes a native scroll (pan-y), the browser
  // cancels the pointer — clear the flag or idle drift never comes back.
  onPointerCancel() {
    this.dragging = false
  }

  // ?lampx / ?lampy (image fractions) — pins the light for visual tests
  force(ix, iyTop) {
    if (!this.cov) return
    const p = this.imgToHeroUV(ix, iyTop)
    this.pos = { ...p }
    this.target = { ...p }
    this.lastInput = performance.now() / 1000
  }

  // ── backend selection ─────────────────────────────────────────────────
  attemptGL() {
    this.canvas = document.createElement('canvas')
    this.canvas.className = 'lamp-canvas absolute inset-0 z-[1] h-full w-full pointer-events-none'
    const gl = this.canvas.getContext('webgl2', {
      alpha: true, antialias: false, depth: false, stencil: false,
      preserveDrawingBuffer: false, powerPreference: 'high-performance',
    })
    if (!gl) return this.fallbackCss()
    this.gl = gl
    this.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      this.fallbackCss()
    }, { once: true })

    if (!this.buildProgram(gl)) return this.fallbackCss()
    gl.uniform1i(this.u.uDark, 0)
    gl.uniform1i(this.u.uGold, 1)
    this.texes = [this.makeTex(), this.makeTex()]
    this.mode = 'webgl'
    this.onMode('webgl')
    this.mount.appendChild(this.canvas)

    // dark texture: decode FIRST, then bitmap — createImageBitmap rejects
    // if the element is not decodable yet, and the rejection must not be
    // swallowed or the canvas stays transparent forever.
    this.loadBitmap(this.base, this.baseSrc)
      .then((bmp) => { if (!this.dead && this.mode === 'webgl') this.uploadTex(0, bmp) })
      .catch((err) => console.error('[lamp] dark texture failed:', err))

    // gold arrives from cache (preloaded) and powers the reveal, retried
    const loadGold = async (attempt = 0) => {
      try {
        const r = await fetch(this.goldSrc, { priority: 'low' })
        const bmp = await createImageBitmap(await r.blob())
        if (this.dead || this.mode !== 'webgl') return
        this.uploadTex(1, bmp)
        if (!this.gold) this.revealFrom()
      } catch (err) {
        if (this.dead || attempt >= 5) {
          console.error('[lamp] gold texture failed:', err)
          return
        }
        setTimeout(() => loadGold(attempt + 1), 800)
      }
    }
    loadGold()
  }

  // robust element → ImageBitmap, retried: decode, bitmap, then network.
  // Under flaky (virtual-time) conditions uploads can race loading — retry.
  async loadBitmap(el, src, attempt = 0) {
    try { await el.decode() } catch { /* decode may throw spuriously */ }
    try { return await createImageBitmap(el) } catch { /* fall through */ }
    try {
      const r = await fetch(src, { priority: 'high' })
      return await createImageBitmap(await r.blob())
    } catch (err) {
      if (this.dead || attempt >= 5) throw err
      await new Promise((res) => setTimeout(res, 700))
      return this.loadBitmap(el, src, attempt + 1)
    }
  }

  fallbackCss() {
    if (this.mode === 'css') return
    this.mode = 'css'
    this.onMode('css')
    if (this.gl) {
      this.gl.getExtension('WEBGL_lose_context')?.loseContext()
      this.gl = null
    }
    this.canvas?.remove()
    this.goldImg = document.createElement('img')
    this.goldImg.src = this.goldSrc
    this.goldImg.alt = ''
    this.goldImg.draggable = false
    this.goldImg.setAttribute('aria-hidden', 'true')
    this.goldImg.decoding = 'async'
    this.goldImg.className = 'lamp-fallback-gold'
    this.goldImg.style.objectPosition = '50% 45%'
    this.mount.appendChild(this.goldImg)
    this.goldImg.decode?.().then(() => !this.dead && this.revealFrom()).catch(() => {})
  }

  makeTex() {
    const gl = this.gl
    const t = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, t)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    return t
  }

  uploadTex(unit, bmp) {
    if (this.dead || !this.gl) return
    const gl = this.gl
    gl.activeTexture(unit === 0 ? gl.TEXTURE0 : gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.texes[unit])
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp)
    if (gl.getError() !== gl.NO_ERROR) this.gerr++
    if (unit === 0) this.upD = 1
    else this.upG = 1
    this.iw = bmp.width
    this.ih = bmp.height
    this.measure()
  }

  buildProgram(gl) {
    const sh = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('[lamp] shader:', gl.getShaderInfoLog(s))
        return null
      }
      return s
    }
    const vs = sh(gl.VERTEX_SHADER, VS)
    const fs = sh(gl.FRAGMENT_SHADER, FS)
    if (!vs || !fs) return false
    const p = gl.createProgram()
    gl.attachShader(p, vs)
    gl.attachShader(p, fs)
    gl.linkProgram(p)
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.error('[lamp] link:', gl.getProgramInfoLog(p))
      return false
    }
    this.prog = p
    this.u = {}
    for (const n of ['uLight', 'uAspect', 'uRadius', 'uMask', 'uTime', 'uFlick', 'uOverscan', 'uCoverScale', 'uCoverOffset', 'uPar', 'uTest'])
      this.u[n] = gl.getUniformLocation(p, n)
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.useProgram(p)
    return true
  }

  resize() {
    if (!this.gl) return
    const { w, h } = this.vis
    this.canvas.width = Math.round(w * this.dpr)
    this.canvas.height = Math.round(h * this.dpr)
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

  revealFrom() {
    this.gold = true
    if (this.reduce.matches) this.mask = 1
  }

  // ── the loop ──────────────────────────────────────────────────────────
  resume() {
    if (this.dead) return
    this.paused = false
    if (!this.raf) this.raf = requestAnimationFrame(this.frameTick)
  }

  frameTick(nowMs) {
    this.raf = 0
    if (this.dead) return
    if (this.paused || document.hidden) return
    const now = nowMs / 1000
    const dt = clamp(now - (this._last ?? now - 0.016), 0.001, 0.05)
    this._last = now
    this.t = this.reduce.matches ? 0 : this.t + dt

    // ── simulate the lamp ──
    // idle drift: after 2.6 s without input the target becomes the home
    const idle = !this.dragging && now - this.lastInput > 2.6
    const tgt = idle ? this.home : this.target
    const reduced = this.reduce.matches
    const tau = reduced ? 0.001 : idle ? 1.6 : 0.09     // s — the lamp's weight
    // frame-rate independent exponential approach: p += d·(1 − e^(−dt/τ))
    const k = 1 - Math.exp(-dt / tau)
    this.pos.x += (tgt.x - this.pos.x) * k
    this.pos.y += (tgt.y - this.pos.y) * k

    // cursor speed via the same filter — gives the pool its inertia
    const dxp = this.pos.x - (this._prev?.x ?? this.pos.x)
    const dyp = this.pos.y - (this._prev?.y ?? this.pos.y)
    const speed = Math.hypot(dxp, dyp) / dt
    this._prev = { x: this.pos.x, y: this.pos.y }
    this.vel += (speed - this.vel) * (1 - Math.exp(-dt / 0.12))

    // radius: widen while moving, contract at rest, breathe when idle
    let R = this.radiusBase * (1 + Math.min(this.vel / 1400, 1) * 0.14)
    if (idle && !reduced) R *= 1 + 0.04 * Math.sin(this.t * 0.9)
    if (reduced) R = this.radiusBase

    // reveal ramp once the gold layer exists
    if (this.gold && !reduced) this.mask = Math.min(1, this.mask + dt / 1.4)

    this.hotspotCheck(dt, reduced)

    // ── render ──
    if (this.mode === 'webgl') this.renderGL(R)
    else if (this.mode === 'css') this.renderCss(R)

    if (this.debug && this.frame % 20 === 0) {
      this.badge.textContent =
        `${this.mode} · vis ${this.vis.w | 0}×${this.vis.h | 0} · tex ${this.iw}×${this.ih}` +
        ` · pos ${this.pos.x | 0},${this.pos.y | 0} · mask ${this.mask.toFixed(2)} · gold ${this.gold ? 1 : 0}` +
        ` · vel ${this.vel | 0} · err${this.gerr} · test${this._test}` +
        ` · up${this.upD || 0}${this.upG || 0} · cv ${this.canvas.width}×${this.canvas.height} · px ${this._px ?? '?'}`
    }

    this.frame++
    this.raf = requestAnimationFrame(this.frameTick)
  }

  hotspotCheck(dt, reduced) {
    if (!this.hotspots.length || !this.gold) return
    // lamp position → image uv: exactly the shader's forward mapping
    const u = this.pos.x / this.vis.w
    const v = this.pos.y / this.vis.h              // v points down
    const { sw, sh, ex, ey, posX, posY } = this.cov
    const csX = this.vis.w / sw
    const csY = this.vis.h / sh
    const coX = (posX * ex) / sw
    const coY = (posY * ey) / sh
    const ix = (u * csX + coX - 0.5) * 1.015 + 0.5
    const iy = (v * csY + coY - 0.5) * 1.015 + 0.5
    const aspect = this.iw / this.ih
    const slow = reduced || this.vel < 450   // resting light only, not a drive-by
    let current = null
    for (const h of this.hotspots) {
      const d = Math.hypot((ix - h.at[0]) * aspect, iy - h.at[1])
      const hit = d < h.r && slow
      h._t = hit ? h._t + dt : 0
      if (h._t > 0.5) current = h
    }
    const id = current ? current.id : null
    if (id !== this._spot) {
      this._spot = id
      this.onHotspot(id)
    }
  }

  renderGL(R) {
    const gl = this.gl
    const { sw, sh, ex, ey, posX, posY } = this.cov
    const bw = this.vis.w
    const bh = this.vis.h
    const csX = bw / sw
    const csY = bh / sh
    const coX = (posX * ex) / sw
    const coY = (posY * ey) / sh
    // parallax: statue drifts a few px opposite the cursor.
    // sampling +x → content appears left; sampling +y (down) → content up.
    const f = 0.03
    const px = ((this.pos.x - bw / 2) * f) / sw
    const py = ((this.pos.y - bh / 2) * f) / sh
    gl.uniform2f(this.u.uLight, this.pos.x / bw, this.pos.y / bh)
    gl.uniform1f(this.u.uAspect, bw / bh)
    gl.uniform1f(this.u.uRadius, R / bh)
    gl.uniform1f(this.u.uMask, this.mask)
    gl.uniform1f(this.u.uTime, this.t)
    gl.uniform1f(this.u.uFlick, this.reduce.matches ? 0 : 1)
    gl.uniform1f(this.u.uOverscan, 1.015)
    gl.uniform2f(this.u.uCoverScale, csX, csY)
    gl.uniform2f(this.u.uCoverOffset, coX, coY)
    gl.uniform2f(this.u.uPar, px, py)
    gl.uniform1f(this.u.uTest, this._test ? (this._test >= 2 ? 2 : 1) : 0)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

    // diagnostic: sample the framebuffer center every 60 frames
    if (this.debug && this.frame % 60 === 0) {
      const p = new Uint8Array(4)
      gl.readPixels((this.canvas.width / 2) | 0, (this.canvas.height / 2) | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, p)
      this._px = `${p[0]},${p[1]},${p[2]},${p[3]}`
    }
  }

  renderCss(R) {
    if (this.frame % 2) return             // 30 Hz updates keep repaints cheap
    const g = this.goldImg
    g.style.setProperty('--lx', this.pos.x.toFixed(1) + 'px')
    g.style.setProperty('--ly', this.pos.y.toFixed(1) + 'px')
    g.style.setProperty('--lr', R.toFixed(1) + 'px')
    g.style.opacity = this.gold ? '1' : '0'
  }

  destroy() {
    this.dead = true
    if (this.raf) cancelAnimationFrame(this.raf)
    this.raf = 0
    const m = this.mount
    m.removeEventListener('pointermove', this.onPointerMove)
    m.removeEventListener('pointerdown', this.onPointerDown)
    m.removeEventListener('pointerup', this.onPointerUp)
    m.removeEventListener('pointercancel', this.onPointerCancel)
    window.removeEventListener('scroll', this.onScroll)
    document.removeEventListener('visibilitychange', this.onVis)
    this.reduce.removeEventListener?.('change', this.onReduce)
    this.ro?.disconnect()
    this.io?.disconnect()
    if (this.gl) this.gl.getExtension('WEBGL_lose_context')?.loseContext()
    this.canvas?.remove()
    this.goldImg?.remove()
    this.badge?.remove()
  }
}
