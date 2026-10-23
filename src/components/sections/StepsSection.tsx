import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import SectionHead from './SectionHead'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'steps' }> }

export default function StepsSection({ section }: Props) {
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <SectionHead eyebrow={section.eyebrow} title={section.title} intro={section.intro} center />
      <ol className={s.steps}>
        {section.items.map((step, i) => (
          <li key={step.title} className={s.step}>
            <span className={s.stepNum}>{String(i + 1).padStart(2, '0')}</span>
            <div className={s.stepTitle}>{step.title}</div>
            <p className={s.stepBody}>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
