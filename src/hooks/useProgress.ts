import { useCallback } from 'react'
import { db } from '../db/db'

interface SaveProgressInput {
  profileId: number
  lessonId: string
  score: number
  xpEarned: number
  aiGenerated: boolean
}

export function useProgress() {
  const saveProgress = useCallback(async (input: SaveProgressInput): Promise<number> => {
    await db.progress.add({
      ...input,
      attempts: 1,
      completedAt: new Date(),
    })
    return input.xpEarned
  }, [])

  const isLessonDone = useCallback(async (profileId: number, lessonId: string): Promise<boolean> => {
    const count = await db.progress
      .where({ profileId, lessonId })
      .count()
    return count > 0
  }, [])

  return { saveProgress, isLessonDone }
}
