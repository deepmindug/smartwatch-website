import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Animation and smooth-scroll libraries are mocked globally: tests assert on content,
// links and ARIA, never on motion. jsdom has no layout, so the real libraries cannot run.
vi.mock('gsap', () => import('./mocks/gsap'))
vi.mock('gsap/ScrollTrigger', () => import('./mocks/scrolltrigger'))
vi.mock('@gsap/react', () => import('./mocks/gsap-react'))
vi.mock('lenis/react', () => import('./mocks/lenis-react'))

// jsdom gaps
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
Element.prototype.scrollIntoView = vi.fn()
window.matchMedia =
  window.matchMedia ??
  ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as MediaQueryList)
Object.defineProperty(HTMLMediaElement.prototype, 'play', { configurable: true, value: vi.fn(() => Promise.resolve()) })
Object.defineProperty(HTMLMediaElement.prototype, 'pause', { configurable: true, value: vi.fn() })
Object.defineProperty(HTMLMediaElement.prototype, 'load', { configurable: true, value: vi.fn() })

afterEach(() => {
  cleanup()
  document.title = ''
})
