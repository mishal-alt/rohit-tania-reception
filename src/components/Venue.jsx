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
      <div className="mx-auto grid max-w-5xl items-stretch gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView}
          transition={{ duration: 0.9, ease }} whileHover={{ scale: 1.02 }}
          className="frosted-card ornamental-border overflow-hidden rounded-3xl"
        >
          <img src={venue.photo} alt={venue.photoAlt} loading="lazy" className="h-full w-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView}
          transition={{ duration: 0.9, ease }} className="flex flex-col gap-6"
        >
          <div className="frosted-card ornamental-border rounded-3xl p-8">
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
            <a href={venue.directions} target="_blank" rel="noreferrer" className="btn-primary-lux mt-7">
              <Navigation className="h-4 w-4" />
              Get Directions
            </a>
          </div>
          <div className="ornamental-border min-h-[260px] grow overflow-hidden rounded-3xl">
            <iframe
              title={venue.mapTitle} src={venue.mapEmbed} loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[260px] w-full border-0" allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
