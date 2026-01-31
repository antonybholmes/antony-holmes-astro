import { cn } from '@/lib/shadcn-utils'
import type { IPostsProps } from './hero-posts'
import { RestPost } from './rest-post'

export function TopPosts({
  posts,
  showSectionLinks = true,
  className,
}: IPostsProps) {
  return (
    <>
      <ul className={cn('grid md:hidden gap-12 grid-cols-1', className)}>
        {posts.map((post, index) => (
          <li key={index}>
            <RestPost
              post={post}
              className={cn(index > 0 && 'pt-6 border-t border-border/50')}
              showSectionLinks={showSectionLinks}
            />
          </li>
        ))}
      </ul>
      <ul className={cn('hidden md:grid gap-12 grid-cols-2', className)}>
        {posts.map((post, index) => (
          <li key={index}>
            <RestPost
              post={post}
              className={cn(index > 1 && 'pt-6 border-t border-border/50')}
              showSectionLinks={showSectionLinks}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
