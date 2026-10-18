import { useEffect, useRef, useState } from 'react'
import { identity, lampHero, dsaDay } from '../data'
import { createLamp } from '../fx/lamp'

const ALT =
  'Oxidised bronze statue of Nataraja dancing inside a ring of flames, seen from the front in near darkness. The visitor’s cursor acts as a lamp that reveals the gilded, spotlit version of the same statue.'

// ?lampdebug → status badge; ?lampx / ?lampy (image fractions) pin the light
const params = new URLSearchParams(typeof location !== 'undefined' ? location.search : '')
const DEBUG = params.has('lampdebug')
const PIN_X = params.get('lampx')
const PIN_Y = params.get('lampy')
const HERO_H = params.get('heroh') // verification-only: fixed hero height

const goto = params.get('goto')

export default function Hero() {
  const sectionRef = useRef(null)
  const baseRef = useRef(null)
  const [mode, setMode] = useState('boot') // webgl | css | boot
  const [spot, setSpot] = useState(null)

  useEffect(() => {
    // ?goto=<sectionId> — jump for screenshot verification
    const goto = params.get('goto')
    if (goto) {
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = 'auto' // headless: skip smooth-anim stalls
        document.getElementById(goto)?.scrollIntoView()
      })
    }
  }, [])

  useEffect(() => {
    const lamp = createLamp({
      mount: sectionRef.current,
      base: baseRef.current,
      baseSrc: lampHero.dark,
      goldSrc: lampHero.gold,
      hotspots: lampHero.hotspots,
      onMode: setMode,
      onHotspot: (id) => setSpot(id),
      debug: DEBUG,
    })
    if (PIN_X || PIN_Y) lamp.force(parseFloat(PIN_X ?? '0.5'), parseFloat(PIN_Y ?? '0.35'))
    return () => lamp.destroy()
  }, [])

  const spotDef = spot ? lampHero.hotspots.find((h) => h.id === spot) : null

  return (
    <section
      ref={sectionRef}
      id="top"
      data-lamp={mode}
      className="lamp relative min-h-[100svh] overflow-hidden"
      style={HERO_H ? { minHeight: 0, height: +HERO_H } : undefined}
    >
      {/* semantic base photo — this is the LCP, has real alt text, and
          carries the site alone if scripting ever fails */}
      <img
        ref={baseRef}
        src={lampHero.dark}
        alt={ALT}
        width={1600}
        height={1195}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover [object-position:50%_45%]"
      />
      {/* lamp canvas / css-fallback gold layer are appended by lamp.js,
          above the photo, below the copy */}

      {/* copy — plain HTML, keyboard reachable, never gated by the effect */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-20">
        <p className="kicker">{identity.eyebrow}</p>
        <h1 className="font-display mt-5 text-[clamp(3.2rem,10.5vw,8.75rem)] leading-[0.9] font-extrabold tracking-tight">
          <span className="text-bone">Mahesh</span>
          <span className="outline-name block">Uppala</span>
        </h1>
        <p className="font-serif mt-7 text-xl italic text-bone/90 md:text-2xl">
          the idol is bronze — the light is yours.
        </p>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mute">
          {identity.status}. Move the cursor through the temple; drag on a phone.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#projects" className="btn btn-solid">
            See the work
          </a>
          <a href={identity.resume} target="_blank" rel="noreferrer" className="btn">
            Resume ↓
          </a>
        </div>

        <p className="font-mono mt-12 text-[10px] uppercase tracking-[0.22em] text-mute">
          {dsaDay()} · {identity.location}
        </p>

        <div className="mt-10 flex items-center gap-3">
          <span className="cue" aria-hidden="true" />
        </div>
      </div>

      {/* hotspot caption strip — the light dwelling on a statue part speaks */}
      <div className="absolute inset-x-0 bottom-7 z-10 flex justify-center px-6 text-center">
        {spotDef ? (
          <a href={spotDef.href} className="spot-link">
            {spotDef.label} ↗
          </a>
        ) : (
          <span className="spot-hint">the lamp rests — parts of the idol answer it</span>
        )}
      </div>

      {/* screen-reader / keyboard equivalent of the statue hotspots */}
      <nav className="sr-only" aria-label="Statue hotspots">
        {lampHero.hotspots.map((h) => (
          <a key={h.id} href={h.href}>
            {h.label}
          </a>
        ))}
      </nav>
    </section>
  )
}
