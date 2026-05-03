import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Foxy } from '../mascot/Foxy'
import { LessonResult } from './LessonResult'
import type { TapLesson as TapLessonType } from '../../content/types'

interface TapLessonProps {
  lesson: TapLessonType
  language: 'en' | 'te' | 'es'
  onComplete: (result: { score: number; xpEarned: number }) => void
  onNext: () => void
}

export function TapLesson({ lesson, language, onComplete, onNext }: TapLessonProps) {
  const { t } = useTranslation()
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)

  function handleTap(itemId: string) {
    if (answered) return
    const isCorrect = itemId === lesson.answer
    setCorrect(isCorrect)
    setAnswered(true)
    onComplete({ score: isCorrect ? 100 : 0, xpEarned: isCorrect ? lesson.xp : 0 })
  }

  if (answered) {
    const correctItem = lesson.items.find(item => item.id === lesson.answer)!
    const correctLabel = correctItem.label[language]
    return (
      <LessonResult
        correct={correct}
        foxyMood={correct ? lesson.character_reaction.correct : lesson.character_reaction.wrong}
        correctLabel={correctLabel}
        onNext={onNext}
        nextLabel={t('lesson_next')}
        resultLabel={correct ? t('lesson_correct') : t('lesson_wrong')}
      />
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen bg-amber-50 justify-center">
      <Foxy mood="talk" size={100} />
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-center text-amber-900"
      >
        {lesson.content[language]}
      </motion.p>
      <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
        {lesson.items.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleTap(item.id)}
            aria-label={item.label[language]}
            className="bg-white rounded-2xl shadow-md py-5 flex flex-col items-center gap-2 text-amber-900 font-bold text-sm"
          >
            <span className="text-5xl">{item.emoji}</span>
            <span className="text-xs">{item.label[language]}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
