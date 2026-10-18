/**
 * Procedural SVG art for project rows. Decorative only.
 * Each project gets a unique panel drawn from simple geometry — no fake screenshots.
 */

const C = {
  line: 'var(--color-line)',
  copper: 'var(--color-copper)',
  teal: 'var(--color-teal)',
  panel: 'var(--color-panel)',
}

function Frame({ children }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-panel transition-colors group-hover:border-copper/40">
      <svg viewBox="0 0 560 150" className="block w-full" aria-hidden="true">
        {children}
      </svg>
    </div>
  )
}

function Wireframe() {
  return (
    <Frame>
      <g stroke={C.line} fill="none" strokeWidth="1">
        <rect x="28" y="20" width="504" height="110" rx="6" />
        <line x1="28" y1="42" x2="532" y2="42" />
        <circle cx="46" cy="31" r="2.6" />
        <circle cx="58" cy="31" r="2.6" />
        <circle cx="70" cy="31" r="2.6" />
        <rect x="52" y="58" width="190" height="54" rx="4" stroke={C.copper} />
        <line x1="70" y1="76" x2="150" y2="76" stroke={C.copper} opacity="0.75" />
        <line x1="70" y1="88" x2="196" y2="88" opacity="0.75" />
        <rect x="70" y="98" width="64" height="10" rx="5" stroke={C.teal} />
        <rect x="262" y="58" width="118" height="14" rx="3" />
        <rect x="262" y="80" width="240" height="8" rx="3" opacity="0.7" />
        <rect x="262" y="94" width="196" height="8" rx="3" opacity="0.55" />
        <rect x="262" y="108" width="150" height="8" rx="3" opacity="0.4" />
        <rect x="400" y="58" width="112" height="14" rx="3" opacity="0.7" />
        <rect x="400" y="80" width="112" height="36" rx="4" opacity="0.7" />
      </g>
    </Frame>
  )
}

function Orbit() {
  const dots = [
    [308, 85], [257, 94], [326, 75], [280, 121], [237, 59],
    [320, 122], [219, 86], [259, 17], [295, 49], [320, 27],
  ]
  return (
    <Frame>
      <g fill="none">
        <circle cx="280" cy="75" r="46" stroke={C.line} strokeDasharray="4 8" opacity="0.8" />
        <circle cx="280" cy="75" r="62" stroke={C.line} strokeDasharray="4 10" opacity="0.6" />
        <circle cx="280" cy="75" r="30" stroke={C.line} strokeDasharray="4 6" />
        <circle cx="280" cy="75" r="15" stroke={C.copper} strokeWidth="1.6" />
        <circle cx="280" cy="75" r="6" fill={C.copper} opacity="0.85" />
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.6" fill={i % 3 === 0 ? C.copper : C.teal} opacity="0.9" />
        ))}
      </g>
    </Frame>
  )
}

function Ledger() {
  const rows = [34, 52, 70, 88, 106, 124]
  return (
    <Frame>
      <g stroke={C.line} strokeWidth="1">
        {rows.map((y, i) => (
          <line key={y} x1="52" y1={y} x2={150 + ((i * 37) % 110)} y2={y} />
        ))}
        {rows.map((y, i) => (
          <line key={`a${y}`} x1="352" y1={y} x2={402 + ((i * 23) % 70)} y2={y} opacity="0.7" />
        ))}
        <rect x="470" y="29" width="42" height="10" rx="3" fill={C.teal} opacity="0.55" stroke="none" />
        <rect x="456" y="47" width="56" height="10" rx="3" fill={C.line} opacity="0.6" stroke="none" />
        <rect x="470" y="65" width="42" height="10" rx="3" fill={C.teal} opacity="0.4" stroke="none" />
        <rect x="456" y="83" width="56" height="10" rx="3" fill={C.line} opacity="0.45" stroke="none" />
        <rect x="470" y="101" width="42" height="10" rx="3" fill={C.teal} opacity="0.3" stroke="none" />
        <rect x="448" y="119" width="64" height="12" rx="3" fill={C.copper} opacity="0.7" stroke="none" />
      </g>
    </Frame>
  )
}

