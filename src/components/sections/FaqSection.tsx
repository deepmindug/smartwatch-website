import { useId, useState } from 'react'
import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import SectionHead from './SectionHead'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'faq' }> }

export default function FaqSection({ section }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <SectionHead
        eyebrow={section.eyebrow}
        title={section.title ?? 'Frequently asked questions'}
        intro={section.intro}
      />
      <div className={s.faq}>
        {section.items.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q} className={s.faqItem}>
              <button
                type="button"
                className={s.faqBtn}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className={cx(s.faqIcon, isOpen && s.faqIconOpen)} aria-hidden="true" />
              </button>
              {/* Always mounted so the panel can ease shut; closed ones leave the a11y tree and tab order. */}
              <div
                id={`${baseId}-a-${i}`}
                className={cx(s.faqPanel, isOpen && s.faqPanelOpen)}
                aria-hidden={!isOpen}
                inert={!isOpen}
              >
                <div className={s.faqPanelClip}>
                  <p className={s.faqPanelBody}>{item.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
