import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

export function HeroImageCaption({ post, className }: IPostProps) {
  return (
    <div
      className={cn(
        'absolute bottom-3 left-3 right-3 rounded-xl py-4 text-center text-xs font-medium text-white bg-black/20 backdrop-blur-md',
        className
      )}
    >
      {post.data.heroAlt || post.data.title}
    </div>
  )
}
