import { useState } from 'react'
import Modal from './Modal.jsx'
import { events, venues, venueAddress } from '../data/wedding.js'

export default function Events() {
  const [sel, setSel] = useState(null)
  const e = sel !== null ? events[sel] : null
  return (
    <section className="events section" id="events">
      <p className="hindi" lang="hi">उत्सव</p>
      <p className="eyebrow">COME, CELEBRATE WITH US</p>
      <h2>The reception</h2>
      <p className="section-intro">Join us for an evening of dinner and celebration.</p>
      <div className="event-grid" id="eventGrid">
        {events.map((ev, i) => (
          <article key={ev.id} className="event-card" style={{ '--event-color': ev.color }}>
            <div className="event-art">
              <img src={ev.image} alt={`Illustrated couple celebrating ${ev.title.toLowerCase()}`} loading="lazy" width="1024" height="1280" />
            </div>
            <div className="event-details">
              <p className="eyebrow">{ev.short}</p>
              <h3>{ev.title}</h3>
              <time>{ev.time}</time>
              <p className="event-venue">{venueAddress[ev.venue]}</p>
              <button className="text-link" type="button" aria-label={`View ${ev.title} details`} onClick={() => setSel(i)}>View celebration details ↗</button>
            </div>
          </article>
        ))}
      </div>
      <p className="tiny">All timings are in Indian Standard Time (IST).</p>
      <Modal open={sel !== null} onClose={() => setSel(null)} id="eventModal" labelledBy="modalTitle" closeLabel="Close event details">
        {e && (
          <>
            <img id="modalImage" src={e.image} alt={`Illustrated couple at ${e.title}`} />
            <div className="modal-copy">
              <p id="modalDate" className="eyebrow">{e.date}</p>
              <h2 id="modalTitle">{e.title}</h2>
              <p id="modalTime">{e.time} · IST</p>
              <p id="modalText">{e.desc}</p>
              <strong id="modalVenue">{venueAddress[e.venue]}</strong>
              <a id="modalMap" className="primary" href={venues[e.venue].map} target="_blank" rel="noopener noreferrer">View on Google Maps ↗</a>
            </div>
          </>
        )}
      </Modal>
    </section>
  )
}
