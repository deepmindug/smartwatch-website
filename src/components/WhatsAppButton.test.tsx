import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import WhatsAppButton from './WhatsAppButton'

describe('WhatsAppButton', () => {
  test('pops up open on load and toggles from the badge', async () => {
    const user = userEvent.setup()
    render(<WhatsAppButton />)
    expect(screen.getByText(/chat with us on whatsapp/i)).toBeInTheDocument()
    const toggle = screen.getByRole('button', { name: /whatsapp/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(toggle)
    expect(screen.queryByText(/chat with us on whatsapp/i)).not.toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(screen.getByText(/chat with us on whatsapp/i)).toBeInTheDocument()
  })

  test('closes on Escape and on a click outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <p>Elsewhere</p>
        <WhatsAppButton />
      </div>,
    )
    await user.keyboard('{Escape}')
    expect(screen.queryByText(/chat with us on whatsapp/i)).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /whatsapp/i }))
    await user.click(screen.getByText('Elsewhere'))
    expect(screen.queryByText(/chat with us on whatsapp/i)).not.toBeInTheDocument()
  })

  test('opens both country lines in a new tab', () => {
    render(<WhatsAppButton />)
    const uganda = screen.getByRole('link', { name: /uganda/i })
    const kenya = screen.getByRole('link', { name: /kenya/i })
    expect(uganda).toHaveAttribute('href', 'https://wa.me/256759786255')
    expect(kenya).toHaveAttribute('href', 'https://wa.me/254118319547')
    for (const link of [uganda, kenya]) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
    }
  })
})
