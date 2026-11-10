import { couple, media } from '../data/wedding.js'

export default function Header({ music, onMenu, menuOpen }) {
  return (
    <header className="site-header">
      <a href="#home" className="monogram" aria-label={`${couple.groom} and ${couple.bride} home`}>
        <img className="couple-logo" src={media.logo} alt={couple.monogramAlt} width="1284" height="1225" />
      </a>
      <nav aria-label="Main navigation">
        <a href="#gallery">Our moments</a>
        <a href="#events">Reception</a>
        <a href="#venue">Venues</a>
      </nav>
      <div className="header-controls">
        <button
          id="music" className="icon-button" type="button"
          aria-label={music.playing ? 'Turn music off' : 'Turn music on'}
          aria-pressed={music.playing}
          data-playing={String(music.playing)}
          onClick={music.toggle}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path className="sound-on" d="M15 9a5 5 0 0 1 0 6m3-9a9 9 0 0 1 0 12" />
            <path className="sound-off" d="m16 9 5 6m0-6-5 6" />
          </svg>
        </button>
        <button id="menuButton" className="icon-button" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobileMenu" onClick={onMenu}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
    </header>
  )
}
