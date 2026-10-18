import { Reveal, Section } from './ui'
import { semesterMap } from '../data'

export default function Coursemap() {
  return (
    <Section id="coursework" spec="SPEC 05 — COURSEWORK" title="The syllabus, semester by semester.">
      <p className="u-note -mt-8 mb-10 text-sm">
        Every row is real — Regulation R-24, Vasavi College of Engineering. Hover a row: the room goes quiet.
      </p>
      <div className="space-y-4">
        {semesterMap.map((row, i) => (
          <Reveal key={row.sem} delay={i * 0.07} as="div" data-hot className="card-hover rounded-xl border border-line bg-panel p-6">
            <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="font-display text-xl font-bold">{row.sem}</p>
              <p className="eyebrow text-teal">{row.year}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {row.courses.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
