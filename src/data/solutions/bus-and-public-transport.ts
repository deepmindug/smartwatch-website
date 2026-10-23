import { hw, img } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'bus-and-public-transport',
  kind: 'solution',
  name: 'Bus & Public Transport',
  short: 'Passenger information, people counting, dispatch and ticketing on one platform.',
  hero: {
    eyebrow: 'Solutions · Bus & Public Transport',
    title: 'Reliable telematics to improve driver safety and vehicle performance.',
    intro:
      'Real-time bus tracking, driver behaviour monitoring, multi-channel video surveillance and high-accuracy people counting for bus and coach fleets.',
    tone: 'dark',
    mediaLabel: 'passengers boarding a bus with automatic people counting',
    media: img.busPassengerCounting,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Features & benefits',
      columns: 3,
      items: [
        {
          title: 'A safer journey',
          body: 'Real-time location tracking and a speed control system make every journey safer.',
        },
        {
          title: 'Enhance driver KPI management',
          body: 'Monitor driver behaviour and train drivers with KPI management to increase profit.',
        },
        {
          title: 'Increase profit',
          body: 'High-accuracy people counting with big data analysis to reduce money lost and increase profit.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      eyebrow: 'Public transport fleet management solutions',
      title: 'Bus tracking',
      body: 'Advanced tracking gives you a real view of where each bus is located and which driver is behind the wheel. It also tracks safety behaviours such as speeding, driving direction, ignition status, driving violations, past trips, and more.',
      points: [
        {
          title: 'Fleet monitoring',
          body: 'Get a real-time view of each bus and the responsible driver behind the wheel. Fleet leaders also have access to trip data with a full view of each event on a trip.',
        },
      ],
      mediaLabel: 'city bus at a shelter on a tracked route',
      media: img.busShelterBoarding,
    },
    {
      kind: 'split',
      title: 'Bus and driver behaviour monitoring',
      body: 'Real-time cost savings, improved driver compliance and vehicle productivity.',
      points: [
        {
          title: 'Surveillance',
          body: 'Mobile DVR provides multi-channel video surveillance for buses.',
        },
      ],
      reverse: true,
      mediaLabel: 'road- and driver-facing AI dash cams for buses',
      media: hw.busDriverMonitoring,
    },
    {
      kind: 'split',
      title: 'Optimise fuel use',
      body: 'Fuel cost savings insights, engine performance and real-time anti-fuel-fraud alerts.',
      points: [
        {
          title: 'Robust reporting',
          body: 'Getting the most from your bus and coach fleet is a major concern. Activity timelines are a great way to illustrate usage patterns and help boost fleet efficiency.',
        },
      ],
      mediaLabel: 'fuel level timeline with refill and drain events',
      media: img.fuelFillDrainChart,
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.product('driver-safety-dash-cameras'),
        routes.product('sustainability'),
        routes.solution('eco-drive'),
        routes.solution('commercial-vehicle-tracking'),
      ],
    },
  ],
  meta: {
    title: 'Bus & Public Transport',
    description:
      'Real-time bus tracking, driver behaviour monitoring, multi-channel video surveillance and high-accuracy people counting for bus and coach fleets.',
  },
}
