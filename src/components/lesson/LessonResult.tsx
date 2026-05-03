import { motion } from 'framer-motion'
import { Foxy } from '../mascot/Foxy'

interface LessonResultProps {
  correct: boolean
  correctLabel: string
  onNext: () => void
  nextLabel: string
  resultLabel: string
}

export function LessonResult({ correct, correctLabel, onNext, nextLabel, resultLabel }: LessonResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 p-8"
    >
      <Foxy mood={correct ? 'cheer' : 'encourage'} size={100} />
      <p className="text-2xl font-bold text-center">{resultLabel}</p>
      {!correct && (
        <p className="text-gray-500 text-sm">Answer: {correctLabel}</p>
      )}
      <button
        onClick={onNext}
        className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-2xl text-lg"
      >
        {nextLabel}
      </button>
    </motion.div>
  )
}
