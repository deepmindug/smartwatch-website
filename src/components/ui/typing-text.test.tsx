import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import TypingText from './typing-text'

describe('TypingText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  test('gives screen readers the whole line and types it out letter by letter', () => {
    const line = "We're now a KRA RECTS certified vendor."
    const { container } = render(<TypingText text={line} highlight="KRA RECTS" speed={10} />)
    expect(screen.getByLabelText(line)).toBeInTheDocument()
    const typed = () => container.querySelectorAll('[aria-hidden="true"]')[1].textContent
    expect(typed()).toBe('')
    for (let i = 0; i < line.length; i++) {
      act(() => {
        vi.advanceTimersByTime(10)
      })
    }
    expect(typed()).toBe(line)
    expect(container.querySelector('[class*="mark"]')?.textContent).toBe('KRA RECTS')
  })
})
