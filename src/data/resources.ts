import { featuredPost, news, posts } from './content'
import { hw, img } from './images'
import { anchors, portals, routes } from './site'
import type { DetailPage } from './types'

/*
 * The Resources menu's four content pages. Each one points at the site's own material: the topics
 * and guides open the product and solution pages, and the live sessions and developer access go
 * through the contact team. Nothing here claims a recording, article or API that does not exist.
 */

const demo = `${routes.contact}#${anchors.demo}`
const support = `${routes.contact}#${anchors.support}`

const topics = [
  {
    title: 'Managing compliance with Smartwatch FM',
    body: 'Real-time violation alerts, automated trip and driver matching, and the driver app for inspections and reports.',
    image: img.complianceTablet,
    href: routes.product('compliance'),
  },
  {
    title: 'Driver safety with AI dash cameras',
    body: 'Fatigue, phone-use and distraction detection, with instant alerts on violations and short alarm clips.',
    image: hw.aiDashcam,
    href: routes.product('driver-safety-dash-cameras'),
  },
  {
    title: 'Preventive maintenance in practice',
    body: 'Automated service schedules, real-time fault alerts and electronic inspection records.',
    image: img.maintenanceAppSchedule,
    href: routes.product('maintenance'),
  },
  {
    title: 'Cutting fuel costs with fuel management',
    body: 'Refill and drain events, driver benchmarking and fuel theft alerts, down to vehicle level.',
    image: img.fuelFillDrainChart,
    href: routes.product('sustainability'),
  },
  {
    title: 'Securing cargo in transit',
    body: 'Electronic locks, corridor tracking and faster inspection and clearance.',
    image: img.cargoElockTrailer,
    href: routes.solution('electronic-cargo-tracking'),
  },
  {
    title: 'Tracking and telematics on one map',
    body: 'Live location, utilisation and health of vehicles, equipment and assets.',
    image: img.laptopTracking,
    href: routes.product('tracking-and-telematics'),
  },
]

export const webinars: DetailPage = {
  slug: 'webinars',
  kind: 'page',
  name: 'Webinars',
  short: 'Tune in for actionable insights',
  icon: 'platform',
  hero: {
    eyebrow: 'Resources · Webinars',
    title: 'Fleet management, explained live.',
    intro:
      'Short online sessions with the Smartwatch team on the topics fleet managers ask us about most. Pick a topic to read the full walkthrough, or book a live session run on your own fleet.',
    tone: 'dark',
    media: img.laptop,
    ctas: [
      { label: 'Book a live session', to: demo },
      { label: 'Browse the guides', to: routes.guides, variant: 'outline-light' },
    ],
  },
  sections: [
    {
      kind: 'cards',
      id: 'topics',
      eyebrow: 'Session topics',
      title: 'What we cover.',
      intro: 'Each session walks through one part of the platform in about twenty minutes, with time for questions.',
      columns: 3,
      items: topics,
    },
    {
      kind: 'steps',
      id: 'how-it-works',
      eyebrow: 'Live sessions',
      title: 'How a live session works.',
      items: [
        { title: 'Tell us about your fleet', body: 'Vehicle count, routes and the problems you want solved.' },
        { title: 'We set up a walkthrough', body: 'Our Kampala or Nairobi team prepares the platform around your operation.' },
        { title: 'Join online and ask anything', body: 'A 30-minute screen share, recorded for your team if you want it.' },
      ],
    },
  ],
  cta: {
    title: 'Ready when you are.',
    body: 'Sessions run on weekdays from Kampala and Nairobi, on your fleet and your routes.',
    ctas: [
      { label: 'Book a session', to: demo, variant: 'primary' },
      { label: 'Talk to support', to: support, variant: 'outline-light' },
    ],
  },
  meta: {
    title: 'Webinars',
    description:
      'Live and topic-based sessions from Smartwatch Solutions on compliance, driver safety, maintenance, fuel management and cargo security.',
  },
}

export const blog: DetailPage = {
  slug: 'blog',
  kind: 'page',
  name: 'Blog',
  short: 'Stay up to date with Smartwatch news',
  icon: 'platform',
  hero: {
    eyebrow: 'Resources · Blog',
    title: 'What is new with Smartwatch.',
    intro:
      'Product launches, field notes and the numbers behind them, from the team connecting and protecting fleets across East Africa since 2011.',
    tone: 'dark',
    mediaLabel: 'fleet dashboard in use',
    media: img.aiRoadDetection,
    ctas: [{ label: 'Latest launch', to: featuredPost.to }],
  },
  sections: [
    {
      kind: 'cards',
      id: 'posts',
      eyebrow: 'Latest',
      title: 'Recent posts.',
      columns: 3,
      items: [
        { title: featuredPost.title, body: featuredPost.body, image: featuredPost.image, href: featuredPost.to },
        ...posts.map((post) => ({
          title: post.title,
          body: `${post.kind} spotlight`,
          image: post.image,
          href: post.to,
        })),
        {
          title: 'Charge status, range and utilisation for electric fleets',
          body: 'Solution spotlight',
          image: img.evChargeAlert,
          href: routes.solution('ev-fleet-management'),
        },
        {
          title: 'Staying connected beyond cellular coverage',
          body: 'Solution spotlight',
          image: img.ngoConvoy,
          href: routes.solution('ngo-satellite-tracking'),
        },
      ],
    },
    {
      kind: 'bullets',
      id: 'press',
      eyebrow: 'In the news',
      title: 'Smartwatch in the press.',
      columns: 2,
      items: news.map((item) => `${item.outlet}: ${item.title}`),
    },
  ],
  cta: {
    title: 'Want the next post in your inbox?',
    body: 'Tell us what you run and we will keep you posted on launches and events that matter to your fleet.',
    ctas: [{ label: 'Get in touch', to: routes.contact, variant: 'primary' }],
  },
  meta: {
    title: 'Blog',
    description: 'News, launches and field notes from Smartwatch Solutions, fleet and asset management for East Africa.',
  },
}

