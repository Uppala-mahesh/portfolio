import { stack } from '../data'
import { Chip, Reveal, Section } from './ui'

export default function Stack() {
  return (
    <Section id="stack" spec="SPEC 02 — STACK" title="The tools I reach for.">
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group, i) => (
          <Reveal key={group.label} delay={i * 60}>
            <p className="eyebrow mb-4 border-b border-line pb-3 text-muted">{group.label}</p>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
