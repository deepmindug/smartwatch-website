import { img } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'communications-technology',
  kind: 'solution',
  name: 'Communications Technology',
  short: 'Fleet management and communications to manage your assets remotely.',
  hero: {
    eyebrow: 'Solutions · Communications Technology',
    title: 'The only solution you need for a safe and secure fleet.',
    intro:
      'Smartwatch FM helps our clients manage their assets remotely – improving fleet operational efficiency and productivity while reducing overall transportation costs.',
    tone: 'dark',
    media: img.highwayAerial,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Why Smartwatch fleet management software',
      intro:
        'Fleet management is a key business function which allows individuals and companies that rely on transportation in business to remove or minimize the risks associated with vehicle investment, by improving fleet operational efficiency and productivity while reducing their overall transportation costs – all while ensuring 100% compliance with operational health, safety and environmental standards and government legislation.',
      columns: 3,
      items: [
        {
          title: 'Monitor assets',
          body: 'Easily monitor the costs and life cycle of investments.',
        },
        {
          title: 'Reduce costs',
          body: 'Analyse trends, risks and overspends, and reduce the workload.',
        },
        {
          title: 'Increase utilization',
          body: 'Right-size the fleet and ensure it’s running to its full potential.',
        },
        {
          title: 'Reduce fuel usage',
          body: 'Measure and reduce fuel usage and improve driver efficiency.',
        },
        {
          title: 'Automate processes',
          body: 'Integrate data and set up automations and alerts for key events.',
        },
        {
          title: 'Additional features',
          body: 'Well-organised dashboard, activity reports and user trail audit.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      title: 'Smartwatch on-board computer',
      body: [
        'Vehicles are fitted with a small on-board computer that captures and transmits vehicle and driver data. Users can then access this information online, via the solution’s web-based software platform.',
        'Some features are also available via OnTrack, the solution’s free app for Android and iOS devices. Both web and mobile interfaces are easy to navigate and are compatible with multiple browsers and operating systems, so data and reports are available 24/7 from any internet-enabled computer as well as from smartphones and tablet devices.',
      ],
      points: [
        'Web-based software platform',
        'OnTrack – the free app for Android and iOS',
        'Data and reports available 24/7',
      ],
      mediaLabel: 'plug-in on-board computer',
      media: img.obdTracker,
    },
    {
      kind: 'split',
      eyebrow: 'Know where your fleet is at all times',
      title: 'Web platform and mobile application',
      body: [
        'Increase asset security, maximize utilization, and improve routing with real-time GPS tracking and geofence alerts.',
        'Our feature-rich software platform has the capacity to report basic, real-time information on current and historical vehicle locations and driver behaviour. Proactive monitoring enables real-time asset management: take immediate corrective action and send messages to and from assets and/or drivers.',
      ],
      points: [
        'Speed, driving direction and ignition status',
        'Driving violations',
        'A trail of where the asset has been',
        'Two-way messages to and from assets and drivers',
      ],
      reverse: true,
      mediaLabel: 'the web platform on a desktop and the app on a phone',
      media: img.platformDevices,
    },
    {
      kind: 'split',
      title: 'Overall management',
      body: 'Users – typically business owners or fleet managers – can log on and access activity timelines, insightful reports, notifications, an information hub, and more to:',
      points: [
        'Track vehicles on a map in real time, or perform a replay',
        'Define and manage locations, stops and zones',
        'Get notifications (online and via email) for events relating to impacts, speeding and harsh braking, acceleration and cornering',
        'Identify and manage drivers, licences, and certifications',
        'Manage vehicles, odometer readings, licences, certifications, and services',
        'Generate movement, event, trip and utilisation reports',
      ],
      mediaLabel: 'fleet dashboard on the operations wall screen',
      media: img.fleetDashboardScreen,
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.product('tracking-and-telematics'),
        routes.product('compliance'),
        routes.solution('mobile-resource-management'),
        routes.hardware,
      ],
    },
  ],
  meta: {
    title: 'Communications Technology',
    description:
      'Smartwatch FM helps our clients manage their assets remotely – improving fleet operational efficiency and productivity while reducing transportation costs.',
  },
}
