import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import SmartLink from '../SmartLink'
import SectionHead from './SectionHead'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'links' }> }

export default function LinksSection({ section }: Props) {
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <SectionHead
        eyebrow={section.eyebrow}
        title={section.title ?? 'Explore more'}
        intro={section.intro}
      />
      <div className={s.links}>
        {section.columns.map((col) => (
          <div key={col.title} className={s.linkCol}>
            <div className={s.linkColTitle}>{col.title}</div>
            <ul className={s.linkList}>
              {col.links.map((link) => (
                <li key={link.to + link.label}>
                  <SmartLink to={link.to} className={s.link}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
