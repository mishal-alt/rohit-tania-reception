import confetti from 'canvas-confetti'

const base = {
  colors: ['#ffffff', '#f4f8fd', '#e8f0fb', '#dbeafe', '#bfdbfe', '#c9d7ea', '#aebfd4'],
  zIndex: 120,
  disableForReducedMotion: true,
  ticks: 220,
}

// Two side cannons for ~0.9s.
export function cannons() {
  const end = Date.now() + 900
  ;(function frame() {
    confetti({ ...base, particleCount: 6, angle: 60, spread: 62, startVelocity: 52, origin: { x: 0, y: 0.72 }, scalar: 0.9 })
    confetti({ ...base, particleCount: 6, angle: 120, spread: 62, startVelocity: 52, origin: { x: 1, y: 0.72 }, scalar: 0.9 })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

export function burst() {
  confetti({ ...base, particleCount: 90, spread: 110, startVelocity: 34, origin: { y: 0.6 }, shapes: ['star', 'circle'], scalar: 0.75 })
}

export function petalBurst(count) {
  window.dispatchEvent(new CustomEvent('petal-burst', { detail: { count } }))
}
