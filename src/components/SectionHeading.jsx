import { motion } from 'framer-motion'
import { media } from '../data/reception.js'

export default function SectionHeading({ eyebrow, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <p className="font-body text-[11px] uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-4xl text-deep sm:text-5xl">{title}</h2>
      <img src={media.divider} alt="" width="1920" height="640" loading="lazy" className="mx-auto mt-4 w-56 opacity-90" />
    </motion.div>
  )
}
