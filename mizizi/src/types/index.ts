export type Language = 'swahili' | 'yoruba' | 'spanish'

export type StudyTime = 'morning' | 'afternoon' | 'evening' | 'night'

export type DailyGoalMinutes = 5 | 10 | 15 | 20

export type ContentInterest = 'poetry' | 'stories' | 'music' | 'events'

export interface User {
  name: string
  language: Language
  studyTime: StudyTime
  dailyGoalMinutes: DailyGoalMinutes
  interests: ContentInterest[]
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

export interface Song {
  id: string
  language: Language
  title: string
  titleNative: string
  region: string
  linesNative: string[]
  linesEnglish: string[]
  culturalNote: string
}

export interface FolkStory {
  id: string
  language: Language
  title: string
  titleNative: string
  excerpt: string
  excerptEnglish: string
  moral: string
  culturalNote: string
}

export interface Poem {
  id: string
  language: Language
  title: string
  titleNative: string
  author: string
  linesNative: string[]
  linesEnglish: string[]
  culturalNote: string
}
