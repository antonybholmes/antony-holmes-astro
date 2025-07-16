import { HeroPost } from './hero-post'
import type { IPostProps } from './post-tags'

export function LatestPost({ post }: IPostProps) {
  return (
    <HeroPost post={post} showAvatarImage={false} headerClassName="text-3xl" />
  )
}
