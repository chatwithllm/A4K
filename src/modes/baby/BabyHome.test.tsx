import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BabyHome } from './BabyHome'

describe('BabyHome', () => {
  it('renders Foxy and subject tiles', () => {
    render(<BabyHome language="en" onSelectSubject={vi.fn()} />)
    expect(screen.getByRole('img', { name: /foxy/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /colors/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /letters/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /numbers/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /animals/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /emotions/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(5)
  })

  it('calls onSelectSubject when tile tapped', () => {
    const onSelect = vi.fn()
    render(<BabyHome language="en" onSelectSubject={onSelect} />)
    fireEvent.click(screen.getByRole('button', { name: /colors/i }))
    expect(onSelect).toHaveBeenCalledWith('colors')
  })

  it('renders subject names in Telugu', () => {
    render(<BabyHome language="te" onSelectSubject={vi.fn()} />)
    expect(screen.getByRole('button', { name: /రంగులు/i })).toBeInTheDocument()
  })
})
