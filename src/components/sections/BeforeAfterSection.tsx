import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'beforeAfter' }> }

export default function BeforeAfterSection({ section }: Props) {
  const head = (
    <div className={cx(s.head, section.media && s.baHeadCopy)}>
      {section.eyebrow && <div className="eyebrow eyebrow--rule">{section.eyebrow}</div>}
      <h2 className="h-section">{section.title}</h2>
      {section.body && <p className="lead">{section.body}</p>}
    </div>
  )
  return (
    <section id={section.id} className={cx('container', s.section)}>
      {section.media ? (
        <div className={s.baIntro}>
          {head}
          <img
            src={section.media.src}
            alt={section.media.alt}
            width={section.media.width}
            height={section.media.height}
            loading="lazy"
            decoding="async"
            className={s.baMedia}
          />
        </div>
      ) : (
        head
      )}
      <div className={s.ba}>
        <div className={cx(s.baCol, s.baBefore)}>
          <div className={s.baHead}>Before</div>
          <ul className={s.baList}>
            {section.before.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={cx(s.baCol, s.baAfter)}>
          <div className={s.baHead}>After</div>
          <ul className="checklist">
            {section.after.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
