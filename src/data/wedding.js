// Single source of truth for every piece of content on the invitation.
// To re-skin for another couple, edit this file and swap the files in /public/assets.

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export const couple = {
  groom: 'Rohit',
  bride: 'Tania',
  monogramAlt: 'Rohit and Tania monogram',
  groomParents: 'S/o Smt. Nirmal & Sh. Suresh Bareja',
  brideParents: 'D/o Smt. Makhna Devi & Sh. Jeet Sharma, Udhampur (J&K)',
}

export const wedding = {
  // Countdown target: reception, 7 Dec 2026, 8:00 PM IST (not displayed)
  target: '2026-12-07T20:00:00+05:30',
  weekday: 'MONDAY',
  dayMonth: '7th December',
  year: '2026',
  entranceDate: '7 DECEMBER 2026 · ROHTAK',
  countdownLabel: 'Countdown to 7 December 2026',
  countdownCaption: '7 December 2026',
  revealedLabel: 'Monday, 7th December 2026',
  revealedStatus: 'Reception: Monday, 7th December 2026.',
  footerDate: '7 DECEMBER 2026 · ROHTAK',
}

export const media = {
  music: 'assets/sunehra-background.mp3',
  transitionVideo: 'assets/palace-opening-transition.mp4',
  entranceVideo: 'assets/entrance-background.mp4',
  entrancePoster: 'assets/entrance-video-poster.jpg',
  transitionPoster: 'assets/transition-poster.jpg',
  formalVideo: 'assets/formal-garden-background.mp4',
  formalPoster: 'assets/formal-garden-poster.jpg',
  logo: 'assets/couple-logo-transparent.png',
  ganesh: 'assets/ganeshji.png',
}

export const invitation = {
  shloka: ['वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।', 'निर्विघ्नं कुरुमेदेव सर्वकार्येषु सर्वदा॥'],
  blessingsOf: ['With the heavenly blessings of Grand Parents', 'Late Smt. Sheela Wanti & Late Sh. Sahib Ram Bareja'],
  hosts: ['Smt. Nirmal & Sh. Suresh Bareja', 'solicit the honour of your gracious presence at the reception dinner in honour of the newly wedded couple, their loving son'],
  eyebrow: 'We are celebrating',
  blessing: 'Your gracious presence and blessings will make this joyous occasion even more special as we celebrate two hearts beginning a beautiful journey of togetherness.',
}

export const closing = {
  regards: 'With warm regards — Bareja Family',
  compliments: ['With best compliments from', 'All relatives & friends'],
}

// ---- Venues (index referenced by events) ----
export const venues = [
  {
    number: '01',
    date: '7 DECEMBER 2026',
    title: 'The Page',
    address: 'Opp. Tilyar Lake, Delhi Road, Rohtak',
    lines: ['Reception (Dinner) · 8:00 PM'],
    map: maps('The Page, Opp. Tilyar Lake, Delhi Road, Rohtak, Haryana'),
  },
]

export const venueAddress = [
  'The Page, Opp. Tilyar Lake, Delhi Road, Rohtak',
]

// ---- Events ----
export const events = [
  {
    id: 'reception', title: 'Reception (Dinner)', date: 'Monday, 7 December 2026', short: '7 DECEMBER 2026',
    time: '8:00 PM', color: '#a84a62', venue: 0,
    desc: 'Celebrate the newly married couple at the reception dinner in Rohtak. Your gracious presence and blessings will make the evening even more special.',
    image: 'assets/cocktail-dinner-illustrated.webp',
  },
]

// ---- Gallery ----
// Three couple photos. To change one, replace the file in /public/assets (or edit `src`) and update width/height.
export const gallery = [
  { caption: 'Better, together', src: 'assets/couple-01.webp', width: 960, height: 1280 },
  { caption: 'Moments to treasure', src: 'assets/couple-02.webp', width: 959, height: 1280 },
  { caption: 'My favourite person', src: 'assets/couple-03.webp', width: 719, height: 1280 },
].map((p, i) => ({ ...p, description: `Rohit and Tania together — photograph ${i + 1}` }))
