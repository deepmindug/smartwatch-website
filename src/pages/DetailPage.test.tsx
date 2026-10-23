import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { img } from '../data/images'
import type { DetailPage as Page } from '../data/types'
import DetailPage from './DetailPage'

const fixture: Page = {
  slug: 'fixture',
  kind: 'product',
  name: 'Fixture',
  short: 'A fixture page.',
  icon: 'compliance',
  hero: {
    eyebrow: 'Products · Fixture',
    title: 'Fixture headline.',
    intro: 'Fixture intro text.',
    tone: 'dark',
    media: img.device,
  },
  sections: [
    {
      kind: 'split',
      id: 'features',
      eyebrow: 'Video surveillance',
      title: 'Split title',
      body: ['First paragraph.', 'Second paragraph.'],
      points: ['Plain point', { title: 'Titled point', body: 'Titled body' }],
      media: img.laptop,
      cta: { label: 'Split link', to: '/hardware' },
    },
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Benefits',
      items: [
        { title: 'Card one', body: 'Card one body', href: '/products/compliance' },
        { title: 'Card two', points: ['Card point'] },
      ],
    },
    { kind: 'stats', items: [{ value: 70, suffix: '%', label: 'Fewer accidents' }] },
    { kind: 'bullets', title: 'Bullet list', items: ['Bullet one', 'Bullet two'], columns: 2 },
    { kind: 'beforeAfter', title: 'Before and after', before: ['Old way'], after: ['New way'] },
    {
      kind: 'tabs',
      tabs: [
        { label: 'Tab A', body: 'Body A' },
        { label: 'Tab B', body: 'Body B', points: ['Tab B point'] },
      ],
    },
    {
      kind: 'steps',
      id: 'how-it-works',
      items: [
        { title: 'Install', body: 'Install body' },
        { title: 'Connect', body: 'Connect body' },
      ],
    },
    {
      kind: 'spotlight',
      id: 'hardware',
      title: 'Spotlight title',
      body: 'Spotlight body',
      specs: [{ value: '4G', label: 'GSM connectivity' }],
      cta: { label: 'View hardware', to: '/hardware' },
    },
    {
      kind: 'links',
      id: 'resources',
      columns: [{ title: 'Support', links: [{ label: 'Contact support', to: '/contact#support' }] }],
    },
    {
      kind: 'faq',
      id: 'faq',
      items: [
        { q: 'First question?', a: 'First answer.' },
        { q: 'Second question?', a: 'Second answer.' },
      ],
    },
    { kind: 'logos', items: ['KLM', 'KCB'] },
    { kind: 'related', slugs: ['/products/compliance', '/hardware'] },
  ],
  meta: { title: 'Fixture', description: 'Fixture description.' },
}

function renderPage(page: Page = fixture) {
  return render(
    <MemoryRouter>
      <DetailPage page={page} />
    </MemoryRouter>,
  )
}

describe('DetailPage hero and chrome', () => {
  test('renders eyebrow, title, intro and hero image', () => {
    renderPage()
    expect(screen.getByText('Products · Fixture')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Fixture headline.' })).toBeInTheDocument()
    expect(screen.getByText('Fixture intro text.')).toBeInTheDocument()
    expect(screen.getByAltText(img.device.alt)).toBeInTheDocument()
  })

  test('product pages get the hardware call to action and no demo button', () => {
    renderPage()
    const hero = screen.getByRole('heading', { level: 1 }).closest('section')!
    expect(within(hero).queryByRole('link', { name: /get a demo/i })).not.toBeInTheDocument()
    expect(within(hero).getByRole('link', { name: /view hardware/i })).toHaveAttribute('href', '/hardware')
  })

  test('product pages get a sticky rail linking to every section with an id', () => {
    renderPage()
    const rail = screen.getByRole('navigation', { name: /on this page/i })
    const hrefs = within(rail)
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'))
    expect(hrefs).toEqual(['#features', '#benefits', '#how-it-works', '#hardware', '#resources', '#faq'])
  })

  test('sets the page title from meta', () => {
    renderPage()
    expect(document.title).toBe('Fixture | Smartwatch Solutions')
  })

  test('ends with the default demo band', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 2, name: /see it in action/i })).toBeInTheDocument()
  })

  test('hides the closing band when cta is false', () => {
    renderPage({ ...fixture, cta: false })
    expect(screen.queryByRole('heading', { level: 2, name: /see it in action/i })).not.toBeInTheDocument()
  })

  test('solution pages get the proof strip automatically, but no logo wall', () => {
    renderPage({ ...fixture, kind: 'solution', sections: [] })
    expect(screen.getByText(/recognised by kpmg/i)).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: /customer logos/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: /on this page/i })).not.toBeInTheDocument()
  })
})

