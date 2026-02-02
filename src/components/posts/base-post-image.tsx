import type { ColorMode } from '@/interfaces/color-mode'
import { getPostUrls, type IPost } from '@/lib/post'
import { cn } from '@lib/shadcn-utils'
import type { ComponentProps } from 'react'

export interface IPostImageProps extends ComponentProps<'a'> {
  post: IPost
  mode?: ColorMode
  imgClassName?: string
}

export function BasePostImage({
  post,
  imgClassName,
  className,
  ...props
}: IPostImageProps) {
  const urls = getPostUrls(post)

  return (
    <a
      href={urls[0]}
      aria-label={post.data.title}
      className={cn('overflow-hidden block z-10 group', className)}
      {...props}
    >
      <img
        src={post.data.resolvedHero}
        alt={post.data.heroAlt || post.data.title}
        //title={post.data.title}
        className={cn(
          'scale-102 group-hover:scale-105 group-data-[hover=true]:scale-105 z-0 duration-500 ease-in-out transition-transform w-full h-full object-cover object-center',
          imgClassName
        )}
      />
    </a>
  )
}
