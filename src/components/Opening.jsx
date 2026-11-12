import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { couple, text, media } from '../data/reception.js'
import { music } from '../lib/music.js'
import { cannons, petalBurst } from '../lib/confetti.js'

// Full-screen opening: butterflies video, "Open Me" pill, then the gate-opening video, then the site.
export default function Opening({ onRevealed }) {
  const [phase, setPhase] = useState('invite')
  const main = useRef(null)
  const blur = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    music.ensure()
    music.loadSavedVolume()
    music.start()
    return () => { document.body.style.overflow = '' }
  }, [])

  const open = () => {
    cannons()
    petalBurst(46)
    music.start()
    setPhase('video')
  }

  useEffect(() => {
    if (phase !== 'video') return
    const v = main.current
    const b = blur.current
    if (!v) return
    ;(async () => {
      try { await v.play() } catch { v.muted = true; try { await v.play() } catch { /* ignore */ } }
      if (b) { b.muted = true; try { await b.play() } catch { /* ignore */ } }
    })()
  }, [phase])

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-background"
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(18px)' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {phase === 'invite' ? (
        <div className="relative h-full w-full">
          <video src={media.openingVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/55 backdrop-blur-[2px]" />
          <video src={media.gateVideo} preload="auto" muted className="hidden" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}
              className="max-w-md font-body text-sm font-medium uppercase leading-relaxed tracking-[0.3em] text-deep sm:max-w-2xl sm:text-lg"
            >
              {text.openingEyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 1 }}
              className="mt-5 font-display text-5xl text-deep sm:text-6xl"
            >
              {couple.groom} <span className="font-heading italic text-gold">&amp;</span> {couple.bride}
            </motion.h1>
            <div className="animate-float-y mt-12">
              <motion.button
                type="button" onClick={open}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                className="btn-shimmer glass-pill cursor-pointer rounded-full px-14 py-5 font-heading text-base uppercase tracking-[0.35em] text-deep transition-shadow duration-500 hover:shadow-[0_0_60px_-5px_var(--powder)]"
              >
                {text.openLabel}
              </motion.button>
            </div>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
              className="mt-6 font-body text-[11px] tracking-[0.2em] text-muted-foreground"
            >
              {text.openHint}
            </motion.p>
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full cursor-pointer bg-ice" onClick={onRevealed} role="presentation">
          <video ref={blur} src={media.gateVideo} muted playsInline preload="auto" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl" />
          <video ref={main} src={media.gateVideo} muted playsInline preload="auto" onEnded={onRevealed} className="relative h-full w-full object-contain" />
          <p className="absolute bottom-6 right-6 z-10 font-body text-[11px] uppercase tracking-[0.25em] text-foreground/60">Tap to skip</p>
        </div>
      )}
    </motion.div>
  )
}
