import { useMemo } from 'react'
import Reveal from '../components/Reveal'
import CtaBand from '../components/sections/CtaBand'
import { defaultCta } from '../components/sections/cta'
import DetailHero from '../components/sections/DetailHero'
import ProofStrip from '../components/sections/ProofStrip'
import { railLabel } from '../components/sections/rail'
import SectionRenderer from '../components/sections/SectionRenderer'
import StickyRail from '../components/sections/StickyRail'
import type { DetailPage as Page } from '../data/types'
import { usePageMeta } from '../hooks/usePageMeta'
import s from './DetailPage.module.css'

/**
 * One template for every product, solution and company page.
 * Section order comes from the data; the template adds the hero, the rail (products),
 * the proof strip (solutions), and the closing band.
 */
export default function DetailPage({ page }: { page: Page }) {
  usePageMeta(page.meta)
  const related = page.sections.filter((sec) => sec.kind === 'related')
  const main = page.sections.filter((sec) => sec.kind !== 'related')
  const rail = useMemo(
    () =>
      page.kind === 'product'
        ? page.sections
            .filter((sec) => sec.id)
            .map((sec) => ({ id: sec.id!, label: railLabel(sec.id!, sec.title) }))
        : [],
    [page],
  )

  return (
    <div className={s.page}>
      {page.hero.hidden ? (
        <div className={s.pageTitle}>
          <h1>{page.hero.title}</h1>
        </div>
      ) : (
        <DetailHero page={page} />
      )}
      <div className={s.body}>
        {rail.length > 0 && <StickyRail items={rail} />}
        {page.kind === 'solution' && <ProofStrip />}
        {main.map((section, i) => (
          <SectionRenderer key={section.id ?? `${section.kind}-${i}`} section={section} />
        ))}
        {related.map((section, i) => (
          <SectionRenderer key={section.id ?? `related-${i}`} section={section} />
        ))}
        {page.cta !== false && (
          <Reveal>
            <CtaBand {...(page.cta ?? defaultCta)} />
          </Reveal>
        )}
      </div>
    </div>
  )
}
