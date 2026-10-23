import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useMediaQuery } from './useMediaQuery'

type Listener = (event: MediaQueryListEvent) => void

/** Stands in for matchMedia with a switchable match state that notifies its listeners. */
function stubMatchMedia(initial: boolean) {
  const listeners = new Set<Listener>()
  const list = {
    matches: initial,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_: string, fn: Listener) => listeners.add(fn)),
    removeEventListener: vi.fn((_: string, fn: Listener) => listeners.delete(fn)),
    dispatchEvent: vi.fn(),
  }
  window.matchMedia = vi.fn(() => list as unknown as MediaQueryList)
  return {
    set(matches: boolean) {
      list.matches = matches
      listeners.forEach((fn) => fn({ matches } as MediaQueryListEvent))
    },
    list,
  }
}

const original = window.matchMedia

afterEach(() => {
  window.matchMedia = original
})

describe('useMediaQuery', () => {
  test('reports the current match and follows changes', () => {
    const media = stubMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery('(max-width: 900px)'))
    expect(result.current).toBe(false)
    act(() => media.set(true))
    expect(result.current).toBe(true)
  })

  test('stops listening on unmount', () => {
    const media = stubMatchMedia(true)
    const { unmount } = renderHook(() => useMediaQuery('(max-width: 900px)'))
    unmount()
    expect(media.list.removeEventListener).toHaveBeenCalled()
  })
})
