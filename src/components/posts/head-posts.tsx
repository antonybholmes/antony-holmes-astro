import { cn } from '@/lib/shadcn-utils'
import type { IPostsProps } from './hero-posts'
import { PreviewPost } from './preview-post'

interface IProps extends IPostsProps {
  showAvatar?: boolean
}

export default function HeadPosts({ posts, showAvatar = true }: IProps) {
  return (
    <section>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {posts.map((post, index) => (
          <li key={index}>
            <PreviewPost
              post={post}
              showAvatar={showAvatar}
              className={cn(
                'pb-8 border-b border-border',
                index < 2 && 'pt-8 border-t border-border'
              )}
              imgClassName="h-48 md:h-64 xl:h-72 rounded-md"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
