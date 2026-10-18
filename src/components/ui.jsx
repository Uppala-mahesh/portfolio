import useReveal from '../hooks/useReveal'

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </Tag>
  )
}

export function Section({ id, spec, title, children, className = '' }) {
  return (
    <section id={id} className={`hairline ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="eyebrow mb-4 text-tomato">{spec}</p>
          <h2 className="font-display mb-12 text-4xl font-semibold tracking-tight md:mb-16 md:text-5xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

export function Chip({ children }) {
  return <span className="chip">{children}</span>
}
