import { Link } from 'react-router-dom'
import { award, demoBenefits } from '../../data/content'
import { img } from '../../data/images'
import { anchors } from '../../data/site'
import { cx } from '../../lib/cx'
import DemoForm from '../DemoForm'
import Media from '../Media'
import Reveal from '../Reveal'
import s from './DemoSection.module.css'

export default function DemoSection() {
  return (
    <section className={s.section} id={anchors.demo}>
      <Reveal stagger className={cx('container', s.grid)}>
        <div className={s.copy}>
          <div className="eyebrow eyebrow--rule">Connect with us</div>
          <h2 className={s.title}>We'd love to show you around.</h2>
          <p className={s.intro}>With Smartwatch you can:</p>
          <ul className="checklist checklist--lg">
            {demoBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <div className={s.awards}>
            <div className={s.awardsLabel}>Awards &amp; accreditation</div>
            <div className={s.awardTiles}>
              <Link to={award.to} className={s.awardTile} aria-label={award.name}>
                <Media image={award.image} radius={12} decorative className={s.awardImage} />
              </Link>
              <Link
                to={award.to}
                className={cx(s.awardTile, s.awardTileWide)}
                aria-label="Uganda Manufacturers Association Certificate of Appreciation"
              >
                <img
                  src={img.umaCertificate.src}
                  width={img.umaCertificate.width}
                  height={img.umaCertificate.height}
                  alt=""
                  loading="lazy"
                  className={s.awardCert}
                />
              </Link>
            </div>
          </div>
        </div>
        <DemoForm />
      </Reveal>
    </section>
  )
}
