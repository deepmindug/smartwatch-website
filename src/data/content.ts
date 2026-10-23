import { img } from './images'
import { partnerLogo } from './logos'
import { routes } from './site'

/** The key words in the hero lead; hovering one shows a card previewing the product behind it. */
export const heroWords = [
  {
    word: 'safety',
    image: img.driverDashcam,
    description:
      'AI dash cams and driver scoring flag speeding, harsh braking and fatigue before they turn into incidents.',
    to: routes.product('driver-safety-dash-cameras'),
  },
  {
    word: 'productivity',
    image: img.tripPlayback,
    description: 'Live tracking, trip history and utilisation reports keep every vehicle and driver on the job.',
    to: routes.product('tracking-and-telematics'),
  },
  {
    word: 'profitability',
    image: img.fuelTheftAlerts,
    description: 'Fuel monitoring and theft alerts can cut what your fleet spends on fuel by up to 40%.',
    to: routes.product('sustainability'),
  },
]

/** The product the client is fronting: the hero pill and the homepage spotlight both point at it. */
export const cargoFeature = {
  to: routes.solution('electronic-cargo-tracking'),
  pill: { tag: 'New', text: 'Cargo Tracking for transporters and revenue authorities' },
  eyebrow: 'Cargo Tracking · ECTS',
  title: 'Giving cargo transporters and government authorities visibility.',
  body: 'A heavy-duty electromagnetic lock, tracked live from loading bay to bonded warehouse, so cargo in transit stays sealed and accounted for across borders.',
  points: [
    'The container opens only at the right place, with the right key, in the right time window',
    'Real-time location and lock status for every consignment on the corridor',
    'Faster inspection and clearance at border posts and inland bonded warehouses',
  ],
  image: img.cargoTruckEsealNight,
  ctaLabel: 'Explore Cargo Tracking',
}

export const proofLine = {
  text: 'KRA RECTS certified vendor and recognised by KPMG as a Top 100 mid-sized company. Serving fleets across East Africa since 2011.',
  linkLabel: 'Our credentials →',
  to: '/about#awards',
}

export const whys = [
  { title: 'All-in-one', body: 'SmartwatchFM is the single solution for all your fleet management needs.' },
  { title: 'Easy to use', body: 'Anyone with a mobile or desktop device can access the platform.' },
  { title: 'Quick setup', body: 'Our Professional Services team gets you up and running sooner.' },
  { title: 'Dedicated support', body: '24/7 support to resolve your service queries.' },
]

export const featuredPost = {
  kind: 'Product',
  title: 'Driver Safety Dash Cameras: AI video, people counting and instant alerts.',
  body: 'Video surveillance, passenger information, AI analytics and people counting, dispatch system and terminal with ticket system.',
  /** The dash camera cut out of its white backdrop and upscaled, so it fills the card's panel. */
  image: {
    src: '/images/driver-dashcam-cutout.webp',
    alt: img.driverDashcam.alt,
    width: 1000,
    height: 799,
    fit: 'contain' as const,
  },
  to: routes.product('driver-safety-dash-cameras'),
}

export const posts = [
  {
    kind: 'Product',
    title: 'Take a proactive fleet maintenance strategy',
    image: img.laptop,
    to: routes.product('maintenance'),
  },
  {
    kind: 'Product',
    title: 'Save up to 40% on fuel with fleet fuel management',
    image: img.lowerFuelCost,
    to: routes.product('sustainability'),
  },
  {
    kind: 'Solution',
    title: 'Faster inspection and clearance on trading corridors',
    image: img.cargo,
    to: routes.solution('electronic-cargo-tracking'),
  },
]

export const award = {
  name: 'KPMG Top 100 Mid-Sized Companies',
  label: 'Recognised by KPMG',
  image: img.kpmg,
  to: '/about#awards',
}

/**
 * Smartwatch's certification as a vendor for the Kenya Revenue Authority's Regional Electronic Cargo
 * Tracking System (RECTS), shown as a certificate card on the home hero and as a seal beside the KPMG
 * award. The client confirmed the RECTS scope.
 */
