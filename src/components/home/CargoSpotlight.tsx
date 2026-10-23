import { cargoFeature } from '../../data/content'
import { anchors, routes } from '../../data/site'
import { cx } from '../../lib/cx'
import Media from '../Media'
import Reveal from '../Reveal'
import SmartLink from '../SmartLink'
import CornerButton from '../ui/corner-button'
import s from './CargoSpotlight.module.css'

/**
 * The product the client is fronting, as one rounded white panel straight after the platform
 * tabs: the e-lock photo beside the pitch, three reasons, and the way in or a demo.
 */
export default function CargoSpotlight() {
  return (
    <section className={cx('container', s.section)} aria-labelledby="cargo-spotlight-title">
      <Reveal className={s.panel} data-band="light">
        <div className={s.copy}>
          <div className="eyebrow eyebrow--rule eyebrow--bright">{cargoFeature.eyebrow}</div>
          <h2 id="cargo-spotlight-title" className="h-section">
            {cargoFeature.title}
          </h2>
          <p className={s.body}>{cargoFeature.body}</p>
          <ul className={s.points}>
            {cargoFeature.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className={s.actions}>
            <CornerButton to={cargoFeature.to} className={s.cta}>
              {cargoFeature.ctaLabel}
            </CornerButton>
            <SmartLink to={`${routes.contact}#${anchors.demo}`} className="link-arrow link-arrow--bright">
              Book a demo →
            </SmartLink>
          </div>
        </div>
        <div className={s.mediaWrap}>
          <Media
            image={cargoFeature.image}
            video={{
              src: '/videos/cargo-spotlight.mp4',
              poster: '/videos/cargo-spotlight-poster.webp',
              alt: 'An e-lock glows on a container as the truck travels, tracked routes spread across East Africa, and an officer clears the lock at a bonded warehouse',
            }}
            ratio="1 / 1"
            radius={20}
            dark
            className={s.media}
          />
        </div>
      </Reveal>
    </section>
  )
}
