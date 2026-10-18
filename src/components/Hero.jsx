import { useState } from 'react'
import { identity, nodeMap } from '../data'

/**
 * Signature element: the stack as a small interactive graph.
 * Hover / focus / tap a node to highlight its edges and read its detail line.
 */
function NodeMap() {
  const [active, setActive] = useState('java')
  const byId = Object.fromEntries(nodeMap.nodes.map((n) => [n.id, n]))
  const activeNode = byId[active]

  return (
    <div className="hero-in" style={{ animationDelay: '0.2s' }}>
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
              x1={na.cx}
              y1={na.cy}
              x2={nb.cx}
              y2={nb.cy}
              stroke={isActive ? 'var(--color-copper)' : 'var(--color-line)'}
              strokeWidth={isActive ? 1.6 : 1}
              opacity={isActive ? 0.9 : 0.75}
              style={{ transition: 'stroke 0.3s ease, opacity 0.3s ease' }}
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
              aria-label={`${n.label}: ${n.detail}`}
              className="cursor-pointer outline-none"
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              onClick={() => setActive(n.id)}
            >
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r + 12}
                fill={isActive ? 'var(--color-copper)' : 'var(--color-teal)'}
                opacity={isActive ? 0.08 : 0.04}
                className="node-pulse"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r}
                fill="var(--color-panel)"
                stroke={isActive ? 'var(--color-copper)' : 'var(--color-line)'}
                strokeWidth="1.2"
                style={{ transition: 'stroke 0.3s ease' }}
              />
              <text
                x={n.cx}
                y={n.cy + 4}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={n.r >= 30 ? 14 : 12}
                letterSpacing="0.06em"
                fill={isActive ? 'var(--color-copper)' : 'var(--color-paper)'}
                style={{ transition: 'fill 0.3s ease' }}
              >
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="mt-4 min-h-[3.5rem] border-t border-line pt-4">
        <p className="eyebrow text-copper">{`NODE — ${activeNode.label}`}</p>
        <p className="mt-1 text-sm text-muted">{activeNode.detail}</p>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="texture-grid">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 pt-36 pb-20 md:grid-cols-12 md:gap-8 md:pt-44 md:pb-28">
        <div className="md:col-span-7">
          <p className="eyebrow hero-in text-copper">{identity.eyebrow}</p>
          <h1 className="hero-in mt-6 font-display text-5xl leading-[0.98] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {identity.name}
          </h1>
          <p
            className="hero-in mt-8 max-w-xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: '0.12s' }}
          >
            {identity.intro}
          </p>
          <div
            className="hero-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animationDelay: '0.22s' }}
          >
            <a
              href="#projects"
              className="rounded-full bg-copper px-6 py-3 font-mono text-xs tracking-[0.14em] uppercase text-ink transition-transform hover:-translate-y-0.5"
            >
              See projects
            </a>
            <a
              href={`mailto:${identity.email}`}
              className="link-underline font-mono text-xs tracking-[0.14em] uppercase text-paper"
            >
              {identity.email}
            </a>
          </div>
          <div
            className="hero-in mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted"
            style={{ animationDelay: '0.32s' }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 font-mono tracking-[0.08em] uppercase">
              <span className="node-pulse h-1.5 w-1.5 rounded-full bg-teal" />
              {identity.status}
            </span>
            <span className="font-mono tracking-[0.08em] uppercase">{identity.location}</span>
          </div>
        </div>

        <div className="md:col-span-5 md:pt-6">
          <NodeMap />
        </div>
      </div>
    </section>
  )
}
