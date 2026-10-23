import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { mapEmbed, offices } from '../data/site'
import ContactPage from './ContactPage'

function renderContact() {
  return render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>,
  )
}

describe('ContactPage', () => {
  test('routes visitors by intent', () => {
    renderContact()
    expect(screen.getByRole('link', { name: /request a demo/i })).toHaveAttribute('href', '#demo')
    expect(screen.getByRole('link', { name: /help centre/i })).toHaveAttribute('href', '#support')
  })

  test('lists every office with its phone numbers', () => {
    renderContact()
    for (const office of offices) {
      expect(screen.getByRole('heading', { name: new RegExp(office.city) })).toBeInTheDocument()
      for (const phone of office.phones) {
        expect(screen.getByRole('link', { name: phone.label })).toHaveAttribute('href', phone.href)
      }
    }
  })

  test('links the regional offices to their WhatsApp lines', () => {
    renderContact()
    for (const office of offices.filter((item) => item.whatsapp)) {
      const link = screen.getByRole('link', { name: `WhatsApp ${office.whatsapp?.label}` })
      expect(link).toHaveAttribute('href', office.whatsapp?.href)
      expect(link).toHaveAttribute('target', '_blank')
    }
  })

  test('embeds the Kampala map with a title', () => {
    renderContact()
    expect(screen.getByTitle(mapEmbed.title)).toHaveAttribute('src', mapEmbed.src)
  })

  test('has the anchors that menus link to', () => {
    renderContact()
    expect(document.getElementById('support')).not.toBeNull()
    expect(document.getElementById('offices')).not.toBeNull()
    expect(document.getElementById('demo')).not.toBeNull()
  })
})
