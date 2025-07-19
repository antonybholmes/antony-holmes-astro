import { BaseCol } from '../layout/base-col'
import { FeaturedPost } from './featured-post'
import type { IPostsProps } from './hero-posts'
import { RestPosts } from './rest-posts'

export function FeaturedPosts({ posts, showSectionLinks, mode }: IPostsProps) {
  const topPost = posts[0]
  const topPosts = posts.slice(1)

  return (
    <BaseCol className="gap-y-4">
      <FeaturedPost
        post={topPost}
        showSectionLinks={showSectionLinks}
        mode={mode}
      />

      <RestPosts
        posts={topPosts}
        showSectionLinks={showSectionLinks}
        mode={mode}
      />
    </BaseCol>
  )
}
