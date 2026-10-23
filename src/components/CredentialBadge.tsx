import { Link } from 'react-router-dom'
import { kraVendor } from '../data/content'
import { cx } from '../lib/cx'
import s from './CredentialBadge.module.css'

type Props = {
  /** The badge sits on a green band: the type goes white, and the seal keeps its white ground. */
  onDark?: boolean
  className?: string
}

/**
 * The KRA seal: the lion in a white disc, and the standing it certifies set beside it in two short
 * lines. The whole thing links to the awards section of the About page, where the approval is
 * explained next to the KPMG award.
 */
export default function CredentialBadge({ onDark = false, className }: Props) {
  return (
    <Link to={kraVendor.to} className={cx(s.badge, onDark && s.onDark, className)}>
      <span className={s.seal}>
        <img
          src={kraVendor.mark.src}
          alt=""
          width={kraVendor.mark.width}
          height={kraVendor.mark.height}
          decoding="async"
          className={s.mark}
        />
      </span>
      <span className={s.text}>
        <span className={s.title}>{kraVendor.name}</span>
        <span className={s.issuer}>{kraVendor.issuer}</span>
      </span>
    </Link>
  )
}
