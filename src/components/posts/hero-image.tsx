import { cn } from '@/lib/shadcn-utils'
import { BasePostImage } from './base-post-image'
import { HeroImageCaption } from './hero-image-caption'
import type { IPostProps } from './post-tags'

export function HeroImage({ post, className }: IPostProps) {
  return (
    <div className={cn('group relative overflow-hidden', className)}>
      <BasePostImage post={post} />
      {post.data.heroAlt && (
        <HeroImageCaption
          post={post}
          className="trans-500 opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </div>
  )
}
