import { useEffect, useState } from 'react'
import Modal from './Modal.jsx'
import { gallery } from '../data/wedding.js'

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const n = gallery.length
  const open = index !== null
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i + n - 1) % n)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % n)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, n])
  const photo = open ? gallery[index] : null
  return (
    <section className="gallery section" id="gallery">
      <div className="section-heading">
        <p className="eyebrow">LITTLE MOMENTS. A LIFETIME OF LOVE.</p>
        <h2>Better, together.</h2>
        <p className="section-intro">A few of our favourite memories.</p>
      </div>
      <div className="gallery-track" id="galleryTrack">
        {gallery.map((p, i) =>
          p.src ? (
            <button key={i} type="button" className="photo" aria-label={`Enlarge photograph ${i + 1}: ${p.caption}`} onClick={() => setIndex(i)}>
              <img src={p.src} alt={p.description} loading="lazy" width={p.width} height={p.height} />
              <span>{p.caption}</span>
            </button>
          ) : (
            <div key={i} className="photo photo-blank">
              <div className="blank-frame" style={{ aspectRatio: `${p.width} / ${p.height}` }} />
              <span>{p.caption}</span>
            </div>
          )
        )}
      </div>
      {gallery.some((p) => p.src) && <div className="gallery-controls"><span>Tap a photograph to enlarge</span></div>}
      <Modal open={open} onClose={() => setIndex(null)} id="lightbox" label="Couple photograph" closeLabel="Close photograph">
        {photo && (
          <>
            <figure>
              <img id="lightboxImage" src={photo.src} alt={photo.description} />
              <figcaption id="lightboxCaption">{photo.caption}</figcaption>
            </figure>
            <div className="lightbox-controls">
              <button id="prevPhoto" className="round-button" aria-label="Previous photograph" onClick={() => setIndex((index + n - 1) % n)}>←</button>
              <span id="photoCount">{index + 1} / {n}</span>
              <button id="nextPhoto" className="round-button" aria-label="Next photograph" onClick={() => setIndex((index + 1) % n)}>→</button>
            </div>
          </>
        )}
      </Modal>
    </section>
  )
}
