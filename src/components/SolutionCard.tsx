import type { PageRef } from '../data/pages'
import { cx } from '../lib/cx'
import Media from './Media'
import SmartLink from './SmartLink'
import s from './SolutionCard.module.css'

/** The design's industry card: photo on top, name, one line, "Explore →". Used on the solutions index and the home strip. */
export default function SolutionCard({ page }: { page: PageRef }) {
  return (
    <SmartLink to={page.to} className={cx(s.card, 'lift')}>
      <div className={s.photo}>
        <Media image={page.image} label={page.name} ratio="16 / 10" radius={0} decorative stripe={10} />
      </div>
      <div className={s.body}>
        <div className={s.name}>{page.name}</div>
        {page.short && <div className={s.text}>{page.short}</div>}
        <div className={s.more}>
          Explore <span className={s.arrow}>→</span>
        </div>
      </div>
    </SmartLink>
  )
}
