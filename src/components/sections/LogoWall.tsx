import { cx } from '../../lib/cx'
import s from './Sections.module.css'

type Props = { items: string[]; id?: string; title?: string; label?: string; dark?: boolean }

/** Row of customer name tiles (the client has no licensed logo files yet). */
export default function LogoWall({ items, id, title, label = 'Customer logos', dark = false }: Props) {
  return (
    <section id={id} className={cx('container', s.section, s.logosSection)} aria-label={label}>
      {title && <div className={cx('eyebrow', dark && 'eyebrow--bright', s.logosTitle)}>{title}</div>}
      <div className={s.logos}>
        {items.map((name) => (
          <div key={name} className={cx(s.logo, dark && s.logoDark)}>
            {name}
          </div>
        ))}
      </div>
    </section>
  )
}
