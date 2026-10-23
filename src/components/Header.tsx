import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { award, cargoFeature } from '../data/content'
import { img } from '../data/images'
import {
  companyLinks,
  connectLinks,
  drawerGroups,
  hardwareLinks,
  learnLinks,
  portalLinks,
  productLinks,
  solutionLinks,
  techLinks,
  viewAll,
  type NavLink,
} from '../data/nav'
import { anchors, routes, site } from '../data/site'
import type { Img } from '../data/types'
import { cx } from '../lib/cx'
import { useScrolled } from '../motion/useScrolled'
import Icon from './Icon'
import Media from './Media'
import SmartLink from './SmartLink'
import MegaMenuNavbar, { type MegaMenu, type MobileGroup } from './ui/mega-menu-navbar'
import CornerButton from './ui/corner-button'
import s from './Header.module.css'

const featuredProducts: NavLink[] = [...hardwareLinks, { name: 'All products', short: '', to: routes.products }]

/** Icon tile + title, plus a one-line description unless the row is compact. */
function MenuItem({ link, compact = false }: { link: NavLink; compact?: boolean }) {
  return (
    <SmartLink to={link.to} className={cx(s.item, compact && s.itemCompact)}>
      {link.icon && (
        <span className={s.itemIcon}>
          <Icon name={link.icon} size={compact ? 18 : 20} />
        </span>
      )}
      <span className={s.itemText}>
        <span className={s.itemTitle}>{link.name}</span>
        {!compact && link.short && <span className={s.itemDesc}>{link.short}</span>}
      </span>
    </SmartLink>
  )
}

function FeaturedList({ links }: { links: NavLink[] }) {
  return (
    <div className={s.featuredList}>
      {links.map((link) => (
        <SmartLink key={link.to + link.name} to={link.to} className={s.featuredLink}>
          {link.name}
        </SmartLink>
      ))}
    </div>
  )
}

function ViewAll({ link }: { link: NavLink }) {
  return (
    <SmartLink to={link.to} className={s.viewAll}>
      {link.name}
      <span aria-hidden="true">→</span>
    </SmartLink>
  )
}

/** Dark promo tile pinned to the right of every menu; the whole card is the link. */
function Promo({
  image,
  imageLabel,
  title,
  body,
  to,
  contain = false,
}: {
  image?: Img
  imageLabel?: string
  title: string
  body?: string
  to: string
  contain?: boolean
}) {
  return (
    <SmartLink to={to} className={s.promo}>
      <Media
        image={image}
        label={imageLabel}
        ratio={contain ? '1 / 1' : '16 / 10'}
        radius={12}
        decorative
        className={cx(s.promoImage, contain && s.promoContain)}
      />
      <span className={s.promoTitle}>{title}</span>
      {body && <span className={s.promoText}>{body}</span>}
    </SmartLink>
  )
}

function Column({ title, children, narrow = false }: { title: string; children: ReactNode; narrow?: boolean }) {
  return (
    <div className={narrow ? s.featured : s.main}>
      <div className={s.eyebrow}>{title}</div>
      {children}
    </div>
  )
}

