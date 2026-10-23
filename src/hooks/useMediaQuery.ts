import { useEffect, useState } from 'react'

/**
 * Whether a media query matches right now, updated as the viewport changes.
 * False where `matchMedia` is missing (tests, servers), so layouts default to the desktop reading.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.(query).matches)

  useEffect(() => {
    const list = window.matchMedia?.(query)
    if (!list) return
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener?.('change', update)
    return () => list.removeEventListener?.('change', update)
  }, [query])

  return matches
}
