import type { CardItem, Section } from '../../data/types'
import { cx } from '../../lib/cx'
import Icon from '../Icon'
import Media from '../Media'
import Reveal from '../Reveal'
import SmartLink from '../SmartLink'
import SectionHead from './SectionHead'
import s from './Sections.module.css'

/** 'product' is the Products page's platform grid: large icon tiles, heading-face titles, a centred last row. */
export type CardVariant = 'default' | 'product'

type Props = { section: Extract<Section, { kind: 'cards' }>; variant?: CardVariant }

export function Card({ item, variant = 'default' }: { item: CardItem; variant?: CardVariant }) {
  const product = variant === 'product'
  const inner = (
    <>
      {item.icon && (
        <span className={s.cardIcon}>
          <Icon name={item.icon} size={product ? 32 : 22} />
        </span>
      )}
      {(item.image || item.imageLabel) && (
        <Media
          image={item.image}
          label={item.imageLabel}
          ratio="16 / 10"
          radius={12}
          decorative
          className={s.cardImage}
        />
      )}
      <div className={s.cardTitle}>{item.title}</div>
      {item.body && <p className={s.cardBody}>{item.body}</p>}
      {item.points && (
        <ul className={cx('checklist', s.cardPoints)}>
          {item.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {item.href && <span className={s.cardMore}>Learn more →</span>}
    </>
  )
  const className = cx(s.card, product && s.cardProduct)
  return item.href ? (
    <SmartLink to={item.href} className={cx(className, s.cardLink, 'lift')}>
      {inner}
    </SmartLink>
  ) : (
    <div className={className}>{inner}</div>
  )
}

export default function CardsSection({ section, variant = 'default' }: Props) {
  const columns = section.columns ?? (section.items.length === 4 ? 2 : 3)
  const grid = variant === 'product' ? s.cardsProduct : s[`cols${columns}`]
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <SectionHead eyebrow={section.eyebrow} title={section.title} intro={section.intro} center={section.center} />
      {section.lead && (
        <Reveal className={cx(s.card, s.cardLead)}>
          <h2 className={s.cardTitle}>{section.lead.title}</h2>
          <p className={s.cardLeadText}>{section.lead.statement}</p>
        </Reveal>
      )}
      <Reveal stagger className={cx(s.cards, grid, section.center && s.cardsCenter)}>
        {section.items.map((item) => (
          <Card key={item.title} item={item} variant={variant} />
        ))}
      </Reveal>
    </section>
  )
}
