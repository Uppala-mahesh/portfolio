import { projects } from '../data'
import { Chip, Reveal, Section } from './ui'
import ProjectArt from './ProjectArt'

function ProjectRow({ project, index }) {
  return (
    <Reveal
      as="article"
      className={`group grid gap-8 py-12 md:grid-cols-12 md:gap-10 md:py-16 ${
        index > 0 ? 'border-t border-line' : ''
      }`}
    >
      <div className="md:col-span-4">
        <p className="eyebrow text-copper">
          {project.id} · {project.year}
        </p>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">
          {project.name}
        </h3>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {project.chips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className="mt-6 flex gap-6">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline font-mono text-xs tracking-[0.16em] uppercase text-paper hover:text-copper"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="md:col-span-8">
        <ProjectArt kind={project.art} />
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {project.blurb}
        </p>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <Section id="projects" spec="SPEC 03 — PROJECTS" title="Selected work.">
      <div className="mt-2">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
