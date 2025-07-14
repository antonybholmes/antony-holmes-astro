import type { IPostsProps } from "./hero-posts"
import { PreviewPost } from "./preview-post"

interface IProps extends IPostsProps {
  showAvatar?: boolean
}

export default function HeadPosts({ posts, showAvatar = true }: IProps) {
  return (
    <section>
      <ul className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {posts.map((post, index) => (
          <li key={index}>
            <PreviewPost
              post={post}
              showAvatar={showAvatar}
              className="border-t-2 border-border pt-6"
              imgClassName="h-48 md:h-64 xl:h-72 rounded-md"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
