import { useCallback, useEffect, useRef, useState } from 'react'

// Background music: starts on the first user interaction (browser autoplay rules), can be toggled off.
export default function useMusic(src) {
  const audio = useRef(null)
  const wanted = useRef(true)
  const [playing, setPlaying] = useState(false)

  const start = useCallback(async () => {
    const a = audio.current
    if (!a || !src || !wanted.current || !a.paused) return
    a.volume = 0.35
    try { await a.play() } catch { /* blocked until a gesture */ }
  }, [src])

  useEffect(() => {
    const a = audio.current
    if (!a) return
    a.src = src
    const sync = () => setPlaying(!a.paused)
    a.addEventListener('play', sync)
    a.addEventListener('pause', sync)
    const onPointer = (e) => { if (!e.target.closest('#music')) start() }
    const onKey = (e) => { if (e.target.id !== 'music') start() }
    document.addEventListener('pointerdown', onPointer, { passive: true })
    document.addEventListener('keydown', onKey)
    start()
    return () => {
      a.removeEventListener('play', sync)
      a.removeEventListener('pause', sync)
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [src, start])

  const toggle = useCallback(() => {
    const a = audio.current
    wanted.current = a.paused
    if (wanted.current) start()
    else a.pause()
  }, [start])

  return { audio, playing, start, toggle }
}
