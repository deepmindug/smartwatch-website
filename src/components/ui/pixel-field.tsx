import { useEffect, useRef } from 'react'
import { cx } from '../../lib/cx'
import s from './pixel-field.module.css'

type Props = {
  /** Starting hue of the blocks in OKLCH degrees; the field ranges from here to 30° above. 170 is the template's teal. */
  hue?: number
  /** Animation speed; 1 matches the template, 0 holds it still. */
  speed?: number
  /** Opacity of the block field over the ground, 0–1; the template uses 0.3. */
  intensity?: number
  /** Draw the faint 60px line grid under the blocks, as the template does. */
  grid?: boolean
  className?: string
}

/*
 * Recreates the Nexus template's "AsciiWave" hero: a field of rectangular cells, each drawn as 8 × 12 canvas
 * pixels and scaled up with pixelated rendering. The template stretches a fixed 120 × 40 field over its hero;
 * here the field is sized to the element instead (one cell per 12 × 18 CSS pixels, the template's own
 * proportions on a wide screen), so a tall phone footer gets more rows rather than stretched blocks. Three slow sine waves are mixed into
 * one value per cell; the value picks one of four block designs — full, dense, half and light, the
 * template's █ ▓ ▒ ░ — or leaves the cell empty, and sets the cell's lightness, hue and opacity.
 *
 * The four designs are drawn pixel by pixel rather than as font glyphs, so they look the same on every
 * device whatever fonts it has.
 */
const CW = 8
const CH = 12
/** On-screen size of one cell, in CSS pixels: 1440 / 120 wide, in the template's 2 : 3 proportion. */
const CELL_W = 12
const CELL_H = 18

/** The four block designs as 8 × 12 masks; the last column stays dark, the gap between glyphs. */
const MASKS: Uint8Array[] = [0, 1, 2, 3].map((level) => {
  const m = new Uint8Array(CW * CH)
  for (let y = 0; y < CH; y++)
    for (let x = 0; x < CW - 1; x++) {
      let on = false
      if (level === 0)
        on = true // █ full
      else if (level === 1)
        on = !(x % 2 === 0 && y % 2 === 1) // ▓ dense
      else if (level === 2)
        on = (x + y) % 2 === 0 // ▒ half
      else on = x % 2 === 0 && y % 2 === 0 // ░ light
      m[y * CW + x] = on ? 1 : 0
    }
  return m
})

/** OKLCH → sRGB bytes, for the template's oklch() fill colours. */
function oklchToRgb(L: number, C: number, hDeg: number): [number, number, number] {
  const h = (hDeg * Math.PI) / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ ** 3
  const m = m_ ** 3
  const s2 = s_ ** 3
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s2,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s2,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s2,
  ]
  return lin.map((v) => {
    const c = Math.min(1, Math.max(0, v))
    const g = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055
    return Math.round(g * 255)
  }) as [number, number, number]
}

/**
 * Animated block-field background after the Nexus template. Fills its positioned parent behind the
 * content and ignores the pointer. It pauses off screen and in hidden tabs. It keeps moving when the
 * device asks for reduced motion: Android's "Remove animations" (on by default in power saving, as on
 * the Galaxy A32) reports that, and the field is a slow ambient drift rather than motion that jumps.
 */
export default function PixelField({ hue = 170, speed = 1, intensity = 0.3, grid = true, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const live = useRef({ hue, speed })
  live.current = { hue, speed }

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let ctx: CanvasRenderingContext2D | null = null
    try {
      ctx = canvas.getContext('2d')
    } catch {
      ctx = null
    }
    if (!ctx || typeof ImageData === 'undefined') return
    let COLS = 120
    let ROWS = 40
    let W = COLS * CW
    let H = ROWS * CH
    let img = ctx.createImageData(W, H)
    let px = img.data
    // Match the grid to the element's shape so every cell keeps its proportions.
    const fit = () => {
      const cols = Math.max(8, Math.round(canvas.clientWidth / CELL_W))
      const rows = Math.max(4, Math.round(canvas.clientHeight / CELL_H))
      if (cols === COLS && rows === ROWS && canvas.width === W) return
      COLS = cols
      ROWS = rows
      W = COLS * CW
      H = ROWS * CH
      canvas.width = W
      canvas.height = H
      img = ctx!.createImageData(W, H)
      px = img.data
    }
    fit()
    let n = 0
    let raf = 0
    let visible = true
    let last = performance.now()

    const draw = () => {
      px.fill(0)
      const base = live.current.hue
      for (let e = 0; e < ROWS; e++)
        for (let t = 0; t < COLS; t++) {
          // The template's wave field, value 0..1 per cell.
          const v =
            ((Math.sin(0.08 * t + n) * Math.cos(0.12 * e + 0.5 * n) +
              Math.sin(0.05 * t - 0.7 * n) * Math.sin(0.08 * e + 0.3 * n) +
              Math.cos(0.03 * t + 0.03 * e + 0.4 * n)) /
              3 +
              1) /
            2
          // Index into "█▓▒░ ": 0..4, where 4 is an empty cell.
          const idx = Math.floor(v * 4)
          if (idx >= 4) continue
          const [r, g, b] = oklchToRgb(0.5 + 0.3 * v, 0.15, base + 30 * v)
          const alpha = Math.round((0.3 + 0.7 * v) * 255)
          const mask = MASKS[idx]
          const ox = t * CW
          const oy = e * CH
          for (let y = 0; y < CH; y++) {
            let p = ((oy + y) * W + ox) * 4
            const row = y * CW
            for (let x = 0; x < CW; x++, p += 4) {
              if (!mask[row + x]) continue
              px[p] = r
              px[p + 1] = g
              px[p + 2] = b
              px[p + 3] = alpha
            }
          }
        }
      ctx!.putImageData(img, 0, 0)
    }

    // The template's pattern advances 0.03 per drawn frame, and its heavy text drawing holds it to about
    // 27 frames a second, so the field really drifts about 0.8 per second. Matching that, and drawing at
    // about 30 frames a second, gives the same slow, stepped movement on every screen.
    const RATE = 0.82
    const STEP = 1000 / 30
    let acc = 0
    const frame = (now: number) => {
      const dt = Math.min(now - last, 100)
      last = now
      acc += dt
      if (acc >= STEP) {
        n += RATE * (acc / 1000) * live.current.speed
        acc = 0
        draw()
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (!visible || document.hidden) {
        draw()
        return
      }
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    start()
    const ro =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            fit()
            draw()
          })
    ro?.observe(canvas)
    const io =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            start()
          })
    io?.observe(canvas)
    const onChange = () => start()
    document.addEventListener('visibilitychange', onChange)
    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      io?.disconnect()
      document.removeEventListener('visibilitychange', onChange)
    }
  }, [])

  return (
    <div className={cx(s.root, className)} aria-hidden="true">
      {grid && <div className={s.grid} />}
      <canvas ref={ref} className={s.canvas} style={{ opacity: intensity }} />
    </div>
  )
}
