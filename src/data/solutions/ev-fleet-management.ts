import { img } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'ev-fleet-management',
  kind: 'solution',
  name: 'EV Fleet Management',
  short: 'Charge status, range and utilization for electric fleets.',
  hero: {
    eyebrow: 'Solutions · EV Fleet Management',
    title: 'Drive your EV fleet forward with confidence.',
    intro:
      'An advanced charging module with state-of-charge overview, cost analysis and optimization, and real-time notifications and alerts.',
    tone: 'dark',
    media: img.charging,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      eyebrow: 'EV Fleet Management',
      title: 'Key values.',
      columns: 3,
      items: [
        {
          title: 'State of charge',
          body: 'With exact awareness of your EVs’ charging state, you may drive forward with confidence.',
        },
        {
          title: 'Charging data',
          body: 'Maximize savings and efficiency with charging data.',
        },
        {
          title: 'Up-to-date information',
          body: 'Stay informed with up-to-date information.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      title: 'Advanced charging module and state of charge overview.',
      body: 'The sophisticated charging module provides a comprehensive view of your EVs’ charging activities, allowing you to monitor connected and charging vehicles seamlessly. Utilize the State of Charge feature to track the exact battery level in kilowatt-hours (kWh). This real-time insight empowers you to stay ahead in energy consumption calculations and make informed decisions promptly.',
      points: [
        'Monitor connected and charging vehicles',
        'Track the exact battery level in kilowatt-hours (kWh)',
        'Stay ahead in energy consumption calculations',
      ],
      mediaLabel: 'the charging module in the Smartwatch FM dashboard',
      media: img.laptop,
    },
    {
      kind: 'split',
      title: 'Charging cost analysis and optimization.',
      body: 'Understanding that charging stations vary – from fast-charging hubs to single-phase and two-phase modes – our GPS trackers can provide all the data needed for cost-effective charging strategies. Analyze where your EVs were charged, determine the cost implications per 100 km, and derive insights to decide on the best charging stations and optimal charging times.',
      points: [
        'Analyze where your EVs were charged',
        'Cost implications per 100 km',
        'Best charging stations and optimal charging times',
      ],
      mediaLabel: 'EV connected at a charging station',
      media: img.evChargingCost,
      reverse: true,
    },
    {
      kind: 'split',
      title: 'Real-time notifications and alerts.',
      body: 'Receive real-time notifications when an EV’s battery reaches critical levels, ensuring timely interventions. Additionally, benefit from alerts related to charging anomalies, station downtimes, or when vehicles deviate from recommended charging schedules, enabling swift corrective actions.',
      points: [
        'Battery at critical levels',
        'Charging anomalies and station downtimes',
        'Deviations from recommended charging schedules',
      ],
      mediaLabel: 'charging alert checked on a phone at the charge point',
      media: img.evChargeAlert,
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.product('sustainability'),
        routes.product('tracking-and-telematics'),
        routes.solution('commercial-vehicle-tracking'),
        routes.product('maintenance'),
      ],
    },
  ],
  meta: {
    title: 'EV Fleet Management',
    description:
      'An advanced charging module with state-of-charge overview, cost analysis and optimization, and real-time notifications and alerts.',
  },
}
