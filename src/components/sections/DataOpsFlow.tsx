import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { cx } from '../../lib/cx'
import { prefersReducedMotion } from '../../motion/motion'
import s from './DataOpsFlow.module.css'

/**
 * The data-ops flow drawn inside the product pages' green spotlight: five nodes, Data Source →
 * Init Attribute → IF / THEN → Action → Output, with a pale green pulse running a reading through them.
 * The branch alternates: one pass takes the "true" wire through Action, the next skips to Output
 * along the "false" arc, and a readout under the flow says what each pass did. Phones get the same
 * flow stacked vertically. Decorative (aria-hidden); the copy beside it carries the meaning.
 */

type NodeId = 'source' | 'init' | 'branch' | 'action' | 'output'
type WireId = 'w1' | 'w2' | 'w3' | 'w4' | 'w5'

type FlowNode = { id: NodeId; name: string; kind: string; glyph: ReactNode }

const NODES: FlowNode[] = [
  {
    id: 'source',
    name: 'Data Source',
    kind: 'Input',
    glyph: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </>
    ),
  },
  {
    id: 'init',
    name: 'Init Attribute',
    kind: 'Compute',
    glyph: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
      </>
    ),
  },
  {
    id: 'branch',
    name: 'IF / THEN',
    kind: 'Branch',
    glyph: (
      <>
        <circle cx="6" cy="5" r="2.5" />
        <circle cx="6" cy="19" r="2.5" />
        <circle cx="18" cy="9" r="2.5" />
        <path d="M6 7.5v9M18 11.5c0 3-2.5 4.5-6 4.5H9" />
      </>
    ),
  },
  {
    id: 'action',
    name: 'Action',
    kind: 'Command',
    glyph: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  },
  {
    id: 'output',
    name: 'Output',
    kind: 'Stream',
    glyph: (
      <>
        <path d="M3 7h12M3 12h13M3 17h12" />
        <path d="m18 9 4 3-4 3" />
      </>
    ),
  },
]

/** One pass down the "true" wire through Action, then one down the "false" arc straight to Output. */
const STEPS: { lit: NodeId; wire?: WireId; pass: 'true' | 'false' }[] = [
  { lit: 'source', pass: 'true' },
  { lit: 'init', wire: 'w1', pass: 'true' },
  { lit: 'branch', wire: 'w2', pass: 'true' },
  { lit: 'action', wire: 'w3', pass: 'true' },
  { lit: 'output', wire: 'w4', pass: 'true' },
  { lit: 'source', pass: 'false' },
  { lit: 'init', wire: 'w1', pass: 'false' },
  { lit: 'branch', wire: 'w2', pass: 'false' },
  { lit: 'output', wire: 'w5', pass: 'false' },
]

const READOUT = {
  true: 'UBH 412K · speed 84 km/h · over the 80 limit → buzzer + alert sent',
  false: 'UBH 412K · speed 62 km/h · within limit → logged',
}

type Layout = {
  viewBox: string
  node: { w: number; h: number }
  centers: Record<NodeId, [number, number]>
  wires: Record<WireId, string>
  labels: { text: 'true' | 'false'; x: number; y: number; anchor: 'start' | 'middle' | 'end' }[]
}

/** Five nodes along a spine, the "false" arc over the top. */
const WIDE: Layout = {
  viewBox: '0 0 600 290',
  node: { w: 94, h: 84 },
  centers: { source: [70, 176], init: [185, 176], branch: [300, 176], action: [415, 176], output: [530, 176] },
  wires: {
    w1: 'M 117 176 L 138 176',
    w2: 'M 232 176 L 253 176',
    w3: 'M 347 176 L 368 176',
    w4: 'M 462 176 L 483 176',
    w5: 'M 300 134 C 300 64, 530 64, 530 134',
  },
  labels: [
    { text: 'true', x: 357, y: 198, anchor: 'middle' },
    { text: 'false', x: 415, y: 74, anchor: 'middle' },
  ],
}

/** The same flow stacked for a phone, the "false" arc down the right-hand side. */
const TALL: Layout = {
  viewBox: '0 0 300 560',
  node: { w: 196, h: 64 },
  centers: { source: [128, 40], init: [128, 156], branch: [128, 272], action: [128, 388], output: [128, 504] },
  wires: {
    w1: 'M 128 72 L 128 124',
    w2: 'M 128 188 L 128 240',
    w3: 'M 128 304 L 128 356',
    w4: 'M 128 420 L 128 472',
    w5: 'M 226 272 C 296 272, 296 504, 226 504',
  },
  labels: [
    { text: 'true', x: 140, y: 334, anchor: 'start' },
    { text: 'false', x: 262, y: 392, anchor: 'start' },
  ],
}

/** Whether the element is at least partly on screen. Assumed visible where IO is unavailable. */
function useInView(ref: RefObject<Element | null>) {
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
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

export default function DataOpsFlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const running = useInView(ref)
  const tick = useTicker(STEPS.length, 1300, running)
  const tall = useMediaQuery('(max-width: 640px)')
  const layout = tall ? TALL : WIDE
  // Without motion the whole "true" pass is shown lit, so the flow still reads as one.
  const still = prefersReducedMotion()
  const step = STEPS[tick]
  const litNodes = still ? NODES.map((n) => n.id) : [step.lit]
  const litWire = still ? null : step.wire
  const labelOn = (text: 'true' | 'false') => (still ? text === 'true' : step.pass === text && step.lit !== 'source')

  return (
    <div ref={ref} className={cx(s.panel, tall && s.tall, className)} aria-hidden="true">
      <svg className={s.svg} viewBox={layout.viewBox} preserveAspectRatio="xMidYMid meet">
        {(Object.keys(layout.wires) as WireId[]).map((id) => (
          <path key={id} d={layout.wires[id]} className={cx(s.wire, id === 'w5' && s.wireDashed)} />
        ))}
        {litWire && (
          // Keyed by tick so the draw restarts every time a wire lights up again.
          <g key={`${tick}-${litWire}`}>
            <path d={layout.wires[litWire]} pathLength={1} className={s.flowGlow} />
            <path d={layout.wires[litWire]} pathLength={1} className={s.flow} />
          </g>
        )}
        {layout.labels.map((l) => (
          <text key={l.text} x={l.x} y={l.y} textAnchor={l.anchor} className={cx(s.label, labelOn(l.text) && s.labelOn)}>
            {l.text}
          </text>
        ))}
        {NODES.map((n) => {
          const [cx_, cy] = layout.centers[n.id]
          const { w, h } = layout.node
          return (
            <foreignObject key={n.id} x={cx_ - w / 2} y={cy - h / 2} width={w} height={h} className={s.fo}>
              <div className={cx(s.node, litNodes.includes(n.id) && s.nodeLit)}>
                <svg className={s.glyph} viewBox="0 0 24 24">
                  {n.glyph}
                </svg>
                <span className={s.name}>{n.name}</span>
                <span className={s.kind}>{n.kind}</span>
              </div>
            </foreignObject>
          )
        })}
      </svg>
      <div key={still ? 'still' : step.pass} className={s.readout}>
        <span className={cx(s.readoutDot, (still || step.pass === 'true') && s.readoutDotOn)} />
        <span>{READOUT[still ? 'true' : step.pass]}</span>
      </div>
    </div>
  )
}
