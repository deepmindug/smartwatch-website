import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import ProductsPage from './ProductsPage'

describe('Products page hero', () => {
  test('carries the KPMG award and the KRA RECTS certification beside the actions', () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>,
    )
    const hero = within(screen.getByRole('heading', { level: 1 }).closest('section')!)
    expect(hero.getByRole('link', { name: 'KPMG Top 100 Mid-Sized Companies' })).toHaveAttribute('href', '/about#awards')
    expect(hero.getByRole('link', { name: /kra rects certified vendor/i })).toHaveAttribute('href', '/about#awards')
  })
})
