import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import App from './App'
import { allPaths } from './data/site'

const paths = allPaths()

async function openEverything(user: ReturnType<typeof userEvent.setup>) {
  for (const name of [/solutions/i, /products/i, /resources/i, /company/i]) {
    await user.hover(screen.getAllByRole('button', { name })[0])
  }
  await user.hover(within(screen.getByRole('banner')).getByRole('link', { name: /^contact$/i }))
  await user.click(screen.getByRole('button', { name: /open menu/i }))
}

describe('every link on the site resolves', () => {
  test.each(paths)('%s has no dead links', async (path) => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    )
    await openEverything(user)

    const anchors = Array.from(document.querySelectorAll('a'))
    expect(anchors.length).toBeGreaterThan(10)

    for (const a of anchors) {
      const href = a.getAttribute('href')
      expect(href, `${a.textContent} has no href`).toBeTruthy()
      expect(href, `${a.textContent} is a placeholder link`).not.toBe('#')

      if (href!.startsWith('http')) {
        expect(a, `${href} must open in a new tab`).toHaveAttribute('target', '_blank')
        expect(a.getAttribute('rel'), `${href} needs rel=noopener`).toContain('noopener')
      } else if (href!.startsWith('#')) {
        expect(document.getElementById(href!.slice(1)), `${href} has no target on ${path}`).not.toBeNull()
      } else if (href!.startsWith('/')) {
        const [base, hash] = href!.split('#')
        expect(paths, `${href} is not a route`).toContain(base)
        if (hash && base === path) {
          expect(document.getElementById(hash), `${href} has no target on ${path}`).not.toBeNull()
        }
      } else {
        expect(href, `${href} should be mailto: or tel:`).toMatch(/^(mailto:|tel:)/)
      }
    }
  })
})
