import { cn } from '@/lib/shadcn-utils'
import { HeroPostSmall } from './hero-post-small'
import type { IPostsProps } from './hero-posts'

interface IProps extends IPostsProps {
  showAvatar?: boolean
}

export function HeadPosts({ posts, showAvatar = false }: IProps) {
  return (
    <section>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
        {posts.map((post, index) => (
          <li key={index}>
            <HeroPostSmall
              post={post}
              showAvatar={showAvatar}
              className={cn(
                'pb-6 border-b border-border',
                index < 2 && 'pt-6 border-t border-border'
              )}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
