/**
 * Ambient light — three blooms trail the cursor at different speeds.
 * Purely decorative; pointer-events are off. Hidden from AT.
 */
export default function MouseLight() {
  return (
    <div id="mouse-light" aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="blob h-[26rem] w-[26rem] will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(228,87,46,0.55), transparent 65%)', top: '18%', left: '12%' }}
      />
      <div
        className="blob h-[30rem] w-[30rem] will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(15,118,110,0.45), transparent 65%)', top: '52%', left: '58%' }}
      />
      <div
        className="blob h-[24rem] w-[24rem] will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(255,224,102,0.6), transparent 65%)', top: '68%', left: '22%' }}
      />
    </div>
  )
}
