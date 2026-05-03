import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Foxy } from '../mascot/Foxy'
import { LessonResult } from './LessonResult'
import type { QuizLesson as QuizLessonType } from '../../content/types'

const COLOR_MAP: Record<string, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-400',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
}

interface QuizLessonProps {
  lesson: QuizLessonType
  language: 'en' | 'te' | 'es'
  onComplete: (result: { score: number; xpEarned: number }) => void
}

export function QuizLesson({ lesson, language, onComplete }: QuizLessonProps) {
  const { t } = useTranslation()
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)

  function handleChoice(choice: string) {
    if (answered) return
    const isCorrect = choice === lesson.answer
    setCorrect(isCorrect)
    setAnswered(true)
    onComplete({ score: isCorrect ? 100 : 0, xpEarned: isCorrect ? lesson.xp : 0 })
  }

  const question = lesson.content[language]

  if (answered) {
    const correctIdx = lesson.choices.indexOf(lesson.answer)
    const correctLabel = lesson.choiceLabels?.[correctIdx]?.[language] ?? lesson.answer
    return (
      <LessonResult
        correct={correct}
        foxyMood={correct ? lesson.character_reaction.correct : lesson.character_reaction.wrong}
        correctLabel={correctLabel}
        onNext={() => {}}
        nextLabel={t('lesson_next')}
        resultLabel={correct ? t('lesson_correct') : t('lesson_wrong')}
      />
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <Foxy mood="talk" size={100} />
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-center text-amber-900"
      >
        {question}
      </motion.p>
      <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
        {lesson.choices.map((choice, idx) => {
          const label = lesson.choiceLabels?.[idx]?.[language] ?? choice
          const colorClass = COLOR_MAP[choice] ?? 'bg-gray-400'
          return (
            <motion.button
              key={choice}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleChoice(choice)}
              className={`${colorClass} text-white font-bold py-4 rounded-2xl text-base shadow-md`}
            >
              {label}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
