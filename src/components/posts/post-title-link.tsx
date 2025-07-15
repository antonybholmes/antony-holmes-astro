import { cn } from '@lib/shadcn-utils'

import { BaseLink } from '@components/link/base-link'

import { getPostUrl } from '@/lib/post'
import type { IPostProps } from './post-tags'

export function PostTitleLink({ post, className }: IPostProps) {
  return (
    <h2 className={cn('font-bold capitalize', className)}>
      <BaseLink
        href={getPostUrl(post)}
        aria-label={post.data.title}
        //data-underline={true}
        className=" hover:underline underline-offset-4 hover:decoration-blue-600"
      >
        {post.data.title}
      </BaseLink>
    </h2>
  )
}
