import { Reveal } from './ui'
import { metrics } from '../data'

export default function MetricsStrip() {
  return (
    <div className="border-b border-line bg-panel/70">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-6 py-12 md:grid-cols-4 md:py-14">
        {metrics.map((m, i) => (
          <Reveal key={m.k} delay={i * 0.08} className="group" data-hot>
            <p className="eyebrow text-muted">{m.k}</p>
            <p className="font-display mt-2 text-4xl font-bold leading-none transition-colors group-hover:text-tomato md:text-5xl">
              {m.v}
            </p>
            <p className="font-mono mt-2 text-xs uppercase tracking-wider text-teal">{m.note}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
