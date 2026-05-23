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
