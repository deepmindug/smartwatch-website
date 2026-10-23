import type { RefObject } from 'react'
import { gsap, useGSAP } from './gsap'
import { MOTION_OK } from './motion'

/**
 * Counts every `[data-count]` element under `ref` up from zero the first time it scrolls into view.
 * `data-prefix` and `data-suffix` are kept around the number. Skipped under reduced motion.
 */
export function useCountUp(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count)
          const prefix = el.dataset.prefix ?? ''
          const suffix = el.dataset.suffix ?? ''
          const counter = { value: 0 }
          gsap.to(counter, {
            value: target,
            duration: 1.2,
            ease: 'power1.out',
            snap: { value: 1 },
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`
            },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
}