describe('DetailPage sections', () => {
  test('split renders paragraphs, both point shapes, media and link', () => {
    renderPage()
    expect(screen.getByText('First paragraph.')).toBeInTheDocument()
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument()
    expect(screen.getByText('Plain point')).toBeInTheDocument()
    expect(screen.getByText('Titled point')).toBeInTheDocument()
    expect(screen.getByText('Titled body')).toBeInTheDocument()
    expect(screen.getByAltText(img.laptop.alt)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /split link/i })).toHaveAttribute('href', '/hardware')
  })

  test('cards link when they have an href and list points', () => {
    renderPage()
    expect(screen.getByRole('link', { name: /card one/i })).toHaveAttribute('href', '/products/compliance')
    expect(screen.getByText('Card point')).toBeInTheDocument()
  })

  test('stats format value and suffix', () => {
    renderPage()
    expect(screen.getByText('70%')).toBeInTheDocument()
    expect(screen.getByText('Fewer accidents')).toBeInTheDocument()
  })

  test('bullets and before/after lists render', () => {
    renderPage()
    expect(screen.getByText('Bullet two')).toBeInTheDocument()
    expect(screen.getByText('Old way')).toBeInTheDocument()
    expect(screen.getByText('New way')).toBeInTheDocument()
  })

  test('tabs switch their panel', async () => {
    const user = userEvent.setup()
    renderPage()
    expect(screen.getByText('Body A')).toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: 'Tab B' }))
    expect(screen.getByText('Body B')).toBeInTheDocument()
    expect(screen.getByText('Tab B point')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'true')
  })

  test('steps are numbered', () => {
    renderPage()
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  test('spotlight shows specs and its link', () => {
    renderPage()
    const spotlight = screen.getByText('Spotlight title').closest('section')!
    expect(within(spotlight).getByText('4G')).toBeInTheDocument()
    expect(within(spotlight).getByText('GSM connectivity')).toBeInTheDocument()
    expect(within(spotlight).getByRole('link', { name: /view hardware/i })).toHaveAttribute('href', '/hardware')
  })

  test('link columns render their links', () => {
    renderPage()
    expect(screen.getByRole('link', { name: 'Contact support' })).toHaveAttribute('href', '/contact#support')
  })

  test('faq opens one item at a time', async () => {
    const user = userEvent.setup()
    renderPage()
    const q1 = screen.getByRole('button', { name: 'First question?' })
    const q2 = screen.getByRole('button', { name: 'Second question?' })
    // Answers stay mounted so the panel can animate shut, but a closed one is out of the
    // accessibility tree and the tab order.
    const panel = (answer: string) => screen.getByText(answer).closest('[aria-hidden]')
    expect(q1).toHaveAttribute('aria-expanded', 'false')
    expect(panel('First answer.')).toHaveAttribute('aria-hidden', 'true')
    expect(panel('First answer.')).toHaveAttribute('inert')
    await user.click(q1)
    expect(q1).toHaveAttribute('aria-expanded', 'true')
    expect(panel('First answer.')).toHaveAttribute('aria-hidden', 'false')
    expect(panel('First answer.')).not.toHaveAttribute('inert')
    expect(q1).toHaveAttribute('aria-controls', panel('First answer.')!.id)
    await user.click(q2)
    expect(q1).toHaveAttribute('aria-expanded', 'false')
    expect(panel('First answer.')).toHaveAttribute('aria-hidden', 'true')
    expect(panel('Second answer.')).toHaveAttribute('aria-hidden', 'false')
  })

  test('the hero headline is split into word masks that rise into view', () => {
    renderPage()
    const words = document.querySelectorAll('h1 [data-word]')
    expect(Array.from(words, (word) => word.textContent)).toEqual(['Fixture', 'headline.'])
    expect(screen.getByRole('heading', { level: 1, name: 'Fixture headline.' })).toBeInTheDocument()
  })

  test('logos and related pages render', () => {
    renderPage()
    expect(screen.getByText('KLM')).toBeInTheDocument()
    const related = screen.getByRole('region', { name: /related pages/i })
    expect(within(related).getByRole('link', { name: /^compliance/i })).toHaveAttribute('href', '/products/compliance')
    expect(within(related).getByRole('link', { name: /^hardware & accessories/i })).toHaveAttribute('href', '/hardware')
  })
})
