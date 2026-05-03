import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizLesson } from './QuizLesson'
import type { QuizLesson as QuizLessonType } from '../../content/types'

const mockLesson: QuizLessonType = {
  id: 'colors-red-01',
  mode: 'baby',
  subject: 'colors',
  type: 'quiz',
  content: { en: 'What color is the apple?', te: 'test', es: 'test' },
  answer: 'red',
  choices: ['red', 'blue', 'green'],
  choiceLabels: [
    { en: 'Red', te: 'ఎరుపు', es: 'Rojo' },
    { en: 'Blue', te: 'నీలం', es: 'Azul' },
    { en: 'Green', te: 'ఆకుపచ్చ', es: 'Verde' },
  ],
  xp: 10,
  character_reaction: { correct: 'cheer', wrong: 'encourage' },
}

describe('QuizLesson', () => {
  it('renders question and choices', () => {
    render(<QuizLesson lesson={mockLesson} language="en" onComplete={vi.fn()} />)
    expect(screen.getByText('What color is the apple?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /red/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /blue/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /green/i })).toBeInTheDocument()
  })

  it('calls onComplete with score 100 on correct answer', () => {
    const onComplete = vi.fn()
    render(<QuizLesson lesson={mockLesson} language="en" onComplete={onComplete} />)
    fireEvent.click(screen.getByRole('button', { name: /red/i }))
    expect(onComplete).toHaveBeenCalledWith({ score: 100, xpEarned: 10 })
  })

  it('calls onComplete with score 0 on wrong answer', () => {
    const onComplete = vi.fn()
    render(<QuizLesson lesson={mockLesson} language="en" onComplete={onComplete} />)
    fireEvent.click(screen.getByRole('button', { name: /blue/i }))
    expect(onComplete).toHaveBeenCalledWith({ score: 0, xpEarned: 0 })
  })

  it('shows question in Telugu when language is te', () => {
    render(<QuizLesson lesson={mockLesson} language="te" onComplete={vi.fn()} />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
