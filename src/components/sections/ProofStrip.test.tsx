import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import ProofStrip from './ProofStrip'

describe('ProofStrip', () => {
  test('names the KRA RECTS certification alongside the KPMG award and links to the credentials', () => {
    render(
      <MemoryRouter>
        <ProofStrip />
      </MemoryRouter>,
    )
    expect(screen.getByText(/kra rects certified vendor/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /our credentials/i })).toHaveAttribute('href', '/about#awards')
  })
})
