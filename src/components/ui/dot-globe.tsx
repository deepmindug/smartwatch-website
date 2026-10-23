import { useEffect, useRef } from 'react'
import { land, region } from '../../data/globe-map'
import { prefersReducedMotion } from '../../motion/motion'
import s from './dot-globe.module.css'

/*
 * A whole dot-matrix globe, drawn on a 2D canvas.
 *
 * - Land is stippled with evenly spread dots (a Fibonacci sphere). Uganda, Kenya and Tanzania light up
 *   in the brand green, with Lake Victoria left open.
 * - Green routes arc out of Kampala: short ones across the three countries and long ones around the
 *   world. Pulses travel both ways along them, slowly, and each destination flares as one arrives.
 *   Routes and labels on the far side of the globe are hidden behind it.
 * - The globe forms outward from Kampala each time the slide comes in, then turns slowly on its own.
 *   Dragging spins it all the way round, in any direction, and it coasts to a stop before turning on
 *   again. The mouse sends a sonar ripple across the dots under it.
 * - It only animates while it is shown and on screen. Under reduced motion it turns at half speed.
 */

type Place = { name: string; lat: number; lng: number; label?: boolean }

const HUB: Place = { name: 'Kampala', lat: 0.3476, lng: 32.5825 }

/** Routes within the three countries. */
const REGIONAL: Place[] = [
  { name: 'Gulu', lat: 2.7724, lng: 32.2881 },
  { name: 'Mbarara', lat: -0.6072, lng: 30.6545 },
  { name: 'Kisumu', lat: -0.0917, lng: 34.768 },
  { name: 'Nairobi', lat: -1.2921, lng: 36.8219 },
  { name: 'Mombasa', lat: -4.0435, lng: 39.6682 },
  { name: 'Mwanza', lat: -2.5164, lng: 32.9175 },
  { name: 'Arusha', lat: -3.3869, lng: 36.683 },
  { name: 'Dodoma', lat: -6.163, lng: 35.7516 },
  { name: 'Dar es Salaam', lat: -6.7924, lng: 39.2083 },
]

/** Long routes from Kampala around the world, labelled. */
const GLOBAL: Place[] = [
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, label: true },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777, label: true },
  { name: 'Shanghai', lat: 31.2304, lng: 121.4737, label: true },
  { name: 'Rotterdam', lat: 51.9244, lng: 4.4777, label: true },
  { name: 'Johannesburg', lat: -26.2041, lng: 28.0473, label: true },
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, label: true },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357, label: true },
]

const COUNTRIES = [
  { name: 'UGANDA', lat: 2.4, lng: 32.2 },
  { name: 'KENYA', lat: 0.6, lng: 38.2 },
  { name: 'TANZANIA', lat: -6.4, lng: 34.6 },
]

const GREEN = '79, 184, 72'
const DOT = '201, 220, 255'
const RAD = Math.PI / 180
/** The globe opens facing Kampala, tilted a little so the northern hemisphere leans in. */
const BUCKETS = 20
const START = { lng: HUB.lng, lat: 8 }
/** Degrees per second the globe turns on its own. */
const SPIN = 7

type Dots = {
  n: number
  x: Float32Array
  y: Float32Array
  z: Float32Array
  tag: Uint8Array
  jitter: Float32Array
  delay: Float32Array
}

const cache = new Map<number, Dots>()

function decodeLand(): Uint8Array {
  const bin = atob(land.data)
  const cells = new Uint8Array(land.w * land.h)
  let i = 0
  let pos = 0
  let value = 0
  while (i < bin.length) {
    let run = 0
    let shift = 0
    for (;;) {
      const b = bin.charCodeAt(i++)
      run |= (b & 127) << shift
      if (b < 128) break
      shift += 7
    }
    if (value) cells.fill(1, pos, pos + run)
    pos += run
    value ^= 1
  }
  return cells
}

function decodeRegion(): Uint8Array {
  const cells = new Uint8Array(region.rows * region.cols)
  let pos = 0
  for (const part of region.data.split('.')) {
    const code = Number(part[0])
    const run = parseInt(part.slice(1), 36)
    cells.fill(code, pos, pos + run)
    pos += run
  }
  return cells
}

