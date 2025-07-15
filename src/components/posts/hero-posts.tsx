import type { IClassProps } from '@/interfaces/class-props'

import type { IPost } from '@/lib/post'
import { BasePostCol } from './post-col'
import { PreviewPost } from './preview-post'

export interface IPostsProps extends IClassProps {
  posts: IPost[]
  page?: number
  pages?: number
  showLatestPosts?: boolean
  showSectionLinks?: boolean
  root?: string
}

export function HeroPosts({ posts, showSectionLinks }: IPostsProps) {
  const topPost = posts[0]
  const topPosts = posts.slice(1, 4)

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-x-12">
      <PreviewPost post={topPost} showSectionLinks={showSectionLinks} />

      <BasePostCol title={''} posts={topPosts} />
    </section>
  )
}
