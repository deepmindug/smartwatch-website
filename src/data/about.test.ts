import { describe, expect, test } from 'vitest'
import { about } from './about'

describe('About page awards', () => {
  test('shows the KPMG award and the UMA certificate side by side, each image kept whole', () => {
    const awards = about.sections.find((section) => section.id === 'awards')
    if (awards?.kind !== 'cards') throw new Error('expected the awards section to be cards')
    expect(awards.items.map((item) => item.title)).toEqual(['KPMG Top 100 Mid-Sized Companies', 'Certificate of Appreciation'])
    expect(awards.columns).toBe(2)
    expect(awards.center).toBe(true)
    expect(awards.items[0].image?.fit).toBe('contain')
    expect(awards.items[1].image?.fit).toBe('contain')
  })

  test('lists the Kenya Revenue Authority among the clients', () => {
    const overview = about.sections.find((section) => section.id === 'clients')
    if (overview?.kind !== 'trust') throw new Error('expected the clients section to be the logo panel')
    expect(overview.clients?.items.map((item) => item.name)).toContain('Kenya Revenue Authority')
  })
})

describe('About page order', () => {
  test('opens on the overview and the heritage, with the logo panel straight after Why Smartwatch', () => {
    const ids = about.sections.map((section) => section.id)
    expect(ids.slice(0, 2)).toEqual(['overview', 'heritage'])
    expect(ids[ids.indexOf('why-us') + 1]).toBe('clients')
  })
})

describe('About page revenue authorities', () => {
  test('lists the six revenue authorities above the clients, with the SaaS line under them', () => {
    const overview = about.sections.find((section) => section.id === 'clients')
    if (overview?.kind !== 'trust') throw new Error('expected the clients section to be the logo panel')
    expect(overview.authorities?.items.map((item) => item.name)).toHaveLength(6)
    expect(overview.authorities?.note).toMatch(/premier Telematics Software-as-a-Service/)
  })
})
