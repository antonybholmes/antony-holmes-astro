import { cn } from '@/lib/shadcn-utils'
import type { IPostsProps } from './hero-posts'
import { RestPost } from './rest-post'

export function RestPosts({ posts, showSectionLinks = true }: IPostsProps) {
  return (
    <ul className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <li key={index}>
          <RestPost
            post={post}
            className={cn(index > 2 && 'pt-6 border-t border-border')}
            showSectionLinks={showSectionLinks}
          />
        </li>
      ))}
    </ul>
  )
}
