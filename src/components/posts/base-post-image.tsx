import { VCenterRow } from '@layout/v-center-row'
import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

interface IProps extends IPostProps {
  imgClassName?: string
}

export function BasePostImage({ post, imgClassName, className }: IProps) {
  return (
    <VCenterRow
      className={cn('overflow-hidden justify-center z-10', className)}
    >
      <img
        src={post.data.hero}
        alt={post.data.heroAlt || post.data.title}
        //title={post.data.title}
        className={cn(
          'scale-102 hover:scale-103 z-0 transition-300 transition-transform w-full h-full ease-linear object-cover',
          imgClassName
        )}
      />
    </VCenterRow>
  )
}
