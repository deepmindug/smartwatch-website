import { vi } from 'vitest'

/** Shared Lenis stub returned by the mocked `useLenis()`; tests assert on `scrollTo`. */
export const lenisStub = {
  scrollTo: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  raf: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
}
