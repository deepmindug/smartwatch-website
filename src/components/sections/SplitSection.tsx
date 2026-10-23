import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import Media from '../Media'
import SmartLink from '../SmartLink'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'split' }> }

export default function SplitSection({ section }: Props) {
  const paragraphs = Array.isArray(section.body) ? section.body : [section.body]
  const hasTitledPoints = section.points?.some((p) => typeof p !== 'string')
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <div className={cx(s.split, section.reverse && s.splitReverse, section.mediaFill && s.splitFill)}>
        <Media
          image={section.media}
          video={section.video}
          label={section.mediaLabel ?? 'image coming soon'}
          ratio={section.mediaFill ? 'auto' : '4 / 3'}
          className={s.splitMedia}
        />
        <div className={s.splitCopy}>
          {section.eyebrow && <div className="eyebrow eyebrow--rule">{section.eyebrow}</div>}
          <h2 className={s.splitTitle}>{section.title}</h2>
          {paragraphs.map((p) => (
            <p key={p} className="lead">
              {/* **text** sets a phrase in bold, as in a founding principle. */}
              {p
                .split(/(\*\*[^*]+\*\*)/)
                .map((part, i) =>
                  part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
                )}
            </p>
          ))}
          {section.points && !hasTitledPoints && (
            <ul className="checklist">
              {section.points.map((p) => (
                <li key={String(p)}>{p as string}</li>
              ))}
            </ul>
          )}
          {section.points && hasTitledPoints && (
            <div className={s.points}>
              {section.points.map((p) =>
                typeof p === 'string' ? (
                  <div key={p} className={s.point}>
                    <div className={s.pointTitle}>{p}</div>
                  </div>
                ) : (
                  <div key={p.title} className={s.point}>
                    <div className={s.pointTitle}>{p.title}</div>
                    <div className={s.pointBody}>{p.body}</div>
                  </div>
                ),
              )}
            </div>
          )}
          {section.cta && (
            <div>
              <SmartLink to={section.cta.to} className="link-arrow">
                {section.cta.label} →
              </SmartLink>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
