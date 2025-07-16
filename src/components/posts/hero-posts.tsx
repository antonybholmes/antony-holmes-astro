import type { IClassProps } from '@/interfaces/class-props'

import type { IPost } from '@/lib/post'
import { HeroPost } from './hero-post'
import { BasePostCol } from './post-col'

export interface IPostsProps extends IClassProps {
  posts: IPost[]
  page?: number
  pages?: number
  showLatestPosts?: boolean
  showSectionLinks?: boolean
  root?: string
  mode?: 'light' | 'dark'
}

export function HeroPosts({
  posts,
  showSectionLinks = true,
  mode = 'light',
}: IPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  const topPost = posts[0]
  const topPosts = posts.slice(1, 4)

  return (
    <section
      id="hero-posts"
      className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-x-12 "
    >
      <HeroPost
        post={topPost}
        showSectionLinks={showSectionLinks}
        mode={mode}
      />

      <BasePostCol
        posts={topPosts}
        showTopSectionSeparator={false}
        showAvatar={false}
        showSectionLinks={showSectionLinks}
        mode={mode}
      />
    </section>
  )
}
