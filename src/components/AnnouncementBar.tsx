import { Link } from 'react-router-dom'
import { kraVendor } from '../data/content'
import s from './AnnouncementBar.module.css'

/** The green strip above the header carries the latest news: the KRA RECTS certification, with its lion. */
export default function AnnouncementBar() {
  return (
    <div className={s.bar}>
      <span className={s.text}>
        <span className={s.seal}>
          <img
            src={kraVendor.mark.src}
            alt=""
            width={kraVendor.mark.width}
            height={kraVendor.mark.height}
            decoding="async"
            className={s.mark}
          />
        </span>
        {kraVendor.announcement}
      </span>
      <Link to={kraVendor.to} className={s.link}>
        See our credentials <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
