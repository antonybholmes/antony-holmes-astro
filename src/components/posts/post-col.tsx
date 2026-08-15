import type { IPostsProps } from './hero-posts'

import type { IChildrenProps } from '@/interfaces/children-props'
import { HeroPostSmall } from './hero-post-small'
import { PostSection } from './post-section'

interface IProps extends IPostsProps, IChildrenProps {
  title: string
  href?: string
  showTopSectionSeparator?: boolean
  maxPosts?: number
  showAvatar?: boolean
  root?: string
}

export function BasePostCol({
  posts,
  maxPosts = 3,
  showSectionLinks = true,
  showAvatar = false,
  mode = 'light',
  root,
}: Omit<IProps, 'title'>) {
  return (
    <ul className="flex flex-col gap-y-8">
      {posts.slice(0, maxPosts).map((post, index) => {
        return (
          <li key={index}>
            <HeroPostSmall
              post={post}
              key={index}
              showBorder={index > 0}
              showSectionLinks={showSectionLinks}
              //className="border border-border/50 shadow-lg rounded-xl overflow-hidden"
              showAvatar={showAvatar}
              mode={mode}
              root={root}
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
  root,
  children,
}: IProps) {
  return (
    <PostSection title={title} href={href} headerChildren={children}>
      <BasePostCol
        posts={posts}
        maxPosts={maxPosts}
        showSectionLinks={showSectionLinks}
        showTopSectionSeparator={showTopSectionSeparator}
        root={root}
      />
    </PostSection>
  )
}