export const guides: DetailPage = {
  slug: 'guides',
  kind: 'page',
  name: 'Guides',
  short: 'A deep dive into fleet management',
  icon: 'compliance',
  hero: {
    eyebrow: 'Resources · Guides',
    title: 'A deep dive into fleet management.',
    intro:
      'Longer reads on each part of running a fleet well, built from what the platform does and what operators across the region have learned with it.',
    tone: 'dark',
    mediaLabel: 'field team data on a tablet',
    media: img.fleetFeatureRoad,
    ctas: [{ label: 'Start with compliance', to: routes.product('compliance') }],
  },
  sections: [
    {
      kind: 'cards',
      id: 'guides',
      eyebrow: 'Guides',
      title: 'Pick a subject.',
      columns: 3,
      items: [
        {
          title: 'The compliance guide',
          body: 'Drive time, violations and driver scores, and how automated matching resolves unidentified trips.',
          image: img.complianceTablet,
          href: routes.product('compliance'),
        },
        {
          title: 'The dash camera guide',
          body: 'What AI cameras detect, how alerts reach drivers and managers, and what changes on the road.',
          image: hw.dashboardCamera,
          href: routes.product('driver-safety-dash-cameras'),
        },
        {
          title: 'The maintenance guide',
          body: 'Service schedules, fault alerts and inspections that keep vehicles earning.',
          image: img.maintenanceChecklist,
          href: routes.product('maintenance'),
        },
        {
          title: 'The fuel guide',
          body: 'Reading fuel performance data and finding the drivers and vehicles to coach first.',
          image: img.fleetFuelDashboard,
          href: routes.product('sustainability'),
        },
        {
          title: 'The cargo security guide',
          body: 'Electronic locks, corridor tracking and what faster clearance means for a transporter.',
          image: img.cargoElockTrailer,
          href: routes.solution('electronic-cargo-tracking'),
        },
        {
          title: 'The tracking guide',
          body: 'Geofences, GPS accuracy and the reporting that keeps vehicles, assets and drivers visible.',
          image: img.laptopTracking,
          href: routes.product('tracking-and-telematics'),
        },
      ],
    },
    {
      kind: 'split',
      id: 'hardware',
      eyebrow: 'Hardware',
      title: 'Know the devices behind the data.',
      body: 'Trackers, cameras, sensors and in-cab units, with what each one adds and where it fits.',
      media: img.platformDevices,
      cta: { label: 'Browse hardware and accessories', to: routes.hardware },
    },
  ],
  meta: {
    title: 'Guides',
    description:
      'Smartwatch guides to fleet compliance, dash cameras, maintenance, fuel management, cargo security and tracking.',
  },
}

export const developerPortal: DetailPage = {
  slug: 'developer-portal',
  kind: 'page',
  name: 'Developer portal',
  short: 'Integrate with Smartwatch APIs',
  icon: 'platform',
  hero: {
    eyebrow: 'Resources · Developer portal',
    title: 'Bring Smartwatch data into the systems you already run.',
    intro:
      'Smartwatch FM, the VSS video platform and Smart FM hold the data your operation runs on: positions, trips, events, footage and fuel. Our team works with customers and partners to connect it to dispatch, ERP and reporting tools.',
    tone: 'dark',
    media: img.platformDevices,
    ctas: [
      { label: 'Request API access', to: support },
      { label: 'Platform logins', to: routes.platforms, variant: 'outline-light' },
    ],
  },
  sections: [
    {
      kind: 'split',
      id: 'data',
      eyebrow: 'Platform data',
      title: 'One source for vehicles, drivers, assets and events.',
      body: 'Everything the platform shows on its map and in its reports can be shared with your own systems, so a job, a delivery or a driver record carries the same live information wherever your team looks at it.',
      points: ['Live positions and trip history', 'Driver, vehicle and asset records', 'Alerts and video events', 'Fuel, maintenance and utilisation reports'],
      media: img.laptopTracking,
    },
    {
      kind: 'cards',
      id: 'platforms',
      eyebrow: 'Platforms',
      title: 'The platforms behind the data.',
      columns: 3,
      items: portals.map((portal) => ({ title: portal.name, body: portal.short, icon: 'platform' as const, href: portal.href })),
    },
    {
      kind: 'steps',
      id: 'access',
      eyebrow: 'Getting access',
      title: 'How access works.',
      items: [
        { title: 'Tell us what you are building', body: 'The system you want to connect and the data it needs.' },
        { title: 'We scope the integration', body: 'Our team confirms what is available for your account and agrees the approach.' },
        { title: 'Credentials and support', body: 'You get access for your environment, with support from the same 24/7 team.' },
      ],
    },
  ],
  cta: {
    title: 'Building something on Smartwatch?',
    body: 'Talk to our team about integration and API access for your account.',
    ctas: [
      { label: 'Request API access', to: support, variant: 'primary' },
      { label: 'Platform logins', to: routes.platforms, variant: 'outline-light' },
    ],
  },
  meta: {
    title: 'Developer portal',
    description: 'Integrate Smartwatch FM, VSS and Smart FM data with your own dispatch, ERP and reporting systems.',
  },
}
