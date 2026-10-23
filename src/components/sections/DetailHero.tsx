import { useRef } from 'react'
import type { DetailPage } from '../../data/types'
import { cx } from '../../lib/cx'
import { useEntrance } from '../../motion/useEntrance'
import Media from '../Media'
import HeroSlider from './HeroSlider'
import SmartLink from '../SmartLink'
import CornerButton from '../ui/corner-button'
import StaggerText from '../ui/stagger-text'
import TypingText from '../ui/typing-text'
import { btnClass, defaultHeroCtas, isDemoCta, onLight } from './cta'
import s from './Sections.module.css'

export default function DetailHero({ page }: { page: DetailPage }) {
  const { hero } = page
  const tone = hero.tone ?? 'dark'
  const ctas = hero.ctas ?? defaultHeroCtas(page.kind)
  // Every hero is the white page design now; only a photo hero paints dark, its photo under a soft neutral shade.
  const photo = tone === 'photo' && hero.media
  const light = !photo
  const ref = useRef<HTMLElement>(null)
  // The eyebrow sits still as a label; the headline rises word by word, then the rest follows.
  useEntrance(ref, { delay: 0.3 })
  // A photo hero with a second slide becomes the two-slide slideshow.
  if (photo && hero.slide) return <HeroSlider page={page} slide={hero.slide} globe={hero.globe} />
  return (
    <section
      ref={ref}
      className={cx(s.hero, photo && s.heroPhoto, photo && 'on-photo', hero.compact && s.heroCompact)}
      style={photo ? { backgroundImage: `url(${hero.media!.src})` } : undefined}
      data-band={light ? 'light' : 'dark'}
    >
      <div className={cx('container', s.heroInner)}>
        <div className={s.heroCopy}>
          {hero.announce && (
            <div className={s.heroAnnounce}>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={s.heroAnnounceIcon}
              >
                <path d="M12 3l8 3.5v5.5c0 4.8-3.4 8.3-8 9-4.6-.7-8-4.2-8-9V6.5z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <TypingText text={hero.announce.text} highlight={hero.announce.highlight} />
            </div>
          )}
          <div className={cx('eyebrow', !light && 'eyebrow--bright')}>{hero.eyebrow}</div>
          <h1 className="h-page">
            <StaggerText>{hero.title}</StaggerText>
          </h1>
          <p className={s.heroLead} data-enter>
            {hero.intro}
          </p>
          {ctas.length > 0 && (
            <div className={s.heroActions} data-enter>
              {ctas.map((cta) =>
                isDemoCta(cta) ? (
                  <CornerButton key={cta.label} to={cta.to} onDark={!light} className={s.heroDemo}>
                    {cta.label}
                  </CornerButton>
                ) : (
                  <SmartLink
                    key={cta.label}
                    to={cta.to}
                    className={btnClass(light ? onLight(cta.variant) : cta.variant)}
                  >
                    {cta.label}
                  </SmartLink>
                ),
              )}
            </div>
          )}
        </div>
        {!photo && (
          <div data-enter-media>
            <Media
              image={hero.media}
              video={hero.video}
              label={hero.mediaLabel ?? `${page.name} image`}
              ratio="4 / 3"
              radius={24}
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