/** Every land dot on the sphere for a sample count, as unit vectors tagged 0 land, 1 Uganda, 2 Kenya, 3 Tanzania. */
function buildDots(N: number): Dots {
  const hit = cache.get(N)
  if (hit) return hit
  const cells = decodeLand()
  const ea = decodeRegion()
  const golden = Math.PI * (3 - Math.sqrt(5))
  const xs: number[] = []
  const ys: number[] = []
  const zs: number[] = []
  const tags: number[] = []
  for (let i = 0; i < N; i++) {
    const y = 1 - ((i + 0.5) / N) * 2
    const r = Math.sqrt(1 - y * y)
    const lat = Math.asin(y) / RAD
    let lng = (((golden * i) / RAD) % 360) - 180
    if (lng < -180) lng += 360
    let tag = 0
    if (lat <= region.lat0 && lat >= region.lat1 && lng >= region.lng0 && lng <= region.lng1) {
      const row = Math.min(region.rows - 1, Math.floor((region.lat0 - lat) / region.step))
      const col = Math.min(region.cols - 1, Math.floor((lng - region.lng0) / region.step))
      const code = ea[row * region.cols + col]
      if (code === 4) continue
      tag = code
    }
    if (!tag) {
      const row = Math.min(land.h - 1, Math.floor((90 - lat) * 2))
      const col = Math.min(land.w - 1, Math.floor((lng + 180) * 2))
      if (!cells[row * land.w + col]) continue
    }
    xs.push(r * Math.sin(lng * RAD))
    ys.push(y)
    zs.push(r * Math.cos(lng * RAD))
    tags.push(tag)
  }
  const n = xs.length
  const hub = toVec(HUB.lat, HUB.lng)
  const delay = new Float32Array(n)
  const jitter = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const dot = xs[i] * hub[0] + ys[i] * hub[1] + zs[i] * hub[2]
    // The globe forms outward from Kampala, the far side last.
    delay[i] = Math.acos(Math.max(-1, Math.min(1, dot))) / Math.PI
    jitter[i] = 0.75 + ((i * 2654435761) % 1000) / 1000 / 2
  }
  const dots = {
    n,
    x: Float32Array.from(xs),
    y: Float32Array.from(ys),
    z: Float32Array.from(zs),
    tag: Uint8Array.from(tags),
    jitter,
    delay,
  }
  cache.set(N, dots)
  return dots
}

function toVec(lat: number, lng: number): [number, number, number] {
  const c = Math.cos(lat * RAD)
  return [c * Math.sin(lng * RAD), Math.sin(lat * RAD), c * Math.cos(lng * RAD)]
}

/** Points along the great circle from a to b, lifted off the surface in an arc. */
function arc(a: Place, b: Place): [number, number, number][] {
  const va = toVec(a.lat, a.lng)
  const vb = toVec(b.lat, b.lng)
  const om = Math.acos(Math.max(-1, Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2])))
  const so = Math.sin(om) || 1
  const lift = 0.012 + Math.min(om, 1.4) * 0.22
  const steps = Math.max(24, Math.round(om * 90))
  const out: [number, number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const ka = Math.sin((1 - t) * om) / so
    const kb = Math.sin(t * om) / so
    const h = 1 + lift * Math.sin(Math.PI * t)
    out.push([(ka * va[0] + kb * vb[0]) * h, (ka * va[1] + kb * vb[1]) * h, (ka * va[2] + kb * vb[2]) * h])
  }
  return out
}

