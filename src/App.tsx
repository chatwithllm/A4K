import { useState } from 'react'
import { ModeSelector } from './ModeSelector'
import { BabyHome } from './modes/baby/BabyHome'
import { QuizLesson } from './components/lesson/QuizLesson'
import colorsContent from './content/baby/colors.json'
import type { QuizLesson as QuizLessonType } from './content/types'
import './i18n/index'

type Screen = 'mode-select' | 'baby-home' | 'lesson'
type Language = 'en' | 'te' | 'es'

export default function App() {
  const [screen, setScreen] = useState<Screen>('mode-select')
  const [activeLesson, setActiveLesson] = useState<QuizLessonType | null>(null)
  const [language] = useState<Language>('en')

  function handleSubjectSelect(subject: string) {
    if (subject === 'colors') {
      setActiveLesson((colorsContent as QuizLessonType[])[0])
      setScreen('lesson')
    }
  }

  if (screen === 'mode-select') {
    return <ModeSelector onSelect={(mode) => mode === 'baby' && setScreen('baby-home')} />
  }
  if (screen === 'baby-home') {
    return <BabyHome language={language} onSelectSubject={handleSubjectSelect} />
  }
  if (screen === 'lesson' && activeLesson) {
    return (
      <QuizLesson
        lesson={activeLesson}
        language={language}
        onComplete={() => setScreen('baby-home')}
      />
    )
  }
  return null
}
