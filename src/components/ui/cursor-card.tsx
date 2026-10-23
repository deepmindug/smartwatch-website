import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { Img } from '../../data/types'
import Placeholder from '../Placeholder'
import { cx } from '../../lib/cx'
import { gsap } from '../../motion/gsap'
import { prefersReducedMotion } from '../../motion/motion'
import SmartLink from '../SmartLink'
import s from './cursor-card.module.css'

/*
 * Vendored from the VengeanceUI registry:
 * https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/cursor-card.json
 *
 * The idea is kept whole: hovering the link opens a small image-and-caption card, portalled to
 * <body>, that trails the cursor on a spring and pops in from a slight scale-down. Adapted:
 *   - framer-motion's springs become gsap.quickTo on x/y of an outer frame; the pop-in is a CSS
 *     transition on an inner panel keyed off `data-open`, so the card stays mounted for its exit
 *     instead of needing AnimatePresence (and GSAP's transform never swallows the scale)
 *   - it renders a SmartLink (router link) instead of a bare anchor
 *   - Tailwind becomes a CSS module on the site tokens: the orange hover wash is the site green
 *   - only a mouse opens the card (a tap just follows the link), the card flips above the cursor
 *     near the bottom of the viewport and clamps to its sides, and reduced motion drops the
 *     trailing and the scale, pinning the card straight to the cursor
 */

/** Card width in px; the cursor sits over its middle. */
const CARD_WIDTH = 240
/** Gap between the cursor and the card. */
const OFFSET = 20
/** Keeps the card this far inside the viewport edges. */
const EDGE = 12

type Props = {
  children: ReactNode
  to: string
  /** Omitted while a photo is withdrawn; the card shows the striped placeholder instead. */
  image?: Img
  imageLabel?: string
  description: string
  className?: string
}

export default function CursorCard({ children, to, image, imageLabel, description, className }: Props) {
  const [open, setOpen] = useState(false)
  const card = useRef<HTMLDivElement>(null)
  const moveX = useRef<gsap.QuickToFunc | null>(null)
  const moveY = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    const el = card.current
    if (!el) return
    const duration = prefersReducedMotion() ? 0 : 0.35
    moveX.current = gsap.quickTo(el, 'x', { duration, ease: 'power3.out' })
    moveY.current = gsap.quickTo(el, 'y', { duration, ease: 'power3.out' })
    return () => {
      gsap.killTweensOf(el)
      moveX.current = moveY.current = null
    }
  }, [])

  function place(e: PointerEvent, jump = false) {
    const el = card.current
    if (!el) return
    const height = el.offsetHeight
    const x = Math.min(
      Math.max(e.clientX - CARD_WIDTH / 2, EDGE),
      window.innerWidth - CARD_WIDTH - EDGE,
    )
    const below = e.clientY + OFFSET
    const y = below + height > window.innerHeight - EDGE ? e.clientY - OFFSET - height : below
    // On entry the card starts at the cursor rather than gliding in from where it last closed.
    moveX.current?.(x, jump ? x : undefined)
    moveY.current?.(y, jump ? y : undefined)
  }

  return (
    <>
      <SmartLink
        to={to}
        className={cx(s.link, className)}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'mouse') return
          place(e, true)
          setOpen(true)
        }}
        onPointerMove={(e) => {
          if (e.pointerType === 'mouse') place(e)
        }}
        onPointerLeave={() => setOpen(false)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </SmartLink>

      {typeof document !== 'undefined' &&
        createPortal(
          <div ref={card} className={s.card} data-open={open || undefined} aria-hidden="true">
            <div className={s.panel}>
              {image ? (
                <img
                  className={s.image}
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <Placeholder label={imageLabel ?? 'image coming soon'} ratio="16 / 10" radius={8} stripe={8} className={s.image} />
              )}
              <p className={s.description}>{description}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
