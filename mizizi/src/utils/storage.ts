import type { User, Entry } from '../types'

const KEYS = {
  user: 'mizizi_user',
  entries: 'mizizi_entries',
} as const

export const storage = {
  getUser(): User | null {
    const raw = localStorage.getItem(KEYS.user)
    return raw ? (JSON.parse(raw) as User) : null
  },

  saveUser(user: User): void {
    localStorage.setItem(KEYS.user, JSON.stringify(user))
  },

  getEntries(): Entry[] {
    const raw = localStorage.getItem(KEYS.entries)
    return raw ? (JSON.parse(raw) as Entry[]) : []
  },

  addEntry(entry: Omit<Entry, 'id' | 'date'>): Entry {
    const newEntry: Entry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    }
    const entries = storage.getEntries()
    localStorage.setItem(KEYS.entries, JSON.stringify([newEntry, ...entries]))
    return newEntry
  },

  clearAll(): void {
    localStorage.removeItem(KEYS.user)
    localStorage.removeItem(KEYS.entries)
  },
}
