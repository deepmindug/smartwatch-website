import { Link } from 'react-router-dom'
import { featuredPost, posts } from '../../data/content'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import Media from '../Media'
import Reveal from '../Reveal'
import s from './Resources.module.css'

export default function Resources() {
  return (
    <Reveal as="section" className={cx('container', s.section)}>
      <div className={s.head}>
        <h2 className="h-section">Discover what's new with Smartwatch.</h2>
        <Link to={routes.products} className="link-arrow">
          View all resources →
        </Link>
      </div>
      <div className={s.grid}>
        <Link to={featuredPost.to} className={s.feature}>
          <Media image={featuredPost.image} ratio="16 / 9" radius={0} decorative className={s.featureMedia} />
          <div className={s.featureBody}>
            <div className="eyebrow eyebrow--chip">{featuredPost.kind}</div>
            <div className={s.featureTitle}>{featuredPost.title}</div>
            <div className={s.featureText}>{featuredPost.body}</div>
            <span className="link-arrow link-arrow--sm">Learn more →</span>
          </div>
        </Link>
        <div className={s.list}>
          {posts.map((post) => (
            <Link key={post.title} to={post.to} className={s.post}>
              <Media
                image={post.image}
                label="image coming soon"
                ratio="4 / 3"
                radius={12}
                stripe={8}
                decorative
                className={s.thumb}
              />
              <div className={s.postBody}>
                <div className={s.kind}>{post.kind}</div>
                <div className={s.postTitle}>{post.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
