import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { venue, text } from '../data/reception.js'
import SectionHeading from './SectionHeading.jsx'

const ease = [0.22, 1, 0.36, 1]
const inView = { once: true, margin: '-12%' }

export default function Venue() {
  return (
    <section className="relative px-6 py-24">
      <SectionHeading eyebrow={text.venueEyebrow} title={text.venueTitle} />
      <div className="mx-auto mb-8 grid max-w-5xl gap-4 sm:grid-cols-3 sm:gap-6">
        {venue.photos.map((ph, i) => (
          <motion.div
            key={ph.src}
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView}
            transition={{ duration: 0.9, ease, delay: i * 0.12 }} whileHover={{ scale: 1.02 }}
            className="frosted-card ornamental-border overflow-hidden rounded-3xl"
          >
            <img src={ph.src} alt={ph.alt} loading="lazy" className={`aspect-[16/10] w-full object-cover sm:aspect-[4/5] ${ph.pos}`} />
          </motion.div>
        ))}
      </div>
      <div className="mx-auto grid max-w-5xl items-stretch gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView}
          transition={{ duration: 0.9, ease }} className="frosted-card ornamental-border flex flex-col justify-center rounded-3xl p-8"
        >
          <div className="flex items-start gap-3">
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-deep">
              <MapPin className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-display text-3xl text-deep">{venue.name}</h3>
              <p className="mt-1 font-body text-sm text-muted-foreground">{venue.address}</p>
            </div>
          </div>
          <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground">{venue.blurb}</p>
          <a href={venue.directions} target="_blank" rel="noreferrer" className="btn-primary-lux mt-7 self-start">
            <Navigation className="h-4 w-4" />
            Get Directions
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView}
          transition={{ duration: 0.9, ease }}
          className="ornamental-border min-h-[300px] overflow-hidden rounded-3xl"
        >
          <iframe
            title={venue.mapTitle} src={venue.mapEmbed} loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[300px] w-full border-0" allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  )
}
