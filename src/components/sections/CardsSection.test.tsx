import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import type { Section } from '../../data/types'
import CardsSection, { type CardVariant } from './CardsSection'

const section: Extract<Section, { kind: 'cards' }> = {
  kind: 'cards',
  title: 'Products',
  items: [
    { title: 'Compliance', body: 'Automated compliance.', icon: 'compliance', href: '/products/compliance' },
    { title: 'Maintenance', body: 'Preventive maintenance.', icon: 'maintenance', href: '/products/maintenance' },
  ],
}

function renderCards(variant?: CardVariant) {
  return render(
    <MemoryRouter>
      <CardsSection section={section} variant={variant} />
    </MemoryRouter>,
  )
}

describe('CardsSection', () => {
  test('links each card to its page with a 22px icon by default', () => {
    const { container } = renderCards()
    expect(screen.getByRole('link', { name: /compliance/i })).toHaveAttribute('href', '/products/compliance')
    expect(container.querySelectorAll('svg')).toHaveLength(2)
    expect(container.querySelector('svg')).toHaveAttribute('width', '22')
  })

  test('the product variant draws every icon at 32px', () => {
    const { container } = renderCards('product')
    const icons = container.querySelectorAll('svg')
    expect(icons).toHaveLength(2)
    icons.forEach((icon) => expect(icon).toHaveAttribute('width', '32'))
  })
})
