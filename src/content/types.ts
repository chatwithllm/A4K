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
  character_reaction: { correct: CharacterReaction; wrong: CharacterReaction }
}

export interface StoryFrame {
  emoji: string
  text: LocalisedString
}

export interface StoryLesson {
  id: string
  mode: LessonMode
  subject: string
  type: 'story'
  frames: StoryFrame[]
  xp: number
  character_reaction: { correct: CharacterReaction; wrong: CharacterReaction }
}

export interface TapItem {
  id: string
  emoji: string
  label: LocalisedString
}

export interface TapLesson {
  id: string
  mode: LessonMode
  subject: string
  type: 'tap'
  content: LocalisedString
  items: TapItem[]
  answer: string
  xp: number
  character_reaction: { correct: CharacterReaction; wrong: CharacterReaction }
}

export type Lesson = QuizLesson | StoryLesson | TapLesson