const menus: MegaMenu[] = [
  {
    id: 'products',
    label: 'Products',
    href: routes.products,
    content: (
      <>
        <Column title="Products">
          <div className={s.grid}>
            {productLinks.slice(0, 7).map((link) => (
              <MenuItem key={link.to} link={link} />
            ))}
          </div>
          <ViewAll link={viewAll.products} />
        </Column>
        <Column title="Featured" narrow>
          <FeaturedList links={featuredProducts} />
        </Column>
        <Promo
          image={cargoFeature.image}
          title="Cargo Tracking: sealed from loading bay to bonded warehouse."
          body="Electronic locks tracked live, for transporters and revenue authorities."
          to={cargoFeature.to}
        />
      </>
    ),
  },
  {
    id: 'solutions',
    label: 'Solutions',
    href: routes.solutions,
    content: (
      <>
        <Column title="By industry">
          <div className={s.grid}>
            {solutionLinks.map((link) => (
              <MenuItem key={link.to} link={link} compact />
            ))}
          </div>
          <ViewAll link={viewAll.solutions} />
        </Column>
        <Column title="Hardware" narrow>
          <FeaturedList links={hardwareLinks} />
        </Column>
        <Promo
          image={img.cargo}
          title="Smart Key demo: see cargo locking in action."
          body="Book a 30-minute walkthrough with our Kampala or Nairobi team."
          to={`${routes.contact}#${anchors.demo}`}
        />
      </>
    ),
  },
  {
    id: 'resources',
    label: 'Resources',
    href: routes.platforms,
    content: (
      <>
        <Column title="Learn">
          <div className={s.grid}>
            {learnLinks.map((link) => (
              <MenuItem key={link.name} link={link} />
            ))}
          </div>
          <ViewAll link={viewAll.resources} />
        </Column>
        <Column title="Technical resources" narrow>
          <div className={s.stack}>
            {techLinks.map((link) => (
              <MenuItem key={link.name} link={link} />
            ))}
          </div>
        </Column>
        <Promo
          image={award.image}
          title="Recognised by KPMG for fleet innovation in East Africa."
          to={award.to}
          contain
        />
      </>
    ),
  },
  {
    id: 'company',
    label: 'Company',
    href: routes.about,
    content: (
      <>
        <Column title="Get to know Smartwatch">
          <div className={s.grid}>
            {companyLinks.map((link) => (
              <MenuItem key={link.name} link={link} />
            ))}
          </div>
          <ViewAll link={viewAll.company} />
        </Column>
        <Column title="Connect" narrow>
          <div className={s.stack}>
            {connectLinks.map((link) => (
              <MenuItem key={link.name} link={link} />
            ))}
          </div>
        </Column>
        <Promo
          image={img.eaHighwayTraffic}
          title="A decade of connecting and protecting fleets."
          body="Founded in 2011. Offices in Kampala, Nairobi and the Netherlands."
          to={routes.about}
        />
      </>
    ),
  },
]

const mobileGroups: MobileGroup[] = drawerGroups.map((group) => ({
  id: group.label.toLowerCase(),
  title: group.label,
  items: group.links.map((link) => ({ title: link.name, href: link.to })),
}))

/** Contact link with the sales and support popover, shown beside the demo button. */
function ContactAction() {
  const [open, setOpen] = useState(false)
  return (
    <div className={s.contact} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link to={routes.contact} className={s.contactLink}>
        <Icon name="phone" size={16} />
        Contact
      </Link>
      {open && (
        <div className={s.pop}>
          <div className={s.popLabel}>Contact</div>
          <div className={s.popTitle}>Talk to Sales or Support 24/7</div>
          <a href={site.phoneHref} className={s.popCall}>
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className={s.popLink}>
            {site.email}
          </a>
          <Link to={`${routes.contact}#${anchors.support}`} className={s.popHelp}>
            Visit the help centre
          </Link>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  // The bar is light on every page and every section.
  const theme = 'light' as const
  const tone = 'green' as const
  const solid = useScrolled()

  return (
    <MegaMenuNavbar
      theme={theme}
      tone={tone}
      solid={solid}
      brandName={site.name}
      logoHref={routes.home}
      logo={<img src={logo} alt={site.name} />}
      menus={menus}
      mobileGroups={mobileGroups}
      actions={
        <>
          <ContactAction />
          <CornerButton to={routes.contact} size="sm" className={s.cta}>
            Get a demo
          </CornerButton>
        </>
      }
      mobileExtra={
        <div className={s.drawerPortals}>
          <div className={s.eyebrow}>Platform logins</div>
          {portalLinks.map((link) => (
            <SmartLink key={link.to} to={link.to} className={s.drawerLink}>
              {link.name}
            </SmartLink>
          ))}
        </div>
      }
      mobileFooter={
        <>
          <Link to={routes.contact} className={s.drawerContact}>
            <Icon name="phone" size={16} />
            Contact
          </Link>
          <CornerButton to={routes.contact} size="sm" className={s.cta}>
            Get a demo
          </CornerButton>
        </>
      }
    />
  )
}
