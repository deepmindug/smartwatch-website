import { useEffect, useState } from 'react'
import { cx } from '../../lib/cx'
import s from './typing-text.module.css'

type Props = {
  text: string
  /** A part of the text set in the accent colour as it is typed. */
  highlight?: string
  /** Milliseconds per character while typing. */
  speed?: number
  /** How long the full line holds before it is erased and typed again. */
  hold?: number
  className?: string
}

/**
 * Types a line out character by character behind a blinking caret, holds it, erases it and types it
 * again. Screen readers get the whole line once, from the label; the typed letters are hidden from them.
 * It types on every device, including phones with Android's "Remove animations" or power saving on: that
 * setting reports reduced motion, and treating it as "show the line still" left the A32 with no effect at all.
 */
export default function TypingText({ text, highlight, speed = 55, hold = 4000, className }: Props) {
  const [count, setCount] = useState(0)
  const [erasing, setErasing] = useState(false)

  useEffect(() => {
    let delay = erasing ? speed / 2 : speed
    if (!erasing && count === text.length) delay = hold
    if (erasing && count === 0) delay = 600
    const id = setTimeout(() => {
      if (!erasing && count === text.length) setErasing(true)
      else if (erasing && count === 0) setErasing(false)
      else setCount((n) => n + (erasing ? -1 : 1))
    }, delay)
    return () => clearTimeout(id)
  }, [count, erasing, text, speed, hold])

  const shown = count
  const start = highlight ? text.indexOf(highlight) : -1
  const end = start >= 0 ? start + highlight!.length : -1
  const before = text.slice(0, Math.min(shown, start >= 0 ? start : shown))
  const mark = start >= 0 && shown > start ? text.slice(start, Math.min(shown, end)) : ''
  const after = start >= 0 && shown > end ? text.slice(end, shown) : ''

  return (
    <span className={cx(s.root, className)} aria-label={text} role="text">
      {/* The full line, invisible, holds the box at its final size while the letters arrive. */}
      <span className={s.ghost} aria-hidden="true">
        {text}
      </span>
      <span className={s.typed} aria-hidden="true">
        {before}
        {mark && <span className={s.mark}>{mark}</span>}
        {after}
        <span className={s.caret} />
      </span>
    </span>
  )
}
