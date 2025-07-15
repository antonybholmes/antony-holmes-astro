import { cn } from '@lib/shadcn-utils'

import { BaseLink } from '@components/link/base-link'

import { getPostUrl } from '@/lib/post'
import type { IPostProps } from './post-tags'

const CLS = cn(
  'hover:underline decoration-2 underline-offset-4 hover:text-sky-700 hover:decoration-sky-700',
  'data-[mode=dark]:text-white data-[mode=dark]:hover:text-sky-400 data-[mode=dark]:hover:decoration-sky-400'
)

export function PostTitleLink({ post, mode = 'light', className }: IPostProps) {
  return (
    <h2 className={cn('font-bold capitalize', className)}>
      <BaseLink
        href={getPostUrl(post)}
        aria-label={post.data.title}
        //data-underline={true}
        data-mode={mode}
        className={CLS}
      >
        {post.data.title}
      </BaseLink>
    </h2>
  )
}
