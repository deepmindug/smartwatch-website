import { Link } from 'react-router-dom'
import CredentialBadge from '../components/CredentialBadge'
import Media from '../components/Media'
import Reveal from '../components/Reveal'
import CardsSection from '../components/sections/CardsSection'
import StickyRail from '../components/sections/StickyRail'
import DemoSection from '../components/home/DemoSection'
import { award } from '../data/content'
import { hardware } from '../data/hardware'
import { pillars } from '../data/pillars'
import { anchors, routes } from '../data/site'
import type { Section } from '../data/types'
import { usePageMeta } from '../hooks/usePageMeta'
import { cx } from '../lib/cx'
import s from './ProductsPage.module.css'

type CardsSectionData = Extract<Section, { kind: 'cards' }>

const productCards: CardsSectionData = {
  kind: 'cards',
  id: 'products',
  title: 'Designed around your unique requirements.',
  intro: 'Software products that work together on one platform, powered by industry-leading AI.',
  items: pillars.map((p) => ({ title: p.name, body: p.short, icon: p.icon, href: p.to })),
}

function hardwareSection(id: string, title: string, intro: string): CardsSectionData | undefined {
  const source = hardware.sections.find(
    (sec): sec is CardsSectionData => sec.kind === 'cards' && sec.id === id,
  )
  return source ? { ...source, title, intro, columns: 3 } : undefined
}

const deviceCards = hardwareSection(
  anchors.devices,
  'Smartwatch devices.',
  'Dependable trackers, cameras and monitors, designed and built for Africa’s roads.',
)
const accessoryCards = hardwareSection(
  anchors.accessories,
  'Accessories.',
  'Sensors, harnesses and in-cab devices that extend what your trackers can see.',
)

const rail = [
  { id: 'products', label: 'Products' },
  { id: anchors.devices, label: 'Devices' },
  { id: anchors.accessories, label: 'Accessories' },
  { id: anchors.demo, label: 'Get a demo' },
]

export default function ProductsPage() {
  usePageMeta({
    title: 'Products',
    description:
      'Smartwatch products tailored to your specific needs: compliance, dash cameras, tracking and telematics, maintenance, cargo tracking, sustainability and insurance.',
  })

  return (
    <div className={s.page}>
      <section className={s.hero} data-band="light">
        <div className={cx('container', s.heroInner)}>
          <div className="eyebrow eyebrow--rule">Smartwatch products</div>
          <h1 className="h-page">Products tailored to your specific needs.</h1>
          <p className={s.lead}>
            Comprehensive and customised solutions designed to fit your business operations, enhance
            efficiency, and support long-term growth.
          </p>
          <div className={s.actions}>
            <a href="#products" className="btn btn--primary">
              Discover all products
            </a>
            <Link to={routes.contact} className="btn btn--outline">
              Contact us
            </Link>
          </div>
          <div className={s.badges}>
            <Link to={award.to} className={s.badge} aria-label={award.name}>
              <Media image={award.image} radius={10} decorative className={s.badgeImage} />
              <span className={s.badgeLabel}>{award.label}</span>
            </Link>
            <CredentialBadge className={s.seal} />
          </div>
        </div>
      </section>

      <div className={s.body}>
        <StickyRail items={rail} />
        <Reveal>
          <CardsSection section={productCards} variant="product" />
        </Reveal>
        {deviceCards && (
          <Reveal>
            <CardsSection section={deviceCards} />
          </Reveal>
        )}
        {accessoryCards && (
          <Reveal>
            <CardsSection section={accessoryCards} />
          </Reveal>
        )}
        <div className={cx('container', s.hardwareLink)}>
          <Link to={routes.hardware} className="btn btn--outline">
            Explore all hardware
          </Link>
        </div>
      </div>

      <DemoSection />
    </div>
  )
}
