import { motion } from 'framer-motion'
import { couple, text, media } from '../data/reception.js'

const ease = [0.22, 1, 0.36, 1]

// Letter-by-letter name reveal.
function Letters({ text: t, delay, className }) {
  return (
    <span className={`inline-block ${className ?? ''}`} aria-label={t}>
      {t.split('').map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`} aria-hidden="true" className="inline-block"
          initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ delay: delay + i * 0.07, duration: 0.75, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

const fade = (delay, y = 14) => ({
  initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }, transition: { delay, duration: 0.8, ease },
})

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
      <img src={couple.hero.src} alt={couple.hero.alt} className="absolute inset-0 h-full w-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      <motion.div
        initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }} transition={{ duration: 1, ease }}
        className="frosted-card ornamental-border relative z-10 w-full max-w-3xl rounded-[2rem] px-6 py-14 text-center sm:px-12"
      >
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-body text-[11px] uppercase tracking-[0.45em] text-primary"
        >
          {text.heroEyebrow}
        </motion.p>
        <h1 className="mt-6 font-display leading-tight">
          <Letters text={couple.groom} delay={0.35} className="text-shimmer text-6xl sm:text-7xl lg:text-8xl" />
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
            className="my-2 block font-heading text-4xl italic text-gold sm:text-5xl"
          >
            &amp;
          </motion.span>
          <Letters text={couple.bride} delay={1.05} className="text-shimmer text-6xl sm:text-7xl lg:text-8xl" />
        </h1>
        <motion.img
          src={media.divider} alt="" width="1920" height="640" loading="lazy"
          initial={{ opacity: 0, scaleX: 0.6 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1, ease }}
          className="mx-auto mt-6 w-64 opacity-90"
        />
        <motion.p {...fade(1.7)} className="mt-6 font-heading text-lg italic text-foreground/80">{text.heroLine1}</motion.p>
        <motion.p {...fade(1.9)} className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
          {text.heroLine2}
        </motion.p>
        <motion.p {...fade(2.0)} className="mx-auto mt-4 max-w-md font-body text-xs leading-relaxed text-muted-foreground/90">
          {text.heroHosts[0]}
          <br />
          {text.heroHosts[1]}
        </motion.p>
        <motion.p {...fade(2.1)} className="mt-8 font-body text-[11px] uppercase tracking-[0.35em] text-primary">
          {text.heroScratch}
        </motion.p>
      </motion.div>
    </section>
  )
}
