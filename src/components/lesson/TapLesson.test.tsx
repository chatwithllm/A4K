import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TapLesson } from './TapLesson'
import type { TapLesson as TapLessonType } from '../../content/types'

const mockLesson: TapLessonType = {
  id: 'animals-tap-elephant-01',
  mode: 'baby',
  subject: 'animals',
  type: 'tap',
  content: {
    en: 'Tap the elephant!',
    te: 'ఏనుగును నొక్కు!',
    es: '¡Toca el elefante!',
  },
  items: [
    { id: 'elephant', emoji: '🐘', label: { en: 'Elephant', te: 'ఏనుగు', es: 'Elefante' } },
    { id: 'lion',     emoji: '🦁', label: { en: 'Lion',     te: 'సింహం',  es: 'León'    } },
    { id: 'giraffe',  emoji: '🦒', label: { en: 'Giraffe',  te: 'జిరాఫ్', es: 'Jirafa'  } },
  ],
  answer: 'elephant',
  xp: 10,
  character_reaction: { correct: 'cheer', wrong: 'encourage' },
}

describe('TapLesson', () => {
  it('renders instruction and all items', () => {
    render(<TapLesson lesson={mockLesson} language="en" onComplete={vi.fn()} onNext={vi.fn()} />)
    expect(screen.getByText('Tap the elephant!')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /elephant/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /lion/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /giraffe/i })).toBeInTheDocument()
  })

  it('calls onComplete with score 100 when correct item tapped', () => {
    const onComplete = vi.fn()
    render(<TapLesson lesson={mockLesson} language="en" onComplete={onComplete} onNext={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /elephant/i }))
    expect(onComplete).toHaveBeenCalledWith({ score: 100, xpEarned: 10 })
  })

  it('calls onComplete with score 0 when wrong item tapped', () => {
    const onComplete = vi.fn()
    render(<TapLesson lesson={mockLesson} language="en" onComplete={onComplete} onNext={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /lion/i }))
    expect(onComplete).toHaveBeenCalledWith({ score: 0, xpEarned: 0 })
  })

  it('calls onNext when Next button tapped after answering', () => {
    const onNext = vi.fn()
    render(<TapLesson lesson={mockLesson} language="en" onComplete={vi.fn()} onNext={onNext} />)
    fireEvent.click(screen.getByRole('button', { name: /elephant/i }))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(onNext).toHaveBeenCalled()
  })

  it('renders instruction in Telugu when language is te', () => {
    render(<TapLesson lesson={mockLesson} language="te" onComplete={vi.fn()} onNext={vi.fn()} />)
    expect(screen.getByText('ఏనుగును నొక్కు!')).toBeInTheDocument()
  })
})
