import { useEffect, useRef } from 'react'

const COLORS = ['255,255,255', '219,234,254', '191,219,254', '226,238,252', '199,222,244']

// Falling white/blue petals, twinkling sparkles and on-demand petal bursts (event "petal-burst").
export default function PetalCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const small = window.innerWidth < 640
    const petalCount = small ? 20 : 34
    const sparkCount = small ? 14 : 26
    const rand = (a, b) => a + Math.random() * (b - a)
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
    const petals = []
    const burst = []
    const sparks = []

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    function newPetal(anywhere = true) {
      return {
        x: rand(0, w), y: anywhere ? rand(-h, h) : rand(-50, -10),
        vx: rand(-0.15, 0.15), vy: rand(0.35, 1.05), size: rand(3, 8),
        rot: rand(0, Math.PI * 2), vr: rand(-0.02, 0.02),
        sway: rand(0.2, 0.9), swaySpeed: rand(0.0006, 0.0016), phase: rand(0, Math.PI * 2),
        color: pick(COLORS), alpha: rand(0.45, 0.9),
      }
    }
    function newSpark() {
      return { x: rand(0, w), y: rand(0, h), r: rand(0.8, 2.4), phase: rand(0, Math.PI * 2), speed: rand(0.0008, 0.002), drift: rand(-0.08, 0.08) }
    }
    function drawPetal(p, t) {
      ctx.save()
      ctx.translate(p.x + Math.sin(p.phase + t * p.swaySpeed) * p.sway * 22, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`
      ctx.beginPath()
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    resize()
    for (let i = 0; i < petalCount; i++) petals.push(newPetal(true))
    for (let i = 0; i < sparkCount; i++) sparks.push(newSpark())

    const onBurst = (e) => {
      const n = e.detail?.count ?? 40
      for (let i = 0; i < n; i++) {
        burst.push({
          x: w / 2 + rand(-160, 160), y: h * 0.55 + rand(-60, 60),
          vx: rand(-2.4, 2.4), vy: rand(-4.6, -1.2), size: rand(4, 9),
          rot: rand(0, Math.PI * 2), vr: rand(-0.12, 0.12),
          sway: rand(0.2, 0.8), swaySpeed: rand(0.001, 0.002), phase: rand(0, Math.PI * 2),
          color: pick(COLORS), alpha: rand(0.7, 1),
        })
      }
    }
    window.addEventListener('petal-burst', onBurst)
    window.addEventListener('resize', resize)

    const frame = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of petals) {
        p.y += p.vy; p.x += p.vx; p.rot += p.vr
        if (p.y > h + 24) Object.assign(p, newPetal(false))
        if (p.x < -30) p.x = w + 20
        if (p.x > w + 30) p.x = -20
        drawPetal(p, t)
      }
      for (let i = burst.length - 1; i >= 0; i--) {
        const b = burst[i]
        b.vy += 0.035; b.y += b.vy; b.x += b.vx; b.rot += b.vr; b.alpha -= 0.006
        if (b.alpha <= 0 || b.y > h + 30) { burst.splice(i, 1); continue }
        drawPetal(b, t)
      }
      for (const s of sparks) {
        s.x += s.drift
        if (s.x < -10) s.x = w + 10
        if (s.x > w + 10) s.x = -10
        const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed * 2))
        ctx.save()
        ctx.globalAlpha = a * 0.85
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(190,220,255,0.9)'
        ctx.fillStyle = 'rgba(255,255,255,0.95)'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('petal-burst', onBurst)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] h-full w-full" />
}
