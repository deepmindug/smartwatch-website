import CargoSpotlight from '../components/home/CargoSpotlight'
import Customers from '../components/home/Customers'
import DemoSection from '../components/home/DemoSection'
import Hero from '../components/home/Hero'
import IndustriesStrip from '../components/home/IndustriesStrip'
import PlatformPillars from '../components/home/PlatformPillars'
import Resources from '../components/home/Resources'
import Stats from '../components/home/Stats'
import WhySmartwatch from '../components/home/WhySmartwatch'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import s from './HomePage.module.css'

export default function HomePage() {
  usePageMeta({
    description:
      'Smartwatch Solutions: fleet and mobile asset management for East Africa since 2011. Cargo Tracking with electronic locks, plus tracking, telematics, dash cameras, compliance and maintenance on one platform.',
  })
  return (
    <div className={s.home}>
      <Hero />
      <PlatformPillars />
      <CargoSpotlight />
      <Customers />
      <Stats />
      <WhySmartwatch />
      <IndustriesStrip />
      <Resources />
      <DemoSection />
      <div className={s.disclaimer}>
        <div className="container">{site.disclaimer}</div>
      </div>
    </div>
  )
}
