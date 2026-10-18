import { useEffect } from 'react'

/**
 * Pointer engine: drives the ambient light blobs (CSS-var-free, direct
 * transform writes) and toggles body.is-hot while hovering [data-hot]
 * targets, so the paper visibly reacts to interactive hover.
 */
export default function usePointer() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let tx = window.innerWidth * 0.5
    let ty = window.innerHeight * 0.3
    const cur = [
      { x: tx, y: ty },
      { x: tx, y: ty },
      { x: tx, y: ty },
    ]

    const tick = () => {
      const lags = [0.085, 0.05, 0.12]
      cur.forEach((p, i) => {
        p.x += (tx - p.x) * lags[i]
        p.y += (ty - p.y) * lags[i]
      })
      const layer = document.getElementById('mouse-light')
      if (layer) {
        cur.forEach((p, i) => {
          const blob = layer.children[i]
          if (blob) blob.style.transform = `translate(${p.x - 208}px, ${p.y - 208}px)`
        })
      }
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const onOver = (e) => {
      if (e.target.closest?.('[data-hot]')) document.body.classList.add('is-hot')
    }
    const onOut = (e) => {
      if (e.target.closest?.('[data-hot]')) document.body.classList.remove('is-hot')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mouseout', onOut, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      document.body.classList.remove('is-hot')
    }
  }, [])
}
