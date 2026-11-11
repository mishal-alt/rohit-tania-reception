import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { event, text } from '../data/reception.js'
import SectionHeading from './SectionHeading.jsx'

const target = new Date(event.target).getTime()

function useCountdown() {
  const [ms, setMs] = useState(null)
  useEffect(() => {
    const tick = () => setMs(Math.max(0, target - Date.now()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  if (ms === null) return null
  return {
    days: Math.floor(ms / 864e5),
    hours: Math.floor(ms / 36e5) % 24,
    minutes: Math.floor(ms / 6e4) % 60,
    seconds: Math.floor(ms / 1e3) % 60,
  }
}

function Unit({ label, value }) {
  const n = value === undefined ? '--' : String(value).padStart(2, '0')
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="frosted-card ornamental-border glow-soft rounded-2xl px-4 py-7 text-center"
    >
      <div className="relative flex h-14 items-center justify-center overflow-hidden sm:h-16">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={n}
            initial={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="font-heading text-5xl tabular-nums text-deep sm:text-6xl"
          >
            {n}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="mt-3 font-body text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
    </motion.div>
  )
}

export default function Countdown() {
  const t = useCountdown()
  return (
    <section className="relative px-6 py-24">
      <SectionHeading eyebrow={text.countdownEyebrow} title={text.countdownTitle} />
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        <Unit label="Days" value={t?.days} />
        <Unit label="Hours" value={t?.hours} />
        <Unit label="Minutes" value={t?.minutes} />
        <Unit label="Seconds" value={t?.seconds} />
      </div>
    </section>
  )
}
