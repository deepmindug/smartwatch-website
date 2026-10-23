import type { Img } from './types'

/**
 * The partner logos from the "Trusted by local and international partners"
 * carousels on smartwatchsolutions.com, trimmed of their baked-in white margins
 * and converted to WebP in public/images/logos. The band runs them as one row,
 * so the order here is the order they scroll past in. KRA leads on purpose.
 */
export const partnerLogos = [
  // Rebuilt at 2x from the approved-vendor sign in design/source-images, with the white ground lifted
  // so it floats on grey card frames like the KPMG badge does.
  {
    src: '/images/logos/kenya-revenue-authority.webp',
    alt: 'Kenya Revenue Authority',
    width: 840,
    height: 225,
  },
  {
    src: '/images/logos/absa.webp',
    alt: 'Absa',
    width: 125,
    height: 120,
  },
  {
    src: '/images/logos/achelis.webp',
    alt: 'Achelis',
    width: 323,
    height: 120,
  },
  {
    src: '/images/logos/airtel.webp',
    alt: 'Airtel',
    width: 346,
    height: 120,
  },
  {
    src: '/images/logos/alpha-logistics.webp',
    alt: 'Alpha Logistics',
    width: 168,
    height: 120,
  },
  {
    src: '/images/logos/amity-finance.webp',
    alt: 'Amity Finance',
    width: 420,
    height: 77,
  },
  {
    src: '/images/logos/aramex.webp',
    alt: 'Aramex',
    width: 240,
    height: 120,
  },
  {
    src: '/images/logos/ashland-motors-africa.webp',
    alt: 'Ashland Motors Africa',
    width: 420,
    height: 87,
  },
  {
    src: '/images/logos/atacama-consulting.webp',
    alt: 'Atacama Consulting',
    width: 402,
    height: 120,
  },
  {
    src: '/images/logos/atc-uganda.webp',
    alt: 'ATC Uganda',
    width: 196,
    height: 120,
  },
  {
    src: '/images/logos/avenue-insurance-brokers.webp',
    alt: 'Avenue Insurance Brokers',
    width: 355,
    height: 120,
  },
  {
    src: '/images/logos/bs-produce.webp',
    alt: 'B&S Produce',
    width: 130,
    height: 120,
  },
  {
    src: '/images/logos/baker-hughes.webp',
    alt: 'Baker Hughes',
    width: 201,
    height: 120,
  },
  {
    src: '/images/logos/barclays.webp',
    alt: 'Barclays',
    width: 209,
    height: 120,
  },
  {
    src: '/images/logos/british-american-tobacco.webp',
    alt: 'British American Tobacco',
    width: 207,
    height: 120,
  },
  {
    src: '/images/logos/british-gas.webp',
    alt: 'British Gas',
    width: 301,
    height: 120,
  },
  {
    src: '/images/logos/capital-outdoor.webp',
    alt: 'Capital Outdoor',
    width: 256,
    height: 120,
  },
  {
    src: '/images/logos/centenary-bank.webp',
    alt: 'Centenary Bank',
    width: 113,
    height: 120,
  },
  {
    src: '/images/logos/city-ambulance.webp',
    alt: 'City Ambulance',
    width: 320,
    height: 120,
  },
  {
    src: '/images/logos/cnooc.webp',
    alt: 'CNOOC',
    width: 420,
    height: 119,
  },
  {
    src: '/images/logos/cpecc.webp',
    alt: 'CPECC',
    width: 109,
    height: 120,
  },
  {
    src: '/images/logos/dar.webp',
    alt: 'Dar',
    width: 240,
    height: 120,
  },
  {
    src: '/images/logos/davis-and-shirtliff.webp',
    alt: 'Davis & Shirtliff',
    width: 397,
    height: 120,
  },
  {
    src: '/images/logos/eapiling.webp',
    alt: 'EAPiling',
    width: 105,
    height: 120,
  },
  {
    src: '/images/logos/east-african-medical-vitals.webp',
    alt: 'East African Medical Vitals',
    width: 420,
    height: 106,
  },
  {
    src: '/images/logos/enviroserve.webp',
    alt: 'Enviroserve',
    width: 420,
    height: 56,
  },
  {
    src: '/images/logos/food-for-the-hungry.webp',
    alt: 'Food for the Hungry',
    width: 420,
    height: 117,
  },
  {
    src: '/images/logos/gardaworld.webp',
    alt: 'GardaWorld',
    width: 121,
    height: 120,
  },
  {
    src: '/images/logos/ieng.webp',
    alt: 'iEng',
    width: 221,
    height: 120,
  },
  {
    src: '/images/logos/kcb-bank.webp',
    alt: 'KCB Bank',
    width: 420,
    height: 95,
  },
  {
    src: '/images/logos/kia.webp',
    alt: 'Kia',
    width: 234,
    height: 120,
  },
  {
    src: '/images/logos/kiira-motors.webp',
    alt: 'Kiira Motors Corporation',
    width: 204,
    height: 120,
  },
  {
    src: '/images/logos/klm.webp',
    alt: 'KLM',
    width: 203,
    height: 120,
  },
  {
    src: '/images/logos/lifewater.webp',
    alt: 'Lifewater',
    width: 321,
    height: 120,
  },
  {
    src: '/images/logos/medserv-regis.webp',
    alt: 'Medserv Regis',
    width: 237,
    height: 120,
  },
  {
    src: '/images/logos/mota-engil.webp',
    alt: 'Mota-Engil',
    width: 239,
    height: 120,
  },
  {
    src: '/images/logos/motorcare.webp',
    alt: 'MotorCare',
    width: 158,
    height: 120,
  },
  {
    src: '/images/logos/msl-logistics.webp',
    alt: 'MSL Logistics',
    width: 233,
    height: 120,
  },
  {
    src: '/images/logos/mu-jhu.webp',
    alt: 'MU-JHU',
    width: 174,
    height: 120,
  },
  {
    src: '/images/logos/multichoice.webp',
    alt: 'MultiChoice',
    width: 195,
    height: 120,
  },
  {
    src: '/images/logos/nexus-green.webp',
    alt: 'Nexus Green',
    width: 228,
    height: 120,
  },
  {
    src: '/images/logos/nic-group.webp',
    alt: 'NIC Group',
    width: 146,
    height: 120,
  },
  {
    src: '/images/logos/nissan.webp',
    alt: 'Nissan',
    width: 140,
    height: 120,
  },
  {
    src: '/images/logos/ntv.webp',
    alt: 'NTV',
    width: 177,
    height: 120,
  },
  {
    src: '/images/logos/overseas-freight-and-logistics.webp',
    alt: 'Overseas Freight & Logistics',
    width: 186,
    height: 120,
  },
  {
    src: '/images/logos/pel.webp',
    alt: 'P.E.L',
    width: 125,
    height: 120,
  },
  {
    src: '/images/logos/pinnacle-security.webp',
    alt: 'Pinnacle Security',
    width: 122,
    height: 120,
  },
  {
    src: '/images/logos/posta-uganda.webp',
    alt: 'Posta Uganda',
    width: 87,
    height: 120,
  },
  {
    src: '/images/logos/quality-chemicals.webp',
    alt: 'Quality Chemicals',
    width: 191,
    height: 120,
  },
  {
    src: '/images/logos/rapid-rescue-health-care.webp',
    alt: 'Rapid Rescue Health Care Uganda',
    width: 120,
    height: 120,
  },
  {
    src: '/images/logos/rubis.webp',
    alt: 'Rubis',
    width: 158,
    height: 120,
  },
  {
    src: '/images/logos/rwenzori.webp',
    alt: 'Rwenzori',
    width: 284,
    height: 120,
  },
  {
    src: '/images/logos/schlumberger.webp',
    alt: 'Schlumberger',
    width: 420,
    height: 103,
  },
  {
    src: '/images/logos/serena-hotels.webp',
    alt: 'Serena Hotels',
    width: 197,
    height: 120,
  },
  {
    src: '/images/logos/seyani-brothers.webp',
    alt: 'Seyani Brothers',
    width: 106,
    height: 120,
  },
  {
    src: '/images/logos/sicpa.webp',
    alt: 'SICPA',
    width: 136,
    height: 120,
  },
  {
    src: '/images/logos/sinopec.webp',
    alt: 'Sinopec',
    width: 153,
    height: 120,
  },
  {
    src: '/images/logos/strakon.webp',
    alt: 'Strakon',
    width: 379,
    height: 120,
  },
  {
    src: '/images/logos/strong-minds.webp',
    alt: 'StrongMinds',
    width: 234,
    height: 120,
  },
  {
    src: '/images/logos/threeways-shipping.webp',
    alt: 'Threeways Shipping Services',
    width: 200,
    height: 120,
  },
  {
    src: '/images/logos/totalenergies.webp',
    alt: 'TotalEnergies',
    width: 160,
    height: 120,
  },
  {
    src: '/images/logos/trademark-africa.webp',
    alt: 'TradeMark Africa',
    width: 145,
    height: 120,
  },
  {
    src: '/images/logos/uganda-batteries.webp',
    alt: 'Uganda Batteries',
    width: 153,
    height: 120,
  },
  {
    src: '/images/logos/uict.webp',
    alt: 'Uganda Institute of ICT',
    width: 122,
    height: 120,
  },
  {
    src: '/images/logos/uneb.webp',
    alt: 'UNEB',
    width: 119,
    height: 120,
  },
  {
    src: '/images/logos/unoc.webp',
    alt: 'UNOC',
    width: 386,
    height: 120,
  },
  {
    src: '/images/logos/vaell-leasing.webp',
    alt: 'Vaell Leasing',
    width: 181,
    height: 120,
  },
  {
    src: '/images/logos/watoto-church.webp',
    alt: 'Watoto Church',
    width: 242,
    height: 120,
  },
  {
    src: '/images/logos/wavah-water.webp',
    alt: 'Wavah Water',
    width: 173,
    height: 120,
  },
  {
    src: '/images/logos/weafri.webp',
    alt: 'Weafri',
    width: 107,
    height: 120,
  },
  {
    src: '/images/logos/weatherford.webp',
    alt: 'Weatherford',
    width: 281,
    height: 120,
  },
  {
    src: '/images/logos/world-vision.webp',
    alt: 'World Vision',
    width: 289,
    height: 120,
  },
  {
    src: '/images/logos/yalelo.webp',
    alt: 'Yalelo',
    width: 420,
    height: 113,
  },

  // The source site ships these three without a brand name anywhere in its
  // markup or media library. Swap in the real names when the client confirms them.
  {
    src: '/images/logos/autocheck.webp',
    alt: 'Customer logo',
    width: 116,
    height: 120,
  },
  {
    src: '/images/logos/education-partner.webp',
    alt: 'Customer logo',
    width: 124,
    height: 120,
  },
  {
    src: '/images/logos/maiu.webp',
    alt: 'Customer logo',
    width: 112,
    height: 120,
  },
] satisfies Img[]

/** Finds a partner's logo by its brand name; throws at module load so a typo fails the tests, not a visitor. */
export function partnerLogo(name: string): Img {
  const logo = partnerLogos.find((entry) => entry.alt === name)
  if (!logo) throw new Error(`No partner logo named "${name}"`)
  return logo
}
