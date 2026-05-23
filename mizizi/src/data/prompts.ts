import type { StoryPrompt, Language } from '../types'

export const storyPrompts: StoryPrompt[] = [
  {
    id: 'yoruba-tortoise',
    language: 'yoruba',
    storyNative:
      'Ìgbà kan, Àjàpá gbọ́ pé àwọn ẹyẹ ń ṣe àríyá ní ọ̀run. Ó bẹ̀ wọ́n láti jẹ kí ó lọ, wọ́n sì fún un ní iyẹ̀ kan kọ̀ọ̀kan. Àjàpá fò lọ sí ọ̀run, ṣùgbọ́n ìjẹ-jẹ rẹ̀ fà á sọ̀ padà wà.',
    storyEnglish:
      'Once, Tortoise heard the birds were feasting in the sky. He begged each bird for a feather so he could fly up too. Tortoise made it to the feast — but his greed brought him crashing back down.',
    promptNative: 'Àjàpá ń kọ wa nípa ohun tí ìjẹ-jẹ máa ń mú wá. Ìgbà wo ni fífẹ́ jù lọ ti jẹ kí ìkan nǹkan nù fún ọ?',
    promptEnglish: 'Tortoise teaches us about greed. When has wanting too much cost you something?',
    culturalNote: 'Àjàpá (Tortoise) is the great trickster of Yoruba folklore — clever but undone by his own appetite.',
  },
  {
    id: 'swahili-hare',
    language: 'swahili',
    storyNative:
      'Siku moja, Simba alitaka kula wanyama wote msituni. Sungura alimwambia: "Kuna simba mkubwa zaidi ndani ya kisima." Simba aliruka ndani — na kuona kivuli chake mwenyewe.',
    storyEnglish:
      'One day, Lion threatened to eat every animal in the forest. Hare told him: "There is a greater lion inside the well." Lion leapt in — and saw only his own shadow.',
    promptNative: 'Sungura alishinda nguvu kwa akili. Ulishinda tatizo gani kwa kutumia akili badala ya nguvu?',
    promptEnglish: 'Hare defeated power with wit. What problem have you solved with cleverness rather than force?',
    culturalNote: 'Sungura (Hare) appears across East African storytelling as the small one who always outsmarts the strong.',
  },
  {
    id: 'spanish-hummingbird',
    language: 'spanish',
    storyNative:
      'Cuando el bosque ardía, todos los animales huían. Solo el colibrí llevaba gotitas de agua en su pico, viaje tras viaje. Los demás animales se rieron. "Hago lo que puedo," dijo el colibrí.',
    storyEnglish:
      'When the forest burned, every animal fled. Only the hummingbird carried drops of water in its beak, trip after trip. The other animals laughed. "I do what I can," said the hummingbird.',
    promptNative: '¿Cuándo sentiste que tu pequeño esfuerzo importaba, aunque el problema fuera enorme?',
    promptEnglish: 'When did you feel your small effort mattered, even when the problem felt enormous?',
    culturalNote: 'This story is told across Latin America — a reminder that individual action is never too small.',
  },
]

export function getPromptByLanguage(language: Language): StoryPrompt {
  const prompt = storyPrompts.find((p) => p.language === language)
  if (!prompt) throw new Error(`No prompt found for language: ${language}`)
  return prompt
}
