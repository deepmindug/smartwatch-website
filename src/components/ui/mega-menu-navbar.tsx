import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { IconName } from '../../data/types'
import { cx } from '../../lib/cx'
import Icon from '../Icon'
import SmartLink from '../SmartLink'
import s from './mega-menu-navbar.module.css'

/*
 * Vendored from the VengeanceUI registry:
 * https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/mega-menu-navbar.json
 *
 * `npx shadcn add` was not used: this project has no shadcn setup and no Tailwind, and the
 * CLI would have installed both and rewritten the config. What is kept is the component's
 * structure and mechanics — the Brand / MenuTrigger / DesktopDropdown / MobileAccordion
 * decomposition, the aria wiring, close on outside pointerdown, close on Escape, the body
 * scroll lock and focus move while the mobile drawer is open, and the grid-template-rows
 * accordion transition. Four things are adapted:
 *   - `cn` from "@/lib/utils" becomes this project's `cx`
 *   - `lucide-react` icons become this project's own `Icon` set, so no new dependency and the
 *     industry glyphs stay the ones drawn for this site
 *   - its Tailwind zinc utility classes become a CSS module on this site's tokens
 *   - its three fixed menus (features / use-cases / resources) become an array, since this
 *     site has four, and each menu renders caller-supplied content so the column layout,
 *     promo card and view-all link are the site's own rather than its plain 2-up icon grid
 * Desktop panels mount only while open, which the header's tests rely on; the mobile
 * accordion keeps the component's always-mounted rows so its transition still runs.
 */

/**
 * How long an open menu survives the pointer leaving it. Long enough to cross the gap
 * between the bar and the panel, or to clip a corner while moving diagonally into it.
 */
const CLOSE_DELAY = 260

export interface MegaMenuItem {
  title: string
  href: string
  icon?: IconName
}

export interface MegaMenu {
  id: string
  label: string
  href: string
  /** Panel body. The component supplies the floating card; the caller supplies the columns. */
  content: ReactNode
  width?: 'wide' | 'narrow'
}

export interface MobileGroup {
  id: string
  title: string
  items: MegaMenuItem[]
}

export interface MegaMenuNavbarProps {
  logo: ReactNode
  logoHref: string
  brandName: string
  menus: MegaMenu[]
  /** Plain links that sit beside the menu triggers. */
  navLinks?: MegaMenuItem[]
  /** Right-hand slot: contact, calls to action. */
  actions?: ReactNode
  mobileGroups: MobileGroup[]
  mobileExtra?: ReactNode
  mobileFooter?: ReactNode
  theme?: 'dark' | 'light'
  /** Which dark colour the bar paints over a dark band; mirrors the band's data-band-tone. */
  tone?: 'green' | 'deep'
  /** Paint the bar's own background; off, it is transparent over whatever it starts on. */
  solid?: boolean
  /** Width of a narrow panel, used to keep it inside the viewport. */
  narrowWidth?: number
}

function Brand({ logo, href, brandName, onNavigate }: { logo: ReactNode; href: string; brandName: string; onNavigate: () => void }) {
  return (
    <SmartLink to={href} className={s.logo} aria-label={brandName} onClick={onNavigate}>
      {logo}
    </SmartLink>
  )
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={cx(s.caret, className)} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuTrigger({
  id,
  label,
  isOpen,
  onOpen,
  onActivate,
}: {
  id: string
  label: string
  isOpen: boolean
  onOpen: (event: React.SyntheticEvent<HTMLButtonElement>) => void
  onActivate: () => void
}) {
  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={isOpen}
      aria-controls={id}
      className={cx(s.navItem, isOpen && s.navItemOpen)}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={onActivate}
    >
      {label}
      <Chevron />
    </button>
  )
}

function closeOnLink(close: () => void) {
  return (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a')) close()
  }
}

function DesktopDropdown({
  id,
  wide,
  left,
  onLinkClick,
  onPointerWithin,
  children,
}: {
  id: string
  wide: boolean
  left?: number
  onLinkClick: () => void
  onPointerWithin: () => void
  children: ReactNode
}) {
  return (
    <div
      id={id}
      className={cx(s.menu, wide ? s.menuWide : s.menuNarrow)}
      style={wide ? undefined : { left }}
      onClick={closeOnLink(onLinkClick)}
      onMouseEnter={onPointerWithin}
    >
      {children}
    </div>
  )
}

function MobileMenuItem({ item, onNavigate }: { item: MegaMenuItem; onNavigate: () => void }) {
  return (
    <SmartLink to={item.href} className={s.drawerLink} onClick={onNavigate}>
      {item.icon && <Icon name={item.icon} size={16} />}
      <span>{item.title}</span>
    </SmartLink>
  )
}

