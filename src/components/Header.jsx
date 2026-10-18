import { identity, nav } from '../data'

// v3 header — dark, quiet, eventual flame-ring mark replaces the MU text
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber">MU</span>
          <span className="font-mono hidden text-[11px] uppercase tracking-[0.24em] text-mute sm:block">
            mahesh uppala
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute transition-colors hover:text-bone"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={identity.resume}
          target="_blank"
          rel="noreferrer"
          className="btn !py-1.5 !px-4 !text-[0.65rem]"
        >
          Resume ↓
        </a>
      </div>
    </header>
  )
}
