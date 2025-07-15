import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

import { BaseCol } from '@layout/base-col'

import { FormattedDate } from '@components/formatted-date'
import { CompactAvatars } from '@components/people/compact-avatars'
import { VCenterRow } from '@layout/v-center-row'

import { getPostExcerpt, type IPost } from '@/lib/post'
import { PostImage } from './post-image'
import { PostSectionLink } from './post-section-link'
import { PostTitleLink } from './post-title-link'

interface IProps extends IPostProps {
  showAvatar?: boolean
  showDescription?: boolean
}

export function HeroPostSmall({
  post,
  showAvatar = true,
  showDescription = true,
  className,
}: IProps) {
  const hasImage = Boolean(post.data.heroImage)

  return (
    <article
      className={cn(
        'grid grid-cols-1 gap-4 text-sm',
        hasImage && 'md:grid-cols-4',
        className
      )}
    >
      {post.data.heroImage && (
        <div className="col-span-1">
          <PostImage post={post} className="h-48 w-full md:h-32 rounded-md" />
        </div>
      )}
      <BaseCol className="col-span-3 gap-y-1">
        <BaseCol>
          <PostSectionLink post={post} textSize="text-xl md:text-base" />
          <PostTitleLink post={post} className="text-2xl lg:text-lg" />
        </BaseCol>
        {/* <CondComp cond={showDescription}>
          <HTML html={post.excerpt} className="text-sm text-gray-600" />
        </CondComp> */}

        {showDescription && (
          <p className="text-gray-500 dark:text-gray-400">
            {getPostExcerpt(post)}
          </p>
        )}

        <PostAuthors post={post} showAvatar={showAvatar} />
      </BaseCol>
    </article>
  )
}

export function PostAuthors({
  post,
  showAvatar = true,
}: {
  post: IPost
  showAvatar?: boolean
}) {
  return (
    <VCenterRow className="gap-x-2 mt-1 text-sm">
      {showAvatar && (
        <CompactAvatars people={post.data.authors ?? []} showImages={false} />
      )}
      <span className="rounded-full w-1 h-1 aspect-square shrink-0 grow-0 bg-foreground/30" />
      <FormattedDate date={post.data.added} />
    </VCenterRow>
  )
}
