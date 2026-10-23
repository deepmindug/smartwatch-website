import { hw, img } from '../images'
import { anchors, routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'commercial-vehicle-tracking',
  kind: 'solution',
  name: 'Commercial Vehicle Tracking',
  short: 'Light commercial fleets tracked and protected at low cost.',
  hero: {
    eyebrow: 'Solutions · Commercial Vehicle Tracking',
    title: 'Easy-to-use, safe and reliable tracking for light commercial vehicles.',
    intro:
      'Our light commercial vehicle solution reads manufacturer-specific CANbus data via the OBDII port, making tracking reports, the Eco-Drive module and other features highly accurate.',
    tone: 'dark',
    media: img.vans,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      eyebrow: 'The solution',
      title: 'The LCV tracking solution.',
      columns: 3,
      items: [
        {
          title: 'Advanced tracker and OBDII harness',
          body: 'A GPS tracker from our advanced tracker family, paired with OBDII harnesses, forms the complete light commercial vehicle tracking solution.',
        },
        {
          title: 'Plug-and-play installation',
          body: 'Plug-and-play installation with automatic vehicle detection and configuration.',
        },
        {
          title: 'Direct CANbus connection',
          body: 'Direct CANbus connection solutions are available as an alternative.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      title: 'Highly accurate data, read straight from the vehicle.',
      body: [
        'Reading CANbus data via OBDII makes tracking reports, the Eco-Drive module and other features highly accurate.',
        'The communication is read-only: no configuration is done to the vehicle, so the manufacturer’s warranty is not affected.',
      ],
      points: ['RPM', 'Speed', 'Fuel level', 'Odometer', 'VIN and other parameters'],
      mediaLabel: 'OBDII tracker plugged into a delivery van',
      media: hw.gpsTracker,
    },
    {
      kind: 'split',
      title: 'Installation your way.',
      body: 'Choose plug-and-play or fixed installation, with automatic vehicle model detection and configuration. A concealed installation is possible using an OBDII splitter harness, and where OBD is not enough, direct CANbus connection solutions are available.',
      points: [
        'Plug-and-play or fixed installation',
        'Concealed installation with an OBDII splitter harness',
        'Direct CANbus connection as an alternative',
      ],
      mediaLabel: 'installer fitting a tracker with a laptop',
      media: img.installerLaptop,
      reverse: true,
      cta: { label: 'View hardware', to: `${routes.hardware}#${anchors.devices}` },
    },
    {
      kind: 'bullets',
      id: 'why',
      title: 'Why it’s better.',
      columns: 2,
      items: [
        'Faster, easier and safer installation',
        'Read-only communication type: no configuration is done to the vehicle',
        'Plug-and-play or fixed installation',
        'Automatic vehicle model detection and configuration',
        'Does not void the vehicle manufacturer’s warranty',
        'Concealed installation using an OBDII splitter harness',
        'No third-party accessories needed',
        'Can be configured offline',
        'No physical manipulation of vehicle wires',
        'Wide vehicle model coverage',
      ],
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.product('tracking-and-telematics'),
        routes.solution('eco-drive'),
        routes.hardware,
        routes.solution('trucking-and-logistics'),
      ],
    },
  ],
  meta: {
    title: 'Commercial Vehicle Tracking',
    description:
      'An easy-to-use, safe and reliable tracking solution for light commercial vehicles that reads manufacturer-specific CANbus data via the OBDII port.',
  },
}
