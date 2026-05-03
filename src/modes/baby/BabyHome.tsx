import { motion } from 'framer-motion'
import { Foxy } from '../../components/mascot/Foxy'

const SUBJECTS = [
  { id: 'colors',   emoji: '🎨', labels: { en: 'Colors',  te: 'రంగులు',    es: 'Colores'  } },
  { id: 'letters',  emoji: '🔤', labels: { en: 'Letters', te: 'అక్షరాలు',  es: 'Letras'   } },
  { id: 'numbers',  emoji: '🔢', labels: { en: 'Numbers', te: 'సంఖ్యలు',   es: 'Números'  } },
  { id: 'animals',  emoji: '🐘', labels: { en: 'Animals', te: 'జంతువులు',  es: 'Animales' } },
  { id: 'emotions', emoji: '😊', labels: { en: 'Emotions',te: 'భావాలు',    es: 'Emociones'} },
]

interface BabyHomeProps {
  language: 'en' | 'te' | 'es'
  onSelectSubject: (subject: string) => void
  disabledSubjects?: Set<string>
}

export function BabyHome({ language, onSelectSubject, disabledSubjects }: BabyHomeProps) {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Foxy mood="idle" size={120} />
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {SUBJECTS.map((subject, i) => {
          const isDisabled = disabledSubjects?.has(subject.id)
          return (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => onSelectSubject(subject.id)}
              disabled={isDisabled}
              aria-label={subject.labels[language]}
              className={`bg-white rounded-2xl shadow-md p-5 flex flex-col items-center gap-2 text-amber-900 font-bold text-sm${isDisabled ? ' opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="text-4xl">{subject.emoji}</span>
              <span>{subject.labels[language]}</span>
              {isDisabled && <span className="text-xs font-normal text-gray-400">Soon</span>}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
