import { Link } from 'react-router-dom'
import Media from '../components/Media'
import Reveal from '../components/Reveal'
import SolutionCard from '../components/SolutionCard'
import { img } from '../data/images'
import { industries } from '../data/industries'
import { findPillar } from '../data/pillars'
import { usePageMeta } from '../hooks/usePageMeta'
import { cx } from '../lib/cx'
import s from './SolutionsPage.module.css'

/** The design closes the page with a customer story band; the dash camera pillar's headline and body tell it. */
const story = findPillar('driver-safety-dash-cameras')!

export default function SolutionsPage() {
  usePageMeta({
    title: 'Solutions',
    description:
      'Fleet management solutions for oil and gas, trucking and logistics, public transport, government, NGOs, food and manufacturing, EV fleets and more across East Africa.',
  })

  return (
    <div className={s.page}>
      <section className={s.band}>
        <div className={cx('container', s.bandInner)}>
          <div className="eyebrow eyebrow--rule">Solutions</div>
          <h1 className="h-page">Built for the industries that keep East Africa moving.</h1>
          <p className={s.lead}>
            From oil and gas convoys to city buses and NGO field teams, Smartwatch adapts to how your
            operation runs.
          </p>
        </div>
      </section>

      <div className={s.body}>
        <section className={cx('container', s.gridWrap)} aria-label="Solutions by industry">
          <Reveal stagger className={s.grid}>
            {industries.map((industry) => (
              <SolutionCard key={industry.to} page={industry} />
            ))}
          </Reveal>
        </section>

        <section className={s.story}>
          <div className={cx('container', s.storyGrid)}>
            <Reveal className={s.storyCopy}>
              <div className="eyebrow eyebrow--chip">Driver safety</div>
              <h2 className="h-section">{story.headline}</h2>
              <p className="lead">{story.body}</p>
              <div>
                <Link to={story.to} className="link-arrow">
                  See dash cameras →
                </Link>
              </div>
            </Reveal>
            <Media image={img.busPassengerCounting} ratio="4 / 3" radius={20} />
          </div>
        </section>
      </div>
    </div>
  )
}
