import { getPostUrl } from '@/lib/post'
import { VCenterRow } from '@layout/v-center-row'
import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

interface IProps extends IPostProps {
  imgClassName?: string
}

export function BasePostImage({ post, imgClassName, className }: IProps) {
  return (
    <VCenterRow
      className={cn('overflow-hidden justify-center z-10 group', className)}
    >
      <a href={getPostUrl(post)} aria-label={post.data.title}>
        <img
          src={post.data.resolvedHero}
          alt={post.data.heroAlt || post.data.title}
          //title={post.data.title}
          className={cn(
            'scale-102 group-hover:scale-105 z-0 duration-500 ease-in-out transition-transform w-full h-full object-cover object-center',
            imgClassName
          )}
        />
      </a>
    </VCenterRow>
  )
}
