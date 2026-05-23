import type { Song, Language } from '../types'

export const songs: Song[] = [
  {
    id: 'sw-malaika',
    language: 'swahili',
    title: 'Malaika',
    titleNative: 'Malaika',
    region: 'East Africa',
    linesNative: [
      'Malaika, nakupenda Malaika',
      'Malaika, nakupenda Malaika',
      'Nami nifanyeje, kijana mwenzio',
      'Nashindwa na mali sina, we',
      'Ningekuoa, Malaika',
    ],
    linesEnglish: [
      'Angel, I love you, Angel',
      'Angel, I love you, Angel',
      'What shall I do, my fellow youth',
      'I am defeated — I have no riches',
      'I would marry you, Angel',
    ],
    culturalNote: 'One of East Africa\'s most beloved folk songs, sung across Kenya and Tanzania. "Malaika" (Angel) speaks of a man who loves a woman he cannot afford to marry — a tender, universal ache.',
  },
  {
    id: 'sw-jambo',
    language: 'swahili',
    title: 'Jambo Bwana',
    titleNative: 'Jambo Bwana',
    region: 'Kenya',
    linesNative: [
      'Jambo, jambo bwana',
      'Habari gani? Mzuri sana!',
      'Wageni, wakaribishwa',
      'Kenya yetu, hakuna matata',
    ],
    linesEnglish: [
      'Hello, hello sir',
      'How are you? Very well!',
      'Guests, you are welcome',
      'Our Kenya, no worries',
    ],
    culturalNote: 'A classic Kenyan welcome song sung to visitors. "Hakuna matata" — no worries — is a phrase of genuine Swahili warmth, long before it became famous in animation.',
  },
  {
    id: 'yo-iya',
    language: 'yoruba',
    title: 'Song to Mother',
    titleNative: 'Orin Ìyá',
    region: 'Southwest Nigeria',
    linesNative: [
      'Ìyá mi o, ìyá mi o',
      'Tó bí mi sínú àṣà wa',
      'Tó kọ́ mi ní orin àti ijó',
      'Ìfẹ́ rẹ kò ní parẹ́ rí',
    ],
    linesEnglish: [
      'My mother, oh my mother',
      'Who bore me into our tradition',
      'Who taught me song and dance',
      'Your love will never fade',
    ],
    culturalNote: 'In Yoruba tradition, songs to mothers are among the most sacred. A mother is seen as the first griot — the one who sings culture into a child before they can speak.',
  },
  {
    id: 'yo-asa',
    language: 'yoruba',
    title: 'Song of Tradition',
    titleNative: 'Orín Àṣà',
    region: 'Yoruba Nation',
    linesNative: [
      'Ẹ jọ ẹ wáa gbọ́',
      'Ẹ jọ ẹ wáa rí',
      'Àṣà wa tó dára',
      'Ẹ wáa kọ orin wa',
    ],
    linesEnglish: [
      'Please come and listen',
      'Please come and see',
      'Our tradition is beautiful',
      'Come and sing our song',
    ],
    culturalNote: 'Àṣà means both "culture" and "hawk" in Yoruba. This communal call-and-response song is sung at festivals, reminding everyone that tradition must be witnessed together to survive.',
  },
  {
    id: 'es-de-colores',
    language: 'spanish',
    title: 'De Colores',
    titleNative: 'De Colores',
    region: 'Mexico / Latin America',
    linesNative: [
      'De colores, de colores',
      'Se visten los campos en la primavera',
      'De colores, de colores',
      'Son los pajaritos que vienen de afuera',
      'Y por eso los grandes amores',
      'De muchos colores me gustan a mí',
    ],
    linesEnglish: [
      'In colors, in colors',
      'The fields dress themselves in spring',
      'In colors, in colors',
      'Are the little birds that come from outside',
      'And that is why great loves',
      'Of many colors please me',
    ],
    culturalNote: 'A traditional Mexican folk song celebrating life\'s diversity through color. Sung at harvests, school mornings, and protests alike — its simplicity is its power.',
  },
  {
    id: 'es-llorona',
    language: 'spanish',
    title: 'La Llorona',
    titleNative: 'La Llorona',
    region: 'Oaxaca, Mexico',
    linesNative: [
      'Todos me dicen el negro, Llorona',
      'Negro pero cariñoso',
      'Salías del templo un día, Llorona',
      'Cuando al pasar yo te vi',
    ],
    linesEnglish: [
      'Everyone calls me the dark one, Llorona',
      'Dark but full of love',
      'You were leaving the temple one day, Llorona',
      'When passing by, I saw you',
    ],
    culturalNote: '"La Llorona" (The Weeping Woman) is one of Mexico\'s oldest folk songs, layered over a legend of a mother\'s grief. Oaxacan versions are especially haunting, sung in minor keys.',
  },
]

export function getSongsByLanguage(language: Language): Song[] {
  return songs.filter(s => s.language === language)
}
