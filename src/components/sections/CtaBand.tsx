import { cx } from '../../lib/cx'
import SmartLink from '../SmartLink'
import CornerButton from '../ui/corner-button'
import { btnClass, isDemoCta, onLight, type CtaBandProps } from './cta'
import s from './Sections.module.css'

export default function CtaBand({ title, body, ctas }: CtaBandProps) {
  return (
    <section className={cx('container', s.section)}>
      <div className={`${s.ctaBand} h2-on-band`}>
        <div className={s.ctaCopy}>
          <h2 className="h-section">{title}</h2>
          <p className={s.ctaBody}>{body}</p>
        </div>
        <div className={s.ctaActions}>
          {ctas.map((cta) =>
            isDemoCta(cta) ? (
              <CornerButton key={cta.label} to={cta.to} className={s.ctaCorner}>
                {cta.label}
              </CornerButton>
            ) : (
              <SmartLink key={cta.label} to={cta.to} className={btnClass(onLight(cta.variant))}>
                {cta.label}
              </SmartLink>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
