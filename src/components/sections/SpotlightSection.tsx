import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import Media from '../Media'
import SmartLink from '../SmartLink'
import DataOpsFlow from './DataOpsFlow'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'spotlight' }> }

export default function SpotlightSection({ section }: Props) {
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <div className={`${s.spotlight} h2-on-band`}>
        {section.visual === 'data-ops' ? (
          <DataOpsFlow className={s.spotlightMedia} />
        ) : (
          <Media
            image={section.media}
            label={section.mediaLabel ?? 'hardware product shot'}
            ratio="4 / 3"
            radius={16}
            dark
            className={s.spotlightMedia}
          />
        )}
        <div className={s.spotlightCopy}>
          <div className="eyebrow eyebrow--rule eyebrow--bright">{section.eyebrow ?? 'Hardware'}</div>
          <h2 className="h-section">{section.title}</h2>
          <p className={s.spotlightBody}>{section.body}</p>
          {section.specs && (
            <div className={s.specs}>
              {section.specs.map((spec) => (
                <div key={spec.label} className={s.spec}>
                  <div className={s.specValue}>{spec.value}</div>
                  <div className={s.specLabel}>{spec.label}</div>
                </div>
              ))}
            </div>
          )}
          <div>
            <SmartLink to={section.cta.to} className="link-arrow link-arrow--bright">
              {section.cta.label} →
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  )
}
