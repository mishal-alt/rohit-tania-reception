import { motion, useScroll, useTransform } from 'framer-motion'
import { media } from '../data/reception.js'

// Four floral corners that drift with scroll, plus a thin double border around the page.
export function FloralCorners() {
  const { scrollY } = useScroll()
  const top = useTransform(scrollY, [0, 2200], [0, 70])
  const bottom = useTransform(scrollY, [0, 2200], [0, -60])
  const cls = 'w-32 opacity-90 select-none animate-sway sm:w-48 lg:w-64 xl:w-72'
  const Img = ({ origin, lazy }) => (
    <img src={media.corner} alt="" width="1024" height="1024" loading={lazy ? 'lazy' : undefined} className={`${cls} ${origin}`} />
  )
  return (
    <div aria-hidden="true">
      <motion.div className="pointer-events-none fixed left-0 top-0 z-20" style={{ y: top }}>
        <Img origin="origin-top-left" />
      </motion.div>
      <motion.div className="pointer-events-none fixed right-0 top-0 z-20" style={{ y: top, scaleX: -1 }}>
        <Img origin="origin-top-right" lazy />
      </motion.div>
      <motion.div className="pointer-events-none fixed bottom-0 left-0 z-20" style={{ y: bottom, scaleY: -1 }}>
        <Img origin="origin-bottom-left" lazy />
      </motion.div>
      <motion.div className="pointer-events-none fixed bottom-0 right-0 z-20" style={{ y: bottom, scaleX: -1, scaleY: -1 }}>
        <Img origin="origin-bottom-right" lazy />
      </motion.div>
    </div>
  )
}

export function BorderFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30">
      <div className="absolute inset-2 rounded-sm border border-primary/40 sm:inset-3" />
      <div className="absolute inset-3.5 rounded-sm border border-primary/25 sm:inset-5" />
    </div>
  )
}
