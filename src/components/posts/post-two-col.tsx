import type { IPostsProps } from './hero-posts'

import type { IChildrenProps } from '@/interfaces/children-props'
import { HeroPostSmall } from './hero-post-small'
import { PostSection } from './post-section'

interface IProps extends IPostsProps, IChildrenProps {
  title: string
  maxPosts?: number
}

export function PostTwoCol({ title, posts, maxPosts = 9, children }: IProps) {
  return (
    <PostSection title={title} headerChildren={children}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {posts.slice(0, maxPosts).map((post, index) => {
          return <HeroPostSmall post={post} key={index} />
        })}
      </div>
    </PostSection>
  )
}
