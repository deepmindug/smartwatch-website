import { useState } from 'react'
import { Link } from 'react-router-dom'
import { partnerLogos } from '../../data/logos'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import LogoMarquee from './LogoMarquee'
import s from './Customers.module.css'

const half = Math.ceil(partnerLogos.length / 2)

/** The partner logos split over two rows that travel in opposite directions. */
const rows = [partnerLogos.slice(0, half), partnerLogos.slice(half)]

/**
 * The copy sits in the page column; the two logo rows run the full width of the screen beneath it.
 * Hover and focus pause them for a pointer, and the button holds them still for everyone else (a
 * moving strip needs a way to stop it: WCAG 2.2.2).
 */
export default function Customers() {
  const [paused, setPaused] = useState(false)
  return (
    <section className={s.section}>
      <div className={cx('container', s.copy)}>
        <div className="eyebrow eyebrow--rule">Our customers</div>
        <h2 className="h-section">Trusted by local and international partners.</h2>
        <p className={s.body}>800+ companies, from small businesses to large enterprises, run their fleets on Smartwatch.</p>
        <div className={s.links}>
          <Link to={routes.solutions} className="link-arrow">
            Explore success stories →
          </Link>
        </div>
      </div>
      <div className={s.rows} role="region" aria-label="Customer logos">
        <LogoMarquee logos={rows[0]} direction="left" paused={paused} />
        <LogoMarquee logos={rows[1]} direction="right" paused={paused} />
      </div>
      <div className={cx('container', s.controls)}>
        <button type="button" className={s.toggle} onClick={() => setPaused((p) => !p)}>
          <svg className={s.toggleIcon} viewBox="0 0 12 12" aria-hidden="true">
            {paused ? <path d="M3 1.5v9l7.5-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
          </svg>
          {paused ? 'Play customer logos' : 'Pause customer logos'}
        </button>
      </div>
    </section>
  )
}
