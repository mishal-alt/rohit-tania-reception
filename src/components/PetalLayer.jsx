import { useEffect, useMemo, useState } from 'react'
import { reduced } from '../lib/confetti.js'

export default function PetalLayer() {
  const [hidden, setHidden] = useState(false)
  const petals = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    i,
    fall: {
      left: Math.random() * 100 + '%',
      '--fall-time': 13 + Math.random() * 13 + 's',
      '--fall-delay': -Math.random() * 26 + 's',
      '--drift': -65 + Math.random() * 130 + 'px',
    },
    petal: {
      '--petal-size': 7 + Math.random() * 8 + 'px',
      '--petal-opacity': (0.28 + Math.random() * 0.26).toFixed(2),
      '--sway-time': 3 + Math.random() * 4 + 's',
      '--petal-turn': Math.random() * 240 + 'deg',
    },
  })), [])
  useEffect(() => {
    const f = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', f)
    return () => document.removeEventListener('visibilitychange', f)
  }, [])
  if (reduced()) return <div className="petal-layer" hidden aria-hidden="true" />
  return (
    <div className={'petal-layer' + (hidden ? ' page-hidden' : '')} aria-hidden="true">
      {petals.map((p) => (
        <span key={p.i} className="petal-fall" style={p.fall}>
          <i className="floating-petal" data-tone={String(p.i % 3)} style={p.petal} />
        </span>
      ))}
    </div>
  )
}
