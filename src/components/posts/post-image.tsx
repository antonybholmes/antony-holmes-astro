import { BasePostImage } from './base-post-image'
import type { IPostProps } from './post-tags'

interface IProps extends IPostProps {
  imgClassName?: string
}

export function PostImage({ post, imgClassName, className }: IProps) {
  return (
    <BasePostImage
      post={post}
      imgClassName={imgClassName}
      className={className}
    />
  )
}
