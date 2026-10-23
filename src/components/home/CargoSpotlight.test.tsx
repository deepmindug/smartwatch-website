import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import CargoSpotlight from './CargoSpotlight'

function renderSpotlight() {
  render(
    <MemoryRouter>
      <CargoSpotlight />
    </MemoryRouter>,
  )
}

describe('CargoSpotlight', () => {
  test('pitches Cargo Tracking as a labelled section on a plain light panel', () => {
    renderSpotlight()
    const section = screen.getByRole('region', { name: /cargo transporters and government authorities/i })
    expect(section.querySelector('[data-band="light"]')).not.toBeNull()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('leads to the cargo page and to the demo form', () => {
    renderSpotlight()
    expect(screen.getByRole('link', { name: /explore cargo tracking/i })).toHaveAttribute(
      'href',
      '/solutions/electronic-cargo-tracking',
    )
    expect(screen.getByRole('link', { name: /book a demo/i })).toHaveAttribute('href', '/contact#demo')
  })
})
