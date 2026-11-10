import { useEffect, useState } from 'react'
import useMusic from './hooks/useMusic.js'
import { media, couple } from './data/wedding.js'
import Opening from './components/Opening.jsx'
import Header from './components/Header.jsx'
import MobileMenu from './components/MobileMenu.jsx'
import PetalLayer from './components/PetalLayer.jsx'
import Invitation from './components/Invitation.jsx'
import ScratchReveal from './components/ScratchReveal.jsx'
import Gallery from './components/Gallery.jsx'
import Events from './components/Events.jsx'
import Venues from './components/Venues.jsx'
import Closing from './components/Closing.jsx'

export default function App() {
  const music = useMusic(media.music)
  const [opened, setOpened] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => { document.body.classList.toggle('locked', !opened) }, [opened])
  useEffect(() => {
    if (opened) document.getElementById('home')?.focus({ preventScroll: true })
  }, [opened])

  return (
    <>
      <PetalLayer />
      <a className="skip-link" href="#home" onClick={() => setOpened(true)}>Skip to invitation</a>
      <audio ref={music.audio} loop preload="auto" />
      {!opened && <Opening onStart={music.start} onFinish={() => setOpened(true)} />}
      <div id="site" inert={opened ? undefined : ''}>
        <Header music={music} menuOpen={menu} onMenu={() => setMenu(true)} />
        <main>
          <Invitation opened={opened} />
          <ScratchReveal />
          <Gallery />
          <Events />
          <Venues />
          <Closing />
        </main>
      </div>
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
    </>
  )
}
