import { useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { kraVendor } from '../data/content'
import { industriesA } from '../data/industries'
import { pillars } from '../data/pillars'
import { anchors, routes, site } from '../data/site'
import { cx } from '../lib/cx'
import { gsap, useGSAP } from '../motion/gsap'
import { MOTION_OK } from '../motion/motion'
import SmartLink from './SmartLink'
import CornerButton from './ui/corner-button'
import PixelField from './ui/pixel-field'
import TypingText from './ui/typing-text'
import s from './Footer.module.css'

const company = [
  { name: 'About Smartwatch', to: routes.about },
  { name: 'Our heritage', to: `${routes.about}#${anchors.heritage}` },
  { name: 'Awards & accreditation', to: `${routes.about}#${anchors.awards}` },
  { name: 'Platform logins', to: routes.platforms },
  { name: 'Contact', to: routes.contact },
]

/** The sticky header's height: a tall pinned footer sits just under it, so the bar never covers the footer's logo. */
const HEADER_H = 64

export default function Footer() {
  const ref = useRef<HTMLElement>(null)

  /*
   * Footer reveal, after Motion's "footer reveal" example (https://examples.motion.dev/react/footer-reveal),
   * built on the GSAP ScrollTrigger the site already runs: the footer waits still under the page, and as
   * the last section scrolls off it the footer's contents fade in, grow to full size and (on wide screens)
   * sharpen. A footer that fits the screen waits with its bottom edge on the screen's; a taller one (every
   * phone) waits with its top edge just under the header, and once the page has cleared it the rest scrolls
   * up as usual, so every link stays in reach.
   *
   * Two ways of holding it still:
   * - Everywhere but iPhone and iPad: CSS position: sticky (data-pinned in the stylesheet, which needs
   *   --footer-h). The browser holds it on its own scrolling thread, so it stays perfectly still on Android.
   * - iPhone and iPad: Safari does not reliably hold a sticky element taller than the screen, so the footer
   *   stays in the page flow and its contents are moved against the scroll instead.
   * With reduced motion asked for (Android's "Remove animations", often on in power saving), the footer
   * still waits under the page and fades in, but nothing grows or blurs.
   */
  useGSAP(
    () => {
      const el = ref.current
      const inner = el?.querySelector<HTMLElement>('[data-reveal]')
      const page = document.querySelector<HTMLElement>('main')
      if (!el || !inner || !page) return
      // How far the page travels while the footer holds still: its full height, or the screen below the header.
      const hold = () => Math.min(el.offsetHeight, window.innerHeight - HEADER_H)
      // A footer taller than the screen grows from its top edge, which is the edge that holds still.
      const origin = () => (el.offsetHeight > window.innerHeight - HEADER_H ? '50% 0%' : '50% 100%')
      const apple =
        /iP(hone|ad|od)/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
      const mm = gsap.matchMedia()
      // Both keys, so the setup runs either way (matchMedia only calls back when a condition matches).
      mm.add({ motion: MOTION_OK, reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
        const { motion } = context.conditions as { motion: boolean }
        const from = motion
          ? {
              autoAlpha: 0,
              scale: 0.94,
              transformOrigin: origin,
              filter: () => (window.innerWidth > 900 ? 'blur(10px)' : 'blur(0px)'),
            }
          : { autoAlpha: 0 }
        const to = motion ? { autoAlpha: 1, scale: 1, filter: 'blur(0px)' } : { autoAlpha: 1 }

        if (!apple) {
          const measure = () => el.style.setProperty('--footer-h', `${el.offsetHeight}px`)
          measure()
          el.dataset.pinned = ''
          const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
          observer?.observe(el)
          const tween = gsap.fromTo(inner, from, {
            ...to,
            ease: 'none',
            scrollTrigger: {
              // The page's bottom edge drives it; the footer itself is pinned, so it cannot be the trigger.
              trigger: page,
              start: 'bottom bottom',
              end: () => `+=${Math.round(hold() * 0.85)}`,
              scrub: true,
              invalidateOnRefresh: true,
              onRefreshInit: measure,
            },
          })
          return () => {
            observer?.disconnect()
            tween.scrollTrigger?.kill()
            tween.kill()
            delete el.dataset.pinned
            el.style.removeProperty('--footer-h')
            gsap.set(inner, { clearProps: 'all' })
          }
        }

        // iPhone and iPad: while the footer's top travels from the screen's bottom to its resting place, its
        // contents move down by the same distance, so on screen they stay put and the page uncovers them.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: () => `+=${hold()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        tl.fromTo(inner, { y: () => -hold() }, { y: 0, ease: 'none', duration: 1 }, 0).fromTo(
          inner,
          from,
          { ...to, ease: 'none', duration: 0.85 },
          0,
        )
        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
          gsap.set(inner, { clearProps: 'all' })
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <footer className={s.footer} data-band="dark" ref={ref}>
      <div className={s.reveal} data-reveal>
        <div className={s.upper}>
          <div className={s.backdrop} aria-hidden="true">
            <PixelField intensity={0.65} speed={0.6} />
          </div>
          <div className={cx('container', s.top)}>
            <div className={s.pitch}>
              {/* The full-colour logo on its own white card, so it reads true on the dark ground. */}
              <div className={s.logoCard}>
                <img src={logo} alt={site.name} className={s.logo} />
              </div>
              <div className={s.pitchText}>
                <h2 className={s.statement}>
                  Total peace of mind for <span className={s.statementHi}>every fleet</span>
                  <br className={s.statementBreak} /> on the road.
                </h2>
                <p className={s.tagline}>{site.tagline}</p>
              </div>
              {/* KRA approval on a frosted glass card under the statement: KRA's logo in white, and the
                  approval typed out slowly beside it. */}
              <Link
                to={kraVendor.to}
                className={s.kraGlass}
                aria-label={`${kraVendor.name}: approved by the ${kraVendor.issuer}`}
              >
                <img
                  src="/images/kra-white.svg"
                  alt=""
                  width={738}
                  height={224}
                  loading="lazy"
                  decoding="async"
                  className={s.kraLogo}
                />
                {/* A second, lighter glass layer for the statement, set on two lines. */}
                <span className={s.kraPanel}>
                  <TypingText
                    text={'We are a KRA-approved\nvendor for EAC RECTS.'}
                    speed={110}
                    hold={6000}
                    className={s.kraText}
                  />
                </span>
              </Link>
            </div>
            <div className={s.reach}>
              <CornerButton to={routes.contact} className={s.demo}>
                Get a demo
              </CornerButton>
              <a href={site.phoneHref} className={s.phone}>
                <span className={s.phoneCountry}>UG</span>
                {site.phone}
              </a>
              <a href={site.phoneKenyaHref} className={s.phone}>
                <span className={s.phoneCountry}>KE</span>
                {site.phoneKenya}
              </a>
              <a href={`mailto:${site.email}`} className={s.muted}>
                {site.email}
              </a>
            </div>
          </div>

          <div className={cx('container', s.grid)}>
            <nav className={s.col} aria-label="Products">
              <div className={s.colHeading}>Products</div>
              {pillars.map((p) => (
                <Link key={p.slug} to={p.to} className={cx(s.colLink, 'line-hover')}>
                  {p.name}
                </Link>
              ))}
              <Link to={routes.hardware} className={cx(s.colLink, 'line-hover')}>
                Hardware &amp; accessories
              </Link>
            </nav>

            <nav className={s.col} aria-label="Solutions">
              <div className={s.colHeading}>Solutions</div>
              {industriesA.slice(0, 5).map((industry) => (
                <Link key={industry.to} to={industry.to} className={cx(s.colLink, 'line-hover')}>
                  {industry.name}
                </Link>
              ))}
              <Link to={routes.solutions} className={cx(s.colLink, 'line-hover')}>
                All solutions
              </Link>
            </nav>

            <nav className={s.col} aria-label="Company">
              <div className={s.colHeading}>Company</div>
              {company.map((link) => (
                <Link key={link.to} to={link.to} className={cx(s.colLink, 'line-hover')}>
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className={s.col}>
              <div className={s.colHeading}>WhatsApp</div>
              {site.whatsapp.map((line) => (
                <SmartLink key={line.href} to={line.href} className={cx(s.colLink, 'line-hover')}>
                  {line.country} · <span className={s.number}>{line.label}</span>
                </SmartLink>
              ))}
              <span className={s.region}>{site.regions}</span>
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <div className={cx('container', s.legal)}>
            <div className={s.legalLeft}>
              <span>{site.copyright}</span>
              <Link to={routes.terms} className={cx(s.legalLink, 'line-hover')}>
                Terms of Service
              </Link>
              <Link to={routes.privacy} className={cx(s.legalLink, 'line-hover')}>
                Privacy Policy
              </Link>
            </div>
            <div className={s.social}>
              {site.social.map((item) => (
                <SmartLink key={item.name} to={item.href} className={cx(s.legalLink, 'line-hover')}>
                  {item.name}
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
