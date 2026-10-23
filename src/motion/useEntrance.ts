import type { RefObject } from 'react'
import { gsap, useGSAP } from './gsap'
import { MOTION_OK } from './motion'

type Options = {
  /** Seconds to hold the whole sequence back, so a headline animating on its own can lead. */
  delay?: number
}

/**
 * Hero entrance: elements marked `data-enter` rise in sequence, then `data-enter-media` settles in.
 * Runs once on mount and is skipped entirely under reduced motion.
 */
export function useEntrance(ref: RefObject<HTMLElement | null>, { delay = 0 }: Options = {}) {
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const items = el.querySelectorAll('[data-enter]')
        const media = el.querySelectorAll('[data-enter-media]')
        const tl = gsap.timeline({ delay, defaults: { ease: 'power2.out' } })
        tl.from(items, { autoAlpha: 0, y: 22, duration: 0.6, stagger: 0.09, clearProps: 'transform' })
        if (media.length) {
          tl.from(media, { autoAlpha: 0, y: 30, scale: 0.98, duration: 0.8, clearProps: 'transform' }, '-=0.35')
        }
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [delay] },
  )
}
