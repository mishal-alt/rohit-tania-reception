// Single source of truth for every piece of content on the reception invitation.
// To change a name, time or venue, edit this file only.

const q = (s) => encodeURIComponent(s)

export const couple = {
  groom: 'Rohit',
  bride: 'Tania',
  hero: {
    src: 'assets/hero-couple.webp',
    alt: 'Rohit and Tania looking out over a lake at their wedding reception',
  },
}

export const event = {
  // Countdown target: reception, 7 Dec 2026, 8:00 PM IST
  target: '2026-12-07T20:00:00+05:30',
  title: 'Reception Dinner',
  date: 'Monday, 7 December 2026',
  time: '8:00 PM Onwards',
  footerDate: '07 · 12 · 2026 — Rohtak',
}

export const text = {
  openingEyebrow: 'You are cordially invited to the wedding reception of',
  openLabel: 'Open Me',
  openHint: 'Tap to open your invitation',
  heroEyebrow: 'Wedding Reception',
  heroLine1: 'Together with their families',
  heroLine2: 'Request the pleasure of your presence as they celebrate their Wedding Reception.',
  groomParents: 'S/o Smt. Nirmal & Sh. Suresh Bareja',
  brideParents: 'D/o Smt. Makhna Devi & Sh. Jeet Sharma, Udhampur (J&K)',
  heroScratch: 'Scratch below to reveal the day',
  scratchEyebrow: 'A little surprise',
  scratchTitle: 'Scratch to Reveal Our Special Day',
  scratchDone: "We Can't Wait To Celebrate With You!",
  countdownEyebrow: 'Counting the moments',
  countdownTitle: 'Until We Celebrate',
  venueEyebrow: 'Where we celebrate',
  venueTitle: 'The Venue',
  footerLine: 'With love, Rohit & Tania',
}

export const venue = {
  name: 'The Page',
  address: 'Opp. Tilyar Lake, Delhi Road, Rohtak',
  blurb:
    'An elegant evening awaits — join us for the reception dinner as we celebrate the newly married couple with family and friends.',
  photo: 'assets/venue-real.jpg',
  photoAlt: 'The grand banquet hall at The Page, Rohtak, with a crystal chandelier and a ceiling of fairy lights',
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q('The Page, Opp. Tilyar Lake, Delhi Road, Rohtak, Haryana')}`,
  mapEmbed: `https://www.google.com/maps?q=${q('The Page, Opp. Tilyar Lake, Delhi Road, Rohtak, Haryana')}&output=embed`,
  mapTitle: 'Map to The Page, Rohtak',
}

export const media = {
  music: 'assets/ishq-sufiyana-piano-cover.mp3',
  openingVideo: 'assets/floral-butterflies.mp4',
  gateVideo: 'assets/wedding-gate-opening.mp4',
  terrace: 'assets/terrace-bg.webp',
  corner: 'assets/floral-corner.webp',
  divider: 'assets/floral-divider.webp',
}
