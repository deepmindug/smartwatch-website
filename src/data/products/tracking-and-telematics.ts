import { dataOpsSpotlight } from '../data-ops'
import { img } from '../images'
import { anchors, routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'tracking-and-telematics',
  kind: 'product',
  name: 'Tracking & Telematics',
  short: 'Real-time location, utilization and health.',
  icon: 'tracking',
  hero: {
    eyebrow: 'Products · Tracking & Telematics',
    title: 'Track and monitor your fleet.',
    intro:
      'Live visibility into your operational health, utilization, location, equipment, and assets.',
    tone: 'dark',
    mediaLabel: 'tracked vehicle pinned on a live map',
    media: img.mapPin,
  },
  sections: [
    {
      kind: 'split',
      id: 'features',
      title: 'Full fleet visibility',
      body: 'Reduce your dependency on manual communication. Smartwatch provides real-time visibility across your physical operations in one dashboard.',
      points: [
        "Manage vehicles, assets, drivers and equipment with Smartwatch's integrated fleet management system",
        'Live location, utilization and health of every vehicle and asset on one map',
        'Trace past performances, track present orders, and predict future operational needs',
      ],
      media: img.laptop,
    },
    {
      kind: 'split',
      title: 'Location-based automation',
      body: 'Automate your fleet visibility through alerts and actions based on real-time vehicle and asset location obtained from GPS fleet tracking.',
      points: [
        'Geofence alerts prevent theft and stop misuse of your assets',
        'Alerts and actions triggered by real-time vehicle and asset location',
        'Accurate GPS fleet tracking',
      ],
      mediaLabel: 'geofence alert on a live map',
      media: img.platformDevices,
      reverse: true,
    },
    {
      kind: 'split',
      title: 'Vehicle, driver and asset tracking',
      body: [
        "Simplify the fleet management and tracking process with a plug-and-play device delivered straight to you that doesn't require a technician to install and can be activated using a QR code. Track fleet activities and get daily notifications about fleet performance to manage trips, lower fuel costs, monitor driver behaviour and more.",
        'From trailers and forklifts to skid steers and vehicles, locate your most valued assets and equipment using either wired or wireless trackers. See when an asset is on the move, set geographic boundaries to avoid misuse and theft, and monitor operating hours and fuel usage.',
      ],
      points: [
        'Plug-and-play tracker activated with a QR code',
        'Wired or wireless trackers for movable assets',
        'OnTrack app tracks vehicles by phone with no hardware installation and no vehicle downtime',
      ],
      media: img.gpsHandheld,
    },
    {
      kind: 'split',
      title: 'Reports and notifications',
      body: [
        'All fleet operation data is collected on the central platform and turned into smart, rich reports, like mileage, working hours and fuel reports.',
        'Business owners and fleet managers can log on and access activity timelines, insightful reports, notifications, an information hub, and more.',
      ],
      points: [
        'Track vehicles on a map in real time or replay past trips',
        'Notifications online and via email for impacts, speeding, harsh braking, acceleration and cornering',
        'Movement, event, trip and utilisation reports',
        'Data and reports available 24/7 from any internet-enabled computer, smartphone or tablet',
      ],
      mediaLabel: 'trip replay and utilisation report',
      media: { ...img.tripPlayback, fit: 'cover' },
      reverse: true,
    },
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Real-time visibility into the location, utilization, and health of vehicles, equipment, and assets.',
      columns: 4,
      items: [
        {
          title: 'Get full fleet visibility',
          body: "Manage your vehicles, assets, drivers, and equipment with Smartwatch's integrated fleet management system.",
        },
        {
          title: 'Maximize utilization',
          body: 'Maximize vehicle uptime and save money with constant maintenance and performance reporting.',
        },
        {
          title: 'Increase productivity',
          body: 'Trace past performances, track present orders, and predict future operational needs.',
        },
        {
          title: 'Protect equipment',
          body: 'Prevent theft and stop misuse of your assets with geofence alerts and accurate GPS fleet tracking.',
        },
      ],
    },
    dataOpsSpotlight,
    {
      kind: 'links',
      id: 'resources',
      columns: [
        {
          title: 'Products',
          links: [
            { label: 'Compliance', to: routes.product('compliance') },
            { label: 'Driver Safety Dash Cameras', to: routes.product('driver-safety-dash-cameras') },
            { label: 'Maintenance', to: routes.product('maintenance') },
            { label: 'Sustainability', to: routes.product('sustainability') },
            { label: 'Insurance', to: routes.product('insurance') },
          ],
        },
        {
          title: 'Solutions',
          links: [
            { label: 'Mobile Resource Management', to: routes.solution('mobile-resource-management') },
            { label: 'Trucking & Logistics', to: routes.solution('trucking-and-logistics') },
            { label: 'Commercial Vehicle Tracking', to: routes.solution('commercial-vehicle-tracking') },
            { label: 'Satellite Tracking for NGOs', to: routes.solution('ngo-satellite-tracking') },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Contact', to: routes.contact },
            { label: 'Help centre', to: `${routes.contact}#${anchors.support}` },
            { label: 'Platform logins', to: routes.platforms },
          ],
        },
      ],
    },
    {
      kind: 'faq',
      id: 'faq',
      title: 'Tracking questions',
      reviewed: false,
      items: [
        {
          q: 'What can I see on the Smartwatch FM dashboard?',
          a: 'Real-time visibility across your physical operations in one dashboard: the live location, utilization and health of your vehicles, equipment and assets, with vehicles, assets, drivers and equipment managed in one integrated system.',
        },
        {
          q: 'How does tracking help prevent theft?',
          a: 'Geofence alerts and accurate GPS fleet tracking prevent theft and stop misuse of your assets. Alerts and actions can be automated based on real-time vehicle and asset location.',
        },
        {
          q: 'Do I need a technician to install a tracker?',
          a: "No. The plug-and-play device is delivered straight to you, doesn't require a technician to install and is activated using a QR code. The OnTrack app can also track vehicles by phone with no hardware installation and no vehicle downtime.",
        },
        {
          q: 'What tracker hardware does Smartwatch use?',
          a: 'A compact GNSS-based Automatic Vehicle Location (AVL) tracker with 4G (GSM) connectivity and a premium GPS module, designed and built for Africa and dust and water resistant. It suits logistics, delivery, utility services, car rental and vehicle financing use cases.',
        },
        {
          q: 'Can I track assets that are not vehicles?',
          a: 'Yes. Trailers, forklifts, skid steers and other movable assets can be located with wired or wireless trackers. See when an asset is on the move, set geographic boundaries and monitor operating hours and fuel usage.',
        },
        {
          q: 'Which reports are available?',
          a: 'Mileage, working hours and fuel reports, plus movement, event, trip and utilisation reports, activity timelines and daily notifications about fleet performance.',
        },
      ],
    },
  ],
  meta: {
    title: 'Tracking & Telematics',
    description:
      'Live visibility into your operational health, utilization, location, equipment, and assets.',
  },
}
