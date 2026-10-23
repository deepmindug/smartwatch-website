import { Fragment, useRef } from 'react'
import { cx } from '../../lib/cx'
import { gsap, useGSAP } from '../../motion/gsap'
import { MOTION_OK } from '../../motion/motion'
import s from './stagger-text.module.css'

/*
 * Vendored from the VengeanceUI registry:
 * https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/stagger-text.json
 *
 * The component's idea is kept whole: every word sits inside its own overflow-hidden mask and
 * rises from beneath it, one after another, on a soft ease-out. Three things are adapted:
 *   - framer-motion becomes GSAP, which this site already runs its entrances on; the tween sits
 *     under gsap.matchMedia so reduced motion shows the words at rest
 *   - the original ends each word with a non-breaking space inside its mask; here the space is a
 *     plain text node between masks, so the text content (and a heading's accessible name) stays
 *     exactly the sentence that was passed in
 *   - its Tailwind utilities become a CSS module; the mask keeps a little room above and below
 *     each word so ascenders and descenders are not clipped by the overflow
 * Letter splitting and whileInView are dropped: the site only staggers hero headlines on mount.
 */

type Props = {
  children: string
  /** Seconds before the first word starts rising. */
  delay?: number
  className?: string
}

export default function StaggerText({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const words = children.trim().split(/\s+/).filter(Boolean)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from(el.querySelectorAll('[data-word]'), {
          yPercent: 120,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.05,
          delay,
          clearProps: 'transform',
        })
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [children, delay] },
  )

  return (
    <span ref={ref} className={cx(s.text, className)} data-stagger>
      {words.map((word, i) => (
        <Fragment key={`${i}-${word}`}>
          <span className={s.mask}>
            <span className={s.word} data-word>
              {word}
            </span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}
