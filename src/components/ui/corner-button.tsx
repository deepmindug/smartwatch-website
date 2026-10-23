import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import SmartLink from '../SmartLink'
import s from './corner-button.module.css'

/*
 * Vendored from the VengeanceUI registry:
 * https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/corner-button.json
 *
 * The hover choreography is kept whole: four dots fly out from the pill to the wrapper's
 * corners one after another, the dashed frame draws itself in around them, and the wrapper
 * finally washes in the accent glow while the pill squares off slightly and turns white.
 * Adapted for this site:
 *   - with `to` it renders a SmartLink (router link or external anchor); without, a <button>
 *     so forms can submit through it
 *   - the inline <style> tag becomes a CSS module on the site tokens: a flat brand-navy pill with a large white
 *     label (white on dark surfaces), instead of the original's translucent black
 *   - the default pencil icon is dropped; an icon can still be passed
 *   - a compact size fits the 64px header, `onDark` lightens the frame on dark surfaces, and
 *     reduced motion keeps only the colour change
 */

type Props = {
  children: ReactNode
  /** Where the button goes. Without it the button is a plain <button>. */
  to?: string
  type?: 'button' | 'submit'
  icon?: ReactNode
  size?: 'md' | 'sm'
  /** The button sits on a dark surface: the dots and dashed frame turn light. */
  onDark?: boolean
  className?: string
}

export default function CornerButton({
  children,
  to,
  type = 'button',
  icon,
  size = 'md',
  onDark = false,
  className,
}: Props) {
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  )

  return (
    <span
      className={cx(s.wrapper, size === 'sm' && s.sm, onDark && s.onDark, className)}
    >
      <span className={cx(s.line, s.horizontal, s.top)} aria-hidden="true" />
      <span className={cx(s.line, s.vertical, s.right)} aria-hidden="true" />
      <span className={cx(s.line, s.horizontal, s.bottom)} aria-hidden="true" />
      <span className={cx(s.line, s.vertical, s.left)} aria-hidden="true" />

      <span className={cx(s.dot, s.top, s.left)} aria-hidden="true" />
      <span className={cx(s.dot, s.top, s.right)} aria-hidden="true" />
      <span className={cx(s.dot, s.bottom, s.right)} aria-hidden="true" />
      <span className={cx(s.dot, s.bottom, s.left)} aria-hidden="true" />

      {to ? (
        <SmartLink to={to} className={s.button}>
          {content}
        </SmartLink>
      ) : (
        <button type={type} className={s.button}>
          {content}
        </button>
      )}
    </span>
  )
}
