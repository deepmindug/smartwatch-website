import { news } from './content'
import { img } from './images'
import { anchors, offices, routes, site } from './site'
import type { DetailPage } from './types'

/*
 * The Company menu's four pages. The leadership and partner copy reuses the vision, mission and
 * heritage text from the About page; the newsroom lists the items the footer already carries; the
 * careers page points at the real offices and the one public email address.
 */

const demo = `${routes.contact}#${anchors.demo}`

const vision =
  'To be the leading telematics Software-as-a-Service (SaaS) company in Africa and the regional mobile resource management solutions provider of choice.'
const mission =
  "To enhance the productivity of mobile assets, human resources and cost savings in our customers' operations by rolling out innovative, tailor-made, end-to-end mobile resource management and vehicle security products through a wide range of strategic alliances, partnerships and delivery channels, supported by state-of-the-art technology."

export const leadership: DetailPage = {
  slug: 'leadership',
  kind: 'page',
  name: 'Leadership',
  short: 'Smartwatch executives and board',
  icon: 'sales',
  hero: {
    eyebrow: 'Company · Leadership',
    title: 'Led from the field, since 2011.',
    intro:
      'Our team combines industry expertise in information technology and mobile resource management with extensive hands-on experience in their respective fields. The people who run Smartwatch still spend their weeks with customers, vehicles and installers.',
    tone: 'light',
    mediaLabel: 'technician wiring a vehicle from the cab',
    media: img.technicianInCab,
    ctas: [
      { label: 'About Smartwatch', to: routes.about },
      { label: 'Meet the team', to: routes.contact, variant: 'outline-light' },
    ],
  },
  sections: [
    {
      kind: 'cards',
      id: 'direction',
      eyebrow: 'Direction',
      title: 'What the leadership team is here to do.',
      columns: 2,
      items: [
        { title: 'Our vision', body: vision, icon: 'tracking' },
        { title: 'Our mission', body: mission, icon: 'platform' },
      ],
    },
    {
      kind: 'split',
      id: 'heritage',
      eyebrow: 'Heritage',
      title: 'Built in Uganda and Kenya, for the region.',
      body: [
        'Smartwatch Solutions, established in Uganda and Kenya in 2011, is a leading provider of mobile asset management and fleet management software and services in the East and Horn of Africa region, including Ethiopia and Djibouti.',
        'Serving sectors such as transport, energy and utilities, we support commercial fleets, remote generators and smart metering, with a strong client base of oil and gas firms, telecoms, NGOs and government institutions.',
      ],
      media: img.truckConvoyHighway,
      cta: { label: 'Read our full heritage', to: `${routes.about}#${anchors.heritage}` },
    },
    { kind: 'related', id: 'related', title: 'More about the company', slugs: [routes.about, routes.careers, routes.partners] },
  ],
  cta: {
    title: 'Talk to the people who run Smartwatch.',
    body: 'Sales, support and the leadership team work from the same offices in Kampala and Nairobi.',
    ctas: [{ label: 'Contact us', to: routes.contact, variant: 'primary' }],
  },
  meta: {
    title: 'Leadership',
    description: 'The team leading Smartwatch Solutions, fleet and mobile asset management for East Africa since 2011.',
  },
}

const newsImages = [img.busPassengerCounting, img.cargoConvoyTracking, img.fleetSunset, img.fuelNozzle]

export const newsroom: DetailPage = {
  slug: 'newsroom',
  kind: 'page',
  name: 'Newsroom',
  short: 'Press releases and articles',
  icon: 'signal',
  hero: {
    eyebrow: 'Company · Newsroom',
    title: 'Smartwatch in the news.',
    intro: 'Coverage of Smartwatch Solutions and the fleets we work with, and where to reach us for interviews and background.',
    tone: 'light',
    media: img.portDusk,
    ctas: [{ label: 'Media enquiries', to: routes.contact }],
  },
  sections: [
    {
      kind: 'cards',
      id: 'coverage',
      eyebrow: 'Coverage',
      title: 'Recent stories.',
      columns: 2,
      items: news.map((item, i) => ({ title: item.title, body: item.outlet, image: newsImages[i] })),
    },
    {
      kind: 'split',
      id: 'enquiries',
      eyebrow: 'Media enquiries',
      title: 'Working on a story?',
      body: 'For interviews, images and background on Smartwatch Solutions, contact our team. We can put you in touch with the right person in Kampala or Nairobi.',
      mediaLabel: 'press and media enquiries',
      media: img.newsroomTeam,
      cta: { label: 'Contact us', to: routes.contact },
    },
    { kind: 'related', id: 'related', title: 'More about the company', slugs: [routes.about, routes.leadership, routes.blog] },
  ],
  cta: false,
  meta: {
    title: 'Newsroom',
    description: 'Press coverage and media contacts for Smartwatch Solutions.',
  },
}

