import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import SmartLink from '../SmartLink'
import s from './Sections.module.css'

type Panel = Pick<Extract<Section, { kind: 'trust' }>, 'authorities' | 'clients' | 'closing' | 'cta'>

/** The logo panel: revenue authorities by country, a divider, the named clients, then a closing line. */
export function TrustPanel({ panel, flat = false }: { panel: Panel; flat?: boolean }) {
  return (
    <>
      {(panel.authorities || panel.clients || panel.closing) && (
        <div className={cx(s.storyClients, flat && s.storyClientsFlat)}>
          {panel.authorities && (
            <>
              <div className={cx('eyebrow', s.logosTitle)}>{panel.authorities.title}</div>
              <ul className={cx(s.logos, s.authorityLogos)}>
                {panel.authorities.items.map(({ name, country, logo }) => (
                  <li key={name} className={s.authorityItem}>
                    <div className={s.logo}>
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        loading="lazy"
                        decoding="async"
                        className={s.authorityImg}
                      />
                    </div>
                    <span className={s.authorityCountry}>{country}</span>
                  </li>
                ))}
              </ul>
              {panel.authorities.note && <p className={cx('lead', s.authorityNote)}>{panel.authorities.note}</p>}
              {panel.clients && <div className={s.logoDivider} aria-hidden="true" />}
            </>
          )}
          {panel.clients && (
            <>
              <div className={cx('eyebrow', s.logosTitle)}>{panel.clients.title}</div>
              <div className={cx(s.logos, s.storyLogos)}>
                {panel.clients.items.map(({ name, logo }) => (
                  <div key={name} className={s.logo}>
                    {logo ? (
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        loading="lazy"
                        decoding="async"
                        className={s.logoImg}
                      />
                    ) : (
                      name
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {(panel.closing || panel.cta) && (
            <div className={s.storyClosing}>
              {panel.closing && <p className="lead">{panel.closing}</p>}
              {panel.cta && (
                <SmartLink to={panel.cta.to} className="link-arrow">
                  {panel.cta.label} →
                </SmartLink>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

/** The logo panel as a section of its own, on the light band with no panel of its own, so it runs into the band beside it. */
export default function TrustSection({ section }: { section: Extract<Section, { kind: 'trust' }> }) {
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <TrustPanel panel={section} flat />
    </section>
  )
}
