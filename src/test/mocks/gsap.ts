import { vi } from 'vitest'

type Chain = Record<string, (...args: unknown[]) => Chain>

function chain(): Chain {
  const c: Chain = {}
  for (const k of ['to', 'from', 'fromTo', 'set', 'add', 'kill', 'play', 'pause', 'reverse', 'restart', 'call', 'seek', 'progress']) {
    c[k] = vi.fn(() => c)
  }
  return c
}

/** Runs the matchMedia callback immediately so component code paths execute under test. */
export const matchMediaAdd = vi.fn((_query: unknown, fn?: (ctx: unknown) => unknown) => {
  fn?.({ conditions: {}, add: vi.fn() })
  return undefined
})

export const gsap = {
  registerPlugin: vi.fn(),
  to: vi.fn(() => chain()),
  from: vi.fn(() => chain()),
  fromTo: vi.fn(() => chain()),
  set: vi.fn(),
  timeline: vi.fn(() => chain()),
  matchMedia: vi.fn(() => ({ add: matchMediaAdd, revert: vi.fn(), kill: vi.fn() })),
  context: vi.fn((fn?: () => void) => {
    fn?.()
    return { revert: vi.fn(), kill: vi.fn(), add: vi.fn() }
  }),
  ticker: { add: vi.fn(), remove: vi.fn(), lagSmoothing: vi.fn() },
  utils: {
    toArray: (v: unknown) => (Array.isArray(v) ? v : [v]),
    clamp: (a: number, b: number, v: number) => Math.min(b, Math.max(a, v)),
  },
  killTweensOf: vi.fn(),
  quickTo: vi.fn(() => Object.assign(vi.fn(), { tween: chain() })),
}

export default gsap
