import { describe, it, expect, beforeEach } from 'vitest'
import { db } from './db'

describe('db', () => {
  beforeEach(async () => {
    await db.profiles.clear()
    await db.progress.clear()
  })

  it('creates a profile', async () => {
    const id = await db.profiles.add({
      name: 'Aria',
      age: 3,
      mode: 'baby',
      avatar: 'fox',
      language: 'en',
      xp: 0,
      dailyLimitMinutes: 30,
      aiEnabled: false,
      createdAt: new Date(),
    })
    const profile = await db.profiles.get(id)
    expect(profile?.name).toBe('Aria')
  })

  it('creates a progress record', async () => {
    const id = await db.progress.add({
      profileId: 1,
      lessonId: 'colors-red-01',
      score: 100,
      xpEarned: 10,
      attempts: 1,
      completedAt: new Date(),
      aiGenerated: false,
    })
    const record = await db.progress.get(id)
    expect(record?.lessonId).toBe('colors-red-01')
  })
})
