import { useEffect, useRef, useState } from 'react'
import { cx } from '../../lib/cx'
import { ScrollTrigger, useGSAP } from '../../motion/gsap'
import { prefersReducedMotion } from '../../motion/motion'
import type { RailItem } from './rail'
import s from './Sections.module.css'

/** In-page anchor pills that stay under the header and highlight the section in view. */
export default function StickyRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id)
  const ref = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  // On narrow screens the pills scroll sideways; data-more fades the right edge while there is more to see.
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const update = () => {
      const more = strip.scrollWidth - strip.clientWidth - strip.scrollLeft > 8
      if (more) strip.dataset.more = ''
      else delete strip.dataset.more
    }
    update()
    strip.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      strip.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items])

  // Keep the pill for the section in view centred in the strip as the page scrolls past it.
  useEffect(() => {
    const strip = stripRef.current
    const pill = strip?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!strip || !pill || strip.scrollWidth <= strip.clientWidth || typeof strip.scrollTo !== 'function') return
    const left = pill.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft
    strip.scrollTo({ left: left - (strip.clientWidth - pill.offsetWidth) / 2, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [active])

  useGSAP(
    () => {
      const triggers = items.map((item) => {
        const target = document.getElementById(item.id)
        if (!target) return null
        return ScrollTrigger.create({
          trigger: target,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActive(item.id)
          },
        })
      })
      return () => triggers.forEach((t) => t?.kill())
    },
    { scope: ref, dependencies: [items] },
  )

  return (
    <nav className={s.rail} aria-label="On this page" ref={ref}>
      <div className={cx('container', s.railInner)} ref={stripRef}>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cx(s.railPill, active === item.id && s.railPillOn)}
            aria-current={active === item.id ? 'location' : undefined}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
