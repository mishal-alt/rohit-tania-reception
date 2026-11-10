const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export function burstConfetti(x, y) {
  if (reduced()) return
  const burst = document.createElement('div')
  burst.className = 'confetti-burst'
  burst.style.left = x + 'px'
  burst.style.top = y + 'px'
  const colors = ['#1f5a43', '#c59346', '#f0c87b', '#a9cdb5']
  for (let i = 0; i < 36; i++) {
    const bit = document.createElement('i')
    const angle = Math.random() * Math.PI * 2
    const distance = 70 + Math.random() * 180
    bit.style.setProperty('--x', Math.cos(angle) * distance + 'px')
    bit.style.setProperty('--y', Math.sin(angle) * distance + 100 + 'px')
    bit.style.setProperty('--r', -360 + Math.random() * 720 + 'deg')
    bit.style.background = colors[i % 4]
    burst.appendChild(bit)
  }
  document.body.append(burst)
  setTimeout(() => burst.remove(), 1700)
}

export { reduced }
