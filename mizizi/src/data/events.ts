import type { Language } from '../types'

export type EventCategory = 'event' | 'study-group' | 'workshop' | 'performance' | 'food' | 'language-exchange'
export type CulturalTheme = 'african' | 'south-asian' | 'east-asian' | 'latino' | 'middle-eastern' | 'caribbean' | 'indigenous' | 'pan-cultural'

export interface CampusEvent {
  id: string
  title: string
  description: string
  location: string
  time: string
  day: string
  culturalTheme: CulturalTheme
  category: EventCategory
  spots?: number
  host?: string
  featured?: boolean
}

export interface CampusSpace {
  id: string
  name: string
  shortName: string
  description: string
  whatYouCanDo: string[]
  location: string
  hours: string
  culturalTheme: CulturalTheme
  emoji: string
  accentColor: string
}

// ── Campus Events ─────────────────────────────────────────────────────────────

export const campusEvents: CampusEvent[] = [
  // TONIGHT
  {
    id: 'afr-1',
    title: 'African Heritage Night',
    description: 'Drumming, storytelling, and traditional food from across the continent. Hosted by the African Students Association. First-timers always welcome.',
    location: 'Collis Common Ground',
    time: '7:00 PM',
    day: 'Tonight',
    culturalTheme: 'african',
    category: 'event',
    host: 'African Students Association',
    featured: true,
  },
  {
    id: 'lat-1',
    title: 'Latinx Collective — Open Night',
    description: 'Poetry, cumbia, and community. Bring a poem, a song, or just yourself. Open to all languages and backgrounds.',
    location: 'Thornton Hall · Room 105',
    time: '6:30 PM',
    day: 'Tonight',
    culturalTheme: 'latino',
    category: 'performance',
    host: 'Latinx Student Collective',
  },
  {
    id: 'sw-lang-1',
    title: 'Swahili Conversation Hour',
    description: 'Practice Swahili in a relaxed setting. All levels welcome — beginners encouraged. Native speakers lead small group sessions.',
    location: 'Baker-Berry Library · Room 101',
    time: '5:00 PM',
    day: 'Tonight',
    culturalTheme: 'african',
    category: 'language-exchange',
    spots: 12,
    host: 'East African Students Union',
  },
  // TOMORROW
  {
    id: 'yo-circle',
    title: 'Yoruba Language Circle',
    description: 'Weekly gathering for Yoruba learners and speakers. We do greetings, song, short proverbs, and cultural Q&A.',
    location: 'Dartmouth Hall · Room 204',
    time: '4:30 PM',
    day: 'Tomorrow',
    culturalTheme: 'african',
    category: 'language-exchange',
    spots: 10,
    host: 'West African Students Network',
  },
  {
    id: 'sa-1',
    title: 'Diwali Planning & Celebration',
    description: 'Help plan this year\'s Diwali while celebrating early with sweets, rangoli-making, and live music.',
    location: 'Baker-Berry Library · 1st Floor Lounge',
    time: '5:30 PM',
    day: 'Tomorrow',
    culturalTheme: 'south-asian',
    category: 'event',
    host: 'South Asian Students Association',
  },
  {
    id: 'ea-1',
    title: 'East Asian Film Night',
    description: 'EASA presents "In the Mood for Love" (Wong Kar-wai, 2000) followed by a community discussion on memory and longing.',
    location: 'Loew Auditorium · BVAC',
    time: '7:30 PM',
    day: 'Tomorrow',
    culturalTheme: 'east-asian',
    category: 'performance',
    host: 'East Asian Students Association',
  },
  {
    id: 'es-cooking',
    title: 'Latin American Cooking Workshop',
    description: 'Learn to make tamales from scratch. Regional techniques from Oaxaca and Guatemala. Ingredients provided — just bring hunger.',
    location: 'Collis Center Kitchen',
    time: '3:00 PM',
    day: 'Tomorrow',
    culturalTheme: 'latino',
    category: 'food',
    spots: 16,
    host: 'Latinx Student Collective',
  },
  // THIS WEEK
  {
    id: 'me-1',
    title: 'MENA Dialogue: Identity in Diaspora',
    description: '"Bridging Borders" — a panel with four Dartmouth alumni who grew up between cultures. Candid, unpredictable, essential.',
    location: 'Silsby Hall · Room 028',
    time: '6:00 PM',
    day: 'Friday',
    culturalTheme: 'middle-eastern',
    category: 'event',
    host: 'MENA Student Association',
  },
  {
    id: 'drum-workshop',
    title: 'West African Drumming Workshop',
    description: 'Hands-on djembe session with a visiting musician from Senegal. No experience needed — rhythm lives in everyone.',
    location: 'Hopkins Center · Studio B',
    time: '2:00 PM',
    day: 'Friday',
    culturalTheme: 'african',
    category: 'workshop',
    spots: 20,
    host: 'African Arts Collective',
    featured: true,
  },
  {
    id: 'es-lang-exchange',
    title: 'Spanish–English Language Exchange',
    description: 'Paired conversation practice. Native Spanish speakers meet native English speakers for mutual learning. Coffee provided.',
    location: 'Collis Café · Back Room',
    time: '11:00 AM',
    day: 'Friday',
    culturalTheme: 'latino',
    category: 'language-exchange',
    spots: 24,
    host: 'Romance Languages Dept.',
  },
  {
    id: 'indig-1',
    title: 'Native American Storytelling Circle',
    description: 'An evening of oral tradition with Native students sharing stories from their communities. Listening is the practice.',
    location: 'Native American House',
    time: '7:00 PM',
    day: 'Friday',
    culturalTheme: 'indigenous',
    category: 'performance',
    host: 'Native Americans at Dartmouth',
  },
  {
    id: 'car-1',
    title: 'Caribbean & Filipino Culture Night',
    description: 'An evening of soca, lechon, and island traditions. Everyone welcome — come hungry, leave connected.',
    location: 'Collis Center · Top Floor',
    time: '8:30 PM',
    day: 'Saturday',
    culturalTheme: 'caribbean',
    category: 'event',
    host: 'Caribbean Students Association',
  },
  {
    id: 'afro-dance',
    title: 'Afrobeats Dance Class',
    description: 'No partner, no experience needed. Just movement. Led by students from Nigeria and Ghana who\'ll teach you the basics and beyond.',
    location: 'Alumni Gym · Dance Studio',
    time: '4:00 PM',
    day: 'Saturday',
    culturalTheme: 'african',
    category: 'workshop',
    spots: 30,
    host: 'African Students Association',
  },
  {
    id: 'pan-study',
    title: 'Multicultural Study Group',
    description: 'Study together, connect across cultures. Weekly open session where students from any background work side by side.',
    location: 'Baker-Berry · Level 3',
    time: '2:00 PM',
    day: 'Sunday',
    culturalTheme: 'pan-cultural',
    category: 'study-group',
    host: 'Office of Pluralism & Leadership',
  },
]

