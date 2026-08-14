import type { IPostsProps } from './hero-posts'

import type { IChildrenProps } from '@/interfaces/children-props'
import { cn } from '@/lib/shadcn-utils'
import { HeroPostSmall } from './hero-post-small'
import { PostSection } from './post-section'

interface IProps extends IPostsProps, IChildrenProps {
  title: string
  href?: string
  maxPosts?: number
}

export function PostTwoCol({
  title,
  href,
  posts,
  maxPosts = 6,
  showSectionLinks = true,
  children,
}: IProps) {
  return (
    <PostSection title={title} href={href} headerChildren={children}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {posts.slice(0, maxPosts).map((post, index) => {
          return (
            <HeroPostSmall
              showBorder={index > 1}
              post={post}
              key={index}
              showSectionLinks={showSectionLinks}
              className={cn(
                'data-[mode=dark]:border-white/50'
                //index > 1 && 'pt-6 border-border border-t'
              )}
            />
          )
        })}
      </div>
    </PostSection>
  )
}
