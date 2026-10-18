import { Reveal, Section } from './ui'
import { education, certifications } from '../data'

export default function Credentials() {
  return (
    <Section id="credentials" spec="SPEC 06 — CREDENTIALS" title="Papers on the wall.">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="eyebrow mb-6 text-teal">Education</p>
          {education.map((e, i) => (
            <Reveal
              key={e.title}
              delay={i * 0.06}
              as="div"
              data-hot
              className={`py-5 transition-colors ${i === 0 ? 'pt-0' : 'border-t border-line'}`}
            >
              <p className="font-mono text-xs text-muted">{e.period}</p>
              <p className="font-display mt-1 text-xl font-semibold">{e.title}</p>
              <p className="mt-0.5 text-sm text-muted">{e.org}</p>
              <p className="font-mono mt-2 text-xs text-tomato">{e.note}</p>
            </Reveal>
          ))}
        </div>

        <div className="md:col-span-6">
          <p className="eyebrow mb-6 text-teal">Certifications</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((c, i) => (
              <Reveal
                key={c.name}
                delay={(i % 2) * 0.07}
                as="div"
                data-hot
                className="card-hover rounded-xl border border-line bg-panel p-5"
              >
                <p className="font-display text-base font-semibold leading-snug">{c.name}</p>
                <p className="font-mono mt-2 text-xs uppercase text-muted">{c.issuer}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{c.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
