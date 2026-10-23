import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'
import { cx } from '../lib/cx'
import s from './WhatsAppButton.module.css'

/**
 * The WhatsApp glyph (speech bubble with handset), drawn in currentColor. WhatsApp's brand guidelines
 * allow the mark on buttons that start a WhatsApp chat, which is all it is used for here.
 */
export function WhatsAppMark({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

/** The close cross shown on the badge while the card is open. */
function CloseMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

/**
 * Floating WhatsApp button. The card with a line per region pops up open each time a page loads (the
 * layout remounts this for every page); the badge then toggles it, and Escape or a click elsewhere closes it.
 */
export default function WhatsAppButton() {
  const [open, setOpen] = useState(true)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <aside ref={root} className={s.root} aria-label="Chat with Smartwatch on WhatsApp">
      {open && (
        <div className={s.card} id="whatsapp-card">
          <div className={s.cardTitle}>Chat with us on WhatsApp</div>
          <p className={s.cardBody}>Pick the line nearest to you.</p>
          {site.whatsapp.map((line) => (
            <a key={line.href} href={line.href} target="_blank" rel="noopener noreferrer" className={s.line}>
              <span className={s.lineCountry}>{line.country}</span>
              <span className={s.lineNumber}>{line.label}</span>
            </a>
          ))}
        </div>
      )}
      <button
        type="button"
        className={cx(s.badge, s.toggle, open && s.badgeOpen)}
        aria-expanded={open}
        aria-controls={open ? 'whatsapp-card' : undefined}
        aria-label={open ? 'Close the WhatsApp lines' : 'Chat with us on WhatsApp'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseMark /> : <WhatsAppMark size={30} />}
      </button>
    </aside>
  )
}
