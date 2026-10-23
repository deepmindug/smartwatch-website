import { useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { HEADER_OFFSET, ScrollTrigger } from '../motion/gsap'
import Footer from './Footer'
import Header from './Header'
import WhatsAppButton from './WhatsAppButton'
import s from './Layout.module.css'

/** Jumps to the top on route change, or to the hash target, then lets ScrollTrigger re-measure. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      const id = setTimeout(() => {
        if (lenis) lenis.scrollTo(hash, { offset: -HEADER_OFFSET })
        else document.querySelector(hash)?.scrollIntoView()
        ScrollTrigger.refresh()
      }, 0)
      return () => clearTimeout(id)
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    const id = setTimeout(() => ScrollTrigger.refresh(), 0)
    return () => clearTimeout(id)
  }, [pathname, hash, lenis])

  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <ScrollManager />
      <Header />
      <main className={s.main} data-band="light">
        <Outlet />
      </main>
      <WhatsAppButton key={pathname} />
      <Footer />
    </>
  )
}
