import { Fragment, useEffect, useRef, useState } from 'react'
import { cargoFeature, heroWords, kraVendor } from '../../data/content'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import { useEntrance } from '../../motion/useEntrance'
import SmartLink from '../SmartLink'
import CornerButton from '../ui/corner-button'
import CursorCard from '../ui/cursor-card'
import StaggerText from '../ui/stagger-text'
import s from './Hero.module.css'

/** A muted, looping clip of a car on a city street; the poster stands in until it plays. */
const video = { src: '/videos/hero.mp4', poster: '/videos/hero-poster.webp' }

/** How long each key word in the lead stays underlined; hovering one previews its product. */
const WORD_INTERVAL = 3000

/** The headline rises word by word on its own; the lead, button and photo follow it. */
const ENTRANCE_DELAY = 0.3

/** ", " between words, ", and " before the last one. */
function separator(index: number, total: number) {
  if (index >= total - 1) return ''
  return index === total - 2 ? ', and ' : ', '
}

export default function Hero() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLElement>(null)
  useEntrance(ref, { delay: ENTRANCE_DELAY })

  // The clip and the word cycle run for everyone. Android's "Remove animations" setting (often on with
  // power saving) asks for reduced motion, and honouring it here left phones with a still and no cycle.
  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % heroWords.length), WORD_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={s.hero} data-band="light" ref={ref}>
      <div className={cx('container', s.inner)}>
        <div className={s.copy}>
          <SmartLink to={cargoFeature.to} className={s.pill} data-enter>
            <span className={s.pillTag}>{cargoFeature.pill.tag}</span>
            <span className={s.pillText}>{cargoFeature.pill.text}</span>
            <span aria-hidden="true">→</span>
          </SmartLink>
          <h1 className={cx('h-display', s.title)}>
            <StaggerText className={s.titleLead}>A decade of connecting and</StaggerText>{' '}
            <StaggerText delay={0.2} className={s.titleKey}>
              protecting fleets.
            </StaggerText>
          </h1>
          <p className={s.lead} data-enter>
            One platform to help improve the{' '}
            {heroWords.map(({ word, image, description, to }, i) => (
              <Fragment key={word}>
                <CursorCard
                  to={to}
                  image={image}
                  description={description}
                  className={cx(s.word, i === active && s.wordOn)}
                >
                  {word}
                </CursorCard>
                {separator(i, heroWords.length)}
              </Fragment>
            ))}{' '}
            of your operations across East Africa.
          </p>
          <div className={s.actions} data-enter>
            <CornerButton to={routes.products} className={s.cta}>
              Explore products
            </CornerButton>
          </div>
        </div>

        <div className={s.mediaWrap}>
          <div className={s.media} data-enter-media>
            <video
              className={s.video}
              src={video.src}
              poster={video.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <SmartLink
              to={kraVendor.to}
              className={s.cert}
              aria-label={`${kraVendor.name}: approved by the ${kraVendor.issuer}`}
            >
              <img
                src={kraVendor.heroBadge.src}
                alt=""
                width={kraVendor.heroBadge.width}
                height={kraVendor.heroBadge.height}
                decoding="async"
                className={s.certBadge}
              />
              <svg className={s.certTick} viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10.8" />
                <path d="M7 12.5l3.2 3.2L17 9" />
              </svg>
            </SmartLink>
            <div className={s.alert}>
              <span className={s.alertDot} aria-hidden="true" />
              <div className={s.alertText}>
                <span className={s.alertTitle}>Container Open Alert cleared</span>
                <span className={s.alertMeta}>UBH 412K · Jinja Rd · 2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
