import type { Language } from '../types'

export interface Proverb {
  id: string
  language: Language
  native: string
  english: string
  meaning: string
  region: string
}

export interface HeritageName {
  id: string
  language: Language
  name: string
  meaning: string
  context: string
  gender: 'male' | 'female' | 'neutral'
}

export interface WordQuiz {
  id: string
  language: Language
  word: string
  phonetic: string
  correct: string
  options: string[]
  culturalNote: string
  category: 'greeting' | 'nature' | 'family' | 'spirit' | 'food'
}

// ── Proverbs ──────────────────────────────────────────────────────────────────

export const proverbs: Proverb[] = [
  {
    id: 'sw-prov-1',
    language: 'swahili',
    native: 'Haraka haraka haina baraka.',
    english: 'Hurry hurry has no blessing.',
    meaning: 'Rushing through things yields no lasting reward. Patience is where blessings live.',
    region: 'East Africa',
  },
  {
    id: 'sw-prov-2',
    language: 'swahili',
    native: 'Umoja ni nguvu, utengano ni udhaifu.',
    english: 'Unity is strength, division is weakness.',
    meaning: 'One of East Africa\'s most repeated proverbs — still quoted in parliaments, school assemblies, and family disputes.',
    region: 'Kenya / Tanzania',
  },
  {
    id: 'sw-prov-3',
    language: 'swahili',
    native: 'Asiyejua hana hatia.',
    english: 'One who does not know has no guilt.',
    meaning: 'Ignorance is forgiven; it is the refusal to learn that is the failing.',
    region: 'Coastal Swahili',
  },
  {
    id: 'yo-prov-1',
    language: 'yoruba',
    native: 'Ọmọ tí a kò kọ ni yóò ta ilé wa jẹ.',
    english: 'A child we did not teach will sell our house.',
    meaning: 'The responsibility of raising children well falls on the whole community, not just parents.',
    region: 'Southwest Nigeria',
  },
  {
    id: 'yo-prov-2',
    language: 'yoruba',
    native: 'Ènìyàn ni ìṣúra.',
    english: 'People are wealth.',
    meaning: 'In Yoruba philosophy, your richest possession is your relationships. Status comes from community, not accumulation.',
    region: 'Yoruba Nation',
  },
  {
    id: 'yo-prov-3',
    language: 'yoruba',
    native: 'Igbá àádọ́ta kò jọ ara wọn.',
    english: 'Fifty calabashes do not look alike.',
    meaning: 'Every person is unique. Comparison is a fool\'s game.',
    region: 'Oyo / Ogun',
  },
  {
    id: 'es-prov-1',
    language: 'spanish',
    native: 'Camarón que se duerme, se lo lleva la corriente.',
    english: 'The shrimp that falls asleep is carried away by the current.',
    meaning: 'Stay alert. Opportunities and dangers move fast — the inattentive are swept along by forces they never chose.',
    region: 'Mexico / Caribbean',
  },
  {
    id: 'es-prov-2',
    language: 'spanish',
    native: 'A palabras necias, oídos sordos.',
    english: 'To foolish words, deaf ears.',
    meaning: 'Not every provocation deserves a response. Silence is sometimes the sharpest reply.',
    region: 'Latin America',
  },
  {
    id: 'es-prov-3',
    language: 'spanish',
    native: 'El que mucho abarca, poco aprieta.',
    english: 'He who grasps much, holds little tight.',
    meaning: 'Focus and depth beat breadth and distraction. The person who tries to do everything ends up mastering nothing.',
    region: 'Spain / Latin America',
  },
]

// ── Heritage Names ────────────────────────────────────────────────────────────

export const heritageNames: HeritageName[] = [
  {
    id: 'sw-name-amani',
    language: 'swahili',
    name: 'Amani',
    meaning: 'Peace',
    context: 'A name given in times of reconciliation or to children born after conflict. Carries a deep civic weight.',
    gender: 'neutral',
  },
  {
    id: 'sw-name-zawadi',
    language: 'swahili',
    name: 'Zawadi',
    meaning: 'Gift',
    context: 'Often given to a long-awaited child, or the last-born. Every Zawadi is someone\'s answered prayer.',
    gender: 'female',
  },
  {
    id: 'sw-name-jabari',
    language: 'swahili',
    name: 'Jabari',
    meaning: 'Brave one / The courageous',
    context: 'From the Arabic root meaning strength. Given to boys expected to protect their families or communities.',
    gender: 'male',
  },
  {
    id: 'yo-name-ade',
    language: 'yoruba',
    name: 'Adé',
    meaning: 'Crown',
    context: 'A name of royalty. In Yoruba naming culture, children are born with destiny — Adé says theirs is to lead.',
    gender: 'neutral',
  },
  {
    id: 'yo-name-taiwo',
    language: 'yoruba',
    name: 'Taiwo',
    meaning: 'First to taste the world',
    context: 'Given to the firstborn of twins. Taiwo comes first but is considered the junior twin — sent ahead to scout the world for Kehinde.',
    gender: 'neutral',
  },
  {
    id: 'yo-name-funke',
    language: 'yoruba',
    name: 'Funké',
    meaning: 'Pampered with wealth / given to care for',
    context: 'A name of tenderness — this child is to be cherished. Often the daughter of a father who wanted a girl.',
    gender: 'female',
  },
  {
    id: 'es-name-sol',
    language: 'spanish',
    name: 'Sol',
    meaning: 'Sun',
    context: 'A name of warmth and presence. In indigenous and mestizo communities, the sun is sacred — a Sol child carries light.',
    gender: 'female',
  },
  {
    id: 'es-name-cielo',
    language: 'spanish',
    name: 'Cielo',
    meaning: 'Sky / Heaven',
    context: 'A name of boundlessness. Latin American families often name children after natural forces — sky, river, earth — as a kind of blessing.',
    gender: 'neutral',
  },
  {
    id: 'es-name-refugio',
    language: 'spanish',
    name: 'Refugio',
    meaning: 'Refuge / Shelter',
    context: 'Often shortened to "Cuco" or "Cucha." A deeply Catholic name — Our Lady of Refuge — given to children born during hardship.',
    gender: 'neutral',
  },
]

