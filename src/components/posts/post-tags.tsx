import type { IClassProps } from '@/interfaces/class-props'
import type { IPost } from '@/lib/post'
import { PostTagLink } from './post-tag-link'

export interface IPostProps extends IClassProps {
  post: IPost
  mode?: 'light' | 'dark'
}

export function PostTags({ post }: IPostProps) {
  return (
    <ul className="flex flex-row flex-wrap gap-1.5">
      {(post.data.tags ?? [])
        .sort()
        .map((tag: string) => tag.trim())
        .map((tag: string, index: number) => {
          return (
            <li key={index}>
              <PostTagLink tag={tag} />
            </li>
          )
        })}
    </ul>
  )
}