export const kraVendor = {
  name: 'KRA RECTS certified vendor',
  issuer: 'Kenya Revenue Authority',
  /** What RECTS stands for, spelled out wherever the acronym leads. */
  system: 'Regional Electronic Cargo Tracking System',
  announcement: 'Smartwatch is now a KRA RECTS certified vendor',
  body: 'Smartwatch Solutions is certified by the Kenya Revenue Authority as a vendor for its Regional Electronic Cargo Tracking System (RECTS). Transporters moving cargo through Kenya can bring Smartwatch in knowing our e-locks, hardware and platform meet the standards KRA sets for the system.',
  /** KRA's own "Approved KRA Vendor" badge, pinned to the home hero video (480 × 304, shown at half size). */
  badge: { src: '/images/kra-approved-vendor.webp', width: 480, height: 304 },
  /** KRA's "We are Approved KRA Vendor of RECTS/ECTS" badge, pinned to the home hero video (480 × 306, shown at
   *  about half size). It has its own red frame and rounded corners. */
  heroBadge: { src: '/images/kra-approved-badge.webp', width: 600, height: 385 },
  /** The same badge without its red frame, for the white award tile beside the KPMG badge (520 × 317). */
  tile: { src: '/images/kra-approved-vendor-tile.webp', width: 520, height: 317 },
  /** The badge with its white background made transparent, so it sits on any panel colour (640 × 406). */
  clear: { src: '/images/kra-approved-vendor-clear.webp', width: 640, height: 406 },
  /** The lion alone, for the small seals. */
  mark: img.kraMark,
  /** The full lockup, for tiles and cards. */
  logo: partnerLogo('Kenya Revenue Authority'),
  to: '/about#awards',
}

export const demoBenefits = [
  'Comply with local and international fleet regulations.',
  'Identify risks and coach drivers with real-time alerts.',
  'See every vehicle, asset and driver in one place.',
]

export const leadSources = [
  'TV',
  'Radio',
  'Social media',
  'Search engine',
  'Trade show / Event',
  'Referral',
  'Online ad',
  'Other',
]

export const fleetSizes = ['1 – 9', '10 – 49', '50 – 174', '175 – 999', '1,000+']

export const countries = ['Uganda', 'Kenya', 'Tanzania', 'Other']

export const news = [
  {
    outlet: 'Daily Monitor',
    title: 'Smartwatch Solutions rolls out AI dash cameras for Ugandan bus operators',
  },
  {
    outlet: 'Business Daily Africa',
    title: 'Electronic cargo tracking cuts transit theft on the Northern Corridor',
  },
  { outlet: 'New Vision', title: 'Kampala fleet-tech firm marks 15 years of connected fleets' },
  { outlet: 'The EastAfrican', title: 'Fleet fuel management gains ground as diesel prices climb' },
]

export type ProductFeature = {
  label: string
  image: string
  headline: string
  body: string
  points: { title: string; body: string }[]
}

export const productFeatures: ProductFeature[] = [
  {
    label: 'Video surveillance',
    image: 'multi-camera in-cab view',
    headline: 'See every trip from every angle.',
    body: 'Road-facing and in-cab cameras record continuously, with AI flagging harsh braking, speeding and distraction the moment it happens.',
    points: [
      { title: 'Instant alerts', body: 'Sound buzzer warns drivers before exceeding the speed limit.' },
      { title: 'Event clips', body: 'Violation footage lands in your inbox within minutes.' },
    ],
  },
  {
    label: 'AI analytics',
    image: 'people counting overlay on bus door',
    headline: 'Passenger information and people counting, built in.',
    body: 'Know how many riders board, where, and when, then feed that into dispatch and ticketing without a separate system.',
    points: [
      { title: 'People counting', body: 'Door cameras count boardings and alightings automatically.' },
      {
        title: 'Dispatch & ticketing',
        body: 'Terminal with ticket system for bus and public transport operators.',
      },
    ],
  },
  {
    label: 'Driver coaching',
    image: 'driver score card in mobile app',
    headline: 'Get time back with self-coaching tools.',
    body: 'Eliminate repetitive tasks with custom safety definitions and driver scores that improve on their own.',
    points: [
      { title: '70% fewer accidents', body: 'Interactive alerts change behavior on the road, not after.' },
      {
        title: 'Driver app',
        body: 'Complete tasks and inspection reports faster, avoid HSE violations and fines.',
      },
    ],
  },
]
