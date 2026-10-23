import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import SectionHead from './SectionHead'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'bullets' }> }

export default function BulletsSection({ section }: Props) {
  const columns = section.columns ?? 1
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <SectionHead eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
      <ul className={cx('checklist', 'checklist--lg', s.bullets, s[`bulletsCols${columns}`])}>
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