export const careers: DetailPage = {
  slug: 'careers',
  kind: 'page',
  name: 'Careers',
  short: 'Join our team in Kampala or Nairobi',
  icon: 'field',
  hero: {
    eyebrow: 'Company · Careers',
    title: 'Join our team in Kampala or Nairobi.',
    intro:
      'Smartwatch builds and supports fleet management for operators across East Africa. We hire engineers, installers, support staff and account managers who like working close to customers and their vehicles.',
    tone: 'light',
    mediaLabel: 'engine diagnostics on a tablet',
    media: img.teamOnPhone,
    ctas: [{ label: 'Send your application', to: `mailto:${site.email}` }],
  },
  sections: [
    {
      kind: 'cards',
      id: 'why',
      eyebrow: 'Why Smartwatch',
      title: 'What the work is like.',
      columns: 3,
      items: [
        {
          title: 'Hands-on with hardware and software',
          body: 'Trackers, cameras and sensors in the field, and the platform that turns their data into decisions.',
          icon: 'hardware',
        },
        {
          title: 'A regional customer base',
          body: 'Oil and gas, logistics, public transport, NGOs and government fleets across the East and Horn of Africa.',
          icon: 'truck',
        },
        {
          title: 'Support that runs 24/7',
          body: 'Customers reach us around the clock, so the team is built around dependable, prompt help.',
          icon: 'support',
        },
      ],
    },
    {
      kind: 'cards',
      id: 'offices',
      eyebrow: 'Where we work',
      title: 'Our offices.',
      columns: 3,
      items: offices.map((office) => ({
        title: `${office.city}, ${office.country}`,
        body: `${office.role}. ${office.lines.join(', ')}.`,
        icon: 'site' as const,
      })),
    },
    {
      kind: 'steps',
      id: 'apply',
      eyebrow: 'How to apply',
      title: 'Three steps.',
      items: [
        { title: 'Send your CV', body: `Email ${site.email} with the kind of role you are looking for and the office you would join.` },
        { title: 'A conversation with the team', body: 'We talk through your experience and what the role involves day to day.' },
        { title: 'Meet us in person', body: 'Spend time with the team in Kampala or Nairobi before you decide.' },
      ],
    },
  ],
  cta: {
    title: 'No open role that fits? Write to us anyway.',
    body: 'We keep speculative applications on file and get in touch when the right position opens.',
    ctas: [{ label: 'Send your application', to: `mailto:${site.email}`, variant: 'primary' }],
  },
  meta: {
    title: 'Careers',
    description: 'Careers at Smartwatch Solutions in Kampala and Nairobi: engineering, installation, support and account management.',
  },
}

export const partners: DetailPage = {
  slug: 'partners',
  kind: 'page',
  name: 'Partners',
  short: 'Join our partner program',
  icon: 'assets',
  hero: {
    eyebrow: 'Company · Partners',
    title: 'Grow with Smartwatch.',
    intro:
      'Resellers, installers and technology partners extend Smartwatch across the region. Join the programme to offer fleet management, field service and asset monitoring to your own customers, with our platform and support behind you.',
    tone: 'light',
    media: img.partnerHands,
    ctas: [{ label: 'Apply to partner', to: routes.contact }],
  },
  sections: [
    {
      kind: 'cards',
      id: 'programme',
      eyebrow: 'The programme',
      title: 'Three ways to partner.',
      columns: 3,
      items: [
        {
          title: 'Resellers',
          body: 'Sell Smartwatch FM and our hardware to your own customers, with pricing, training and marketing support.',
          icon: 'sales',
        },
        {
          title: 'Installers',
          body: 'Fit and service trackers, cameras and sensors for Smartwatch customers in your area.',
          icon: 'hardware',
        },
        {
          title: 'Technology partners',
          body: 'Connect your dispatch, ERP or field service product to Smartwatch data.',
          icon: 'platform',
        },
      ],
    },
    {
      kind: 'split',
      id: 'alliances',
      eyebrow: 'Strategic alliances',
      title: 'Partnerships are how we have always delivered.',
      body: mission,
      media: img.highwayPair,
      cta: { label: 'Talk to us about partnering', to: routes.contact },
    },
    { kind: 'related', id: 'related', title: 'Useful for partners', slugs: [routes.hardware, routes.platforms, routes.developers] },
  ],
  cta: {
    title: 'Ready to partner?',
    body: 'Tell us about your business and the customers you serve, and we will come back within one business day.',
    ctas: [
      { label: 'Apply to partner', to: routes.contact, variant: 'primary' },
      { label: 'See a demo first', to: demo, variant: 'outline-light' },
    ],
  },
  meta: {
    title: 'Partners',
    description: 'The Smartwatch partner programme for resellers, installers and technology partners across East Africa.',
  },
}
