import { useEffect, useRef, useState } from 'react'
import { couple, wedding, media } from '../data/wedding.js'
import { burstConfetti, reduced } from '../lib/confetti.js'

// Entrance screen: looping palace-door video, then "Open Invitation" plays the door-opening transition.
export default function Opening({ onStart, onFinish }) {
  const bg = useRef(null)
  const tv = useRef(null)
  const timer = useRef(null)
  const done = useRef(false)
  const busy = useRef(false)
  const [transitioning, setTransitioning] = useState(false)
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const v = bg.current
    v.muted = true
    if (reduced()) v.pause()
    else v.play().catch(() => {})
    return () => clearTimeout(timer.current)
  }, [])

  const finish = () => {
    if (done.current) return
    done.current = true
    clearTimeout(timer.current)
    tv.current?.pause()
    bg.current?.pause()
    setOpen(true)
    onFinish()
    setTimeout(() => setGone(true), 850)
  }

  // Preload the transition video up front so it starts instantly.
  useEffect(() => {
    const v = tv.current
    v.src = media.transitionVideo
    v.load()
  }, [])

  const openInvitation = () => {
    if (done.current || busy.current) return
    busy.current = true
    setTransitioning(true)
    onStart()
    burstConfetti(innerWidth / 2, innerHeight * 0.48)
    bg.current.pause()
    const v = tv.current
    v.currentTime = 0
    v.hidden = false
    v.loop = false
    v.muted = true
    v.onended = finish
    v.onerror = finish
    const wait = () => { clearTimeout(timer.current); timer.current = setTimeout(finish, 45000) }
    v.onwaiting = wait
    v.onplaying = () => clearTimeout(timer.current)
    wait()
    v.play().catch(finish)
  }

  if (gone) return null
  const cls = 'opening' + (transitioning ? ' transitioning' : '') + (open ? ' open' : '')
  return (
    <section className={cls} id="opening" aria-label="Open reception invitation" inert={open ? '' : undefined}>
      <video ref={bg} className="opening-bg" id="entranceBackground" autoPlay muted loop playsInline preload="auto" poster={media.entrancePoster} aria-hidden="true">
        <source src={media.entranceVideo} type="video/mp4" />
      </video>
      <div className="opening-glass" />
      <video ref={tv} id="transitionVideo" playsInline muted preload="auto" poster={media.transitionPoster} aria-hidden="true" hidden />
      <div className="entrance-copy">
        <img className="couple-logo" src={media.logo} alt={couple.monogramAlt} width="1284" height="1225" />
        <p className="hindi" lang="hi">॥ स्वागत समारोह ॥</p>
        <p className="eyebrow">TOGETHER WITH OUR FAMILIES</p>
        <h1><span>{couple.groom}</span><i>&amp;</i><span>{couple.bride}</span></h1>
        <div className="rule">✦</div>
        <p className="entrance-date">{wedding.entranceDate}</p>
        <button className="primary" id="openInvite" onClick={openInvitation} disabled={transitioning}>
          Open Invitation <span aria-hidden="true">↗</span>
        </button>
        <p className="entrance-foot">With love, we invite you</p>
      </div>
      {transitioning && !open && <button id="skipTransition" className="skip-transition" onClick={finish} autoFocus>Tap to skip ↓</button>}
      <div className="transition-copy" aria-hidden="true">
        <span className="hindi" lang="hi">स्वागत समारोह</span>
        <p>Our forever begins</p>
      </div>
    </section>
  )
}
