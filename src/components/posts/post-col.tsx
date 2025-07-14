import { BaseCol } from "@components/base-col"
import type { IPostsProps } from "./hero-posts"

import { HeroPostSmall } from "./hero-post-small"
import { PostSection } from "./post-section"

interface IProps extends IPostsProps {
  maxPosts?: number
}

export function PostCol({ title, posts, maxPosts = 3, children }: IProps) {
  return (
    <PostSection title={title} headerChildren={children}>
      <BaseCol className="gap-y-8">
        {posts.slice(0, maxPosts).map((post, index) => {
          return <HeroPostSmall post={post} key={index} />
        })}
      </BaseCol>
    </PostSection>
  )
}
