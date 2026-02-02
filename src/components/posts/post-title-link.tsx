import { cn } from '@lib/shadcn-utils'

import { BaseLink } from '@components/link/base-link'

import type { ColorMode } from '@/interfaces/color-mode'
import type { ILinkProps } from '@/interfaces/link-props'
import { getPostUrls, type IPost } from '@/lib/post'

const CLS = `group-hover:underline underline-offset-4 
  hover:text-sky-500 hover:decoration-sky-500
  group-hover:text-sky-500 group-hover:decoration-sky-500
  data-[hover=true]:underline data-[hover=true]:text-sky-500 data-[hover=true]:decoration-sky-500
  data-[mode=dark]:text-white  
  data-[mode=dark]:group-hover:text-sky-500 data-[mode=dark]:group-hover:decoration-sky-500
  data-[mode=dark]:data-[hover=true]:text-sky-500 data-[mode=dark]:data-[hover=true]:decoration-sky-500`

interface IPostTitleLink extends ILinkProps {
  post: IPost
  mode?: ColorMode
}

export function PostTitleLink({
  post,
  mode = 'light',
  className,
  ...props
}: IPostTitleLink) {
  const urls = getPostUrls(post)

  return (
    <h2 className={cn('capitalize', className)}>
      <BaseLink
        href={urls[0]}
        aria-label={post.data.title}
        //data-underline={true}
        data-mode={mode}
        className={CLS}
        {...props}
      >
        {post.data.title}
      </BaseLink>
    </h2>
  )
}
