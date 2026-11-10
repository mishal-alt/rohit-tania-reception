import { useEffect, useState } from 'react'
import { wedding } from '../data/wedding.js'

const target = new Date(wedding.target).getTime()
const left = () => Math.max(0, target - Date.now())
const pad = (v) => String(v).padStart(2, '0')

export default function Countdown() {
  const [ms, setMs] = useState(left)
  useEffect(() => {
    const t = setInterval(() => setMs(left()), 1000)
    return () => clearInterval(t)
  }, [])
  const parts = [
    ['Days', Math.floor(ms / 864e5)],
    ['Hours', Math.floor((ms % 864e5) / 36e5)],
    ['Minutes', Math.floor((ms % 36e5) / 6e4)],
    ['Seconds', Math.floor((ms % 6e4) / 1e3)],
  ]
  return (
    <div className="countdown-wrap">
      <p className="eyebrow">COUNTING DOWN TO OUR FOREVER</p>
      <div className="countdown" aria-label={wedding.countdownLabel}>
        {parts.map(([label, v], i) => (
          <div key={label}>
            <b id={label.toLowerCase()}>{pad(v)}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p id="countdownStatus" className="tiny">{ms ? wedding.countdownCaption : 'Our reception has arrived!'}</p>
    </div>
  )
}
