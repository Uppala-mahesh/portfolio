import { Reveal, Section } from './ui'
import { contact, identity } from '../data'

export default function Contact() {
  return (
    <Section
      id="contact"
      spec="SPEC 07 — CONTACT"
      title={
        <>
          Let's <span className="hl">build</span> something.
        </>
      }
    >
      <p className="-mt-6 mb-10 max-w-2xl text-lg text-muted">{contact.line}</p>

      <Reveal data-hot>
        <a
          href={`mailto:${identity.email}`}
          className="link-underline font-display break-all text-3xl font-bold tracking-tight text-ink hover:text-tomato md:text-5xl"
        >
          {identity.email}
        </a>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <a
          href={identity.github}
          target="_blank"
          rel="noreferrer"
          data-hot
          className="link-underline font-mono text-xs uppercase tracking-wider text-ink hover:text-tomato"
        >
          GitHub ↗
        </a>
        <a
          href={identity.linkedin}
          target="_blank"
          rel="noreferrer"
          data-hot
          className="link-underline font-mono text-xs uppercase tracking-wider text-ink hover:text-tomato"
        >
          LinkedIn ↗
        </a>
      </div>

      <p className="u-note mt-10 text-sm">reply worst case within a day — usually faster.</p>
    </Section>
  )
}
