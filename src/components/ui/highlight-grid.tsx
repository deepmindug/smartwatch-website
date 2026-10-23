import { useCallback, useEffect, useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import s from './highlight-grid.module.css'

/*
 * Vendored from the VengeanceUI registry:
 * https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/highlight-grid.json
 *
 * What is kept is the component's mechanic: one absolutely positioned highlight inside the
 * container that glides to sit behind a cell, morphing its position and size with a CSS
 * transition, measured against the container's own box and re-measured whenever the container
 * or the window resizes. Three things are adapted:
 *   - the cells are the caller's own elements, marked `data-highlight-cell`, instead of the
 *     component's fixed rows of mono labels, so the platform tabs keep their roles and markup
 *   - the highlight follows the `active` index rather than the hovered cell: on a tablist the
 *     selected tab must keep its marker while the pointer roams
 *   - its Tailwind classes and per-cell colours become a CSS module; the caller paints the
 *     highlight through `highlightClassName`
 * The first placement happens in a layout effect, before the highlight has ever been painted,
 * so it appears in place rather than sliding in from the corner.
 */

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Index of the `[data-highlight-cell]` the highlight sits behind. */
  active: number
  /** Paints the highlight: its colour, radius, sheen. */
  highlightClassName?: string
  children: ReactNode
}

export function HighlightGrid({ active, className, highlightClassName, children, ...rest }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  /** The index the resize handlers re-align to; written in the effect, never during render. */
  const activeRef = useRef(active)

  const moveTo = useCallback((index: number) => {
    const grid = gridRef.current
    const highlight = highlightRef.current
    const cell = grid?.querySelectorAll<HTMLElement>('[data-highlight-cell]')[index]
    if (!grid || !highlight || !cell) return
    const rect = cell.getBoundingClientRect()
    const box = grid.getBoundingClientRect()
    // Offset by the container's own scroll, so a strip that scrolls sideways on phones stays aligned.
    const x = rect.left - box.left + grid.scrollLeft
    const y = rect.top - box.top + grid.scrollTop
    highlight.style.transform = `translate(${x}px, ${y}px)`
    highlight.style.width = `${rect.width}px`
    highlight.style.height = `${rect.height}px`
  }, [])

  useLayoutEffect(() => {
    activeRef.current = active
    moveTo(active)
  }, [active, moveTo])

  useEffect(() => {
    const grid = gridRef.current
    const realign = () => moveTo(activeRef.current)
    window.addEventListener('resize', realign)
    const observer = grid && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(realign) : null
    if (grid && observer) observer.observe(grid)
    return () => {
      window.removeEventListener('resize', realign)
      observer?.disconnect()
    }
  }, [moveTo])

  return (
    <div ref={gridRef} className={cx(s.root, className)} {...rest}>
      <div ref={highlightRef} className={cx(s.highlight, highlightClassName)} aria-hidden="true" data-highlight />
      {children}
    </div>
  )
}

export default HighlightGrid
