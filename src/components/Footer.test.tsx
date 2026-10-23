import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import Footer from './Footer'

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  )
}

describe('Footer', () => {
  test('carries the KRA approval on a glass card with the white KRA logo', () => {
    renderFooter()
    const seal = screen.getByRole('link', { name: /kra rects certified vendor/i })
    expect(seal).toHaveAttribute('href', '/about#awards')
    expect(seal.querySelector('img')).toHaveAttribute('src', '/images/kra-white.svg')
  })

  test('lists awards and accreditation in the company column', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: /awards & accreditation/i })).toHaveAttribute('href', '/about#awards')
  })
})
