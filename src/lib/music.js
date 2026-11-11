import { media } from '../data/reception.js'

// One shared audio element, started on load and retried on the first user gesture (browser autoplay rules).
class Music {
  audio = null
  volume = 0.5
  playing = false
  retryArmed = false

  emit(playing) {
    this.playing = playing
    window.dispatchEvent(new CustomEvent('music-state', { detail: { playing } }))
  }

  ensure() {
    if (this.audio) return
    this.audio = new Audio(media.music)
    this.audio.loop = true
    this.audio.preload = 'auto'
    this.audio.volume = this.volume
    this.audio.addEventListener('play', () => this.emit(true))
    this.audio.addEventListener('pause', () => this.emit(false))
    this.audio.addEventListener('ended', () => this.emit(false))
  }

  loadSavedVolume() {
    try {
      const v = window.localStorage.getItem('invite-volume')
      if (v !== null) {
        const n = Number(v)
        if (!Number.isNaN(n) && n > 0.05) this.volume = Math.min(1, n)
      }
    } catch { /* storage unavailable */ }
    if (this.audio) this.audio.volume = this.volume
    return this.volume
  }

  armRetry() {
    if (this.retryArmed) return
    this.retryArmed = true
    const events = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown']
    const handler = () => {
      const a = this.audio
      if (!a) return
      a.muted = false
      a.volume = this.volume
      a.play().then(() => {
        this.retryArmed = false
        events.forEach((e) => window.removeEventListener(e, handler, { capture: true }))
      }).catch(() => {})
    }
    events.forEach((e) => window.addEventListener(e, handler, { capture: true, passive: true }))
  }

  start() {
    this.ensure()
    const a = this.audio
    a.muted = false
    a.volume = this.volume
    if (!a.paused) return
    a.play().catch(() => {
      a.muted = true
      a.play().then(() => {
        let tries = 0
        const unmute = () => {
          tries += 1
          a.muted = false
          a.volume = this.volume
          a.play().catch(() => { a.muted = true; a.play().catch(() => {}) })
          if (!(!a.muted && !a.paused) && tries < 20) window.setTimeout(unmute, 500)
        }
        window.setTimeout(unmute, 200)
      }).catch(() => {})
      this.armRetry()
    })
  }

  pause() {
    if (this.audio) this.audio.pause()
  }
}

export const music = new Music()
