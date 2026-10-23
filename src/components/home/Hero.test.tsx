import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { heroWords } from '../../data/content'
import Hero from './Hero'

function renderHero() {
  return render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>,
  )
}

describe('Home hero', () => {
  test('renders the headline', () => {
    renderHero()
    expect(
      screen.getByRole('heading', { level: 1, name: /a decade of connecting and protecting fleets/i }),
    ).toBeInTheDocument()
  })

  test('splits the headline into word masks that rise into view', () => {
    renderHero()
    const words = document.querySelectorAll('h1 [data-word]')
    expect(words).toHaveLength(7)
    expect(words[0]).toHaveTextContent('A')
    expect(words[6]).toHaveTextContent('fleets.')
  })

  test('lists all three words in the lead sentence', () => {
    renderHero()
    const lead = screen.getByText(/one platform to help improve the/i)
    for (const { word } of heroWords) {
      expect(within(lead).getAllByText(word)).toHaveLength(1)
    }
    expect(lead).toHaveTextContent('safety, productivity, and profitability')
  })

  test('links each key word to its product and previews it in a cursor card', () => {
    renderHero()
    for (const { word, to, description } of heroWords) {
      expect(screen.getByRole('link', { name: word })).toHaveAttribute('href', to)
      const card = screen.getByText(description).closest('[aria-hidden]')!
      expect(card).toHaveAttribute('aria-hidden', 'true')
      expect(card).not.toHaveAttribute('data-open')
    }
  })

  test('offers only the products link, as a corner button, with no demo button', () => {
    renderHero()
    const link = screen.getByRole('link', { name: /explore products/i })
    expect(link).toHaveAttribute('href', '/products')
    expect(link.parentElement?.querySelectorAll('[aria-hidden="true"]')).toHaveLength(8)
    expect(screen.queryByRole('link', { name: /get a demo/i })).not.toBeInTheDocument()
  })

  test('plays the muted hero video in place of the photographs', () => {
    renderHero()
    const video = document.querySelector('video')!
    expect(video).toHaveAttribute('src', '/videos/hero.mp4')
    expect(video).toHaveAttribute('poster', '/videos/hero-poster.webp')
    expect(video.muted).toBe(true)
    expect(video.loop).toBe(true)
    expect(document.querySelector('[data-slides]')).toBeNull()
    expect(screen.getByText('Container Open Alert cleared')).toBeInTheDocument()
  })
})

describe('Home hero credentials', () => {
  test('pins the KRA approved vendor badge, with its tick, to the video, not beside the products button', () => {
    renderHero()
    const cert = screen.getByRole('link', { name: /kra rects certified vendor/i })
    expect(cert).toHaveAttribute('href', '/about#awards')
    const badge = cert.querySelector('img')!
    expect(badge).toHaveAttribute('src', '/images/kra-approved-badge.webp')
    expect(badge).toHaveAttribute('alt', '')
    expect(cert.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    const media = document.querySelector('video')!.parentElement!
    expect(media).toContainElement(cert)
    const actions = screen.getByRole('link', { name: /explore products/i }).closest('[data-enter]')!
    expect(within(actions as HTMLElement).queryByRole('link', { name: /kra/i })).toBeNull()
  })
})
