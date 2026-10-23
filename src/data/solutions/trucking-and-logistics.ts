import { hw, img } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'trucking-and-logistics',
  kind: 'solution',
  name: 'Trucking & Logistics',
  short: 'Total visibility from safety and tracking to compliance and fuel costs.',
  hero: {
    eyebrow: 'Solutions · Trucking & Logistics',
    title: 'The fleet management platform for trucking and logistics.',
    intro:
      'Total visibility into every aspect of fleet management from safety and tracking to compliance and fuel costs.',
    tone: 'dark',
    media: img.cargo,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      eyebrow: 'Benefits',
      title: 'Why fleets choose Smartwatch.',
      columns: 2,
      items: [
        {
          title: 'All-in-one',
          body: 'Smartwatch FM is the single solution for all your fleet management needs, so you can streamline your business.',
        },
        {
          title: 'Easy to use',
          body: 'Anyone with a mobile or desktop device can access our easy-to-use platform.',
        },
        {
          title: 'Quick setup',
          body: 'Smartwatch’s Professional Services team will get you up and running sooner, drive adoption faster, and maximize ROI earlier.',
        },
        {
          title: 'Dedicated support',
          body: '24/7 support to resolve your service queries.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      eyebrow: 'Know where your fleet is at all times',
      title: 'Vehicle and driver tracking.',
      body: [
        'Increase asset security, maximize utilization, and improve routing with real-time GPS tracking and geofence alerts.',
        'Simplify the fleet management and tracking process with a plug-and-play device delivered straight to you that doesn’t require a technician to install and can be activated using a QR code. Track fleet activities and get daily notifications about fleet performance to manage trips, lower fuel costs, monitor driver behaviour and more.',
      ],
      points: [
        'Plug-and-play device delivered straight to you',
        'No technician needed — activate with a QR code',
        'Daily notifications about fleet performance',
      ],
      mediaLabel: 'live fleet map with truck positions',
      media: img.highwayInterchange,
    },
    {
      kind: 'split',
      title: 'App-based tracking with OnTrack.',
      body: 'The OnTrack app utilises cell phone technology to help you accurately track vehicles in real time while also monitoring all driver behaviours that may be unsafe or inefficient. Send notifications to drivers on important events. No hardware installation is required, and thus no vehicle downtime. Just download and go.',
      points: [
        'Accurate real-time tracking from a phone',
        'Notifications to drivers on important events',
        'No hardware installation, no vehicle downtime',
      ],
      mediaLabel: 'tracked trucks followed from the OnTrack app',
      media: img.phoneTruckMap,
      reverse: true,
    },
    {
      kind: 'split',
      title: 'Tracking movable assets.',
      body: 'From trailers and forklifts to skid steers and vehicles: locate your most valued assets and equipment using either wired or wireless trackers. See when an asset is on the move, set geographic boundaries to avoid misuse and theft, and monitor operating hours and fuel usage.',
      points: [
        'Wired or wireless trackers',
        'Movement and geographic boundary alerts',
        'Operating hours and fuel usage',
      ],
      mediaLabel: 'trailers and containers tracked as movable assets',
      media: img.containerTrucksAssets,
    },
    {
      kind: 'split',
      title: 'Tracking with video.',
      body: 'Turn on the power of AI- and ADAS-powered dash cams within your fleet. Get intelligent insight into risky driving behaviours, like fatigue, distraction, speeding, seatbelt usage and more, to prevent accidents and reduce fleet risk. This in-cab and road-facing camera solution also includes a driver coach device with which you can communicate with drivers in real time to help them improve their driving style.',
      points: [
        'Fatigue, distraction, speeding and seatbelt detection',
        'In-cab and road-facing cameras',
        'Driver coach device for real-time communication',
      ],
      mediaLabel: 'in-cab dash camera view',
      media: hw.dashboardCamera,
      reverse: true,
      cta: { label: 'See dash cameras', to: routes.product('driver-safety-dash-cameras') },
    },
    {
      kind: 'cards',
      id: 'efficiency',
      title: 'Cut fuel costs and report on what matters.',
      columns: 2,
      items: [
        {
          title: 'Higher fuel efficiency',
          body: 'Live-monitor fuel consumption to prevent refuelling fraud and fuel theft. Detect and record low-fuel-economy behaviour like harsh driving, route deviation or idling for driver coaching. Save money and reduce emissions.',
        },
        {
          title: 'Rich reports for KPIs',
          body: 'Collect all fleet operation data on one central platform and output smart, rich reports such as mileage, working hours and fuel reports. Easy for vehicle and driver KPIs and decision-making.',
        },
      ],
    },
    {
      kind: 'cards',
      id: 'risk',
      title: 'Reduce risk with ease.',
      intro:
        'The most comprehensive toolkit available to all fleets looking to minimize risk, improve overall safety, increase driver satisfaction, and boost productivity.',
      columns: 3,
      items: [
        {
          title: 'Prevent accidents',
          body: 'Real-time alerts, warning buzzers and HD video instill a culture of safety and potentially lower insurance premiums.',
        },
        {
          title: 'Mitigate risk',
          body: 'Mitigation of risk requires a safety-first mentality. Use real-time data to influence driver behaviours and reduce accidents.',
        },
        {
          title: 'Assess driver behaviour',
          body: 'Combine telematics, video footage and event reports to identify high-risk drivers and reward safe drivers.',
        },
      ],
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.solution('electronic-cargo-tracking'),
        routes.product('driver-safety-dash-cameras'),
        routes.product('sustainability'),
        routes.solution('commercial-vehicle-tracking'),
      ],
    },
  ],
  meta: {
    title: 'Trucking & Logistics',
    description:
      'Total visibility into every aspect of fleet management from safety and tracking to compliance and fuel costs.',
  },
}
