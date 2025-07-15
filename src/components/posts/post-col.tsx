import { BaseCol } from '@layout/base-col'
import type { IPostsProps } from './hero-posts'

import type { IChildrenProps } from '@/interfaces/children-props'
import { HeroPostSmall } from './hero-post-small'
import { PostSection } from './post-section'

interface IProps extends IPostsProps, IChildrenProps {
  title: string
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
