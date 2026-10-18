import { useRef, useState } from 'react'
import { identity, nodeMap, spotlight } from '../data'

/**
 * The stack as a small interactive graph — light edition.
 * Hover / focus / tap a node: its edges light up tomato and its
 * detail line shows below.
 */
function NodeMap() {
  const [active, setActive] = useState('java')
  const byId = Object.fromEntries(nodeMap.nodes.map((n) => [n.id, n]))
  const activeNode = byId[active]

  return (
    <div>
      <svg
        viewBox="0 0 440 360"
        role="img"
        aria-label="Stack map — C, Java, Python, JavaScript and SQL connected as a graph"
        className="w-full select-none"
      >
        {nodeMap.edges.map(([a, b], i) => {
          const na = byId[a]
          const nb = byId[b]
          const isActive = active === a || active === b
          return (
            <line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={isActive ? 'var(--color-tomato)' : 'var(--color-line)'}
              strokeWidth={isActive ? 1.6 : 1.2}
              className={isActive ? 'edge-drift' : undefined}
            />
          )
        })}
        {nodeMap.nodes.map((n) => {
          const isActive = active === n.id
          return (
            <g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-label={n.label}
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              onClick={() => setActive(n.id)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r + 10}
                fill={isActive ? 'rgba(228,87,46,0.12)' : 'rgba(15,118,110,0.10)'}
                className="node-pulse"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="var(--color-panel)"
                stroke={isActive ? 'var(--color-tomato)' : 'var(--color-line)'}
                strokeWidth={isActive ? 1.6 : 1.2}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill={isActive ? 'var(--color-tomato)' : 'var(--color-muted)'}
              >
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="mt-4 border-t border-line pt-4">
        <p className="eyebrow text-tomato">NODE — {activeNode.label}</p>
        <p className="font-mono mt-1.5 text-xs text-muted">{activeNode.detail}</p>
      </div>
    </div>
  )
}

/** The dense annotation field — rendered twice: ghost + cursor-lit. */
function FieldText() {
  return (
    <div className="flex h-full w-full flex-wrap content-around justify-around gap-x-8 gap-y-10 p-14">
      {spotlight.map((s, i) => (
        <span
          key={i}
          className={`font-mono text-xs uppercase tracking-widest ${
            i % 7 === 0 ? 'text-tomato' : i % 5 === 0 ? 'text-teal' : 'text-ink'
          } ${i % 2 ? 'rotate-2' : '-rotate-2'}`}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)

  const setMask = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={setMask}
      data-hot
      className="texture-grid relative border-b border-line"
    >
      {/* hidden annotation layer — ghost always on, cursor lights it up */}
      <div aria-hidden="true" className="spot-layer spot-field pointer-events-none select-none">
        <FieldText />
      </div>
      <div aria-hidden="true" className="spot-layer spot-hot pointer-events-none select-none">
        <FieldText />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-32 md:grid-cols-12 md:pb-28 md:pt-44">
        <div className="hero-in md:col-span-7">
          <p className="eyebrow text-tomato">{identity.eyebrow}</p>
          <h1 className="font-display mt-5 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            Mahesh
            <br />
            <span className="relative inline-block">
              Uppala
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 240 14" fill="none" aria-hidden="true">
                <path
                  className="marker-draw"
                  d="M3 10 C 60 4, 150 4, 237 8"
                  stroke="var(--color-marker)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{identity.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a
              href="#projects"
              data-hot
              className="font-mono rounded-full bg-tomato px-7 py-3.5 text-xs uppercase tracking-wider text-paper transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(228,87,46,0.7)]"
            >
              See projects ↓
            </a>
            <a
              href={`mailto:${identity.email}`}
              data-hot
              className="link-underline font-mono text-xs uppercase tracking-wider text-ink hover:text-tomato"
            >
              Email me ↗
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <span className="chip inline-flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-teal" />
              {identity.status}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">{identity.location}</span>
          </div>

          <p className="u-note mt-8 text-sm">— the annotations? move your cursor across this page. it answers.</p>
        </div>

        <div className="hero-in md:col-span-5 md:pt-6" style={{ animationDelay: '0.25s' }} data-hot>
          <NodeMap />
          <p className="font-mono mt-4 text-center text-[11px] uppercase tracking-wider text-muted">
            hover a node — the graph answers
          </p>
        </div>
      </div>
    </section>
  )
}
