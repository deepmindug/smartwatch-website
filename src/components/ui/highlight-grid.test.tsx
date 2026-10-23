import { fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import HighlightGrid from './highlight-grid'

/** jsdom has no layout, so every element reports the box written in its data-rect attribute. */
function rect(x: number, y: number, width: number, height: number): DOMRect {
  return { x, y, width, height, top: y, left: x, right: x + width, bottom: y + height, toJSON: () => ({}) } as DOMRect
}

beforeEach(() => {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const spec = this.getAttribute('data-rect')
    if (!spec) return rect(0, 0, 0, 0)
    const [x, y, width, height] = spec.split(',').map(Number)
    return rect(x, y, width, height)
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

function renderGrid(active: number) {
  return render(
    <HighlightGrid active={active} data-rect="10,20,400,40" role="tablist" aria-label="Cells">
      <button type="button" role="tab" data-highlight-cell data-rect="10,20,100,40">
        One
      </button>
      <button type="button" role="tab" data-highlight-cell data-rect="120,20,100,40">
        Two
      </button>
      <button type="button" role="tab" data-highlight-cell data-rect="230,20,120,40">
        Three
      </button>
    </HighlightGrid>,
  )
}

function highlight(): HTMLElement {
  const el = document.querySelector<HTMLElement>('[data-highlight]')
  if (!el) throw new Error('no highlight layer rendered')
  return el
}

describe('HighlightGrid', () => {
  test('renders the cells inside the container and one decorative highlight layer', () => {
    const { getAllByRole, getByRole } = renderGrid(0)
    expect(getAllByRole('tab')).toHaveLength(3)
    expect(getByRole('tablist', { name: 'Cells' })).toContainElement(highlight())
    expect(highlight()).toHaveAttribute('aria-hidden', 'true')
  })

  test('sizes and positions the highlight over the active cell, relative to the container', () => {
    renderGrid(1)
    expect(highlight().style.transform).toBe('translate(110px, 0px)')
    expect(highlight().style.width).toBe('100px')
    expect(highlight().style.height).toBe('40px')
  })

  test('glides to the new cell when the active index changes', () => {
    const { rerender } = renderGrid(0)
    expect(highlight().style.transform).toBe('translate(0px, 0px)')
    rerender(
      <HighlightGrid active={2} data-rect="10,20,400,40" role="tablist" aria-label="Cells">
        <button type="button" role="tab" data-highlight-cell data-rect="10,20,100,40">
          One
        </button>
        <button type="button" role="tab" data-highlight-cell data-rect="120,20,100,40">
          Two
        </button>
        <button type="button" role="tab" data-highlight-cell data-rect="230,20,120,40">
          Three
        </button>
      </HighlightGrid>,
    )
    expect(highlight().style.transform).toBe('translate(220px, 0px)')
    expect(highlight().style.width).toBe('120px')
  })

  test('re-measures when the window resizes', () => {
    const { getAllByRole } = renderGrid(1)
    getAllByRole('tab')[1].setAttribute('data-rect', '150,20,100,40')
    fireEvent(window, new Event('resize'))
    expect(highlight().style.transform).toBe('translate(140px, 0px)')
  })
})
