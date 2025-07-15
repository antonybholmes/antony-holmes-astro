import { cn } from '@/lib/shadcn-utils'
import { HeroPostSmall } from './hero-post-small'
import type { IPostsProps } from './hero-posts'

export function RestPosts({ posts }: IPostsProps) {
  return (
    <section>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <li key={index}>
            <HeroPostSmall
              post={post}
              className={cn(
                'pb-6 border-b border-border',
                index < 3 && 'pt-6 border-t border-border'
              )}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
