import { ReactLenis, type LenisRef } from 'lenis/react'
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, HEADER_OFFSET, ScrollTrigger } from '../motion/gsap'

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger and Lenis stay in sync.
 * Lenis disables smoothing on its own when the user prefers reduced motion.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const ref = useRef<LenisRef>(null)

  useEffect(() => {
    const update = (time: number) => {
      ref.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    const lenis = ref.current?.lenis
    lenis?.on('scroll', ScrollTrigger.update)
    return () => {
      gsap.ticker.remove(update)
      lenis?.off('scroll', ScrollTrigger.update)
    }
  }, [])

  return (
    <ReactLenis root ref={ref} options={{ autoRaf: false, anchors: { offset: -HEADER_OFFSET } }}>
      {children}
    </ReactLenis>
  )
}
