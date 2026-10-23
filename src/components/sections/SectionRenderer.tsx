import type { Section, SectionKind } from '../../data/types'
import { cx } from '../../lib/cx'
import Reveal from '../Reveal'
import BeforeAfterSection from './BeforeAfterSection'
import BulletsSection from './BulletsSection'
import CardsSection from './CardsSection'
import CoverageSection from './CoverageSection'
import FaqSection from './FaqSection'
import LinksSection from './LinksSection'
import LogoWall from './LogoWall'
import RelatedSection from './RelatedSection'
import SplitSection from './SplitSection'
import SpotlightSection from './SpotlightSection'
import StatsSection from './StatsSection'
import StepsSection from './StepsSection'
import StorySection from './StorySection'
import TrustSection from './TrustSection'
import TabsSection from './TabsSection'
import s from './Sections.module.css'

/** Section kinds that sit on the light band; the rest run on white. */
const ON_SURFACE: SectionKind[] = ['cards', 'related', 'logos', 'coverage', 'trust']

function render(section: Section) {
  switch (section.kind) {
    case 'cards':
      return <CardsSection section={section} />
    case 'bullets':
      return <BulletsSection section={section} />
    case 'split':
      return <SplitSection section={section} />
    case 'story':
      return <StorySection section={section} />
    case 'trust':
      return <TrustSection section={section} />
    case 'stats':
      return <StatsSection section={section} />
    case 'beforeAfter':
      return <BeforeAfterSection section={section} />
    case 'tabs':
      return <TabsSection section={section} />
    case 'steps':
      return <StepsSection section={section} />
    case 'spotlight':
      return <SpotlightSection section={section} />
    case 'links':
      return <LinksSection section={section} />
    case 'faq':
      return <FaqSection section={section} />
    case 'logos':
      return <LogoWall id={section.id} title={section.title} items={section.items} />
    case 'coverage':
      return <CoverageSection section={section} />
    case 'related':
      return <RelatedSection section={section} />
    default: {
      const never: never = section
      return never
    }
  }
}

/** Picks the component for a section and reveals it as it scrolls into view. */
export default function SectionRenderer({ section }: { section: Section }) {
  const surface = ON_SURFACE.includes(section.kind) && !(section.kind === 'cards' && section.plain)
  return <Reveal className={cx(surface && s.bandSurface)}>{render(section)}</Reveal>
}
