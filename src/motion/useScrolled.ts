import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `threshold`.
 * Lenis owns scrolling, and a programmatic scroll under it fires no native scroll event,
 * so its own event is the primary source; the native listener is the fallback.
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > threshold)
  useLenis((lenis) => setScrolled(lenis.scroll > threshold), [threshold])
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])
  return scrolled
}
