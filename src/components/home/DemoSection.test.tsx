import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import DemoSection from './DemoSection'

describe('DemoSection credentials', () => {
  test('shows the KPMG award as a tile that links to the awards section, without the KRA tile', () => {
    render(
      <MemoryRouter>
        <DemoSection />
      </MemoryRouter>,
    )
    expect(screen.getByText('Awards & accreditation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'KPMG Top 100 Mid-Sized Companies' })).toHaveAttribute(
      'href',
      '/about#awards',
    )
    expect(screen.queryByRole('link', { name: 'KRA RECTS certified vendor' })).toBeNull()
  })
})
