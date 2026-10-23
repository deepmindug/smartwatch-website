import { createElement, useRef, type HTMLAttributes, type ReactNode } from 'react'
import { gsap, useGSAP } from '../motion/gsap'
import { MOTION_OK } from '../motion/motion'

type Tag = 'div' | 'section' | 'article' | 'ul' | 'ol' | 'li'

type Props = HTMLAttributes<HTMLElement> & {
  as?: Tag
  /** Animate the direct children one after another instead of the wrapper as a whole. */
  stagger?: boolean
  delay?: number
  y?: number
  children: ReactNode
}

/**
 * Fades and rises its content into view the first time it scrolls onto the screen.
 * Nothing is hidden when the visitor prefers reduced motion.
 */
export default function Reveal({ as = 'div', stagger = false, delay = 0, y = 24, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const targets = stagger ? Array.from(el.children) : el
        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          stagger: stagger ? 0.08 : 0,
          clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [stagger, delay, y] },
  )

  return createElement(as, { ref, ...rest }, children)
}
