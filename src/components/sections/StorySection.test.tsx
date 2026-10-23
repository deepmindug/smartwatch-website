import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import type { Section } from '../../data/types'
import StorySection from './StorySection'

const section: Extract<Section, { kind: 'story' }> = {
  kind: 'story',
  id: 'heritage',
  title: 'Our story',
  lede: 'Founded in 2011.',
  themes: [],
  clients: {
    title: 'Trusted by',
    items: [
      {
        name: 'Total Energies',
        logo: { src: '/images/logos/totalenergies.webp', alt: 'TotalEnergies', width: 160, height: 120 },
      },
      { name: 'MTN' },
    ],
  },
}

describe('StorySection', () => {
  test('shows a client as its logo when it has one and as its name otherwise', () => {
    render(
      <MemoryRouter>
        <StorySection section={section} />
      </MemoryRouter>,
    )
    const logo = screen.getByRole('img', { name: 'TotalEnergies' })
    expect(logo).toHaveAttribute('src', '/images/logos/totalenergies.webp')
    expect(logo).toHaveAttribute('width', '160')
    expect(screen.queryByText('Total Energies')).toBeNull()
    expect(screen.getByText('MTN')).toBeInTheDocument()
  })
})