// ── Word Quizzes ───────────────────────────────────────────────────────────────

export const wordQuizzes: WordQuiz[] = [
  {
    id: 'sw-quiz-pole',
    language: 'swahili',
    word: 'Pole pole',
    phonetic: 'POH-leh POH-leh',
    correct: 'Slowly / Take it easy',
    options: ['Slowly / Take it easy', 'Go away', 'Congratulations'],
    culturalNote: '"Pole pole" is both a pace and a philosophy — East Africa\'s answer to rushing. Climbers on Kilimanjaro are told: pole pole. It\'s why many make the summit.',
    category: 'greeting',
  },
  {
    id: 'sw-quiz-ujamaa',
    language: 'swahili',
    word: 'Ujamaa',
    phonetic: 'oo-jah-MAH',
    correct: 'Communal togetherness',
    options: ['War', 'Communal togetherness', 'Harvest'],
    culturalNote: 'Ujamaa was Julius Nyerere\'s philosophy for Tanzania — that African socialism is rooted not in ideology but in family. The word itself means "familyhood."',
    category: 'spirit',
  },
  {
    id: 'sw-quiz-safari',
    language: 'swahili',
    word: 'Safari',
    phonetic: 'sah-FAH-ree',
    correct: 'Journey',
    options: ['Animals', 'Journey', 'Wild land'],
    culturalNote: 'Safari simply means "journey" in Swahili — any journey. The word traveled into English through colonial tourism and lost its ordinary meaning along the way.',
    category: 'nature',
  },
  {
    id: 'yo-quiz-ase',
    language: 'yoruba',
    word: 'Àṣẹ',
    phonetic: 'ah-SHEH',
    correct: 'So be it / Divine power',
    options: ['So be it / Divine power', 'Goodbye', 'River spirit'],
    culturalNote: '"Àṣẹ" is said at the end of prayers, like "Amen." But it also means the creative power that flows through all living things — the universe\'s yes.',
    category: 'spirit',
  },
  {
    id: 'yo-quiz-ori',
    language: 'yoruba',
    word: 'Orí',
    phonetic: 'oh-REE',
    correct: 'Personal spirit / Destiny',
    options: ['Head', 'Personal spirit / Destiny', 'Ancestor'],
    culturalNote: 'Orí means both "head" and one\'s personal divinity. In Yoruba philosophy, you chose your Orí before birth — it is your deepest self and truest guide.',
    category: 'spirit',
  },
  {
    id: 'yo-quiz-eba',
    language: 'yoruba',
    word: 'Ẹbà',
    phonetic: 'EH-bah',
    correct: 'Cassava dough (staple food)',
    options: ['Celebration', 'Cassava dough (staple food)', 'Elder'],
    culturalNote: 'Ẹbà is made from garri (dried cassava) and boiling water — eaten with soup. It is the everyday meal of millions and the taste of home for the diaspora.',
    category: 'food',
  },
  {
    id: 'es-quiz-maiz',
    language: 'spanish',
    word: 'Maíz',
    phonetic: 'mah-EEZ',
    correct: 'Corn / Sacred grain',
    options: ['Sacred grain', 'Corn / Sacred grain', 'Mountain'],
    culturalNote: 'In the Maya Popol Vuh creation myth, humans were made from maíz. It\'s not just food — it\'s ancestry. Mexico alone has 64 native varieties.',
    category: 'food',
  },
  {
    id: 'es-quiz-querencia',
    language: 'spanish',
    word: 'Querencia',
    phonetic: 'keh-REN-see-ah',
    correct: 'A place where you feel most yourself',
    options: ['Nostalgia', 'A place where you feel most yourself', 'Love song'],
    culturalNote: '"Querencia" has no English equivalent. It\'s a place — physical or spiritual — where you draw strength. A grandmother\'s kitchen. A hill. A language. It\'s where you go to become real again.',
    category: 'spirit',
  },
  {
    id: 'es-quiz-sobremesa',
    language: 'spanish',
    word: 'Sobremesa',
    phonetic: 'so-breh-MEH-sah',
    correct: 'Time spent talking after a meal',
    options: ['Table cloth', 'Time spent talking after a meal', 'Family gathering'],
    culturalNote: '"Sobremesa" (literally "over the table") is the sacred post-meal conversation — no one rushes away. In Latin culture, the meal is the excuse; the sobremesa is the point.',
    category: 'family',
  },
]

export function getProverbsByLanguage(language: Language): Proverb[] {
  return proverbs.filter(p => p.language === language)
}

export function getNamesByLanguage(language: Language): HeritageName[] {
  return heritageNames.filter(n => n.language === language)
}

export function getWordQuizzesByLanguage(language: Language): WordQuiz[] {
  return wordQuizzes.filter(q => q.language === language)
}
