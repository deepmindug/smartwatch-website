import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import type { DetailPage, GlobeSlide, HeroSlide } from '../../data/types'
import { cx } from '../../lib/cx'
import SmartLink from '../SmartLink'
import CornerButton from '../ui/corner-button'
import DotGlobe from '../ui/dot-globe'
import { btnClass, defaultHeroCtas, isDemoCta } from './cta'
import s from './HeroSlider.module.css'

/** How long each slide holds before the next one wipes in, in ms. The dot's progress bar runs this long. */
const HOLD = 7500
/** The wipe's length, in ms; matches `--wipe` in the stylesheet. */
const WIPE = 1100

/**
 * A slideshow hero: the page's own photo hero, then an announcement slide, and optionally the same
 * announcement over a live globe of East Africa.
 *
 * - The incoming slide wipes in as a growing circle from wherever the change began (the arrow or dot
 *   that was pressed, or the centre on autoplay), while its photo settles from a slow zoom.
 * - Each slide's copy rises word by word and line by line every time it comes in.
 * - The pointer drives a soft green spotlight, a slight parallax on the photo and a tilt on the badge.
 * - Autoplay pauses on hover and focus, the dots show its progress, touch swipes between slides, and
 *   the arrow keys work while focus is inside. Under reduced motion (Android's "Remove animations",
 *   often on in power saving) the slides still change and animate; only the zoom, parallax, tilt and
 *   drifting colour are dropped.
 */
