import { venues } from '../data/wedding.js'

export default function Venues() {
  return (
    <section className="venues section" id="venue">
      <p className="eyebrow">WE LOOK FORWARD TO WELCOMING YOU</p>
      <h2>Where we’ll celebrate</h2>
      <div className="venue-grid">
        {venues.map((v) => (
          <article key={v.number} className="venue-card">
            <span className="venue-number">{v.number}</span>
            <p className="eyebrow">{v.date}</p>
            <h3>{v.title}</h3>
            <p>{v.address}</p>
            <p className="venue-events">{v.lines.map((l, i) => <span key={l}>{i > 0 && <br />}{l}</span>)}</p>
            <a className="primary" href={v.map} target="_blank" rel="noopener noreferrer">View on Google Maps ↗</a>
          </article>
        ))}
      </div>
    </section>
  )
}
