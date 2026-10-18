import { useEffect, useRef } from 'react'

/**
 * Adds `is-in` to the referenced element the first time it scrolls into view.
 * Respects prefers-reduced-motion (reveals immediately, no observer).
 */
export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // ?noreveal → reveals instant (screenshot verification + debugging)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        new URLSearchParams(location.search).has('noreveal')) {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-in')
            io.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
