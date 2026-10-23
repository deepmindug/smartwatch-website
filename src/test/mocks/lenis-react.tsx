import type { ReactNode } from 'react'
import { lenisStub } from './lenis'

type Props = { children?: ReactNode; root?: boolean; options?: unknown; ref?: unknown }

export function ReactLenis({ children }: Props) {
  return <>{children}</>
}

export function useLenis() {
  return lenisStub
}
