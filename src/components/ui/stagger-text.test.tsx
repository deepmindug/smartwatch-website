import { render, screen } from '@testing-library/react'
import { gsap } from 'gsap'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import StaggerText from './stagger-text'

describe('StaggerText', () => {
  beforeEach(() => {
    vi.mocked(gsap.from).mockClear()
    vi.mocked(gsap.matchMedia).mockClear()
  })

  test('keeps the sentence intact for the heading name and for copy', () => {
    render(
      <h1>
        <StaggerText>A decade of connecting fleets.</StaggerText>
      </h1>,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'A decade of connecting fleets.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A decade of connecting fleets.')
  })

  test('wraps every word in its own mask so each can rise into view', () => {
    render(<StaggerText>Led from the field, since 2011.</StaggerText>)
    const words = document.querySelectorAll('[data-word]')
    expect(Array.from(words, (word) => word.textContent)).toEqual(['Led', 'from', 'the', 'field,', 'since', '2011.'])
    for (const word of words) {
      expect(word.parentElement).not.toBe(word.closest('[data-stagger]'))
    }
  })

  test('rises the words from below the mask, through matchMedia so reduced motion is respected', () => {
    render(<StaggerText delay={0.2}>Two words</StaggerText>)
    expect(gsap.matchMedia).toHaveBeenCalled()
    expect(gsap.from).toHaveBeenCalledTimes(1)
    const [targets, vars] = vi.mocked(gsap.from).mock.calls[0] as [NodeListOf<Element>, Record<string, unknown>]
    expect(targets).toHaveLength(2)
    expect(vars).toMatchObject({ delay: 0.2 })
    expect(Number(vars.yPercent)).toBeGreaterThanOrEqual(100)
    expect(Number(vars.stagger)).toBeGreaterThan(0)
  })

  test('collapses runs of whitespace instead of rendering empty words', () => {
    render(<StaggerText>{'  spaced   out  '}</StaggerText>)
    expect(Array.from(document.querySelectorAll('[data-word]'), (word) => word.textContent)).toEqual(['spaced', 'out'])
  })
})
