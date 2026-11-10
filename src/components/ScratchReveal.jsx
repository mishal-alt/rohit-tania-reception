import { useCallback, useEffect, useRef, useState } from 'react'
import { wedding } from '../data/wedding.js'
import { burstConfetti } from '../lib/confetti.js'
import Countdown from './Countdown.jsx'

// Scratch-to-reveal date on a heart-shaped card, plus the countdown.
export default function ScratchReveal() {
  const card = useRef(null)
  const canvas = useRef(null)
  const state = useRef({ scratching: false, revealed: false, last: null, distance: 0 })
  const [revealed, setRevealed] = useState(false)
  const [status, setStatus] = useState('')

  const cover = useCallback(() => {
    const s = state.current
    if (s.revealed) return
    const c = canvas.current, ctx = c.getContext('2d')
    const r = card.current.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2)
    c.width = r.width * d
    c.height = r.height * d
    ctx.setTransform(d, 0, 0, d, 0, 0)
    ctx.globalCompositeOperation = 'source-over'
    const g = ctx.createLinearGradient(0, 0, r.width, r.height)
    g.addColorStop(0, '#aa7340'); g.addColorStop(0.45, '#eed2a0'); g.addColorStop(1, '#bb884d')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, r.width, r.height)
    ctx.fillStyle = '#123a2a'
    ctx.textAlign = 'center'
    ctx.font = 'italic 29px Georgia'
    ctx.fillText('Scratch here', r.width / 2, r.height * 0.46)
    ctx.font = '13px Arial'
    ctx.fillText('to reveal our reception date', r.width / 2, r.height * 0.56)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 42
  }, [])

  const reveal = useCallback(() => {
    const s = state.current
    if (s.revealed) return
    s.revealed = true
    setRevealed(true)
    setStatus(wedding.revealedStatus)
    const r = card.current.getBoundingClientRect()
    burstConfetti(r.left + r.width / 2, r.top + r.height / 2)
  }, [])

  useEffect(() => {
    cover()
    addEventListener('resize', cover)
    return () => removeEventListener('resize', cover)
  }, [cover])

  const scratch = (e) => {
    const s = state.current
    if (!s.scratching || s.revealed) return
    const c = canvas.current, ctx = c.getContext('2d')
    const r = c.getBoundingClientRect(), p = { x: e.clientX - r.left, y: e.clientY - r.top }
    ctx.beginPath()
    if (s.last) {
      ctx.moveTo(s.last.x, s.last.y)
      ctx.lineTo(p.x, p.y)
      ctx.stroke()
      s.distance += Math.hypot(p.x - s.last.x, p.y - s.last.y)
    } else {
      ctx.arc(p.x, p.y, 21, 0, Math.PI * 2)
      ctx.fill()
    }
    s.last = p
    if (s.distance > r.width * 2.7) reveal()
  }
  const stop = () => { state.current.scratching = false; state.current.last = null }

  return (
    <section className="reveal section" id="reveal">
      <p className="eyebrow">A LITTLE SURPRISE, JUST FOR YOU</p>
      <h2>A date with forever</h2>
      <p className="section-intro">Scratch the heart to reveal our special day.</p>
      <svg width="0" height="0" aria-hidden="true" className="clip-def">
        <defs>
          <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
            <path d="M .5 .98 C .38 .87 .025 .63 .025 .32 C .025 .04 .34 -.03 .5 .18 C .66 -.03 .975 .04 .975 .32 C .975 .63 .62 .87 .5 .98 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className={'scratch-card' + (revealed ? ' done' : '')} id="scratchCard" ref={card}>
        <div className="date-reveal">
          <span>{wedding.weekday}</span>
          <strong>{wedding.dayMonth}</strong>
          <b>{wedding.year}</b>
        </div>
        <canvas
          ref={canvas} id="scratchCanvas"
          tabIndex={revealed ? -1 : 0} role="button"
          aria-hidden={revealed ? 'true' : undefined}
          aria-label="Reveal reception date: press Enter or scratch the heart"
          onPointerDown={(e) => { const s = state.current; s.scratching = true; s.last = null; e.currentTarget.setPointerCapture(e.pointerId); scratch(e) }}
          onPointerMove={scratch}
          onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal() } }}
        />
      </div>
      <button className="text-link" id="revealButton" onClick={reveal} disabled={revealed}>
        {revealed ? wedding.revealedLabel : 'Tap to reveal instead'}
      </button>
      <p id="revealStatus" className="sr-only" role="status">{status}</p>
      <Countdown />
    </section>
  )
}
