import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Foxy } from '../mascot/Foxy'
import { QuizLesson } from './QuizLesson'
import { StoryLesson } from './StoryLesson'
import { TapLesson } from './TapLesson'
import type { Lesson } from '../../content/types'

interface LessonSequencerProps {
  lessons: Lesson[]
  language: 'en' | 'te' | 'es'
  onAllComplete: (totalXp: number) => void
}

export function LessonSequencer({ lessons, language, onAllComplete }: LessonSequencerProps) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalXp, setTotalXp] = useState(0)
  const [finished, setFinished] = useState(false)

  function handleLessonComplete(result: { score: number; xpEarned: number }) {
    setTotalXp(prev => prev + result.xpEarned)
  }

  function handleNext() {
    if (currentIndex >= lessons.length - 1) {
      setFinished(true)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  function handleStoryComplete(result: { score: number; xpEarned: number }) {
    setTotalXp(prev => prev + result.xpEarned)
    if (currentIndex >= lessons.length - 1) {
      setFinished(true)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 p-8 min-h-screen bg-amber-50 justify-center"
      >
        <Foxy mood="cheer" size={120} />
        <p className="text-3xl font-bold text-amber-900 text-center">{t('subject_complete')}</p>
        <p className="text-xl text-amber-700">{t('xp_earned', { xp: totalXp })}</p>
        <button
          onClick={() => onAllComplete(totalXp)}
          className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-10 rounded-2xl text-lg mt-4"
        >
          {t('back_home')}
        </button>
      </motion.div>
    )
  }

  const lesson = lessons[currentIndex]

  if (lesson.type === 'quiz') {
    return (
      <QuizLesson
        key={lesson.id}
        lesson={lesson}
        language={language}
        onComplete={handleLessonComplete}
        onNext={handleNext}
      />
    )
  }

  if (lesson.type === 'story') {
    return (
      <StoryLesson
        key={lesson.id}
        lesson={lesson}
        language={language}
        onComplete={handleStoryComplete}
      />
    )
  }

  if (lesson.type === 'tap') {
    return (
      <TapLesson
        key={lesson.id}
        lesson={lesson}
        language={language}
        onComplete={handleLessonComplete}
        onNext={handleNext}
      />
    )
  }

  // TypeScript: lesson is `never` here if all Lesson union branches are handled above
  void (lesson as never)
  return null
}