export default function HeroSlider({ page, slide, globe }: { page: DetailPage; slide: HeroSlide; globe?: GlobeSlide }) {
  const { hero } = page
  const ctas = hero.ctas ?? defaultHeroCtas(page.kind)
  const count = globe ? 3 : 2
  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState<number | null>(null)
  const [moved, setMoved] = useState(false)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const swipe = useRef<number | null>(null)
  const timer = useRef<number | undefined>(undefined)

  // On phones the arrows float above the WhatsApp button, but only while the slideshow is on screen.
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const go = useCallback(
    (next: number, origin?: { x: number; y: number }) => {
      const target = (next + count) % count
      if (target === active) return
      const el = ref.current
      if (el) {
        const box = el.getBoundingClientRect()
        const x = origin ? ((origin.x - box.left) / box.width) * 100 : 50
        const y = origin ? ((origin.y - box.top) / box.height) * 100 : 50
        el.style.setProperty('--ox', `${x.toFixed(1)}%`)
        el.style.setProperty('--oy', `${y.toFixed(1)}%`)
      }
      setMoved(true)
      setLeaving(active)
      setActive(target)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setLeaving(null), WIPE)
    },
    [active],
  )

  const from = (e: { currentTarget: Element }) => {
    const r = e.currentTarget.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  }

  // The pointer, as -1..1 from the centre for parallax and tilt, and in px for the spotlight.
  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--cx', `${e.clientX - r.left}px`)
    el.style.setProperty('--cy', `${e.clientY - r.top}px`)
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }

  const onDown = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse') swipe.current = e.clientX
  }
  const onUp = (e: ReactPointerEvent) => {
    if (swipe.current === null) return
    const dx = e.clientX - swipe.current
    swipe.current = null
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1))
  }

  const slideProps = (i: number) => ({
    className: cx(s.slide, i === active && s.active, i === leaving && s.leaving),
    'aria-hidden': i !== active,
    inert: i !== active ? true : undefined,
    role: 'group' as const,
    'aria-roledescription': 'slide',
    'aria-label': `${i + 1} of ${count}`,
  })

  return (
    <section
      ref={ref}
      className={`${s.slider} on-photo`}
      data-band="dark"
      data-moved={moved || undefined}
      data-paused={paused || undefined}
      data-inview={inView || undefined}
      aria-roledescription="carousel"
      aria-label={`${page.name} highlights`}
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(active + 1)
        if (e.key === 'ArrowLeft') go(active - 1)
      }}
    >
      <div className={s.track}>
        {/* Slide 1: the page's own photo hero */}
        <div {...slideProps(0)}>
          <div className={s.bgWrap} aria-hidden>
            <div className={cx(s.bg, s.bgPhoto)} style={{ backgroundImage: `url(${hero.media?.src})` }} />
          </div>
          <div className={s.shadePhoto} aria-hidden />
          <div className={cx('container', s.inner, s.innerPhoto)}>
            <div className={s.copy}>
              <div className={cx('eyebrow', 'eyebrow--bright', s.eyebrow)} data-anim style={d(0)}>
                {hero.eyebrow}
              </div>
              <h1 className={cx('h-page', s.title)}>
                <Words text={hero.title} start={1} />
              </h1>
              <p className={s.lead} data-anim style={d(6)}>
                {hero.intro}
              </p>
              <div className={s.actions} data-anim style={d(7)}>
                {ctas.map((cta) =>
                  isDemoCta(cta) ? (
                    <CornerButton key={cta.label} to={cta.to} onDark className={s.demo}>
                      {cta.label}
                    </CornerButton>
                  ) : (
                    <SmartLink key={cta.label} to={cta.to} className={cx(btnClass('outline-light'), s.ghost)}>
                      <span>{cta.label}</span>
                      <Arrow />
                    </SmartLink>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: the announcement */}
        <div {...slideProps(1)}>
          <div className={s.bgWrap} aria-hidden>
            <div className={cx(s.bg, s.bgAnnounce)} style={{ backgroundImage: `url(${slide.image.src})` }} />
          </div>
          <div className={s.shadeAnnounce} aria-hidden />
          <div className={s.blobs} aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className={cx('container', s.inner, s.innerAnnounce)}>
            <AnnounceCopy slide={slide} />
            <div className={s.badgeWrap} data-anim style={d(4)}>
              <div className={s.badge}>
                <img
                  src={slide.badge.src}
                  alt={slide.badge.alt}
                  width={slide.badge.width}
                  height={slide.badge.height}
                />
                <span className={s.shine} aria-hidden />
              </div>
            </div>
          </div>
          <div className={s.tagline}>
            <strong>{slide.tagline.label}</strong>
            <span>-</span>
            {slide.tagline.text}
          </div>
        </div>

        {/* Slide 3: the announcement over the East Africa globe */}
        {globe && (
          <div {...slideProps(2)}>
            <div className={s.globeBg} aria-hidden />
            <div className={s.blobs} aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <div className={s.globeStage} data-anim style={d(1)}>
              <DotGlobe active={active === 2} />
            </div>
            <div className={cx('container', s.inner, s.innerGlobe)}>
              <AnnounceCopy slide={globe} />
              {globe.badge && (
                <div className={cx(s.badgeWrap, s.globeBadge)} data-anim style={d(4)}>
                  <div className={s.badge}>
                    <img
                      src={globe.badge.src}
                      alt={globe.badge.alt}
                      width={globe.badge.width}
                      height={globe.badge.height}
                    />
                    <span className={s.shine} aria-hidden />
                  </div>
                </div>
              )}
            </div>
            <div className={s.tagline}>
              <strong>{globe.tagline.label}</strong>
              <span>-</span>
              {globe.tagline.text}
            </div>
          </div>
        )}
      </div>

      <div className={s.glow} aria-hidden />

      <div className={cx('container', s.controls)}>
        <div className={s.dots} role="tablist" aria-label="Choose a slide">
          {Array.from({ length: count }, (_, i) => i).map((i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show slide ${i + 1}`}
              className={cx(s.dot, i === active && s.dotActive)}
              onClick={(e) => go(i, from(e))}
            >
              {i === active && (
                <span
                  key={`${active}-${moved}`}
                  className={s.progress}
                  style={{ animationDuration: `${HOLD}ms` }}
                  onAnimationEnd={() => go(active + 1)}
                />
              )}
            </button>
          ))}
        </div>
        <div className={s.arrows}>
          <Magnetic>
            <button
              type="button"
              className={s.arrow}
              aria-label="Previous slide"
              onClick={(e) => go(active - 1, from(e))}
            >
              <Arrow back />
            </button>
          </Magnetic>
          <Magnetic>
            <button type="button" className={s.arrow} aria-label="Next slide" onClick={(e) => go(active + 1, from(e))}>
              <Arrow />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

/** The announcement copy: shield and headline, subtitle, body and buttons. */
function AnnounceCopy({ slide }: { slide: GlobeSlide }) {
  return (
    <div className={s.copy}>
      <div className={s.headline}>
        <span className={s.shieldWrap} data-anim style={d(0)}>
          <Shield />
        </span>
        <h2 className={s.announceTitle}>
          <Words text={slide.title} highlight={slide.highlight} start={1} />
        </h2>
      </div>
      <p className={s.subtitle} data-anim style={d(7)}>
        {slide.subtitle}
      </p>
      <p className={s.lead} data-anim style={d(8)}>
        {slide.body}
      </p>
      <div className={s.actions} data-anim style={d(9)}>
        {slide.ctas.map((cta) =>
          isDemoCta(cta) ? (
            <CornerButton key={cta.label} to={cta.to} onDark className={s.demo}>
              {cta.label}
            </CornerButton>
          ) : (
            <SmartLink key={cta.label} to={cta.to} className={cx(btnClass('outline-light'), s.ghost)}>
              <span>{cta.label}</span>
              <Arrow />
            </SmartLink>
          ),
        )}
      </div>
    </div>
  )
}

/** The CSS stagger step for an animated element. */
function d(i: number): CSSProperties {
  return { '--d': i } as CSSProperties
}

/**
 * A heading split into words, each rising out of its own mask when its slide comes in. The words
 * named in `highlight` turn green. Spaces stay plain text, so the heading reads as one sentence.
 */
function Words({ text, highlight, start = 0 }: { text: string; highlight?: string; start?: number }) {
  const lit = new Set((highlight ?? '').split(/\s+/).filter(Boolean))
  const words = text.trim().split(/\s+/)
  const out: ReactNode[] = []
  words.forEach((w, i) => {
    if (i) out.push(' ')
    out.push(
      <span key={i} className={s.mask}>
        <span className={cx(s.word, lit.has(w) && s.lit)} style={d(start + i * 0.5)}>
          {w}
        </span>
      </span>,
    )
  })
  return <>{out}</>
}

/** Follows the pointer a little while it is over the control, and springs back when it leaves. */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  return (
    <span
      ref={ref}
      className={s.magnet}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.35}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`
      }}
      onPointerLeave={() => ref.current && (ref.current.style.transform = '')}
    >
      {children}
    </span>
  )
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg className={cx(s.arrowIcon, back && s.arrowBack)} viewBox="0 0 20 20" width="18" height="18" aria-hidden>
      <path
        d={back ? 'M16 10H5M9 5l-5 5 5 5' : 'M4 10h11M11 5l5 5-5 5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Shield() {
  return (
    <svg className={s.shield} viewBox="0 0 64 72" aria-hidden>
      <path d="M32 3 6 13v19c0 17 11 30 26 37 15-7 26-20 26-37V13L32 3Z" fill="#4fb848" />
      <path d="M32 9 11 17v15c0 14 9 25 21 31 12-6 21-17 21-31V17L32 9Z" fill="#3fa23a" />
      <path
        className={s.check}
        d="M21 36l8 8 15-16"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
