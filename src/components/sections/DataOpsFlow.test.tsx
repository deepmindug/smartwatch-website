import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import type { Section } from '../../data/types'
import DataOpsFlow from './DataOpsFlow'
import SpotlightSection from './SpotlightSection'

describe('DataOpsFlow', () => {
  test('draws the five stages of the flow, each with its kind', () => {
    const { container } = render(<DataOpsFlow />)
    for (const [name, kind] of [
      ['Data Source', 'Input'],
      ['Init Attribute', 'Compute'],
      ['IF / THEN', 'Branch'],
      ['Action', 'Command'],
      ['Output', 'Stream'],
    ]) {
      expect(screen.getByText(name)).toBeInTheDocument()
      expect(screen.getByText(kind)).toBeInTheDocument()
    }
    // Decorative: the spotlight's copy carries the meaning.
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('SpotlightSection', () => {
  const section: Extract<Section, { kind: 'spotlight' }> = {
    kind: 'spotlight',
    id: 'data-ops',
    eyebrow: 'Data ops',
    title: 'From reading to action.',
    body: 'Every reading runs through your rules.',
    visual: 'data-ops',
    cta: { label: 'Platform overview', to: '/products' },
  }

  test('draws the data-ops flow in place of a photo when asked', () => {
    render(
      <MemoryRouter>
        <SpotlightSection section={section} />
      </MemoryRouter>,
    )
    expect(screen.getByText('IF / THEN')).toBeInTheDocument()
    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.getByRole('link', { name: /platform overview/i })).toHaveAttribute('href', '/products')
  })
})
