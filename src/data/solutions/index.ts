import type { DetailPage } from '../types'
import { page as busAndPublicTransport } from './bus-and-public-transport'
import { page as commercialVehicleTracking } from './commercial-vehicle-tracking'
import { page as communicationsTechnology } from './communications-technology'
import { page as ecoDrive } from './eco-drive'
import { page as electronicCargoTracking } from './electronic-cargo-tracking'
import { page as evFleetManagement } from './ev-fleet-management'
import { page as fieldService } from './field-service'
import { page as foodManufacturing } from './food-manufacturing'
import { page as government } from './government'
import { page as mobileResourceManagement } from './mobile-resource-management'
import { page as ngoSatelliteTracking } from './ngo-satellite-tracking'
import { page as oilAndGas } from './oil-and-gas'
import { page as siteManagement } from './site-management'
import { page as truckingAndLogistics } from './trucking-and-logistics'

/** All fourteen solution pages in the live site's navigation order. */
export const solutions: DetailPage[] = [
  mobileResourceManagement,
  oilAndGas,
  electronicCargoTracking,
  busAndPublicTransport,
  communicationsTechnology,
  government,
  foodManufacturing,
  fieldService,
  ngoSatelliteTracking,
  truckingAndLogistics,
  ecoDrive,
  commercialVehicleTracking,
  evFleetManagement,
  siteManagement,
]

export function findSolution(slug: string): DetailPage | undefined {
  return solutions.find((s) => s.slug === slug)
}
