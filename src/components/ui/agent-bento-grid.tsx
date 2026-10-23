import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { cx } from '../../lib/cx'
import { prefersReducedMotion } from '../../motion/motion'
import s from './agent-bento-grid.module.css'

/*
 * Vendored from the VengeanceUI registry:
 * https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/agent-bento-grid.json
 *
 * Kept: the five-card bento (three across, then a double-width card and a single), each card a
 * title, a line of copy and a live visual that cycles on a timer — a node graph whose paths draw
 * in step by step, a pair of metric tiles that lift in turn over hatched bars, a stacked feed that
 * springs the active row to the front, a namespace list beside a scrolling log, and a 2×2 tile
 * grid with fill bars. Adapted:
 *   - the AI-agent story becomes the fleet platform underneath the products: device → gateway →
 *     platform → data / API, telemetry volume, the device event stream, integrations, sensors
 *   - framer-motion becomes CSS transitions and keyframes driven by the same state (path draws use
 *     pathLength + dash offset, springs become an overshooting cubic-bezier); Phosphor icons become
 *     line icons drawn in the site's style; Tailwind and its rainbow palette become a CSS module on
 *     the brand primaries (`deep` is navy, `green` the brand green) and shades of the green for the
 *     `sky`, `mint` and `amber` tones
 *   - the timers only run while the grid is on screen, and not at all under reduced motion, where
 *     each visual rests on its first frame
 *   - surfaces and text run on local tokens, so `dark` repaints the cards for a green band
 *   - the visuals are decorative (aria-hidden); each card's heading and copy carry the meaning
 */

/* ── Shared ticker ─────────────────────────────────────────── */

/** Whether the element is at least partly on screen. Assumed visible where IO is unavailable. */
function useInView(ref: RefObject<Element | null>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '80px' })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return inView
}

/** Counts 0…length-1 every `ms` while `running`; stays at 0 under reduced motion. */
function useTicker(length: number, ms: number, running: boolean) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!running || prefersReducedMotion()) return
    const timer = setInterval(() => setTick((t) => (t + 1) % length), ms)
    return () => clearInterval(timer)
  }, [length, ms, running])
  return tick
}

/* ── Line icons (24px grid, stroke only, like ../Icon) ─────── */

type Glyph = 'device' | 'cloud' | 'database' | 'plug' | 'pin' | 'engine' | 'thermo' | 'fuel' | 'check' | 'spinner' | 'clock' | 'minus' | 'ledger' | 'card' | 'shield' | 'chat'

const glyphs: Record<Glyph, ReactNode> = {
  device: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="3" />
      <path d="M10 7.5h4M12 17h.01" />
    </>
  ),
  cloud: <path d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 8.6a5 5 0 0 1-.5 9.9z" />,
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  plug: <path d="M9 3v5M15 3v5M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0zM12 17v4" />,
  pin: (
    <>
      <path d="M12 21.5s-6.5-5.6-6.5-11.5a6.5 6.5 0 0 1 13 0c0 5.9-6.5 11.5-6.5 11.5z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  engine: <path d="M4 10v5M4 12.5h2M6 8.5h3V7h5v1.5h2.5l2 2H20v5h-1.5l-2 2H9l-3-3z" />,
  thermo: (
    <>
      <path d="M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0z" />
      <path d="M12 9v6.5" />
    </>
  ),
  fuel: <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M4 21h12M5 10h10M15 8l3 2.5V17a1.5 1.5 0 0 0 3 0V9l-3-3" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  spinner: <path d="M12 3a9 9 0 1 1-9 9" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  minus: <path d="M6 12h12" />,
  ledger: <path d="M6 3h12v18H6zM9.5 7.5h5M9.5 11h5M9.5 14.5h3" />,
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14.5h4" />
    </>
  ),
  shield: <path d="M12 3l8 3.5v5.5c0 4.8-3.4 8.3-8 9-4.6-.7-8-4.2-8-9V6.5z" />,
  chat: <path d="M4 5h16v10H9l-5 4z" />,
}

