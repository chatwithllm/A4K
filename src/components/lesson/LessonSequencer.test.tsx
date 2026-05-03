import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LessonSequencer } from './LessonSequencer'
import type { QuizLesson } from '../../content/types'

const makeQuiz = (id: string, question: string): QuizLesson => ({
  id,
  mode: 'baby',
  subject: 'colors',
  type: 'quiz',
  content: { en: question, te: question, es: question },
  answer: 'red',
  choices: ['red', 'blue'],
  choiceLabels: [
    { en: 'Red', te: 'Red', es: 'Red' },
    { en: 'Blue', te: 'Blue', es: 'Blue' },
  ],
  xp: 10,
  character_reaction: { correct: 'cheer', wrong: 'encourage' },
})

const lesson1 = makeQuiz('q1', 'Question one?')
const lesson2 = makeQuiz('q2', 'Question two?')

describe('LessonSequencer', () => {
  it('renders the first lesson', () => {
    render(<LessonSequencer lessons={[lesson1, lesson2]} language="en" onAllComplete={vi.fn()} />)
    expect(screen.getByText('Question one?')).toBeInTheDocument()
  })

  it('advances to next lesson after answering and tapping Next', () => {
    render(<LessonSequencer lessons={[lesson1, lesson2]} language="en" onAllComplete={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /red/i }))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText('Question two?')).toBeInTheDocument()
  })

  it('shows completion screen after last lesson Next', () => {
    render(<LessonSequencer lessons={[lesson1]} language="en" onAllComplete={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /red/i }))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(/all done/i)).toBeInTheDocument()
  })

  it('calls onAllComplete when Back to Home tapped', () => {
    const onAllComplete = vi.fn()
    render(<LessonSequencer lessons={[lesson1]} language="en" onAllComplete={onAllComplete} />)
    fireEvent.click(screen.getByRole('button', { name: /red/i }))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    fireEvent.click(screen.getByRole('button', { name: /back to home/i }))
    expect(onAllComplete).toHaveBeenCalledWith(10)
  })
})
