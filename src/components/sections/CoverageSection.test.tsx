import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { page } from '../../data/solutions/electronic-cargo-tracking'
import CoverageSection from './CoverageSection'

describe('Cargo tracking coverage infographic', () => {
  test('sits right after Features & benefits', () => {
    const ids = page.sections.map((section) => section.id)
    expect(ids.indexOf('coverage')).toBe(ids.indexOf('benefits') + 1)
  })

  test('shows the four product boxes around the map of the six countries, with the Nairobi, Kampala and Mombasa offices', () => {
    const section = page.sections.find((item) => item.id === 'coverage')
    if (section?.kind !== 'coverage') throw new Error('expected a coverage section')
    render(<CoverageSection section={section} />)
    const map = screen.getByRole('img', { name: /^Map of East/ })
    for (const name of ['Uganda', 'Kenya', 'Rwanda', 'DR Congo', 'Burundi', 'South Sudan'])
      expect(map).toHaveAccessibleName(expect.stringContaining(name))
    expect(map).toHaveAccessibleName(expect.stringContaining('Nairobi, Kampala and Mombasa'))
    expect(screen.getAllByRole('article')).toHaveLength(4)
    for (const box of ['E-Seal and Fuel', 'eFUEL', 'Mobile DVR', 'Smart Gates, ANPR'])
      expect(screen.getByRole('heading', { name: new RegExp(box) })).toBeInTheDocument()
    expect(screen.getByText('Nairobi, Kenya')).toBeInTheDocument()
    expect(screen.getByText('Kampala, Uganda')).toBeInTheDocument()
    expect(screen.getByText('Mombasa, Kenya')).toBeInTheDocument()
  })
})
