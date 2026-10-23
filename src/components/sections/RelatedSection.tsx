import { resolvePage } from '../../data/pages'
import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import Media from '../Media'
import SmartLink from '../SmartLink'
import SectionHead from './SectionHead'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'related' }> }

export default function RelatedSection({ section }: Props) {
  const pages = section.slugs.map(resolvePage)
  return (
    <section id={section.id} className={cx('container', s.section)} aria-label="Related pages">
      <SectionHead eyebrow={section.eyebrow} title={section.title ?? 'Explore more'} intro={section.intro} />
      <div className={cx(s.cards, s[`cols${Math.min(pages.length, 4) as 2 | 3 | 4}`])}>
        {pages.map((page) => (
          <SmartLink key={page.to} to={page.to} className={cx(s.card, s.cardLink, s.cardRelated, 'lift')}>
            <Media
              image={page.image}
              label={page.name}
              ratio="16 / 10"
              radius={12}
              decorative
              className={s.cardImage}
            />
            <div className={s.cardTitle}>{page.name}</div>
            {page.short && <p className={s.cardBody}>{page.short}</p>}
            <span className={s.cardMore}>Explore →</span>
          </SmartLink>
        ))}
      </div>
    </section>
  )
}
