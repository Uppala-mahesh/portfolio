import { identity } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          Designed &amp; coded by {identity.name} — no templates
        </p>
        <p className="u-note text-sm">
          built at a desk in Hyderabad —{' '}
          <a href={`mailto:${identity.email}`} data-hot className="text-tomato hover:underline">
            say hi
          </a>
        </p>
      </div>
    </footer>
  )
}
