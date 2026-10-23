import { useRef } from 'react'
import { formatStat } from '../../data/site'
import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import { useCountUp } from '../../motion/useCountUp'
import SectionHead from './SectionHead'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'stats' }> }

export default function StatsSection({ section }: Props) {
  const ref = useRef<HTMLElement>(null)
  useCountUp(ref)
  return (
    <section id={section.id} className={cx('container', s.section)} ref={ref}>
      <SectionHead eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
      <div className={s.stats}>
        {section.items.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <div
              className={s.statValue}
              data-count={stat.value}
              data-prefix={stat.prefix ?? ''}
              data-suffix={stat.suffix ?? ''}
            >
              {formatStat(stat)}
            </div>
            <div className={s.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
