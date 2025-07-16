import type { IPostsProps } from './hero-posts'

import { HeroPost } from './hero-post'

export function LatestPosts({ posts }: IPostsProps) {
  return (
    <section className="mt-8">
      <p>Latest Posts</p>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {posts.slice(0, 4).map((post, index) => {
          return <HeroPost post={post} key={index} />
        })}
      </div>
    </section>
  )
}
