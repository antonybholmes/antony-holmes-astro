import { BaseLink } from '@components/link/base-link'

import { getPostUrl } from '@lib/post'
import { BasePostImage } from './base-post-image'
import type { IPostProps } from './post-tags'

interface IProps extends IPostProps {
  imgClassName?: string
}

export function PostImage({ post, imgClassName, className }: IProps) {
  const image = (
    <BasePostImage
      post={post}
      imgClassName={imgClassName}
      className={className}
    />
  )

  return (
    <BaseLink href={getPostUrl(post)} aria-label={post.data.title}>
      {image}
    </BaseLink>
  )
}
