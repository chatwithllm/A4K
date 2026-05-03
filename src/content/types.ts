export type LessonMode = 'baby' | 'explorer'
export type LessonType = 'quiz' | 'story' | 'drag' | 'tap'
export type CharacterReaction = 'cheer' | 'encourage' | 'neutral'

export interface LocalisedString {
  en: string
  te: string
  es: string
}

export interface QuizLesson {
  id: string
  mode: LessonMode
  subject: string
  type: 'quiz'
  content: LocalisedString
  answer: string
  choices: string[]
  choiceLabels?: LocalisedString[]
  xp: number
  character_reaction: {
    correct: CharacterReaction
    wrong: CharacterReaction
  }
}

export type Lesson = QuizLesson
