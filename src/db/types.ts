export interface Profile {
  id?: number
  name: string
  age: number
  mode: 'baby' | 'explorer'
  avatar: string
  language: 'en' | 'te' | 'es'
  xp: number
  dailyLimitMinutes: number
  aiEnabled: boolean
  createdAt: Date
}

export interface Progress {
  id?: number
  profileId: number
  lessonId: string
  score: number
  xpEarned: number
  attempts: number
  completedAt: Date
  aiGenerated: boolean
}

export interface Settings {
  id: 1  // singleton row — always written/read with id=1
  adminPin: string
  aiApiKeyEncrypted: string
  appVersion: string
}
