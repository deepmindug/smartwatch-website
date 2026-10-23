import { render, screen } from '@testing-library/react'
import { gsap } from 'gsap'
import { describe, expect, test, vi } from 'vitest'
import Reveal from './Reveal'

describe('Reveal', () => {
  test('renders its children and keeps them in the document', () => {
    render(
      <Reveal>
        <p>Visible content</p>
      </Reveal>,
    )
    expect(screen.getByText('Visible content')).toBeInTheDocument()
  })

  test('registers its animation through gsap.matchMedia so reduced motion is respected', () => {
    vi.mocked(gsap.matchMedia).mockClear()
    render(
      <Reveal stagger>
        <span>a</span>
        <span>b</span>
      </Reveal>,
    )
    expect(gsap.matchMedia).toHaveBeenCalled()
  })

  test('renders as the requested element with a class', () => {
    render(
      <Reveal as="section" className="wrap">
        <p>inside</p>
      </Reveal>,
    )
    expect(screen.getByText('inside').closest('section')).toHaveClass('wrap')
  })
})
