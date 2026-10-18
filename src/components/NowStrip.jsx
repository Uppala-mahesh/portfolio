import { Reveal } from './ui'
import { now } from '../data'

export default function NowStrip() {
  return (
    <section id="now" className="hairline">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {now.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.07} as="div" data-hot className="card-hover rounded-xl border border-line bg-panel p-5">
              <p className="eyebrow text-tomato">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
