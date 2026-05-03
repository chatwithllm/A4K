import { useState } from 'react'
import { ModeSelector } from './ModeSelector'
import { BabyHome } from './modes/baby/BabyHome'
import { LessonSequencer } from './components/lesson/LessonSequencer'
import { babyContent } from './content/baby/index'
import type { Lesson } from './content/types'
import './i18n/index'

type Screen = 'mode-select' | 'baby-home' | 'lesson'
type Language = 'en' | 'te' | 'es'

export default function App() {
  const [screen, setScreen] = useState<Screen>('mode-select')
  const [activeLessons, setActiveLessons] = useState<Lesson[]>([])
  const [language] = useState<Language>('en')

  function handleSubjectSelect(subject: string) {
    const lessons = babyContent[subject]
    if (lessons && lessons.length > 0) {
      setActiveLessons(lessons)
      setScreen('lesson')
    }
  }

  if (screen === 'mode-select') {
    return <ModeSelector onSelect={(mode) => mode === 'baby' && setScreen('baby-home')} />
  }
  if (screen === 'baby-home') {
    return <BabyHome language={language} onSelectSubject={handleSubjectSelect} />
  }
  if (screen === 'lesson' && activeLessons.length > 0) {
    return (
      <LessonSequencer
        lessons={activeLessons}
        language={language}
        onAllComplete={() => setScreen('baby-home')}
      />
    )
  }
  return null
}
