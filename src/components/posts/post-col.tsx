import type { IPostsProps } from './hero-posts'

import type { IChildrenProps } from '@/interfaces/children-props'
import { cn } from '@/lib/shadcn-utils'
import { HeroPostSmall } from './hero-post-small'
import { PostSection } from './post-section'

interface IProps extends IPostsProps, IChildrenProps {
  title: string
  href?: string
  showTopSectionSeparator?: boolean
  maxPosts?: number
  showAvatar?: boolean
}

export function BasePostCol({
  posts,
  maxPosts = 3,
  showSectionLinks = true,
  showTopSectionSeparator = true,
  showAvatar = false,
  mode = 'light',
}: IProps) {
  return (
    <ul className="flex flex-col gap-y-6">
      {posts.slice(0, maxPosts).map((post, index) => {
        return (
          <li key={index}>
            <HeroPostSmall
              post={post}
              key={index}
              showSectionLinks={showSectionLinks}
              className={cn(
                'pb-6 border-b border-border data-[mode=dark]:border-white/50',
                showTopSectionSeparator && index === 0 && 'pt-6 border-t'
              )}
              showAvatar={showAvatar}
              mode={mode}
            />
          </li>
        )
      })}
    </ul>
  )
}

export function PostCol({
  title,
  href,
  posts,
  maxPosts = 3,
  showSectionLinks = true,
  showTopSectionSeparator = false,
  children,
}: IProps) {
  return (
    <PostSection title={title} href={href} headerChildren={children}>
      <BasePostCol
        title={title}
        posts={posts}
        maxPosts={maxPosts}
        showSectionLinks={showSectionLinks}
        showTopSectionSeparator={showTopSectionSeparator}
      />
    </PostSection>
  )
}
