import type { Section } from '../../data/types'
import { regionMap, type City } from '../../data/region-map'
import s from './CoverageSection.module.css'

type CoverageData = Extract<Section, { kind: 'coverage' }>
type Props = { section: CoverageData }

/** The part of the 760 x 640 frame the map shows: the six countries with a little of their neighbours. */
const VIEW = { x: -30, y: -150, w: 1000, h: 900 }

/** Where each country's name sits; Rwanda and Burundi are too small, so theirs sit out east on leader lines. */
const LABELS: Record<string, { x: number; y: number; from?: [number, number] }> = {
  SS: { x: 420, y: 150 },
  UG: { x: 492, y: 258 },
  KE: { x: 606, y: 292 },
  CD: { x: 368, y: 478 },
  RW: { x: 414, y: 350, from: [430, 354] },
  BI: { x: 414, y: 404, from: [424, 394] },
}

/** The trading corridors the cargo moves along, as runs between towns. */
const ROUTES: City[][] = [
  ['mombasa', 'nairobi', 'malaba', 'kampala', 'kigali', 'bujumbura'],
  ['kampala', 'juba'],
  ['kigali', 'goma'],
]

/** "A", "A and B", "A, B and C". */
function listCities(cities: string[]) {
  return cities.length < 2 ? cities.join('') : `${cities.slice(0, -1).join(', ')} and ${cities[cities.length - 1]}`
}

/** Which side of its pin each office's name pill sits. */
const PIN_SIDE: Partial<Record<City, 'left' | 'below'>> = { kampala: 'left' }

/**
 * Pills placed by hand, each tied to its own pin by a short leader. Nairobi and Mombasa sit close
 * together, and on wide screens the coast runs under the product boxes, so both pills hang inland,
 * one above the other, where they stay in view on every screen.
 */
const PILL_AT: Partial<Record<City, [number, number]>> = { nairobi: [440, 396], mombasa: [462, 456] }

