import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { pillars } from '../../data/pillars'
import PlatformPillars, { ROTATE_INTERVAL } from './PlatformPillars'

function renderPillars() {
  return render(
    <MemoryRouter>
      <PlatformPillars />
    </MemoryRouter>,
  )
}

describe('PlatformPillars tabs', () => {
  test('shows the Cargo Tracking pillar first, the product being fronted', () => {
    renderPillars()
    expect(screen.getByRole('heading', { level: 3, name: /electromagnetic lock/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /cargo tracking/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute(
      'href',
      '/solutions/electronic-cargo-tracking',
    )
  })

  test('clicking a tab shows that pillar and links to its page', async () => {
    const user = userEvent.setup()
    renderPillars()
    await user.click(screen.getByRole('tab', { name: /tracking & telematics/i }))
    expect(
      screen.getByRole('heading', { level: 3, name: /real-time visibility into the location/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Full fleet visibility on one map')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tracking & telematics/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: /compliance/i })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute(
      'href',
      '/products/tracking-and-telematics',
    )
  })

  test('renders one tab per pillar', () => {
    renderPillars()
    expect(screen.getAllByRole('tab')).toHaveLength(pillars.length)
  })

  test('runs one gliding highlight behind the tab strip instead of painting each tab', () => {
    renderPillars()
    const strip = screen.getByRole('tablist', { name: /platform products/i })
    const highlight = strip.querySelector('[data-highlight]')
    expect(highlight).toHaveAttribute('aria-hidden', 'true')
    for (const tab of screen.getAllByRole('tab')) expect(tab).toHaveAttribute('data-highlight-cell')
  })
})

describe('PlatformPillars carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  test('moves to the next product on its own and wraps around', () => {
    renderPillars()
    act(() => {
      vi.advanceTimersByTime(ROTATE_INTERVAL)
    })
    expect(screen.getByRole('tab', { name: pillars[1].name })).toHaveAttribute('aria-selected', 'true')
    act(() => {
      vi.advanceTimersByTime(ROTATE_INTERVAL * (pillars.length - 1))
    })
    expect(screen.getByRole('tab', { name: pillars[0].name })).toHaveAttribute('aria-selected', 'true')
  })

  test('stops rotating once the visitor picks a product', () => {
    renderPillars()
    fireEvent.click(screen.getByRole('tab', { name: pillars[3].name }))
    act(() => {
      vi.advanceTimersByTime(ROTATE_INTERVAL * 2)
    })
    expect(screen.getByRole('tab', { name: pillars[3].name })).toHaveAttribute('aria-selected', 'true')
  })
})