export default function DotGlobe({ active = true, className }: { active?: boolean; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(active)
  const restart = useRef<() => void>(() => {})

  useEffect(() => {
    activeRef.current = active
    if (active) restart.current()
  }, [active])

  useEffect(() => {
    const el = canvas.current
    const box = wrap.current
    if (!el || !box) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    const calm = prefersReducedMotion()
    const places = [...REGIONAL, ...GLOBAL]
    const routes = places.map((p) => arc(HUB, p))
    const font = getComputedStyle(document.body).fontFamily || 'sans-serif'

    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let visible = true
    let formedSeen = false
    let start = performance.now()
    let last = start
    let dots = buildDots(60000)
    let sx = new Float32Array(dots.n)
    let sy = new Float32Array(dots.n)
    let sz = new Float32Array(dots.n)
    let buckets = Array.from({ length: BUCKETS }, () => new Int32Array(dots.n))
    const counts = new Int32Array(BUCKETS)

    // The view: yaw turns freely all the way round, pitch is held short of the poles.
    let yaw = START.lng
    let pitch = START.lat
    let velYaw = 0
    let velPitch = 0
    let idle = 0
    let dragging: { x: number; y: number; t: number } | null = null
    let pointer: { x: number; y: number } | null = null
    let ptrStrength = 0

    const useDots = (n: number) => {
      if (dots.n && cache.get(n) === dots) return
      dots = buildDots(n)
      sx = new Float32Array(dots.n)
      sy = new Float32Array(dots.n)
      sz = new Float32Array(dots.n)
      buckets = Array.from({ length: BUCKETS }, () => new Int32Array(dots.n))
    }

    const geometry = () => {
      const R = Math.max(120, Math.min(w * 0.42, h * 0.4))
      // On wide panels the globe sits a little low and left, leaving the top right for the KRA badge.
      const wide = w > 600
      const cx = w * (wide ? 0.47 : 0.5)
      const cy = h * (wide ? 0.58 : 0.5)
      return { lng0: yaw * RAD, lat0: pitch * RAD, R, cx, cy }
    }

    const resize = () => {
      const r = box.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      w = r.width
      h = r.height
      el.width = Math.round(w * dpr)
      el.height = Math.round(h * dpr)
      el.style.width = `${w}px`
      el.style.height = `${h}px`
      // A denser stipple on big globes, a lighter one on phones.
      useDots(geometry().R > 240 ? 90000 : 50000)
      if (!raf) draw(performance.now())
    }

    const project = (v: [number, number, number], g: ReturnType<typeof geometry>) => {
      const cl = Math.cos(g.lng0)
      const sl = Math.sin(g.lng0)
      const x1 = v[0] * cl - v[2] * sl
      const z1 = v[0] * sl + v[2] * cl
      const cp = Math.cos(g.lat0)
      const sp = Math.sin(g.lat0)
      const y2 = v[1] * cp - z1 * sp
      const z2 = v[1] * sp + z1 * cp
      // A point is seen if it is on the near side, or lifted clear of the globe's outline.
      const seen = z2 > 0 || x1 * x1 + y2 * y2 > 1
      return { x: g.cx + x1 * g.R, y: g.cy - y2 * g.R, z: z2, seen }
    }

    // The point on the sphere under the pointer, as a unit vector in world space, or null.
    const unproject = (px: number, py: number, g: ReturnType<typeof geometry>) => {
      const x1 = (px - g.cx) / g.R
      const y2 = -(py - g.cy) / g.R
      const rr = x1 * x1 + y2 * y2
      if (rr > 1) return null
      const z2 = Math.sqrt(1 - rr)
      const cp = Math.cos(g.lat0)
      const sp = Math.sin(g.lat0)
      const vy = y2 * cp + z2 * sp
      const z1 = -y2 * sp + z2 * cp
      const cl = Math.cos(g.lng0)
      const sl = Math.sin(g.lng0)
      return [x1 * cl + z1 * sl, vy, -x1 * sl + z1 * cl] as [number, number, number]
    }

    function draw(now: number) {
      const t = now - start
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      // Turn: coast after a drag, then ease back into the slow spin.
      if (!dragging) {
        idle += dt
        const spin = (calm ? SPIN / 2 : SPIN) * Math.min(1, Math.max(0, idle - 0.6))
        velYaw *= 0.94
        velPitch *= 0.94
        yaw += (velYaw + spin) * dt
        pitch += velPitch * dt
        // Drift back towards a gentle tilt once the drag has settled.
        if (idle > 1.5) pitch += (START.lat - pitch) * 0.01
      }
      pitch = Math.max(-60, Math.min(60, pitch))
      ptrStrength += ((pointer ? 1 : 0) - ptrStrength) * 0.06

      const g = geometry()
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, w, h)

      // Glass body and a thin rim (no outer glow).
      const body = ctx!.createRadialGradient(g.cx - g.R * 0.35, g.cy - g.R * 0.4, g.R * 0.1, g.cx, g.cy, g.R)
      // A see-through glass shell, so the far side of the map shows through.
      body.addColorStop(0, 'rgba(60, 120, 190, 0.16)')
      body.addColorStop(0.75, 'rgba(22, 56, 100, 0.12)')
      body.addColorStop(1, 'rgba(22, 56, 100, 0.2)')
      ctx!.beginPath()
      ctx!.arc(g.cx, g.cy, g.R, 0, Math.PI * 2)
      ctx!.fillStyle = body
      ctx!.fill()
      ctx!.strokeStyle = 'rgba(255, 255, 255, 0.14)'
      ctx!.lineWidth = 1
      ctx!.stroke()

      // Dots, sorted into colour buckets (4 tags x 5 depth bands) so the fill changes rarely.
      // Bands 0-1 are the far side, seen through the hollow globe; 2-4 face the viewer.
      const cl = Math.cos(g.lng0)
      const sl = Math.sin(g.lng0)
      const cp = Math.cos(g.lat0)
      const sp = Math.sin(g.lat0)
      const form = t / 1800
      const forming = form < 1.4
      const unit = Math.max(1.2, g.R / 150)
      for (let b = 0; b < BUCKETS; b++) counts[b] = 0
      for (let i = 0; i < dots.n; i++) {
        const x1 = dots.x[i] * cl - dots.z[i] * sl
        const z1 = dots.x[i] * sl + dots.z[i] * cl
        const z2 = dots.y[i] * sp + z1 * cp
        sx[i] = g.cx + x1 * g.R
        sy[i] = g.cy - (dots.y[i] * cp - z1 * sp) * g.R
        sz[i] = z2
        const band = z2 > 0.66 ? 4 : z2 > 0.33 ? 3 : z2 > 0.02 ? 2 : z2 > -0.45 ? 1 : 0
        const b = band * 4 + dots.tag[i]
        buckets[b][counts[b]++] = i
      }
      // Far side first, then the near side over it.
      for (let b = 0; b < BUCKETS; b++) {
        const tag = b % 4
        const band = (b / 4) | 0
        const alpha =
          band < 2 ? (tag ? 0.3 : 0.2) + band * 0.1 : tag ? 0.45 + (band - 1) * 0.18 : 0.12 + (band - 1) * 0.22
        ctx!.fillStyle =
          tag === 0
            ? `rgba(${DOT}, ${alpha})`
            : tag === 1
              ? `rgba(126, 226, 118, ${alpha})`
              : `rgba(${GREEN}, ${alpha})`
        const list = buckets[b]
        const scale = unit * (tag ? 1.15 : 1)
        ctx!.beginPath()
        for (let k = 0; k < counts[b]; k++) {
          const i = list[k]
          const zz = sz[i]
          let size = scale * dots.jitter[i] * (zz > 0 ? 0.45 + 0.55 * zz : 0.5 + 0.2 * (1 + zz))
          if (forming) {
            const appear = Math.min(1, Math.max(0, (form - dots.delay[i]) * 3))
            if (appear <= 0) continue
            size *= appear
          }
          ctx!.rect(sx[i] - size / 2, sy[i] - size / 2, size, size)
        }
        ctx!.fill()
      }

      // The sonar ripple: dots near the pointer swell on a travelling wave.
      const p = pointer ? unproject(pointer.x, pointer.y, g) : null
      if (p && ptrStrength > 0.02) {
        ctx!.fillStyle = `rgba(190, 245, 182, ${0.9 * ptrStrength})`
        ctx!.beginPath()
        for (let b = 8; b < BUCKETS; b++) {
          const list = buckets[b]
          for (let k = 0; k < counts[b]; k++) {
            const i = list[k]
            const dx = dots.x[i] - p[0]
            const dy = dots.y[i] - p[1]
            const dz = dots.z[i] - p[2]
            const dd = dx * dx + dy * dy + dz * dz
            if (dd > 0.09) continue
            const d = Math.sqrt(dd)
            const fall = (1 - d / 0.3) ** 2
            const wave = 0.5 + 0.5 * Math.cos((d - t * 0.00012) * 70)
            const kk = fall * wave
            if (kk < 0.08) continue
            const size = unit * dots.jitter[i] * (1 + 1.6 * kk)
            const x = sx[i] + (sx[i] - g.cx) * 0.025 * kk
            const y = sy[i] + (sy[i] - g.cy) * 0.025 * kk
            ctx!.rect(x - size / 2, y - size / 2, size, size)
          }
        }
        ctx!.fill()
      }

      // Routes, with pulses travelling out and back. Segments behind the globe are skipped.
      const formed = Math.min(1, Math.max(0, (form - 0.2) * 1.4))
      ctx!.lineCap = 'round'
      routes.forEach((pts, ri) => {
        const proj = pts.map((v) => project(v, g))
        ctx!.globalAlpha = formed
        ctx!.setLineDash([4, 5])
        ctx!.lineWidth = 1.4
        // Two passes: the far-side stretch faintly through the globe, then the near side.
        for (const near of [false, true]) {
          ctx!.strokeStyle = near ? `rgba(${GREEN}, 0.75)` : `rgba(${GREEN}, 0.28)`
          ctx!.beginPath()
          let pen = false
          for (const q of proj) {
            if (q.seen !== near) {
              pen = false
              continue
            }
            if (pen) ctx!.lineTo(q.x, q.y)
            else ctx!.moveTo(q.x, q.y)
            pen = true
          }
          ctx!.stroke()
        }
        ctx!.setLineDash([])
        // Each pulse takes about nine seconds to cross its route.
        const cycle = 12
        const phase = t / 1000 + ri * 1.3
        for (const back of [false, true]) {
          const head = (((phase + (back ? cycle / 2 : 0)) % cycle) / cycle) * 1.4
          if (head > 1.15) continue
          for (let k = 0; k < 16; k++) {
            const u = head - k * 0.016
            if (u < 0 || u > 1) continue
            const q = proj[Math.round((back ? 1 - u : u) * (proj.length - 1))]
            const fade = (1 - k / 16) * (q.seen ? 1 : 0.35)
            ctx!.fillStyle = back ? `rgba(255, 255, 255, ${0.9 * fade})` : `rgba(150, 240, 140, ${fade})`
            ctx!.beginPath()
            ctx!.arc(q.x, q.y, (back ? 2 : 2.8) * fade + 0.7, 0, Math.PI * 2)
            ctx!.fill()
          }
        }
      })
      ctx!.globalAlpha = 1

      // Destinations, the long-route ones labelled.
      ctx!.textBaseline = 'middle'
      const small = Math.max(10, Math.min(12, g.R / 26))
      places.forEach((pl, i) => {
        const q = project(toVec(pl.lat, pl.lng), g)
        if (q.z < 0.08) {
          // On the far side: a faint marker through the globe, no label.
          ctx!.globalAlpha = formed * 0.35
          ctx!.fillStyle = '#ffffff'
          ctx!.beginPath()
          ctx!.arc(q.x, q.y, 1.6, 0, Math.PI * 2)
          ctx!.fill()
          return
        }
        const flare = Math.max(0, Math.sin(t / 2000 + i * 1.7)) ** 8
        ctx!.globalAlpha = formed * Math.min(1, q.z * 4)
        ctx!.fillStyle = `rgba(${GREEN}, ${0.25 + 0.35 * flare})`
        ctx!.beginPath()
        ctx!.arc(q.x, q.y, 4 + 5 * flare, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.fillStyle = '#ffffff'
        ctx!.beginPath()
        ctx!.arc(q.x, q.y, 2.2, 0, Math.PI * 2)
        ctx!.fill()
        if (pl.label) {
          ctx!.font = `600 ${small}px ${font}`
          ctx!.fillStyle = 'rgba(255, 255, 255, 0.9)'
          ctx!.textAlign = 'left'
          ctx!.fillText(pl.name, q.x + 7, q.y)
        }
      })
      ctx!.globalAlpha = 1

      // The three countries, named while they face the viewer.
      COUNTRIES.forEach((c) => {
        const q = project(toVec(c.lat, c.lng), g)
        if (q.z < 0.3) return
        ctx!.globalAlpha = formed * Math.min(1, (q.z - 0.3) * 3)
        ctx!.font = `700 ${Math.round(Math.max(9, g.R / 28))}px ${font}`
        ctx!.textAlign = 'center'
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.95)'
        ctx!.shadowColor = 'rgba(0, 0, 0, 0.7)'
        ctx!.shadowBlur = 6
        ctx!.fillText(c.name, q.x, q.y)
        ctx!.shadowBlur = 0
      })
      ctx!.globalAlpha = 1

      // Kampala's beacon and label, while it faces the viewer.
      const hq = project(toVec(HUB.lat, HUB.lng), g)
      if (hq.z > 0.05) {
        const fadeIn = formed * Math.min(1, hq.z * 4)
        ctx!.globalAlpha = fadeIn
        for (let k = 0; k < 3; k++) {
          const ring = (t / 1800 + k / 3) % 1
          ctx!.strokeStyle = `rgba(${GREEN}, ${0.8 * (1 - ring)})`
          ctx!.lineWidth = 2
          ctx!.beginPath()
          ctx!.arc(hq.x, hq.y, 5 + ring * 24, 0, Math.PI * 2)
          ctx!.stroke()
        }
        ctx!.fillStyle = '#4fb848'
        ctx!.beginPath()
        ctx!.arc(hq.x, hq.y, 5, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.strokeStyle = '#ffffff'
        ctx!.lineWidth = 2
        ctx!.stroke()
        ctx!.font = `700 ${small + 1}px ${font}`
        ctx!.textAlign = 'left'
        const tw = ctx!.measureText(HUB.name).width
        const lx = hq.x - tw - 20 - 18
        ctx!.fillStyle = '#4fb848'
        ctx!.beginPath()
        ctx!.roundRect(lx, hq.y - 11, tw + 20, 22, 11)
        ctx!.fill()
        ctx!.fillStyle = '#ffffff'
        ctx!.fillText(HUB.name, lx + 10, hq.y)
        ctx!.globalAlpha = 1
      }

      if (!forming && visible) formedSeen = true
      if (activeRef.current && visible) raf = requestAnimationFrame(draw)
      else raf = 0
    }

    const loop = () => {
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(draw)
      }
    }
    restart.current = () => {
      start = performance.now()
      formedSeen = false
      loop()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(box)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) return
      // On phones the globe can sit below the fold: form it when it is first seen, not off screen.
      if (!formedSeen) start = performance.now()
      loop()
    })
    io.observe(box)
    resize()
    loop()

    const local = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onDown = (e: PointerEvent) => {
      const at = local(e)
      const g = geometry()
      // Only a press on the globe itself starts a spin.
      if ((at.x - g.cx) ** 2 + (at.y - g.cy) ** 2 > (g.R * 1.05) ** 2) return
      dragging = { ...at, t: performance.now() }
      velYaw = 0
      velPitch = 0
      box.classList.add(s.grabbing)
      box.setPointerCapture?.(e.pointerId)
      // Keep the slideshow's own swipe from treating a spin as a change of slide.
      e.stopPropagation()
    }
    const onMove = (e: PointerEvent) => {
      const at = local(e)
      if (e.pointerType === 'mouse') pointer = at
      if (dragging) {
        const now = performance.now()
        const g = geometry()
        // One globe-width of drag turns it about half way round.
        const k = 180 / (Math.PI * g.R)
        const dYaw = -(at.x - dragging.x) * k
        const dPitch = (at.y - dragging.y) * k
        yaw += dYaw
        pitch += dPitch
        const dt = Math.max(0.008, (now - dragging.t) / 1000)
        velYaw = velYaw * 0.5 + (dYaw / dt) * 0.5
        velPitch = velPitch * 0.5 + (dPitch / dt) * 0.5
        dragging = { ...at, t: now }
        idle = 0
        e.stopPropagation()
      }
      loop()
    }
    const onUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = null
      idle = 0
      box.classList.remove(s.grabbing)
      box.releasePointerCapture?.(e.pointerId)
      e.stopPropagation()
    }
    const onLeave = () => {
      pointer = null
    }
    box.addEventListener('pointerdown', onDown)
    box.addEventListener('pointermove', onMove)
    box.addEventListener('pointerup', onUp)
    box.addEventListener('pointercancel', onUp)
    box.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      box.removeEventListener('pointerdown', onDown)
      box.removeEventListener('pointermove', onMove)
      box.removeEventListener('pointerup', onUp)
      box.removeEventListener('pointercancel', onUp)
      box.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrap} className={[s.globe, className].filter(Boolean).join(' ')}>
      <canvas
        ref={canvas}
        role="img"
        aria-label="A turning globe: green routes run from Kampala across Uganda, Kenya and Tanzania and out to Dubai, Mumbai, Shanghai, Rotterdam, Johannesburg, Lagos and Cairo"
      />
    </div>
  )
}
