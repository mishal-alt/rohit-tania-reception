import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PetalCanvas from './components/PetalCanvas.jsx'
import Opening from './components/Opening.jsx'
import { FloralCorners, BorderFrame } from './components/FloralFrame.jsx'
import MusicPill from './components/MusicPill.jsx'
import Hero from './components/Hero.jsx'
import SectionBackdrop from './components/SectionBackdrop.jsx'
import ScratchReveal from './components/ScratchReveal.jsx'
import Countdown from './components/Countdown.jsx'
import Venue from './components/Venue.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background font-body text-foreground">
      <PetalCanvas />
      <AnimatePresence>{!revealed && <Opening key="opening" onRevealed={() => setRevealed(true)} />}</AnimatePresence>
      {revealed && (
        <>
          <FloralCorners />
          <BorderFrame />
          <motion.main
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(14px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative z-10"
          >
            <Hero />
            <SectionBackdrop><ScratchReveal /></SectionBackdrop>
            <SectionBackdrop><Countdown /></SectionBackdrop>
            <SectionBackdrop><Venue /></SectionBackdrop>
            <SectionBackdrop><Footer /></SectionBackdrop>
          </motion.main>
        </>
      )}
      <MusicPill />
    </div>
  )
}
