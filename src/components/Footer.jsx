import { identity } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Designed &amp; coded by {identity.name} — no templates</p>
        <p className="text-muted/80">Hyderabad · Last build 2026-10-18</p>
      </div>
    </footer>
  )
}
