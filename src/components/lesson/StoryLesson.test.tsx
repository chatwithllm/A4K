import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StoryLesson } from './StoryLesson'
import type { StoryLesson as StoryLessonType } from '../../content/types'

const mockLesson: StoryLessonType = {
  id: 'letters-story-a-01',
  mode: 'baby',
  subject: 'letters',
  type: 'story',
  frames: [
    { emoji: '🅰️', text: { en: 'This is the letter A!', te: 'ఇది A అక్షరం!', es: '¡Esta es la letra A!' } },
    { emoji: '🍎', text: { en: 'A is for Apple!', te: 'A అంటే Apple!', es: '¡A es para Manzana!' } },
  ],
  xp: 15,
  character_reaction: { correct: 'cheer', wrong: 'encourage' },
}

describe('StoryLesson', () => {
  it('renders first frame emoji and text', () => {
    render(<StoryLesson lesson={mockLesson} language="en" onComplete={vi.fn()} />)
    expect(screen.getByText('🅰️')).toBeInTheDocument()
    expect(screen.getByText('This is the letter A!')).toBeInTheDocument()
  })

  it('advances to second frame on Next tap', () => {
    render(<StoryLesson lesson={mockLesson} language="en" onComplete={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText('🍎')).toBeInTheDocument()
    expect(screen.getByText('A is for Apple!')).toBeInTheDocument()
  })

  it('calls onComplete with score 100 and full xp after last frame Next', () => {
    const onComplete = vi.fn()
    render(<StoryLesson lesson={mockLesson} language="en" onComplete={onComplete} />)
    fireEvent.click(screen.getByRole('button', { name: /next/i })) // advance to frame 2
    fireEvent.click(screen.getByRole('button', { name: /next/i })) // complete
    expect(onComplete).toHaveBeenCalledWith({ score: 100, xpEarned: 15 })
  })

  it('renders text in Telugu when language is te', () => {
    render(<StoryLesson lesson={mockLesson} language="te" onComplete={vi.fn()} />)
    expect(screen.getByText('ఇది A అక్షరం!')).toBeInTheDocument()
  })
})
