import { cx } from '../../lib/cx'
import s from './Sections.module.css'

type Props = { eyebrow?: string; title?: string; intro?: string; center?: boolean; light?: boolean }

/** Splits "Bold part: regular part" the way the guide sets its titles; titles without a colon stay whole. */
function splitTitle(title: string): [string, string | null] {
  const i = title.indexOf(': ')
  return i > 0 ? [title.slice(0, i + 1), title.slice(i + 2)] : [title, null]
}

export default function SectionHead({ eyebrow, title, intro, center = false, light = false }: Props) {
  if (!eyebrow && !title && !intro) return null
  const [bold, rest] = title ? splitTitle(title) : ['', null]
  return (
    <div className={cx(s.head, center && s.headCenter)}>
      {eyebrow && <div className={cx('eyebrow', 'eyebrow--rule', light && 'eyebrow--bright')}>{eyebrow}</div>}
      {title && (
        <h2 className="h-section">
          {bold}
          {rest && <span className="h-light"> {rest}</span>}
        </h2>
      )}
      {intro && <p className={cx('lead', light && s.leadLight)}>{intro}</p>}
    </div>
  )
}
