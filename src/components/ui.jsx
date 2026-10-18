import useReveal from '../hooks/useReveal'

/** Wrapper that fades/slides children in when scrolled into view. */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

/** A numbered, hairline-separated section styled like a spec sheet page. */
export function Section({ id, spec, title, children, className = '' }) {
  return (
    <section id={id} className={`hairline ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {spec && (
          <Reveal className="mb-10 md:mb-14">
            <p className="eyebrow text-copper">{spec}</p>
            {title && (
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
                {title}
              </h2>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}

/** Small mono label used for technologies, categories, and tags. */
export function Chip({ children }) {
  return <span className="chip">{children}</span>
}
