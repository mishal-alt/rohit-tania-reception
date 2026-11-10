import { couple, closing, wedding } from '../data/wedding.js'
import Credit from './Credit.jsx'

export default function Closing() {
  return (
    <footer className="closing">
      <p className="hindi" lang="hi">सप्रेम आमंत्रण</p>
      <h2>With love &amp; gratitude</h2>
      <p>We can’t wait to celebrate with you.</p>
      <p>{closing.regards}</p>
      <p>{closing.compliments[0]}<br />{closing.compliments[1]}</p>
      <strong>{couple.groom} <i>&amp;</i> {couple.bride}</strong>
      <div className="rule">✦</div>
      <p className="tiny">{wedding.footerDate}</p>
      <Credit />
    </footer>
  )
}
