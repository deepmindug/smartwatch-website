import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../lib/cx'
import s from './Placeholder.module.css'

type Props = {
  /** What will eventually go here, e.g. "hero video: fleet on the road". */
  label: string
  /** CSS aspect-ratio, e.g. "4 / 3". Omit when a fixed height is set via className. */
  ratio?: string
  dark?: boolean
  radius?: number
  /** Stripe width in px; the design uses 8, 10 or 12 depending on the slot size. */
  stripe?: number
  className?: string
  children?: ReactNode
}

/**
 * Striped image slot, exactly as drawn in the design. Swap each one for real media later.
 */
export default function Placeholder({
  label,
  ratio,
  dark = false,
  radius = 20,
  stripe = 12,
  className,
  children,
}: Props) {
  const style = {
    aspectRatio: ratio,
    borderRadius: radius,
    '--stripe': `${stripe}px`,
  } as CSSProperties
  return (
    <div className={cx(s.slot, dark && s.dark, className)} style={style}>
      <span className={s.label}>{label}</span>
      {children}
    </div>
  )
}
