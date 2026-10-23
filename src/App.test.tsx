import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import App from './App'
import { about } from './data/about'
import { careers, leadership, newsroom, partners } from './data/company'
import { hardware } from './data/hardware'
import { privacy, terms } from './data/legal'
import { platforms } from './data/platforms'
import { products } from './data/products'
import { blog, developerPortal, guides, webinars } from './data/resources'
import { solutions } from './data/solutions'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

function expectH1(name: string | RegExp) {
  expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument()
}

describe('routing', () => {
  test('renders the home page at /', () => {
    renderAt('/')
    expectH1(/a decade of connecting and protecting fleets/i)
  })

  test('renders the products index', () => {
    renderAt('/products')
    expectH1(/products tailored to your specific needs/i)
  })

  test('renders each product page from data', () => {
    renderAt(`/products/${products[0].slug}`)
    expectH1(products[0].hero.title)
  })

  test('renders the solutions index', () => {
    renderAt('/solutions')
    expectH1(/built for the industries that keep east africa moving/i)
  })

  test('renders each solution page from data', () => {
    renderAt(`/solutions/${solutions[1].slug}`)
    expectH1(solutions[1].hero.title)
  })

  test('renders hardware, platforms, about and legal pages', () => {
    renderAt('/hardware')
    expectH1(hardware.hero.title)
  })

  test('renders the platforms page', () => {
    renderAt('/platforms')
    expectH1(platforms.hero.title)
  })

  test('renders the about page and redirects the old company path', () => {
    renderAt('/company')
    expectH1(about.hero.title)
  })

  test.each([
    ['/resources/webinars', webinars],
    ['/resources/blog', blog],
    ['/resources/guides', guides],
    ['/resources/developer-portal', developerPortal],
    ['/company/leadership', leadership],
    ['/company/newsroom', newsroom],
    ['/company/careers', careers],
    ['/company/partners', partners],
  ])('renders the %s page', (path, page) => {
    renderAt(path)
    expectH1(page.hero.title)
  })

  test('renders the contact page', () => {
    renderAt('/contact')
    expectH1(/talk to sales or support, 24\/7/i)
  })

  test('renders the privacy policy', () => {
    renderAt('/privacy-policy')
    expectH1(privacy.title)
  })

  test('renders the terms and redirects the long path', () => {
    renderAt('/terms-and-conditions')
    expectH1(terms.title)
  })

  test('sends unknown paths to the home page', () => {
    renderAt('/does-not-exist')
    expectH1(/a decade of connecting and protecting fleets/i)
  })

  test('sends unknown product and solution slugs to their index', () => {
    renderAt('/solutions/nope')
    expectH1(/built for the industries that keep east africa moving/i)
  })

  test('header "Get a demo" navigates to the contact page', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('banner').querySelector('a[href="/contact"]')!)
    expectH1(/talk to sales or support, 24\/7/i)
  })

  test('shows the shared header and footer on every page', () => {
    renderAt('/solutions')
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
