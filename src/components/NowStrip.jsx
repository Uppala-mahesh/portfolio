import { now } from '../data'
import { Reveal } from './ui'

export default function NowStrip() {
  return (
    <section className="hairline">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <Reveal className="mb-9">
          <p className="eyebrow text-copper">SPEC 01 — NOW</p>
        </Reveal>
        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {now.map((item, i) => (
            <Reveal key={item.k} delay={i * 70}>
              <p className="eyebrow text-muted">{item.k}</p>
              <p className="mt-2.5 text-sm leading-relaxed">{item.v}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
