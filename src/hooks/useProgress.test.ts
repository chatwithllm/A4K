import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { db } from '../db/db'
import { useProgress } from './useProgress'

describe('useProgress', () => {
  beforeEach(async () => {
    await db.progress.clear()
  })

  it('saves progress and returns xp earned', async () => {
    const { result } = renderHook(() => useProgress())

    let xpEarned = 0
    await act(async () => {
      xpEarned = await result.current.saveProgress({
        profileId: 1,
        lessonId: 'colors-red-01',
        score: 100,
        xpEarned: 10,
        aiGenerated: false,
      })
    })

    expect(xpEarned).toBe(10)
    const records = await db.progress.where({ profileId: 1 }).toArray()
    expect(records).toHaveLength(1)
    expect(records[0].lessonId).toBe('colors-red-01')
  })

  it('returns lesson completion status', async () => {
    const { result } = renderHook(() => useProgress())

    const doneBefore = await result.current.isLessonDone(1, 'colors-red-01')
    expect(doneBefore).toBe(false)

    await act(async () => {
      await result.current.saveProgress({
        profileId: 1,
        lessonId: 'colors-red-01',
        score: 100,
        xpEarned: 10,
        aiGenerated: false,
      })
    })

    const doneAfter = await result.current.isLessonDone(1, 'colors-red-01')
    expect(doneAfter).toBe(true)
  })
})
