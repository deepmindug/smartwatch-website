import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import AgentBentoGrid from './agent-bento-grid'

describe('AgentBentoGrid', () => {
  test('names each infrastructure card and hides the decorative visuals', () => {
    const { container } = render(<AgentBentoGrid />)
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(titles).toEqual([
      'Device-to-cloud pipeline',
      'Telemetry at scale',
      'Live event stream',
      'Open integrations',
      'IoT sensors',
    ])
    const stages = container.querySelectorAll('article > [aria-hidden="true"]')
    expect(stages).toHaveLength(5)
  })
})
