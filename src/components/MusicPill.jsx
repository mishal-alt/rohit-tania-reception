import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { music } from '../lib/music.js'

export default function MusicPill() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const h = (e) => setOn(e.detail.playing)
    window.addEventListener('music-state', h)
    return () => window.removeEventListener('music-state', h)
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="frosted-card fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full px-3 py-3"
    >
      <button
        type="button"
        onClick={() => (on ? music.pause() : music.start())}
        aria-label={on ? 'Mute music' : 'Unmute music'}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary/15 text-deep transition-colors duration-300 hover:bg-primary/30"
      >
        {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>
      <span className="hidden pr-2 font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:block">Music</span>
    </motion.div>
  )
}
