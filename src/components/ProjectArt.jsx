const Frame = ({ label, children }) => (
  <div className="rounded-xl border border-line bg-panel p-4 transition-colors duration-300 group-hover:border-tomato/40">
    <svg viewBox="0 0 560 150" className="w-full" role="img" aria-label={label}>
      {children}
    </svg>
  </div>
)

const L = 'var(--color-line)'
const MUTED = 'var(--color-muted)'
const TOMATO = 'var(--color-tomato)'
const TEAL = 'var(--color-teal)'
const INK = 'var(--color-ink)'

const ARTS = {
  wireframe: (
    <g fill="none" stroke={L}>
      <rect x="24" y="16" width="130" height="13" rx="3" />
      <rect x="24" y="42" width="205" height="34" rx="5" fill="var(--color-tomato)" stroke="none" opacity="0.9" />
      <rect x="24" y="92" width="88" height="34" rx="4" />
      <rect x="124" y="92" width="88" height="34" rx="4" />
      <rect x="224" y="92" width="88" height="34" rx="4" />
      <rect x="250" y="16" width="286" height="10" rx="3" stroke={MUTED} />
      <rect x="250" y="34" width="230" height="10" rx="3" stroke={MUTED} />
      <rect x="250" y="52" width="258" height="10" rx="3" stroke={MUTED} />
      <rect x="382" y="92" width="154" height="34" rx="4" stroke={TEAL} />
      <text x="26" y="27" fill={MUTED} stroke="none" fontSize="9" fontFamily="var(--font-mono)">index.html</text>
    </g>
  ),
  orbit: (
    <g fill="none" stroke={L}>
      <circle cx="96" cy="75" r="18" stroke="var(--color-tomato)" strokeWidth="2" />
      <circle cx="96" cy="75" r="34" strokeDasharray="4 6" />
      <circle cx="96" cy="75" r="52" strokeDasharray="2 7" stroke={MUTED} />
      <circle cx="96" cy="23" r="4" fill="var(--color-tomato)" stroke="none" className="node-pulse" />
      <circle cx="146" cy="96" r="3.5" fill="var(--color-teal)" stroke="none" />
      <circle cx="44" cy="60" r="3" fill={MUTED} stroke="none" />
      <rect x="320" y="30" width="180" height="9" rx="3" stroke={MUTED} />
      <rect x="320" y="52" width="150" height="9" rx="3" stroke={MUTED} />
      <rect x="320" y="74" width="200" height="9" rx="3" stroke={MUTED} />
      <rect x="320" y="96" width="118" height="28" rx="4" stroke="var(--color-tomato)" />
    </g>
  ),
  ledger: (
    <g stroke={L}>
      <rect x="24" y="18" width="180" height="12" rx="3" stroke={MUTED} />
      <line x1="24" y1="44" x2="330" y2="44" />
      <line x1="24" y1="70" x2="330" y2="70" />
      <line x1="24" y1="96" x2="330" y2="96" />
      <line x1="24" y1="122" x2="330" y2="122" />
      <circle cx="34" cy="30" r="4" fill="var(--color-marker)" stroke="none" />
      <rect x="380" y="44" width="150" height="14" rx="4" fill="var(--color-teal)" stroke="none" />
      <rect x="380" y="72" width="104" height="14" rx="4" fill="var(--color-tomato)" stroke="none" />
      <rect x="380" y="100" width="70" height="14" rx="4" stroke={MUTED} />
      <text x="384" y="34" fill={MUTED} stroke="none" fontSize="9" fontFamily="var(--font-mono)">balance: healthy</text>
    </g>
  ),
  wave: (
    <g fill="none">
      <line x1="24" y1="48" x2="536" y2="48" stroke="var(--color-teal)" strokeDasharray="5 6" />
      <path
        d="M24 36 C 120 40, 210 52, 290 78 S 470 118, 536 126"
        stroke="var(--color-tomato)"
        strokeWidth="2.5"
      />
      <circle cx="290" cy="78" r="4" fill="var(--color-tomato)" stroke="none" />
      <circle cx="418" cy="106" r="3.5" fill={MUTED} stroke="none" />
      <text x="26" y="40" fill="var(--color-teal)" stroke="none" fontSize="9" fontFamily="var(--font-mono)">threshold — SOH 80%</text>
    </g>
  ),
  nodes: (
    <g stroke={L}>
      <line x1="80" y1="40" x2="200" y2="92" />
      <line x1="200" y1="92" x2="330" y2="34" />
      <line x1="200" y1="92" x2="310" y2="120" />
      <line x1="330" y1="34" x2="460" y2="88" />
      <line x1="310" y1="120" x2="460" y2="88" />
      <circle cx="80" cy="40" r="12" fill="var(--color-tomato)" stroke="none" />
      <circle cx="200" cy="92" r="15" fill="var(--color-panel)" />
      <circle cx="330" cy="34" r="10" fill="var(--color-marker)" stroke="none" />
      <circle cx="310" cy="120" r="12" fill="var(--color-teal)" stroke="none" />
      <circle cx="460" cy="88" r="15" fill="var(--color-panel)" stroke="var(--color-tomato)" strokeWidth="2" />
      <text x="222" y="132" fill={MUTED} stroke="none" fontSize="9" fontFamily="var(--font-mono)">graph traversal</text>
    </g>
  ),
  chain: (
    <g stroke={L}>
      <rect x="24" y="52" width="92" height="46" rx="8" />
      <rect x="150" y="52" width="92" height="46" rx="8" />
      <rect x="276" y="52" width="92" height="46" rx="8" />
      <rect x="402" y="52" width="92" height="46" rx="8" fill="var(--color-tomato)" stroke="none" />
      <line x1="116" y1="75" x2="150" y2="75" />
      <line x1="242" y1="75" x2="276" y2="75" />
      <line x1="368" y1="75" x2="402" y2="75" />
      <line x1="36" y1="66" x2="104" y2="66" stroke={MUTED} />
      <line x1="36" y1="78" x2="88" y2="78" stroke={MUTED} />
      <line x1="162" y1="66" x2="230" y2="66" stroke={MUTED} />
      <line x1="288" y1="66" x2="356" y2="66" stroke={MUTED} />
      <text x="406" y="80" fill="var(--color-paper)" stroke="none" fontSize="9" fontFamily="var(--font-mono)">hash ✓</text>
    </g>
  ),
}

const LABELS = {
  wireframe: 'Wireframe — site structure',
  orbit: 'Orbit — assistant core',
  ledger: 'Ledger — accounts',
  wave: 'Wave — health curve',
  nodes: 'Nodes — graph',
  chain: 'Chain — blocks',
}

export default function ProjectArt({ kind }) {
  return <Frame label={LABELS[kind]}>{ARTS[kind]}</Frame>
}
