import { Link } from 'react-router-dom'
import { solutionRefs } from '../../data/pages'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import SolutionCard from '../SolutionCard'
import s from './IndustriesStrip.module.css'

/** The eight industries the design shows on the home page, in its order. */
const homeSlugs = [
  'oil-and-gas',
  'trucking-and-logistics',
  'bus-and-public-transport',
  'government',
  'field-service',
  'food-manufacturing',
  'ngo-satellite-tracking',
  'ev-fleet-management',
]
const homeIndustries = homeSlugs.map((slug) => solutionRefs.find((ref) => ref.to === routes.solution(slug))).filter(Boolean)

export default function IndustriesStrip() {
  return (
    <section className={cx('container', s.section)}>
      <div className={s.head}>
        <div className={s.headCopy}>
          <div className="eyebrow eyebrow--rule">Who we serve</div>
          <h2 className="h-section">Solutions for every industry in the physical economy.</h2>
        </div>
        <Link to={routes.solutions} className="link-arrow">
          View all industries →
        </Link>
      </div>
      <div className={s.grid}>
        {homeIndustries.map((industry) => (
          <SolutionCard key={industry!.to} page={industry!} />
        ))}
      </div>
    </section>
  )
}
