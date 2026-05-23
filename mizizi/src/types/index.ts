export type Language = 'swahili' | 'yoruba' | 'spanish'

export interface User {
  name: string
  language: Language
}

export interface Entry {
  id: string
  date: string
  promptId: string
  promptEnglish: string
  response: string
  language: Language
}

export interface StoryPrompt {
  id: string
  language: Language
  storyNative: string
  storyEnglish: string
  promptNative: string
  promptEnglish: string
  culturalNote: string
}
