import type { DetailPage } from '../types'
import { page as compliance } from './compliance'
import { page as driverSafetyDashCameras } from './driver-safety-dash-cameras'
import { page as insurance } from './insurance'
import { page as maintenance } from './maintenance'
import { page as sustainability } from './sustainability'
import { page as trackingAndTelematics } from './tracking-and-telematics'

export const products: DetailPage[] = [
  compliance,
  driverSafetyDashCameras,
  trackingAndTelematics,
  maintenance,
  sustainability,
  insurance,
]

export function findProduct(slug: string): DetailPage | undefined {
  return products.find((p) => p.slug === slug)
}
