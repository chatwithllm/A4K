import Dexie, { type Table } from 'dexie'
import type { Profile, Progress, Settings } from './types'

class KidsSparkDB extends Dexie {
  profiles!: Table<Profile>
  progress!: Table<Progress>
  settings!: Table<Settings>

  constructor() {
    super('KidsSparkDB')
    this.version(1).stores({
      profiles: '++id, mode, language',
      progress: '++id, profileId, lessonId, completedAt',
      settings: '++id',
    })
  }
}

export const db = new KidsSparkDB()
