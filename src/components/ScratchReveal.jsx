import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Wine } from 'lucide-react'
import { event, text } from '../data/reception.js'
import { burst, cannons, petalBurst } from '../lib/confetti.js'
import SectionHeading from './SectionHeading.jsx'

const THRESHOLD = 0.32
const HEART = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 92'%3E%3Cpath fill='%23000' d='M50 91C10 64 0 42 0 27.5 0 12 12 1 25 1c10 0 19 6 25 15C56 7 65 1 75 1c13 0 25 11 25 26.5C100 42 90 64 50 91z'/%3E%3C/svg%3E")`

// Heart-shaped scratch card: blue-silver foil canvas wiped away with a finger or mouse.
export default function ScratchReveal() {
  const canvasRef = useRef(null)
  const boxRef = useRef(null)
  const down = useRef(false)
  const moves = useRef(0)
  const doneRef = useRef(false)
  const [done, setDone] = useState(false)

  const reveal = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    setDone(true)
    cannons()
    burst()
    petalBurst(54)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const box = boxRef.current
    if (!canvas || !box) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const paint = () => {
      const w = box.clientWidth
      const h = box.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, '#b9cfe8'); g.addColorStop(0.45, '#dce9f7'); g.addColorStop(1, '#c3d8ef')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < 90; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.25 + Math.random() * 0.5})`
        ctx.beginPath()
        ctx.arc(Math.random() * w, Math.random() * h, 0.6 + Math.random() * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = 'rgba(63, 90, 128, 0.75)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = '600 20px Poppins, sans-serif'
      ctx.fillText('✦ Scratch to Reveal ✦', w / 2, h / 2 - 10)
      ctx.font = '400 13px Poppins, sans-serif'
      ctx.fillStyle = 'rgba(63, 90, 128, 0.55)'
      ctx.fillText('Use your finger or mouse', w / 2, h / 2 + 18)
    }
    paint()
    document.fonts?.ready.then(paint).catch(() => undefined)

    const check = () => {
      if (doneRef.current) return
      const { width, height } = canvas
      if (!width || !height) return
      const data = ctx.getImageData(0, 0, width, height).data
      let cleared = 0
      let total = 0
      for (let i = 3; i < data.length; i += 64) { total++; if (data[i] < 128) cleared++ }
      if (cleared / total > THRESHOLD) reveal()
    }
    const wipe = (x, y) => {
      const r = canvas.getBoundingClientRect()
      const px = x - r.left
      const py = y - r.top
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath(); ctx.arc(px, py, 30, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(px, py, 40, 0, Math.PI * 2); ctx.globalAlpha = 0.35; ctx.fill(); ctx.globalAlpha = 1
    }
    const onDown = (e) => { if (doneRef.current) return; down.current = true; canvas.setPointerCapture(e.pointerId); wipe(e.clientX, e.clientY) }
    const onMove = (e) => {
      if (!down.current || doneRef.current) return
      wipe(e.clientX, e.clientY)
      moves.current++
      if (moves.current % 8 === 0) check()
    }
    const onUp = () => { down.current = false; check() }
    const onResize = () => { if (!doneRef.current) paint() }
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    window.addEventListener('resize', onResize)
    return () => {
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      window.removeEventListener('resize', onResize)
    }
  }, [reveal])

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="relative z-10">
        <SectionHeading eyebrow={text.scratchEyebrow} title={text.scratchTitle} />
        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-md"
        >
          <div
            ref={boxRef}
            className="glow-soft relative mx-auto aspect-[100/92] w-full max-w-[420px] overflow-hidden rounded-2xl bg-white/85 backdrop-blur-xl"
            style={{ WebkitMaskImage: HEART, maskImage: HEART, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8fbfe] to-[#eef5fb]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-[9%] pb-[7%] pt-[4%] text-center">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-secondary/90 sm:h-10 sm:w-10" aria-label="Champagne glass" role="img">
                <Wine className="h-3.5 w-3.5 text-gold sm:h-4 sm:w-4" />
              </span>
              <h3 className="mt-1 font-script text-[clamp(2.1rem,9.5vw,3.4rem)] leading-[1] text-deep">{event.title}</h3>
              <p className="mt-1 font-display text-[clamp(1.15rem,5vw,1.6rem)] font-semibold italic leading-snug text-foreground">{event.date}</p>
              <p className="font-body text-[clamp(0.65rem,2.8vw,0.8rem)] uppercase tracking-[0.3em] text-primary">{event.time}</p>
            </div>
            <motion.canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full touch-none"
              style={{ cursor: done ? 'default' : 'crosshair' }}
              animate={{ opacity: +!done }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
        <AnimatePresence>
          {done && (
            <motion.p
              initial={{ opacity: 0, y: 18, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="animate-glow-pulse mx-auto mt-10 max-w-xl text-center font-heading text-2xl sm:text-3xl"
            >
              <span className="text-shimmer">{text.scratchDone}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
