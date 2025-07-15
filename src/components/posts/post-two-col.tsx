import type { IPostsProps } from './hero-posts'

import type { IChildrenProps } from '@/interfaces/children-props'
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
  maxPosts = 9,
  showSectionLinks = true,
  children,
}: IProps) {
  return (
    <PostSection title={title} href={href} headerChildren={children}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {posts.slice(0, maxPosts).map((post, index) => {
          return (
            <HeroPostSmall
              post={post}
              key={index}
              showSectionLinks={showSectionLinks}
              className="pb-6 border-b border-border"
            />
          )
        })}
      </div>
    </PostSection>
  )
}
