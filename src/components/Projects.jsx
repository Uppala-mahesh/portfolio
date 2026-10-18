import { Reveal, Section, Chip } from './ui'
import ProjectArt from './ProjectArt'
import { projects } from '../data'

export default function Projects() {
  return (
    <Section
      id="projects"
      spec="SPEC 04 — PROJECTS"
      title={
        <>
          Selected work — six builds, <span className="hl">zero templates</span>.
        </>
      }
    >
      <div>
        {projects.map((p, i) => (
          <Reveal
            as="article"
            key={p.id}
            className={`group grid gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16 ${i === 0 ? 'border-t-0' : ''}`}
          >
            <div className="md:col-span-4" data-hot>
              <p className="eyebrow text-tomato">
                {p.id} · {p.year}
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{p.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>

              {p.stats.length > 0 && (
                <dl className="font-mono mt-5 border-t border-line pt-4 text-xs">
                  {p.stats.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 py-1">
                      <dt className="uppercase text-muted">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {p.links.length > 0 && (
                <div className="mt-5 flex gap-5">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="link-underline font-mono text-xs uppercase tracking-wider text-ink hover:text-tomato"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-8" data-hot>
              <ProjectArt kind={p.art} />
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">{p.blurb}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
