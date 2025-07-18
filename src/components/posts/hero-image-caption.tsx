import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

export function HeroImageCaption({ post, className }: IPostProps) {
  return (
    <div
      className={cn(
        'absolute bottom-0 w-full py-3 text-center text-xs text-white bg-black/50',
        className
      )}
    >
      {post.data.heroAlt || post.data.title}
    </div>
  )
}
