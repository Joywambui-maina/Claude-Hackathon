import type { FolkStory, Language } from '../types'

export const folkStories: FolkStory[] = [
  {
    id: 'sw-elephant-rain',
    language: 'swahili',
    title: 'Why the Elephant Fears Thunder',
    titleNative: 'Kwa Nini Tembo Anaogopa Radi',
    excerpt: 'Hapo zamani za kale, Tembo alikuwa akijivunia nguvu zake zaidi ya viumbe vyote. Siku moja, Radi iliposikia kiburi chake, ilimpigia kelele...',
    excerptEnglish: 'Long ago, the Elephant boasted of his strength above all creatures. One day, when Thunder heard his pride, it called out to him...',
    moral: 'Even the mightiest must bow to what they cannot hold.',
    culturalNote: 'Swahili folk tales often use animals as mirrors of human pride. The elephant\'s rumbling fear of storms is explained as ancestral humility — a reminder written into nature.',
  },
  {
    id: 'sw-sky-away',
    language: 'swahili',
    title: 'Why the Sky Moved Far Away',
    titleNative: 'Kwa Nini Mbingu Ziko Mbali',
    excerpt: 'Mbingu zilikuwa karibu sana na ardhi kiasi kwamba watu wangeweza kuzigusa. Lakini kila mtu alipochukua zaidi ya waliyohitaji, mbingu zilianza kupanda juu...',
    excerptEnglish: 'The sky used to sit so close to the earth that people could touch it. But every time someone took more than they needed, the sky climbed a little higher...',
    moral: 'Greed distances us from what once was freely given.',
    culturalNote: 'This story is told across many East African communities. It carries a deep ecological message — the sky represents abundance that retreats from those who do not respect it.',
  },
  {
    id: 'yo-oshun',
    language: 'yoruba',
    title: 'Oshun and the River\'s Gift',
    titleNative: 'Ọṣun àti Ẹbun Odò',
    excerpt: 'Nígbà tí àwọn òrìṣà tọ̀ Ọṣun sílẹ̀ nínú ìpàdé wọn, ó fẹ̀yìntì. Ṣùgbọ́n àgbáyé bẹ̀rẹ̀ sí kú, tí odò sì gbẹ, tí àwọn obìnrin sì kò lè bí ọmọ...',
    excerptEnglish: 'When the other orishas left Oshun out of their council, she withdrew. But the world began to die — rivers dried, women could not conceive...',
    moral: 'When the feminine is excluded, everything withers.',
    culturalNote: 'Oshun is the Yoruba orisha of rivers, fertility, and love. This story is still recited at her festivals along the Oshun River in Osogbo, Nigeria, a UNESCO World Heritage site.',
  },
  {
    id: 'yo-spider',
    language: 'yoruba',
    title: 'Anansi Steals Fire',
    titleNative: 'Anansi Jí Iná',
    excerpt: 'Iná wà ní ọwọ́ Ọba nìkan. Anansi, akọ̀rọ̀ olóye, rò pé gbogbo ènìyàn yẹ kí ó ní iná. Ó ṣe ìdìpọ̀ kan tí ó yọni ẹ̀gàn jade lọ́wọ́ Ọba...',
    excerptEnglish: 'Fire belonged to the King alone. Anansi the clever spider decided everyone deserved fire. He wove a plan so clever it drew laughter from the King himself...',
    moral: 'The trickster\'s gift is what makes civilization possible.',
    culturalNote: 'Anansi originates in Ghana\'s Akan tradition but spread through Yoruba communities and across the diaspora to the Caribbean and Americas — one of storytelling\'s great travelers.',
  },
  {
    id: 'es-sombreron',
    language: 'spanish',
    title: 'El Sombrerón',
    titleNative: 'El Sombrerón',
    excerpt: 'En los pueblos de Guatemala, dicen que si una mujer de ojos grandes se peina frente al espejo de noche, El Sombrerón la encontrará. Viene con su guitarra y sus mulas...',
    excerptEnglish: 'In the towns of Guatemala, they say that if a large-eyed woman combs her hair before the mirror at night, El Sombrerón will find her. He comes with his guitar and his mules...',
    moral: 'Beauty draws spirits — and not all spirits mean well.',
    culturalNote: 'El Sombrerón is one of Guatemala\'s most beloved legends — a tiny man in a big hat who braids horses\' manes and makes women sleepless with his songs. Every abuela knows him.',
  },
  {
    id: 'es-deer-dance',
    language: 'spanish',
    title: 'The Deer and the Shaman',
    titleNative: 'El Venado y el Chamán',
    excerpt: 'El venado era el hermano sagrado de los Yaqui. Cuando llegaron los hombres con hachas, el venado bailó por última vez alrededor del fuego, sus pies marcando la historia en la tierra...',
    excerptEnglish: 'The deer was the sacred brother of the Yaqui people. When the men came with axes, the deer danced one last time around the fire, its feet marking history into the earth...',
    moral: 'What is destroyed in the world is preserved in the dance.',
    culturalNote: 'The Danza del Venado (Deer Dance) is a sacred Yaqui and Mayo ceremony from Sonora, Mexico. The dancer wears a real deer head and embodies the deer\'s spirit — a living folk story.',
  },
]

export function getFolkStoriesByLanguage(language: Language): FolkStory[] {
  return folkStories.filter(s => s.language === language)
}
