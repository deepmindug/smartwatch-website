import { Link } from 'react-router-dom'
import { whys } from '../../data/content'
import { img } from '../../data/images'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import Media from '../Media'
import s from './WhySmartwatch.module.css'

export default function WhySmartwatch() {
  return (
    <section className={s.section}>
      <div className={cx('container', s.grid)}>
        <Media
          image={img.fleetSunset}
          video={{
            src: '/images/why-smartwatch.mp4',
            poster: '/images/why-smartwatch-poster.webp',
            alt: 'Smartwatch Solutions since 2011: cargo cleared at a border post, e-seals on containers, routes across East Africa and a driver checking a tracker',
          }}
          ratio="16 / 9"
          radius={20}
        />
        <div className={s.copy}>
          <div className="eyebrow eyebrow--rule">Why Smartwatch</div>
          <h2 className="h-section">East Africa's leading provider of fleet and mobile asset management since 2011.</h2>
          <p className="lead">
            Proven Software-as-a-Service and IoT-based SMART solutions, built for the realities of operating in Uganda,
            Kenya and the wider region. Affordable, user-friendly, and backed by 24/7 support.
          </p>
          <div className={s.whys}>
            {whys.map((w) => (
              <div key={w.title} className={s.why}>
                <div className={s.whyTitle}>{w.title}</div>
                <div className={s.whyBody}>{w.body}</div>
              </div>
            ))}
          </div>
          <div>
            <Link to={routes.about} className="link-arrow">
              More about us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
