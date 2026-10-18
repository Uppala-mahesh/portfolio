import { identity, nav } from '../data'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-panel font-display text-sm font-semibold text-copper ring-1 ring-line">
            {identity.short}
          </span>
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-muted max-sm:hidden">
            {identity.name}
          </span>
        </a>

        <nav className="flex items-center gap-8 max-md:hidden" aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="link-underline font-mono text-xs tracking-[0.18em] uppercase text-muted transition-colors hover:text-paper"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={identity.resume}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line px-4 py-2 font-mono text-xs tracking-[0.14em] uppercase text-paper transition-colors hover:border-copper hover:text-copper"
        >
          Resume
        </a>
      </div>
    </header>
  )
}
