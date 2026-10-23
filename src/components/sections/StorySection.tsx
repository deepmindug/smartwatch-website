import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import Media from '../Media'
import Reveal from '../Reveal'
import { Card } from './CardsSection'
import s from './Sections.module.css'
import { TrustPanel } from './TrustSection'

type Props = { section: Extract<Section, { kind: 'story' }> }

/** Opens on a lede and key facts beside the image, then themed cards, then the named clients. */
export default function StorySection({ section }: Props) {
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <div className={s.split}>
        <Media
          image={section.media}
          label={section.mediaLabel ?? 'image coming soon'}
          ratio="4 / 3"
          className={s.splitMedia}
        />
        <div className={s.splitCopy}>
          {section.eyebrow && <div className="eyebrow eyebrow--rule">{section.eyebrow}</div>}
          <h2 className={s.splitTitle}>{section.title}</h2>
          <p className="lead">{section.lede}</p>
          {section.facts && (
            <dl className={s.storyFacts}>
              {section.facts.map((fact) => (
                <div key={fact.label} className={s.storyFact}>
                  <dt className={s.storyFactLabel}>{fact.label}</dt>
                  <dd className={s.storyFactValue}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {section.themes && (
        <Reveal stagger className={cx(s.cards, s.cols3, s.storyThemes)}>
          {section.themes.map((item) => (
            <Card key={item.title} item={item} />
          ))}
        </Reveal>
      )}

      <TrustPanel panel={section} />
    </section>
  )
}