function MobileAccordion({
  group,
  openSection,
  onToggle,
  onNavigate,
}: {
  group: MobileGroup
  openSection: string | null
  onToggle: (id: string) => void
  onNavigate: () => void
}) {
  const isOpen = openSection === group.id
  const contentId = `mobile-${group.id}-content`
  return (
    <div className={s.drawerGroup}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={s.drawerToggle}
        onClick={() => onToggle(group.id)}
      >
        {group.title}
        <Chevron className={cx(isOpen && s.caretOpen)} />
      </button>
      <div id={contentId} className={cx(s.drawerPanel, isOpen && s.drawerPanelOpen)}>
        <div className={s.drawerPanelClip}>
          <div className={s.drawerList}>
            {group.items.map((item) => (
              <MobileMenuItem key={item.href + item.title} item={item} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MegaMenuNavbar({
  logo,
  logoHref,
  brandName,
  menus,
  navLinks = [],
  actions,
  mobileGroups,
  mobileExtra,
  mobileFooter,
  theme = 'light',
  tone = 'green',
  solid = false,
  narrowWidth = 920,
}: MegaMenuNavbarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [anchor, setAnchor] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  /** Where the bar's bottom edge sits while the drawer is open; null falls back to the stylesheet height. */
  const [drawerTop, setDrawerTop] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | null>(null)

  /*
   * Hover intent. The panel floats clear of the bar, so the pointer crosses dead space on
   * its way down and `mouseleave` fires on the header. Closing on that directly meant the
   * menu vanished before it could be reached; instead the close is deferred and any pointer
   * landing on a trigger or inside the panel cancels it.
   */
  const cancelClose = () => {
    if (closeTimer.current === null) return
    window.clearTimeout(closeTimer.current)
    closeTimer.current = null
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), CLOSE_DELAY)
  }

  useEffect(() => cancelClose, [])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpenMenu(null)
      setMobileOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  /*
   * The drawer hangs from the bar's real bottom edge, not the stylesheet's header height: at the
   * top of the page the announcement bar holds the bar lower, and a drawer pinned at the header
   * height would cover the logo and the close button. Measured before paint so it never jumps.
   */
  useLayoutEffect(() => {
    if (!mobileOpen) return
    const measure = () => {
      const bottom = navRef.current?.getBoundingClientRect().bottom ?? 0
      setDrawerTop(bottom > 0 ? Math.round(bottom) : null)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  const closeAll = () => {
    cancelClose()
    setOpenMenu(null)
    setMobileOpen(false)
    setMobileSection(null)
  }

  /** Opens a menu and records where its trigger sits, so narrow panels hang beneath it. */
  const openAt = (id: string) => (event: React.SyntheticEvent<HTMLButtonElement>) => {
    cancelClose()
    const headerRect = navRef.current?.getBoundingClientRect()
    const rect = event.currentTarget.getBoundingClientRect()
    const wanted = rect.left - (headerRect?.left ?? 0) - 32
    const maxLeft = (headerRect?.width ?? 0) - narrowWidth - 24
    setAnchor(Math.max(24, Math.min(wanted, maxLeft)))
    setOpenMenu(id)
  }

  const active = menus.find((menu) => menu.id === openMenu)

  return (
    <header
      ref={navRef}
      className={s.header}
      data-theme={theme}
      data-tone={tone}
      data-solid={solid || undefined}
      onMouseLeave={scheduleClose}
    >
      <div className={cx('container', s.bar)}>
        <Brand logo={logo} href={logoHref} brandName={brandName} onNavigate={closeAll} />

        <nav className={s.nav} aria-label="Primary">
          {menus.map((menu) => (
            <MenuTrigger
              key={menu.id}
              id={`megamenu-${menu.id}`}
              label={menu.label}
              isOpen={openMenu === menu.id}
              onOpen={openAt(menu.id)}
              onActivate={closeAll}
            />
          ))}
          {navLinks.map((link) => (
            <SmartLink
              key={link.href}
              to={link.href}
              className={s.navItem}
              onMouseEnter={scheduleClose}
              onFocus={() => setOpenMenu(null)}
              onClick={closeAll}
            >
              {link.title}
            </SmartLink>
          ))}
        </nav>

        <div className={s.actions} onMouseEnter={scheduleClose}>
          {actions}
          <button
            ref={closeButtonRef}
            type="button"
            className={s.burger}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className={cx(s.burgerLine, mobileOpen && s.burgerOpen)} aria-hidden="true" />
          </button>
        </div>
      </div>

      {active && (
        <DesktopDropdown
          id={`megamenu-${active.id}`}
          wide={active.width !== 'narrow'}
          left={anchor}
          onLinkClick={closeAll}
          onPointerWithin={cancelClose}
        >
          {active.content}
        </DesktopDropdown>
      )}

      {mobileOpen && (
        <div
          className={s.drawer}
          role="dialog"
          aria-label="Menu"
          style={drawerTop === null ? undefined : ({ '--drawer-top': `${drawerTop}px` } as CSSProperties)}
        >
          <div className={s.drawerScroll} onClick={closeOnLink(closeAll)}>
            <nav className={s.drawerNav} aria-label="Mobile">
              {mobileGroups.map((group) => (
                <MobileAccordion
                  key={group.id}
                  group={group}
                  openSection={mobileSection}
                  onToggle={(id) => setMobileSection((current) => (current === id ? null : id))}
                  onNavigate={closeAll}
                />
              ))}
              {navLinks.map((link) => (
                <SmartLink key={link.href} to={link.href} className={s.drawerToggle} onClick={closeAll}>
                  {link.title}
                </SmartLink>
              ))}
            </nav>
            {mobileExtra}
          </div>
          {mobileFooter && (
            <div className={s.drawerFooter} onClick={closeOnLink(closeAll)}>
              {mobileFooter}
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default MegaMenuNavbar