function Wave() {
  return (
    <Frame>
      <g stroke={C.line} strokeWidth="1">
        {[98, 168, 238, 308, 378, 448].map((x) => (
          <line key={x} x1={x} y1="22" x2={x} y2="128" opacity="0.35" />
        ))}
        <line x1="28" y1="75" x2="532" y2="75" opacity="0.35" strokeDasharray="2 6" />
      </g>
      <line x1="28" y1="92" x2="532" y2="92" stroke={C.teal} strokeWidth="1" strokeDasharray="5 6" opacity="0.7" />
      <path
        d="M28,48 L96,46 L164,52 L232,62 L300,74 L368,84 L436,90 L500,94 L532,96"
        fill="none"
        stroke={C.copper}
        strokeWidth="2"
      />
      <circle cx="532" cy="96" r="3.2" fill={C.copper} />
      <circle cx="96" cy="46" r="2.6" fill={C.teal} />
      <circle cx="300" cy="74" r="2.6" fill={C.teal} opacity="0.8" />
    </Frame>
  )
}

function Nodes() {
  const pts = {
    a: [90, 100], b: [210, 45], c: [330, 100], d: [450, 45], e: [280, 122],
  }
  const edges = [
    ['a', 'b'], ['b', 'c'], ['c', 'd'], ['a', 'e'], ['e', 'c'],
  ]
  return (
    <Frame>
      <g stroke={C.line} strokeWidth="1">
        {edges.map(([p, q], i) => (
          <line key={i} x1={pts[p][0]} y1={pts[p][1]} x2={pts[q][0]} y2={pts[q][1]} />
        ))}
        <line x1={pts.b[0]} y1={pts.b[1]} x2={pts.d[0]} y2={pts.d[1]} stroke={C.teal} opacity="0.7" />
      </g>
      <g fill={C.panel} stroke={C.line} strokeWidth="1.4">
        <circle cx={pts.a[0]} cy={pts.a[1]} r="11" />
        <circle cx={pts.c[0]} cy={pts.c[1]} r="11" />
        <circle cx={pts.d[0]} cy={pts.d[1]} r="11" />
      </g>
      <circle cx={pts.b[0]} cy={pts.b[1]} r="13" fill={C.panel} stroke={C.copper} strokeWidth="1.6" />
      <circle cx={pts.e[0]} cy={pts.e[1]} r="11" fill={C.panel} stroke={C.teal} strokeWidth="1.6" />
      <circle cx={pts.b[0]} cy={pts.b[1]} r="4.5" fill={C.copper} />
      <circle cx={pts.e[0]} cy={pts.e[1]} r="4.5" fill={C.teal} />
    </Frame>
  )
}

function Chain() {
  return (
    <Frame>
      <g stroke={C.line} strokeWidth="1.2" fill="none">
        {[0, 1, 2, 3].map((k) => {
          const x = 40 + k * 132
          const isLast = k === 3
          return (
            <g key={k}>
              <rect x={x} y="46" width="102" height="58" rx="6" stroke={isLast ? C.copper : C.line} />
              <line x1={x + 14} y1="64" x2={x + 60} y2="64" stroke={isLast ? C.copper : C.line} opacity="0.8" />
              <line x1={x + 14} y1="76" x2={x + 44} y2="76" opacity="0.55" />
              <line x1={x + 14} y1="88" x2={x + 74} y2="88" opacity="0.35" />
              {k < 3 && (
                <>
                  <line x1={x + 102} y1="75" x2={x + 132} y2="75" />
                  <circle cx={x + 117} cy="75" r="3" stroke={k === 0 ? C.teal : C.line} />
                </>
              )}
            </g>
          )
        })}
      </g>
    </Frame>
  )
}

const artMap = {
  wireframe: Wireframe,
  orbit: Orbit,
  ledger: Ledger,
  wave: Wave,
  nodes: Nodes,
  chain: Chain,
}

export default function ProjectArt({ kind }) {
  const Art = artMap[kind] ?? Wireframe
  return <Art />
}
