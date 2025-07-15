import { BasePostImage } from './base-post-image'
import { HeroImageCaption } from './hero-image-caption'
import type { IPostProps } from './post-tags'

export function HeroImage({ post, className }: IPostProps) {
  return (
    <div className="group relative overflow-hidden rounded-md">
      <BasePostImage post={post} className={className} />
      {post.data.heroImageAlt && (
        <HeroImageCaption
          post={post}
          className="trans-500 opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </div>
  )
}