function Glyph({ name, className }: { name: Glyph; className?: string }) {
  return (
    <svg
      className={cx(s.glyph, className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyphs[name]}
    </svg>
  )
}

/* ── Card shell ─────────────────────────────────────────── */

type FeatCardProps = {
  title: string
  description: string
  children: ReactNode
  className?: string
}

export function FeatCard({ title, description, children, className }: FeatCardProps) {
  return (
    <article className={cx(s.card, className)}>
      <div className={s.cardCopy}>
        <h3 className={s.cardTitle}>{title}</h3>
        <p className={s.cardBody}>{description}</p>
      </div>
      <div className={s.stage} aria-hidden="true">
        {children}
      </div>
    </article>
  )
}

type VisualProps = { running: boolean }

/* ── 1 · Device-to-cloud pipeline ─────────────────────────── */

type Step = 'device' | 'gateway' | 'platform' | 'data' | 'api' | 'command'
const STEPS: Step[] = ['device', 'gateway', 'platform', 'data', 'api', 'command']

type Tone = 'deep' | 'amber' | 'green' | 'sky' | 'mint'

const NODES: { id: string; x: number; y: number; glyph?: Glyph; label?: string; tone: Tone }[] = [
  { id: 'device', x: 50, y: 120, glyph: 'device', label: 'DEVICE', tone: 'deep' },
  { id: 'gateway', x: 125, y: 120, tone: 'amber' },
  { id: 'platform', x: 200, y: 120, glyph: 'cloud', label: 'CLOUD', tone: 'green' },
  { id: 'data', x: 280, y: 50, glyph: 'database', label: 'DATA', tone: 'sky' },
  { id: 'api', x: 280, y: 190, glyph: 'plug', label: 'API', tone: 'mint' },
]

const WIRES = ['M 78 120 L 113 120', 'M 137 120 L 172 120', 'M 200 92 L 200 50 L 252 50', 'M 200 148 L 200 190 L 252 190']

const FLOWS: { d: string; steps: Step[]; tone: Tone }[] = [
  { d: 'M 78 120 L 113 120', steps: ['device'], tone: 'deep' },
  { d: 'M 137 120 L 172 120', steps: ['platform'], tone: 'green' },
  { d: 'M 200 92 L 200 50 L 252 50', steps: ['data'], tone: 'sky' },
  { d: 'M 200 148 L 200 190 L 252 190', steps: ['api'], tone: 'mint' },
  { d: 'M 172 120 L 137 120', steps: ['command'], tone: 'deep' },
  { d: 'M 113 120 L 78 120', steps: ['command'], tone: 'deep' },
]

const LIT: Record<Step, string[]> = {
  device: ['device'],
  gateway: ['gateway'],
  platform: ['platform'],
  data: ['platform', 'data'],
  api: ['platform', 'api'],
  command: ['platform', 'gateway', 'device'],
}

export function PipelineVisual({ running }: VisualProps) {
  const step = STEPS[useTicker(STEPS.length, 2000, running)]
  return (
    <div className={s.pipeline} data-step={step}>
      <svg className={s.pipelineSvg} viewBox="12 14 304 212" preserveAspectRatio="xMidYMid meet">
        {WIRES.map((d) => (
          <path key={d} d={d} className={s.wire} />
        ))}
        {FLOWS.filter((f) => f.steps.includes(step)).map((f) => (
          // Keyed by step so the draw restarts every time the path lights up again.
          <g key={`${step}-${f.d}`} className={s[f.tone]}>
            <path d={f.d} pathLength={1} className={s.flowGlow} />
            <path d={f.d} pathLength={1} className={s.flow} />
          </g>
        ))}
        {NODES.map((n) => {
          const box = !!n.glyph
          const size = box ? 56 : 24
          const lit = LIT[step].includes(n.id)
          return (
            <foreignObject key={n.id} x={n.x - size / 2} y={n.y - size / 2} width={size} height={size} className={s.fo}>
              {box && n.glyph ? (
                <div className={cx(s.node, s[n.tone], lit && s.nodeLit)}>
                  <Glyph name={n.glyph} />
                  <span>{n.label}</span>
                </div>
              ) : (
                <div className={cx(s.router, lit && s.routerLit)}>
                  <div className={s.routerSpin} />
                </div>
              )}
            </foreignObject>
          )
        })}
      </svg>
    </div>
  )
}

/* ── 2 · Telemetry volume ──────────────────────────────────── */

const METRICS = [
  { label: 'Messages/min', value: '18.6k', trend: '+6%', spark: 'M 0 18 L 16 11 L 32 14 L 48 4' },
  { label: 'Avg ingest', value: '240ms', trend: '-4%', spark: 'M 0 4 L 16 12 L 32 8 L 48 18' },
]
const BARS = [48, 72, 58, 86, 64, 40, 34]
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

function sparkPoints(d: string) {
  return d
    .replace(/[ML]/g, '')
    .trim()
    .split(/\s+/)
    .reduce<[number, number][]>((pts, n, i, all) => (i % 2 ? pts : [...pts, [Number(n), Number(all[i + 1])]]), [])
}

export function TelemetryVisual({ running }: VisualProps) {
  const cycled = useTicker(2, 3000, running)
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <div className={s.telemetry}>
      <div className={s.metrics}>
        {METRICS.map((m, i) => (
          <div key={m.label} className={s.metric}>
            <div className={s.hatch} />
            <div
              className={cx(s.metricFace, (hovered ?? cycled) === i && s.metricLift)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={s.metricCopy}>
                <span className={s.micro}>{m.label}</span>
                <span className={s.metricValue}>{m.value}</span>
                <span className={s.metricTrend}>
                  <b className={m.trend.startsWith('+') ? s.up : s.down}>{m.trend}</b> vs last week
                </span>
              </div>
              <svg className={s.spark} viewBox="0 0 48 24">
                <path d={m.spark} pathLength={1} className={s.sparkLine} />
                {sparkPoints(m.spark).map(([x, y], idx) => (
                  <circle key={idx} cx={x} cy={y} r="1.6" className={s.sparkDot} style={{ animationDelay: `${0.5 + idx * 0.08}s` }} />
                ))}
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className={s.bars}>
        {BARS.map((h, i) => (
          <div key={DAYS[i]} className={cx(s.barTrack, s.hatchBg)}>
            <div
              className={s.barFill}
              style={
                {
                  '--h': `${h}%`,
                  '--hi': `${Math.min(95, h + 15)}%`,
                  '--lo': `${Math.max(12, h - 20)}%`,
                  animationDuration: `${3 + (i % 3) * 0.8}s`,
                  animationDelay: `${i * 0.1}s`,
                } as CSSProperties
              }
            />
          </div>
        ))}
      </div>
      <div className={s.days}>
        {DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  )
}

/* ── 3 · Device event stream ──────────────────────────────── */

type Status = 'synced' | 'live' | 'queued' | 'idle'

const STATUS: Record<Status, { glyph: Glyph; tone: string }> = {
  synced: { glyph: 'check', tone: s.stGreen },
  live: { glyph: 'spinner', tone: s.stSky },
  queued: { glyph: 'clock', tone: s.stAmber },
  idle: { glyph: 'minus', tone: s.stGrey },
}

const EVENTS: { source: string; event: string; status: Status; t: string }[] = [
  { source: 'Tracker 0412', event: 'Ignition on, leaving Kampala depot', status: 'synced', t: '0.3s' },
  { source: 'Dashcam 88', event: 'Harsh-braking clip uploaded', status: 'synced', t: '1.8s' },
  { source: 'Fuel sensor', event: 'Tank level streaming from CAN bus', status: 'live', t: '2.6s' },
  { source: 'Reefer probe', event: 'Holding 4.1 °C, next reading queued', status: 'queued', t: '—' },
  { source: 'Trailer tag', event: 'Parked, reporting every 6 hours', status: 'idle', t: '—' },
]

const STACK_Y: Record<number, number> = { [-2]: -68, [-1]: -38, 0: 0, 1: 38, 2: 68 }

export function EventStreamVisual({ running }: VisualProps) {
  const active = useTicker(EVENTS.length, 2400, running)
  const half = Math.floor(EVENTS.length / 2)
  return (
    <div className={s.stream}>
      {EVENTS.map((e, i) => {
        // Signed slot: 0 is the front row, negative rows are upcoming, positive ones are past.
        let slot = i - active
        if (slot > half) slot -= EVENTS.length
        if (slot < -half) slot += EVENTS.length
        const abs = Math.abs(slot)
        const front = slot === 0
        const st = STATUS[e.status]
        return (
          <div
            key={e.source}
            className={s.row}
            style={{
              zIndex: 30 - abs * 10,
              opacity: front ? 1 : abs === 1 ? 0.65 : 0.38,
              transform: `translateY(${STACK_Y[slot] ?? (slot < 0 ? -150 : 150)}px) scale(${front ? 1 : abs === 1 ? 0.93 : 0.87})`,
            }}
          >
            <div className={cx(s.rowCard, front && s.rowFront)}>
              <span className={cx(s.badge, st.tone, front && s.badgeFront)}>
                <Glyph name={st.glyph} className={e.status === 'live' ? s.spin : undefined} />
              </span>
              <div className={s.rowText}>
                <div className={s.rowHead}>
                  <span className={s.rowSource}>{e.source}</span>
                  <span className={cx(s.pill, st.tone)}>{e.status}</span>
                </div>
                {front && <p className={s.rowEvent}>{e.event}</p>}
              </div>
              {front && <span className={s.rowTime}>{e.t}</span>}
            </div>
          </div>
        )
      })}
      <div className={s.dots}>
        {EVENTS.map((e, i) => (
          <span key={e.source} className={cx(s.dot, i === active && s.dotOn)} />
        ))}
      </div>
    </div>
  )
}

/* ── 4 · Integrations ─────────────────────────────────────── */

type Channel = 'erp' | 'fuel' | 'insurer' | 'alerts'

const CHANNELS: { name: Channel; label: string; glyph: Glyph; tone: Tone; events: number; fill: number }[] = [
  { name: 'erp', label: 'ERP', glyph: 'ledger', tone: 'green', events: 342, fill: 88 },
  { name: 'fuel', label: 'Fuel cards', glyph: 'card', tone: 'sky', events: 218, fill: 56 },
  { name: 'insurer', label: 'Insurer', glyph: 'shield', tone: 'deep', events: 97, fill: 25 },
  { name: 'alerts', label: 'SMS & email', glyph: 'chat', tone: 'amber', events: 54, fill: 14 },
]

const SYNC_LOG: { ch: Channel; line: string; t: string }[] = [
  { ch: 'erp', line: 'Trip costs posted to ledger', t: '0.2s' },
  { ch: 'fuel', line: 'Card fill-ups matched to trips', t: '1.1s' },
  { ch: 'erp', line: 'Work orders synced from maintenance', t: '2.4s' },
  { ch: 'insurer', line: 'Driver scores shared for renewal', t: '4.0s' },
  { ch: 'alerts', line: 'Geofence exit sent to dispatcher', t: '5.8s' },
  { ch: 'fuel', line: 'Siphoning alert raised on KBX 212', t: '7.2s' },
]

export function IntegrationsVisual({ running }: VisualProps) {
  const tick = useTicker(SYNC_LOG.length, 2000, running)
  const activeCh = SYNC_LOG[tick].ch
  const recent = [0, 1, 2, 3].map((o) => ({ ...SYNC_LOG[(tick - o + SYNC_LOG.length) % SYNC_LOG.length], o }))
  return (
    <div className={s.integrations}>
      <div className={s.channels}>
        <p className={s.micro}>Connected systems</p>
        <div className={s.channelList}>
          {CHANNELS.map((c, i) => {
            const on = c.name === activeCh
            return (
              <div key={c.name} className={cx(s.channel, on && s.channelOn)}>
                <span className={cx(s.chIcon, s[c.tone])}>
                  <Glyph name={c.glyph} />
                </span>
                <span className={s.chName}>{c.label}</span>
                <span className={s.chTrack}>
                  <span className={cx(s.chFill, s[c.tone])} style={{ '--w': `${c.fill}%`, animationDelay: `${i * 0.1}s` } as CSSProperties}>
                    {on && <span className={s.scan} />}
                  </span>
                </span>
                <span className={s.chCount}>
                  {c.events}
                  {on && <span className={cx(s.ping, s[c.tone])} />}
                </span>
              </div>
            )
          })}
        </div>
        <div className={s.live}>
          <span className={s.liveDot} />
          Two-way sync active
        </div>
      </div>
      <div className={s.divider} />
      <div className={s.log}>
        <p className={s.micro}>Sync log</p>
        <div className={s.logList}>
          {recent.map((q) => {
            const ch = CHANNELS.find((c) => c.name === q.ch)!
            return (
              <div key={`${tick}-${q.o}`} className={s.logRow} style={{ opacity: [1, 0.8, 0.5, 0.25][q.o] }}>
                <div className={s.logHead}>
                  <span className={cx(s.logTag, s[ch.tone])}>{ch.label}</span>
                  <span className={s.logTime}>{q.t}</span>
                </div>
                <p className={s.logLine}>{q.line}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ── 5 · IoT sensors ──────────────────────────────────────── */

const SENSORS: { name: string; glyph: Glyph; tone: Tone; rate: number; unit: string }[] = [
  { name: 'GPS', glyph: 'pin', tone: 'green', rate: 60, unit: 'every 1s' },
  { name: 'CAN bus', glyph: 'engine', tone: 'deep', rate: 42, unit: 'engine data' },
  { name: 'Temperature', glyph: 'thermo', tone: 'sky', rate: 12, unit: '±0.5 °C' },
  { name: 'Fuel level', glyph: 'fuel', tone: 'amber', rate: 30, unit: '0.1 L steps' },
]
const MAX_RATE = Math.max(...SENSORS.map((x) => x.rate))

export function SensorsVisual() {
  return (
    <div className={s.sensors}>
      {SENSORS.map((t, i) => (
        <div key={t.name} className={s.sensor} style={{ animationDelay: `${i * 0.1}s` }}>
          <div className={s.sensorTop}>
            <span className={cx(s.chIcon, s.sensorIcon, s[t.tone])}>
              <Glyph name={t.glyph} />
            </span>
            <span className={s.sensorRate}>
              <b>{t.rate}</b>
              <span className={s.micro}>per min</span>
            </span>
          </div>
          <div className={s.sensorFoot}>
            <div className={s.sensorHead}>
              <span className={s.sensorName}>{t.name}</span>
              <span className={s.sensorUnit}>{t.unit}</span>
            </div>
            <span className={s.chTrack}>
              <span
                className={cx(s.chFill, s[t.tone])}
                style={{ '--w': `${(t.rate / MAX_RATE) * 100}%`, animationDelay: `${0.4 + i * 0.1}s` } as CSSProperties}
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Grid ─────────────────────────────────────────────────── */

type GridProps = {
  className?: string
  /** Repaint the cards for a green band. */
  dark?: boolean
}

export function AgentBentoGrid({ className, dark = false }: GridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const running = useInView(ref)
  return (
    <div ref={ref} className={cx(s.grid, dark && s.dark, className)}>
      <FeatCard title="Device-to-cloud pipeline" description="Every reading travels from the vehicle, through our gateways, into one platform, and back out as data or a command.">
        <PipelineVisual running={running} />
      </FeatCard>
      <FeatCard title="Telemetry at scale" description="Every device message is ingested in real time and kept for reporting.">
        <TelemetryVisual running={running} />
      </FeatCard>
      <FeatCard title="Live event stream" description="Trackers, dashcams and sensors report events the moment they happen.">
        <EventStreamVisual running={running} />
      </FeatCard>
      <FeatCard
        className={s.wide}
        title="Open integrations"
        description="Push trips, fuel and driver data into the systems you already run, through our REST API and ready-made connectors."
      >
        <IntegrationsVisual running={running} />
      </FeatCard>
      <FeatCard title="IoT sensors" description="GPS, CAN bus, temperature and fuel sensors on one rugged device.">
        <SensorsVisual />
      </FeatCard>
    </div>
  )
}

export default AgentBentoGrid
