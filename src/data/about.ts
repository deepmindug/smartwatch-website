import { award } from './content'
import { img } from './images'
import { partnerLogo } from './logos'
import { site } from './site'
import type { DetailPage } from './types'

/**
 * About page. The overview, heritage, mission, vision and commitment are the client's own copy
 * (October 2026); the three tabs and the awards come from the live smartwatchsolutions.com/about/ page.
 */
export const about: DetailPage = {
  slug: 'about',
  kind: 'page',
  name: 'About us',
  short: "East Africa's premier telematics SaaS provider since 2011.",
  hero: {
    eyebrow: 'About us',
    title:
      "We are East Africa's premier provider of intelligent Fleet & Mobile Asset Management and Electronic Cargo Tracking solutions.",
    intro:
      'Smartwatch Solutions is a leading Telematics Software-as-a-Service (SaaS) company with regional operations across East Africa.',
    tone: 'light',
    compact: true,
    media: img.eaHighwayTraffic,
    ctas: [
      { label: 'Learn about our platforms', to: '/platforms' },
      { label: 'Contact us', to: '/contact', variant: 'outline-light' },
    ],
    hidden: true,
  },
  sections: [
    {
      kind: 'story',
      id: 'overview',
      eyebrow: 'Company overview',
      title: 'A leading telematics SaaS company with regional operations across East Africa.',
      lede: "Established in 2011 as a direct response to emerging trends in dynamic Mobile Resource Management and the growth of the Oil & Gas sector across East and Central Africa, we have grown to become East Africa's premier provider of intelligent fleet, mobile asset and Electronic Cargo Management solutions.",
      facts: [
        { value: '2011', label: 'Established' },
        { value: 'SaaS', label: 'Full-stack telematics platform' },
        { value: 'RECTS', label: 'Regional Electronic Cargo Tracking' },
      ],
      mediaLabel: 'Smartwatch FM on phone, tablet and desktop',
      media: img.appOnPhone,
    },
    {
      kind: 'split',
      id: 'heritage',
      eyebrow: 'Our heritage',
      title: 'From a telematics software provider to a full-stack Telematics SaaS platform company.',
      body: [
        'Though a relatively young operating entity, Smartwatch Solutions is itself an amalgamation of individuals with industry competencies cutting across various segments of Information Technology and Mobile Information Exchange platforms.',
        'What started as a basic Telematics software provider has evolved into a full-stack Telematics SaaS platform company. Driven by commercially viable Oil & Gas discoveries in Uganda, Tanzania, Mozambique, Kenya, Ethiopia, and South Sudan, and the implementation of the Regional Electronic Cargo Tracking System (RECTS) across East African Community (EAC) Member States, the company has strategically positioned itself as a technology partner of choice.',
        'Our journey has been defined by continuous innovation, strategic alliances, and an unwavering commitment to customer success. We have remained true to our founding principle: **Technology must deliver measurable value.**',
      ],
      media: { ...img.truckConvoyHighway, focus: 'center 30%' },
      mediaLabel: 'Fleet tracking through the years',
      mediaFill: true,
      reverse: true,
    },
    {
      kind: 'cards',
      id: 'vision',
      eyebrow: 'Mission & vision',
      lead: {
        title: 'Our commitment',
        statement: 'Driving Intelligence. Securing Assets. Powering Growth for Total Peace of Mind.',
      },
      columns: 2,
      items: [
        {
          title: 'Our mission',
          body: 'To enhance productivity of mobile assets, human resources and cost savings in the operations of our customers by rolling out innovative, tailor-made, end-to-end Mobile Asset Management solutions through a wide range of strategic alliances/partnerships and delivery channels, supported by state-of-the-art technologies.',
        },
        {
          title: 'Our vision',
          body: 'To be the leading Telematics SaaS provider in Africa, recognized for innovation, service excellence, and operational intelligence.',
        },
      ],
    },
    {
      kind: 'stats',
      id: 'stats',
      items: [
        { value: 20, suffix: 'K+', label: 'Active devices' },
        { value: 10, suffix: '+', label: 'Years of excellence' },
        { value: 6, label: 'Partnership across Africa and Europe' },
      ],
    },
    {
      kind: 'cards',
      id: 'services',
      plain: true,
      columns: 3,
      items: [
        {
          icon: 'assets',
          title: 'Fleet and mobile asset management',
          body: 'End-to-end fleet and mobile asset management software, with custom management solutions built around each operation.',
        },
        {
          icon: 'cargo',
          title: 'Electronic cargo tracking',
          body: 'The Regional Electronic Cargo Tracking System (RECTS / ECTS), keeping cargo sealed and accounted for across borders.',
        },
        {
          icon: 'site',
          title: 'IVMS for Oil & Gas',
          body: 'In-Vehicle Monitoring System (IVMS) software for Oil & Gas customers across Africa.',
        },
      ],
    },
    {
      kind: 'tabs',
      id: 'why-us',
      eyebrow: 'Why Smartwatch',
      title: 'Our trade, our promise and our support.',
      tabs: [
        {
          label: 'Our trade',
          title: 'Information is a vital tool that drives strategic thinking.',
          body: [
            'Our trade is guided by the belief that information is a vital tool that drives strategic thinking, which spurs strategic decisions that result in maximum cost savings and growth. Ours is to offer the link between strategic planning, design and implementation of policies, with a touch of technical knowledge and a holistic approach with our clients and partners. The target is to provide links between research, expert-led decisions and practical policy implications through an advisory and practical approach.',
            "At Smartwatch Solutions Ltd, we foster long-term relationships with our partners and stakeholders through our core competencies in consultative services and the individual professional expertise of our staff, developed over time. We design programmes to mitigate our clients' costs, develop value-added solutions customised to fit client-specific needs, promote personal attention and efficiency, and create an environment that promotes teamwork, job satisfaction, personal growth and value for all our stakeholders.",
            'We are committed to the provision of affordable, quality products offered with excellent service delivery, and strive to develop worldwide partnerships that leave a lasting impression in mobile resource management and information technology in the emerging economies.',
          ],
        },
        {
          label: 'Why us',
          title: 'Why clients choose Smartwatch.',
          body: "Smartwatch Solutions is East Africa's leading provider of fleet and mobile asset management solutions. We develop and implement connected fleet and mobile asset management solutions for customers across the East and Horn of Africa.",
          points: [
            'Proven technology and functionality',
            'A long-term partner for business management solutions',
            'Continuous product development',
            'Affordable and user-friendly solutions',
            'Professional project management',
            'A fully integrated Smartwatch business solution to increase operational efficiency',
            'Customised solutions based on client requirements',
          ],
        },
        {
          label: 'Customer support',
          title: 'World-class customer support, throughout the day.',
          body: [
            'Our policy is to provide world-class customer support, helping our clients to continually meet their service goals of reliability and quality. Whether faced with a routine inquiry or an emergency, we make it our duty to provide prompt, relevant expertise by phone or email, via remote log-in or in person. With service that runs throughout the day, we provide further assurance that you will get the best out of Smartwatch Solutions Ltd.',
            "Smartwatch Solutions' clear, efficient processes for service inquiries and case management ensure rapid diagnosis and resolution of any problems.",
            'This knowledge is the basis for providing cost-effective and customised mobile resource management solutions that are designed to meet and improve business processes. Smartwatch Solutions Ltd is committed to continuously improving customer support, building a strong foundation for long-term business relationships.',
          ],
          points: [`Call ${site.phone}`, `Email ${site.email}`],
        },
      ],
    },
    {
      kind: 'trust',
      id: 'clients',
      authorities: {
        title: 'Trusted by revenue authorities across East & Central Africa',
        items: [
          {
            name: 'Uganda Revenue Authority',
            country: 'Uganda',
            logo: { src: '/images/ra-ura.webp', alt: 'Uganda Revenue Authority', width: 322, height: 200 },
          },
          {
            name: 'Kenya Revenue Authority',
            country: 'Kenya',
            logo: { src: '/images/ra-kra.webp', alt: 'Kenya Revenue Authority', width: 614, height: 200 },
          },
          {
            name: 'Rwanda Revenue Authority',
            country: 'Rwanda',
            logo: { src: '/images/ra-rra.webp', alt: 'Rwanda Revenue Authority', width: 425, height: 200 },
          },
          {
            name: 'Direction Générale des Douanes et Accises (DR Congo)',
            country: 'DR Congo',
            logo: {
              src: '/images/ra-dgda.webp',
              alt: 'Direction Générale des Douanes et Accises (DR Congo)',
              width: 640,
              height: 183,
            },
          },
          {
            name: 'South Sudan Revenue Authority',
            country: 'South Sudan',
            logo: { src: '/images/ra-ssra.webp', alt: 'South Sudan Revenue Authority', width: 200, height: 200 },
          },
          {
            name: 'Office Burundais des Recettes',
            country: 'Burundi',
            logo: { src: '/images/ra-obr.webp', alt: 'Office Burundais des Recettes', width: 446, height: 200 },
          },
        ],
        note: "We are East Africa's premier Telematics Software-as-a-Service (SaaS) company, specializing in intelligent Fleet, Mobile Asset, and Electronic Cargo Management solutions.",
      },
      clients: {
        title: 'Serving Oil & Gas, Government Institutions, Corporate Entities and NGOs, including',
        items: [
          { name: 'Schlumberger', logo: partnerLogo('Schlumberger') },
          { name: 'Baker Hughes', logo: partnerLogo('Baker Hughes') },
          { name: 'Total Energies', logo: partnerLogo('TotalEnergies') },
          { name: 'British Gas Group', logo: partnerLogo('British Gas') },
          { name: 'CNOOC', logo: partnerLogo('CNOOC') },
          // The source site names MTN without showing its mark, so this is MTN's
          // 2022 logo from Wikimedia Commons (File:MTN 2022 logo.svg).
          { name: 'MTN', logo: { src: '/images/logos/mtn.webp', alt: 'MTN', width: 240, height: 120 } },
          {
            name: 'Kenya Revenue Authority',
            logo: { src: '/images/kra-logo.webp', alt: 'Kenya Revenue Authority', width: 600, height: 183 },
          },
        ],
      },
      closing:
        'We specialize in providing end-to-end fleet and mobile asset management software, custom management solutions including the Regional Electronic Cargo Tracking System (RECTS / ECTS), and IVMS Software for Oil & Gas customers across Africa, as well as Government Institutions, Corporate Entities, and NGOs.',
      cta: { label: 'View our products and services', to: '/products' },
    },
    {
      kind: 'cards',
      id: 'awards',
      eyebrow: 'Awards & accreditation',
      title: 'Recognised by KPMG & UMA',
      intro: 'Two marks of the standards we hold ourselves to: one from the auditors, one from Uganda’s manufacturers.',
      columns: 2,
      center: true,
      items: [
        {
          title: award.name,
          body: 'Smartwatch Solutions has been recognised among the KPMG Top 100 Mid-Sized Companies. It is an acknowledgement of the quality standards we hold ourselves to in fleet management, and of the trust our clients and partners across Africa and Europe place in us.',
          image: { ...img.kpmg, fit: 'contain' },
        },
        {
          title: 'Certificate of Appreciation',
          body: 'Smartwatch Solutions has been recognised by the Uganda Manufacturers Association for being a pioneer in taking on interns from the ReadytoWork Project in 2018.',
          image: img.umaCertificate,
        },
      ],
    },
  ],
  cta: {
    title: 'Total peace of mind, since 2011.',
    body: 'Affordable, user-friendly fleet and asset management solutions that enhance efficiency and support long-term business growth.',
    ctas: [
      { label: 'Get a demo', to: '/contact' },
      { label: 'View our products', to: '/products', variant: 'outline-light' },
    ],
  },
  meta: {
    title: 'About us',
    description:
      'Smartwatch Solutions is a leading Telematics SaaS company with regional operations across East Africa, providing fleet, mobile asset and electronic cargo management since 2011.',
  },
}
