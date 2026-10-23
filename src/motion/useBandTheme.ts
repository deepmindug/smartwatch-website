import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type Band = 'dark' | 'light'
/** Which dark a band paints. Both tones are the same brand green today; the hook keeps the distinction for the header. */
export type BandTone = 'green' | 'deep'
export type BandTheme = { band: Band; tone: BandTone }

const LIGHT: BandTheme = { band: 'light', tone: 'green' }

/** The header's height from the stylesheet, the floor for the probe line. */
function headerHeight(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h')
  const px = parseFloat(raw)
  return Number.isFinite(px) ? px : 64
}

/**
 * Where the header's bottom edge is right now. At the top of the page the announcement bar holds
 * the header below its stylesheet height, so the measured edge is used whenever it is lower; the
 * stylesheet height covers a header that cannot be measured (jsdom reports an empty rect).
 */
function probeLine(): number {
  const header = document.querySelector('header')
  const bottom = header ? header.getBoundingClientRect().bottom : 0
  return Math.max(bottom, headerHeight())
}

/** The band's `data-band-tone`, or the default tone when it names none. */
function toneOf(el: HTMLElement): BandTone {
  const tone = el.dataset.bandTone
  return tone === 'deep' ? tone : 'green'
}

/**
 * Which `[data-band]` section sits just below the header's bottom edge, and its tone. Later bands
 * paint over earlier ones (the first panel climbs across the pinned hero, and panels overlap the
 * band above them), so the last band spanning the line wins. Null when nothing spans it, as during
 * overscroll.
 */
function bandUnderHeader(): BandTheme | null {
  const line = probeLine()
  let found: BandTheme | null = null
  document.querySelectorAll<HTMLElement>('[data-band]').forEach((el) => {
    const rect = el.getBoundingClientRect()
    // A footer pinned beneath the page (the footer reveal) sits at the header's edge while the page
    // still covers it; it only counts once the page has scrolled up past that edge.
    if (el.hasAttribute('data-pinned')) {
      const page = document.querySelector('main')
      if (page && page.getBoundingClientRect().bottom > line) return
    }
    if (rect.top <= line && rect.bottom > line) {
      found = { band: el.dataset.band === 'dark' ? 'dark' : 'light', tone: toneOf(el) }
    }
  })
  return found
}

/** Keeps the current object when nothing changed, so scroll frames do not re-render the header. */
function next(current: BandTheme): BandTheme {
  const found = bandUnderHeader()
  return found && (found.band !== current.band || found.tone !== current.tone) ? found : current
}

/**
 * The colour of the section under the header, so the bar can take its background while the page
 * scrolls: whether the band is dark, and which tone it paints. Pages
 * open on a light band (the layout's white base), which is the starting value. Lenis owns
 * scrolling and its event is the primary source; the native listener is the fallback, and layout
 * changes that move sections without a scroll (route changes, images loading) are caught as well.
 */
export function useBandTheme(): BandTheme {
  const [theme, setTheme] = useState<BandTheme>(LIGHT)
  const { pathname } = useLocation()

  useLenis(() => setTheme(next), [])

  useEffect(() => {
    const update = () => setTheme(next)
    // The new page's sections are in the DOM, but the scroll manager resets the position after this.
    const frame = requestAnimationFrame(update)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    observer?.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer?.disconnect()
    }
  }, [pathname])

  return theme
}
