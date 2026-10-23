import type { CSSProperties, ReactNode } from 'react'
import type { Img, Video } from '../data/types'
import { cx } from '../lib/cx'
import Placeholder from './Placeholder'
import s from './Media.module.css'

type Props = {
  image?: Img
  /** A muted, looping clip; takes the slot over `image`. */
  video?: Video
  /** Placeholder label used when no image exists yet. */
  label?: string
  ratio?: string
  radius?: number
  dark?: boolean
  priority?: boolean
  /** True when the surrounding text already describes the image (e.g. inside a linked card). */
  decorative?: boolean
  /** Placeholder stripe width in px. */
  stripe?: number
  className?: string
  children?: ReactNode
}

/** Renders a real image with reserved dimensions, a muted looping video, or the design's striped placeholder. */
export default function Media({
  image,
  video,
  label = 'image coming soon',
  ratio,
  radius = 20,
  dark = false,
  priority = false,
  decorative = false,
  stripe,
  className,
  children,
}: Props) {
  const style = { aspectRatio: ratio, borderRadius: radius } as CSSProperties
  if (video) {
    return (
      <div className={cx(s.frame, ratio && s.cover, className)} style={style}>
        <video
          className={s.img}
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={decorative ? undefined : video.alt}
        />
        {children}
      </div>
    )
  }
  if (!image) {
    return (
      <Placeholder label={label} ratio={ratio} radius={radius} dark={dark} stripe={stripe} className={className}>
        {children}
      </Placeholder>
    )
  }
  const contain = image.fit === 'contain'
  return (
    <div className={cx(s.frame, ratio && s.cover, contain && s.contain, className)} style={style}>
      <img
        src={image.src}
        alt={decorative ? '' : image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={s.img}
        style={image.focus ? { objectPosition: image.focus } : undefined}
      />
      {children}
    </div>
  )
}
