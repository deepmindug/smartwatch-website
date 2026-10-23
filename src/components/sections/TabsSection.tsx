import { useId, useState } from 'react'
import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import SectionHead from './SectionHead'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'tabs' }> }

export default function TabsSection({ section }: Props) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tab = section.tabs[active]
  const paragraphs = Array.isArray(tab.body) ? tab.body : [tab.body]
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <SectionHead eyebrow={section.eyebrow} title={section.title} intro={section.intro} center />
      <div className={s.tabs} role="tablist" aria-label={section.title ?? 'Options'}>
        {section.tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel`}
            className={cx(s.tab, i === active && s.tabOn)}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        key={active}
        className={s.tabPanel}
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
      >
        <h3 className={s.tabTitle}>{tab.title ?? tab.label}</h3>
        {paragraphs.map((p) => (
          <p key={p} className="lead">
            {p}
          </p>
        ))}
        {tab.points && (
          <ul className="checklist">
            {tab.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