function routePath(towns: City[]) {
  const pts = towns.map((t) => regionMap.cities[t])
  return pts.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x},${y}`
    const [px, py] = pts[i - 1]
    // A slight bow so the corridor reads as a road, not a ruler line.
    const mx = (px + x) / 2 + (y - py) * 0.12
    const my = (py + y) / 2 - (x - px) * 0.12
    return `${d} Q${mx},${my} ${x},${y}`
  }, '')
}

function RegionMap({ section }: Props) {
  const names = Object.fromEntries(section.countries.map((c) => [c.id, c.name]))
  const { focus, context, cities } = regionMap
  const towns = [...new Set(ROUTES.flat())]
  const offices = new Set(section.offices.map((o) => o.city.toLowerCase()))
  return (
    <svg
      className={s.map}
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      // Fills the frame: the outlines run past the view box, so a taller frame shows more of the region.
      overflow="visible"
      role="img"
      aria-label={`Map of East and Central Africa highlighting ${section.countries
        .map((c) => c.name)
        .join(', ')}, with regional support offices in ${listCities(section.offices.map((o) => o.city))}.`}
    >
      <defs>
        <filter id="cov-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className={s.context} filter="url(#cov-glow)">
        {context.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g className={s.context} filter="url(#cov-glow)">
        {focus.map((f) => (
          <path key={f.id} d={f.d} />
        ))}
      </g>

      <g className={s.routes} filter="url(#cov-glow)">
        {ROUTES.map((r) => (
          <path key={r.join('-')} d={routePath(r)} />
        ))}
      </g>
      <g className={s.towns} filter="url(#cov-glow)">
        {towns
          .filter((t) => !offices.has(t))
          .map((t) => (
            <circle key={t} cx={cities[t][0]} cy={cities[t][1]} r="6" />
          ))}
      </g>

      <g className={s.labels}>
        {focus.map((f) => {
          const l = LABELS[f.id]
          if (!l || !names[f.id]) return null
          return (
            <g key={f.id}>
              {l.from && (
                <>
                  <line x1={l.from[0]} y1={l.from[1]} x2={l.x + 6} y2={l.y - 6} className={s.leader} />
                  <circle cx={l.from[0]} cy={l.from[1]} r="4" className={s.leaderDot} />
                </>
              )}
              <text x={l.x} y={l.y} textAnchor={l.from ? 'end' : 'middle'}>
                {names[f.id].toUpperCase()}
              </text>
            </g>
          )
        })}
      </g>

      {section.offices.map((o) => {
        const key = o.city.toLowerCase() as City
        const at = cities[key]
        if (!at) return null
        const side = PIN_SIDE[key] ?? 'below'
        const w = o.city.length * 14 + 48
        const fixed = PILL_AT[key]
        const px = fixed ? fixed[0] : side === 'below' ? at[0] - 90 : at[0] - 24 - w
        const py = fixed ? fixed[1] : side === 'below' ? at[1] + 56 : at[1]
        return (
          <g key={o.city}>
            <circle cx={at[0]} cy={at[1]} r="22" className={s.pulse} />
            <circle cx={at[0]} cy={at[1]} r="13" className={s.pinRing} />
            <circle cx={at[0]} cy={at[1]} r="6" className={s.pinCore} />
            {fixed && (
              <line
                x1={at[0]}
                y1={at[1] + 14}
                x2={Math.min(Math.max(at[0], px + 20), px + w - 20)}
                y2={py - 20}
                className={s.pillLeader}
              />
            )}
            <rect x={px} y={py - 20} width={w} height="40" rx="20" className={s.pill} />
            <circle cx={px + 19} cy={py} r="5" className={s.pillDot} />
            <text x={px + 33} y={py + 8} className={s.pillText}>
              {o.city}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Tick() {
  return <span className={s.tick} aria-hidden="true" />
}

function Points({ points }: { points: { b: string; d?: string }[] }) {
  return (
    <ul className={s.points}>
      {points.map((p) => (
        <li key={p.b}>
          <Tick />
          <span>
            <strong>{p.b}</strong>
            {p.d && <span className={s.pointNote}>{p.d}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}

function Pillar({ pillar, n }: { pillar: CoverageData['pillars'][number]; n: number }) {
  return (
    <article className={s.pillar}>
      <div className={s.pillarBody}>
        <h3 className={s.pillarTitle}>
          <span className={s.pillarNum}>{n}.</span> {pillar.title}
          <span className={s.pillarSub}>{pillar.sub}</span>
        </h3>
      </div>
      <div className={s.pillarMedia}>
        <img
          src={pillar.image.src}
          alt={pillar.image.alt}
          width={pillar.image.width}
          height={pillar.image.height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <Points points={pillar.points} />
    </article>
  )
}

/**
 * The RECTS infographic on a navy panel: four product boxes either side of a map of the six
 * countries served (green) with the Nairobi, Kampala and Mombasa support offices pinned, then the core
 * technologies, the monitoring centre and the support offices.
 */
export default function CoverageSection({ section }: Props) {
  const [p1, p2, p3, p4] = section.pillars
  return (
    <section id={section.id} className="container">
      <div className={s.panel}>
        <div className={s.head}>
          {section.eyebrow && <div className={s.eyebrow}>{section.eyebrow}</div>}
          {section.title && (
            <h2 className={s.title}>
              {section.title.split(/(RECTS)/).map((part, i) =>
                part === 'RECTS' ? (
                  <span key={i} className={s.titleAccent}>
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </h2>
          )}
          {section.subtitle && <p className={s.subtitle}>{section.subtitle}</p>}
        </div>

        <div className={s.grid}>
          <div className={s.col}>
            {p1 && <Pillar pillar={p1} n={1} />}
            {p2 && <Pillar pillar={p2} n={2} />}
          </div>
          <figure className={s.mapWrap}>
            <div className={s.mapFrame}>
              <RegionMap section={section} />
            </div>
          </figure>
          <div className={s.col}>
            {p3 && <Pillar pillar={p3} n={3} />}
            {p4 && <Pillar pillar={p4} n={4} />}
          </div>
        </div>

        <div className={s.lower}>
          <div className={s.techBlock}>
            <h3 className={s.blockTitle}>Core technologies</h3>
            <div className={s.tech}>
              {section.tech.map((t) => (
                <div key={t.name} className={s.techItem}>
                  <div className={s.techMedia}>
                    <img
                      src={t.image.src}
                      alt={t.image.alt}
                      width={t.image.width}
                      height={t.image.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={s.techName}>{t.name}</div>
                  <p className={s.techBody}>{t.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={s.centre}>
            <div className={s.centreMedia}>
              <img
                src={section.centre.image.src}
                alt={section.centre.image.alt}
                width={section.centre.image.width}
                height={section.centre.image.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <h3 className={s.blockTitle}>{section.centre.title}</h3>
              <Points points={section.centre.points} />
            </div>
          </div>
        </div>

        <div className={s.offices}>
          <span className={s.officesLabel}>Regional Support Offices:</span>
          {section.offices.map((o) => (
            <span key={o.city} className={s.officeChip}>
              <i aria-hidden="true" />
              {o.city}, {o.country}
            </span>
          ))}
          <span className={s.countriesLine}>Serving {section.countries.map((c) => c.name).join(' · ')}</span>
        </div>
      </div>
    </section>
  )
}
