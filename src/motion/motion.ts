/** Media queries shared by every GSAP effect. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const DESKTOP_MOTION = '(min-width: 901px) and (prefers-reduced-motion: no-preference)'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}
