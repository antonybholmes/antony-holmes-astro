import { cn } from '@lib/shadcn-utils'

import { BaseLink } from '@components/link/base-link'

import { getPostUrls } from '@/lib/post'
import type { IPostProps } from './post-tags'

const CLS = cn(
  'group-hover:underline decoration-2 underline-offset-4 group-hover:text-sky-500 group-hover:decoration-sky-500',
  'data-[mode=dark]:text-white data-[mode=dark]:group-hover:text-sky-400 data-[mode=dark]:group-hover:decoration-sky-400'
)

export function PostTitleLink({ post, mode = 'light', className }: IPostProps) {
  const urls = getPostUrls(post)

  return (
    <h2 className={cn('capitalize', className)}>
      <BaseLink
        href={urls[0]}
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
