import { cn } from '@/lib/shadcn-utils'
import type { IPostsProps } from './hero-posts'
import { PreviewPost } from './preview-post'

export default function RestPosts({ posts }: IPostsProps) {
  return (
    <section>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <li key={index}>
            <PreviewPost
              post={post}
              showAvatarImage={false}
              className={cn(
                'pb-8 border-b border-border',
                index < 3 && 'pt-8 border-t border-border'
              )}
              imgClassName="h-48 rounded-md"
              headerClassName="text-2xl"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
