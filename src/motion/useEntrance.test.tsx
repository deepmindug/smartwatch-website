import { render } from '@testing-library/react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useEntrance } from './useEntrance'

function Sample({ delay }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEntrance(ref, delay === undefined ? undefined : { delay })
  return (
    <div ref={ref}>
      <p data-enter>copy</p>
    </div>
  )
}

describe('useEntrance', () => {
  beforeEach(() => {
    vi.mocked(gsap.timeline).mockClear()
  })

  test('starts straight away by default', () => {
    render(<Sample />)
    expect(gsap.timeline).toHaveBeenCalledTimes(1)
    const [vars] = vi.mocked(gsap.timeline).mock.calls[0] as [Record<string, unknown>]
    expect(vars.delay ?? 0).toBe(0)
  })

  test('holds the whole sequence back by the requested delay', () => {
    render(<Sample delay={0.3} />)
    const [vars] = vi.mocked(gsap.timeline).mock.calls[0] as [Record<string, unknown>]
    expect(vars).toMatchObject({ delay: 0.3 })
  })
})
