import Modal from './Modal.jsx'
import { couple, media } from '../data/wedding.js'

export default function MobileMenu({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} id="mobileMenu" label="Navigation" closeLabel="Close menu">
      <p className="monogram"><img className="couple-logo" src={media.logo} alt={couple.monogramAlt} width="1284" height="1225" /></p>
      <nav onClick={(e) => e.target.closest('a') && onClose()}>
        <a href="#home">Invitation</a>
        <a href="#reveal">The date</a>
        <a href="#gallery">Our moments</a>
        <a href="#events">Reception</a>
        <a href="#venue">Venues</a>
      </nav>
    </Modal>
  )
}
