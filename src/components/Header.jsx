import { identity, nav } from '../data'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3" data-hot>
          <span className="font-display grid h-9 w-9 place-items-center rounded-lg bg-ink text-sm font-bold text-paper">
            MU
          </span>
          <span className="font-mono hidden text-xs uppercase tracking-wider text-muted sm:block">
            Mahesh Uppala — portfolio
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="link-underline font-mono text-xs uppercase tracking-wider text-muted hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={identity.resume}
          target="_blank"
          rel="noreferrer"
          data-hot
          className="font-mono rounded-full border border-ink/80 px-4 py-2 text-xs uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper"
        >
          Resume ↓
        </a>
      </div>
    </header>
  )
}
