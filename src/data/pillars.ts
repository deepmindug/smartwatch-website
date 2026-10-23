import { img } from './images'
import { routes } from './site'
import type { IconName, Img, Video } from './types'

export type Pillar = {
  slug: string
  /** Detail page for this pillar. ECTS lives under solutions on the live site. */
  to: string
  icon: IconName
  name: string
  short: string
  headline: string
  body: string
  points: string[]
  image?: Img
  /** Plays in the image's place when set. */
  video?: Video
  /** Placeholder label when no image exists yet. */
  imageLabel: string
}

/** Cargo Tracking leads: it is the product the client is fronting, so menus, tabs and cards open on it. */
export const pillars: Pillar[] = [
  {
    slug: 'electronic-cargo-tracking',
    to: routes.solution('electronic-cargo-tracking'),
    icon: 'cargo',
    name: 'Cargo Tracking',
    short: 'Heavy-duty e-lock for secure cargo transit.',
    headline:
      'Heavy-duty electromagnetic lock enabling seamless automation of cargo, security, and carrier operations.',
    body: 'Container access restricted to the correct location, authorized key, and set time.',
    points: [
      'Increased cargo security and accountability',
      'Fewer errors, better resource allocation',
      'Less paperwork, safeguarded information',
    ],
    // A wider version of the e-lock photo (extended with AI) so the truck sits in the middle of the panel.
    image: {
      src: '/images/cargo-elock-centered.webp',
      alt: img.cargoElockTrailer.alt,
      width: 1000,
      height: 747,
    },
    imageLabel: 'e-lock on shipping container',
  },
  {
    slug: 'compliance',
    to: routes.product('compliance'),
    icon: 'compliance',
    name: 'Compliance',
    short: 'Automated compliance management and driver scoring.',
    headline: 'Smartwatch gives you the power to manage compliance better.',
    body: 'Optimize drive time, minimize violations, and improve driver scores with automated compliance management. Resolve unidentified trips faster with automated trip and driver matching.',
    points: [
      'Real-time violation email alerts',
      'Automated trip and driver matching',
      'Driver app for inspections and reports',
    ],
    image: img.inspectionClipboard,
    video: {
      src: '/images/compliance-glass.mp4',
      poster: '/images/compliance-glass-poster.webp',
      alt: 'Hours of Service dashboard on glass panels: drive time left, HOS violations, driver score and a compliant ELD badge',
    },
    imageLabel: 'compliance dashboard screenshot',
  },
  {
    slug: 'driver-safety-dash-cameras',
    to: routes.product('driver-safety-dash-cameras'),
    icon: 'dashcam',
    name: 'Driver Safety Dash Cameras',
    short: 'AI video, people counting, instant alerts.',
    headline: 'Protect your fleet and profits with an all-in-one safety solution.',
    body: 'Video surveillance, passenger information, AI analytics and people counting, dispatch system and terminal with ticket system.',
    points: [
      '70% fewer accidents with instant alerts on violations',
      'Self-coaching tools and custom safety definitions',
      'Sound buzzer warns drivers before exceeding speed limits',
    ],
    // The camera cut out of its white backdrop and upscaled, so it fills the panel.
    image: {
      src: '/images/driver-dashcam-cutout.webp',
      alt: img.driverDashcam.alt,
      width: 1000,
      height: 799,
      fit: 'contain',
    },
    imageLabel: 'dash camera + in-cab footage',
  },
  {
    slug: 'tracking-and-telematics',
    to: routes.product('tracking-and-telematics'),
    icon: 'tracking',
    name: 'Tracking & Telematics',
    short: 'Real-time location, utilization and health.',
    headline: 'Real-time visibility into the location, utilization, and health of vehicles, equipment, and assets.',
    body: 'Manage your vehicles, assets, drivers, and equipment with Smartwatch’s integrated fleet management system.',
    points: [
      'Full fleet visibility on one map',
      'Geofence alerts and accurate GPS tracking to prevent theft',
      'Constant maintenance and performance reporting',
    ],
    image: img.device,
    imageLabel: 'live map with vehicle pins',
  },
  {
    slug: 'maintenance',
    to: routes.product('maintenance'),
    icon: 'maintenance',
    name: 'Maintenance',
    short: 'Preventive maintenance with electronic inspections.',
    headline: 'Maximize productivity and cut costs through preventive fleet maintenance.',
    body: 'Automate service records and stay on top of vehicle and asset health with electronic inspection records.',
    points: [
      'Automated fleet maintenance schedules',
      'Real-time fault alerts',
      'Thorough inspections increase driver accountability',
    ],
    image: img.vehicleServiceCrew,
    imageLabel: 'maintenance schedule view',
  },
  {
    slug: 'sustainability',
    to: routes.product('sustainability'),
    icon: 'sustainability',
    name: 'Sustainability',
    short: 'Fuel management that cuts cost and emissions.',
    headline: 'Save on fuel and reduce your environmental impact with fleet fuel management.',
    body: 'Get detailed fuel performance data and pinpoint specific areas for improvement at driver and vehicle level.',
    points: [
      'Benchmark against similar fleets',
      'Identify top and bottom performers',
      'Reduce fuel waste and environmental impact',
    ],
    image: img.fuelNozzle,
    imageLabel: 'fuel performance chart',
  },
  {
    slug: 'insurance',
    to: routes.product('insurance'),
    icon: 'insurance',
    name: 'Insurance',
    short: 'Theft prevention, recovery and safer driving.',
    headline: 'Enhance operational efficiency and prevent fleet theft.',
    body: 'Maintenance tools, driver controls, and GPS tracking that lower both insurance and fuel costs for fleet owners.',
    points: ['Recovery of stolen vehicles', 'Driver behavior coaching', 'Most efficient routes reduce wear and tear'],
    image: img.insuranceShield,
    imageLabel: 'vehicle recovery map',
  },
]

export function findPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug)
}
