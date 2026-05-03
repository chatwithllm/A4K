import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Foxy } from '../mascot/Foxy'
import type { StoryLesson as StoryLessonType } from '../../content/types'

interface StoryLessonProps {
  lesson: StoryLessonType
  language: 'en' | 'te' | 'es'
  onComplete: (result: { score: number; xpEarned: number }) => void
}

export function StoryLesson({ lesson, language, onComplete }: StoryLessonProps) {
  const { t } = useTranslation()
  const [frameIndex, setFrameIndex] = useState(0)

  const frame = lesson.frames[frameIndex]

  function handleNext() {
    if (frameIndex < lesson.frames.length - 1) {
      setFrameIndex(frameIndex + 1)
    } else {
      onComplete({ score: 100, xpEarned: lesson.xp })
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 p-6 min-h-screen bg-amber-50 justify-center">
      <Foxy mood="talk" size={100} />
      <motion.div
        key={frameIndex}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-center gap-4"
      >
        <span className="text-8xl">{frame.emoji}</span>
        <p className="text-2xl font-bold text-center text-amber-900 max-w-xs">
          {frame.text[language]}
        </p>
      </motion.div>
      <p className="text-sm text-gray-400">
        {frameIndex + 1} / {lesson.frames.length}
      </p>
      <button
        onClick={handleNext}
        className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-10 rounded-2xl text-lg"
      >
        {t('lesson_next')}
      </button>
    </div>
  )
}
