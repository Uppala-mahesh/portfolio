import { Reveal, Section, Chip } from './ui'
import { stack } from '../data'

export default function Stack() {
  return (
    <Section id="stack" spec="SPEC 03 — STACK" title="The tools I reach for.">
      <div className="grid gap-4 md:grid-cols-3">
        {stack.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 0.06} as="div" data-hot className="card-hover rounded-xl border border-line bg-panel p-6">
            <p className="eyebrow text-teal">{g.group}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
