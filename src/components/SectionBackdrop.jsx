import { media } from '../data/reception.js'

// Soft terrace picture behind every section after the hero.
export default function SectionBackdrop({ children }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${media.terrace})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
