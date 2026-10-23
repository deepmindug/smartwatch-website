import { routes } from '../../data/site'
import type { Cta, DetailPage } from '../../data/types'
import { cx } from '../../lib/cx'

export type CtaBandProps = { title: string; body: string; ctas: Cta[] }

export const defaultCta: CtaBandProps = {
  title: 'See it in action.',
  body: 'A 30-minute walkthrough with our Kampala or Nairobi team, on your fleet and your routes.',
  ctas: [
    { label: 'Get a demo', to: routes.contact, variant: 'primary' },
    { label: 'Talk to support', to: `${routes.contact}#support`, variant: 'outline' },
  ],
}

/** The demo CTA gets the animated corner button everywhere it appears. */
export function isDemoCta(cta: Cta): boolean {
  return /get a demo/i.test(cta.label)
}

export function btnClass(variant: Cta['variant'] = 'primary'): string {
  return cx('btn', `btn--${variant}`)
}

/**
 * The white outline was drawn for dark bands; on a light surface (every hero and the closing panel
 * now) it would vanish, so it becomes the ordinary outline there.
 */
export function onLight(variant: Cta['variant'] = 'primary'): Cta['variant'] {
  return variant === 'outline-light' ? 'outline' : variant
}

/** Hero buttons when a page defines none. No demo button here: the closing band carries it. */
export function defaultHeroCtas(kind: DetailPage['kind']): Cta[] {
  if (kind === 'product') return [{ label: 'View hardware', to: routes.hardware, variant: 'outline-light' }]
  if (kind === 'solution') return [{ label: 'All solutions', to: routes.solutions, variant: 'outline-light' }]
  return []
}
