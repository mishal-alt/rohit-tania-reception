import { event, text, media } from '../data/reception.js'

export default function Footer() {
  return (
    <footer className="px-6 pb-36 pt-4 sm:pb-20 text-center">
      <img src={media.divider} alt="" width="1920" height="640" loading="lazy" className="mx-auto w-52 opacity-80" />
      <p className="mt-6 font-heading text-lg text-deep">{text.footerLine}</p>
      <p className="mt-1 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">{event.footerDate}</p>
      <a className="zt-credit" href="https://www.instagram.com/zetron.tech" target="_blank" rel="noopener noreferrer" aria-label="Crafted by Zetron Tech on Instagram">
        <span>Crafted by</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none" />
        </svg>
        <strong>Zetron Tech</strong>
      </a>
    </footer>
  )
}