// ── Campus Spaces ─────────────────────────────────────────────────────────────

export const campusSpaces: CampusSpace[] = [
  {
    id: 'aaas',
    name: 'African & African American Studies',
    shortName: 'AAAS Center',
    description: 'A home for Black intellectual life on campus — faculty office hours, reading groups, and community gatherings.',
    whatYouCanDo: ['Attend weekly talks', 'Access the resource library', 'Meet faculty mentors', 'Join reading circles'],
    location: 'Silsby Hall · 2nd Floor',
    hours: 'Mon–Fri, 9 AM–5 PM',
    culturalTheme: 'african',
    emoji: '✊',
    accentColor: '#8B3A1A',
  },
  {
    id: 'lacs',
    name: 'Latin American & Caribbean Studies',
    shortName: 'LACS House',
    description: 'Research, culture, and community. Home to visiting scholars, film screenings, and one of the best Spanish-language libraries on campus.',
    whatYouCanDo: ['Spanish film library', 'Language tutoring', 'Cultural events', 'Research support'],
    location: 'Bartlett Hall · Room 110',
    hours: 'Mon–Fri, 10 AM–4 PM',
    culturalTheme: 'latino',
    emoji: '🌺',
    accentColor: '#2E6B3A',
  },
  {
    id: 'nah',
    name: 'Native American House',
    shortName: 'NA House',
    description: 'A place of belonging for Native students and allies. Community kitchen, cultural items, and programming rooted in Indigenous tradition.',
    whatYouCanDo: ['Community meals', 'Beading & craft workshops', 'Storytelling circles', 'Advising & support'],
    location: 'North Park Street',
    hours: 'Open daily · Programming varies',
    culturalTheme: 'indigenous',
    emoji: '🦅',
    accentColor: '#4A3728',
  },
  {
    id: 'isc',
    name: 'International Student Center',
    shortName: 'Int\'l Center',
    description: 'Programming, support, and connection for students from outside the US — and Americans curious about the world.',
    whatYouCanDo: ['Visa & immigration help', 'Cultural exchange events', 'Peer connections', 'Global study groups'],
    location: 'Collis Center · Suite 301',
    hours: 'Mon–Fri, 8:30 AM–5 PM',
    culturalTheme: 'pan-cultural',
    emoji: '🌍',
    accentColor: '#1B3A5C',
  },
  {
    id: 'asian-center',
    name: 'Asian Cultures Center',
    shortName: 'Asian Center',
    description: 'Supporting East, South, and Southeast Asian students through community, programming, and cultural resources.',
    whatYouCanDo: ['Cultural celebrations', 'Language tables', 'Community dinners', 'Heritage month events'],
    location: 'Robinson Hall · Room 205',
    hours: 'Mon–Fri, 9 AM–6 PM',
    culturalTheme: 'east-asian',
    emoji: '🏮',
    accentColor: '#8B1A2E',
  },
  {
    id: 'opal',
    name: 'Office of Pluralism & Leadership',
    shortName: 'OPAL',
    description: 'The hub for diversity, equity, and cultural life on campus. Where students organize, advocate, and celebrate.',
    whatYouCanDo: ['Student org support', 'Multicultural events', 'Identity workshops', 'Leadership programs'],
    location: 'Collis Center · Ground Floor',
    hours: 'Mon–Fri, 9 AM–5 PM',
    culturalTheme: 'pan-cultural',
    emoji: '🤝',
    accentColor: '#5B3A8B',
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const languageThemeMap: Partial<Record<Language, CulturalTheme>> = {
  yoruba: 'african',
  swahili: 'african',
  spanish: 'latino',
}

export function getEventForLanguage(language: Language): CampusEvent {
  const theme = languageThemeMap[language] ?? 'african'
  return campusEvents.find(e => e.culturalTheme === theme) ?? campusEvents[0]
}

export function getFeaturedEvents(): CampusEvent[] {
  return campusEvents.filter(e => e.featured)
}

export function getUpcomingEvents(count = 6): CampusEvent[] {
  return campusEvents.slice(0, count)
}

export function getEventsByTheme(theme: CulturalTheme): CampusEvent[] {
  return campusEvents.filter(e => e.culturalTheme === theme)
}
