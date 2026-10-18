import { contact, identity } from '../data'
import { Reveal, Section } from './ui'

export default function Contact() {
  return (
    <Section id="contact" spec="SPEC 05 — CONTACT" title={contact.heading}>
      <Reveal>
        <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">{contact.line}</p>

        <a
          href={`mailto:${identity.email}`}
          className="link-underline mt-12 inline-block font-display text-2xl font-medium tracking-tight transition-colors hover:text-copper md:mt-16 md:text-5xl"
        >
          {identity.email}
        </a>

        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-8">
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            className="link-underline font-mono text-xs tracking-[0.16em] uppercase text-muted transition-colors hover:text-copper"
          >
            GitHub ↗
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noreferrer"
            className="link-underline font-mono text-xs tracking-[0.16em] uppercase text-muted transition-colors hover:text-copper"
          >
            LinkedIn ↗
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
