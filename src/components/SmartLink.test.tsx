import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import SmartLink from './SmartLink'

function renderLink(to: string) {
  return render(
    <MemoryRouter>
      <SmartLink to={to} className="x">
        go
      </SmartLink>
    </MemoryRouter>,
  )
}

describe('SmartLink', () => {
  test('internal paths render a router link', () => {
    renderLink('/products/compliance')
    const a = screen.getByRole('link', { name: 'go' })
    expect(a).toHaveAttribute('href', '/products/compliance')
    expect(a).not.toHaveAttribute('target')
  })

  test('internal paths with a hash keep the hash', () => {
    renderLink('/contact#support')
    expect(screen.getByRole('link', { name: 'go' })).toHaveAttribute('href', '/contact#support')
  })

  test('external URLs open in a new tab safely', () => {
    renderLink('https://example.com/portal')
    const a = screen.getByRole('link', { name: 'go' })
    expect(a).toHaveAttribute('href', 'https://example.com/portal')
    expect(a).toHaveAttribute('target', '_blank')
    expect(a.getAttribute('rel')).toContain('noopener')
  })

  test('mailto and tel links are plain anchors', () => {
    renderLink('mailto:hello@example.com')
    const a = screen.getByRole('link', { name: 'go' })
    expect(a).toHaveAttribute('href', 'mailto:hello@example.com')
    expect(a).not.toHaveAttribute('target')
  })

  test('passes className through', () => {
    renderLink('/x')
    expect(screen.getByRole('link', { name: 'go' })).toHaveClass('x')
  })
})
