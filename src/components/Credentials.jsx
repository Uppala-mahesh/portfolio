import { certifications, education } from '../data'
import { Reveal, Section } from './ui'

export default function Credentials() {
  return (
    <Section id="credentials" spec="SPEC 04 — CREDENTIALS" title="Education & certifications.">
      <div className="grid gap-14 md:grid-cols-2 md:gap-16">
        {/* Education */}
        <div>
          <h3 className="eyebrow mb-8 text-muted">Education</h3>
          <ol className="space-y-10">
            {education.map((entry, i) => (
              <Reveal
                as="li"
                key={entry.title}
                delay={i * 70}
                className="grid grid-cols-[9.5rem_1fr] gap-4 max-sm:grid-cols-1 max-sm:gap-1"
              >
                <p className="pt-1 font-mono text-xs tracking-[0.14em] text-copper">{entry.period}</p>
                <div>
                  <p className="font-display text-lg font-medium tracking-tight">{entry.title}</p>
                  <p className="mt-1 text-sm text-paper/80">{entry.org}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{entry.note}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="eyebrow mb-8 text-muted">Certifications</h3>
          <ul className="space-y-4">
            {certifications.map((cert, i) => (
              <Reveal
                as="li"
                key={cert.name}
                delay={i * 70}
                className="rounded-lg border border-line bg-panel/50 px-5 py-4 transition-colors hover:border-copper/40"
              >
                <p className="font-display text-base font-medium tracking-tight">{cert.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  <span className="text-teal">{cert.issuer}</span> — {cert.detail}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
