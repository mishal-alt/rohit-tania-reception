import { useEffect, useRef } from 'react'
import { couple, invitation, media } from '../data/wedding.js'
import { reduced } from '../lib/confetti.js'

// Formal invitation panel over the garden video.
export default function Invitation({ opened }) {
  const video = useRef(null)
  const visible = useRef(true)
  const sync = () => {
    const v = video.current
    if (!v) return
    if (opened && visible.current && !document.hidden && !reduced()) v.play().catch(() => {})
    else v.pause()
  }
  useEffect(() => {
    const v = video.current
    v.muted = true
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver((e) => { visible.current = e[0].isIntersecting; sync() }, { threshold: 0 })
      : null
    io?.observe(document.getElementById('home'))
    document.addEventListener('visibilitychange', sync)
    return () => { io?.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [opened]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(sync, [opened]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="formal" id="home" tabIndex={-1}>
      <video ref={video} className="formal-video" id="formalBackground" muted loop playsInline preload="metadata" poster={media.formalPoster} aria-hidden="true">
        <source src={media.formalVideo} type="video/mp4" />
      </video>
      <div className="formal-panel">
        <img className="ganesh-logo" src={media.ganesh} alt="Shri Ganesh" width="200" height="200" />
        <p className="ganesh-shloka" lang="sa">{invitation.shloka[0]}<br />{invitation.shloka[1]}</p>
        <p className="family-invitation">{invitation.blessingsOf[0]}<br />{invitation.blessingsOf[1]}</p>
        <p className="family-invitation">{invitation.hosts[0]}<br />{invitation.hosts[1]}</p>
        <p className="eyebrow">{invitation.eyebrow}</p>
        <img className="couple-logo" src={media.logo} alt={couple.monogramAlt} width="1284" height="1225" />
        <div className="couple">
          <h2>{couple.groom}</h2>
          <p>{couple.groomParents}</p>
          <i>&amp;</i>
          <h2>{couple.bride}</h2>
          <p>{couple.brideParents}</p>
        </div>
        <p className="blessing">{invitation.blessing}</p>
        <a className="text-link" href="#reveal">Begin our story ↓</a>
      </div>
    </section>
  )
}
