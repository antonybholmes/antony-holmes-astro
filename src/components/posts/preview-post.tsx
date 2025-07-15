import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

import { FormattedDate } from '@components/formatted-date'
import { CompactAvatars } from '@components/people/compact-avatars'
import { BaseCol } from '@layout/base-col'

import { getPostExcerpt } from '@/lib/post'
import { PostAuthors } from './hero-post-small'
import { PostImage } from './post-image'
import { PostSectionLink } from './post-section-link'
import { PostTitleLink } from './post-title-link'

interface IProps extends IPostProps {
  imgClassName?: string
  headerClassName?: string
  innerClassName?: string
  contentClassName?: string
  showSection?: boolean
  showDescription?: boolean
  showAvatar?: boolean
  showAvatarImage?: boolean
  dateBelow?: boolean
  showSectionLinks?: boolean
}

export function PreviewPost({
  post,
  className,
  imgClassName = 'rounded-lg h-72',
  headerClassName = 'text-2xl md:text-3xl',
  innerClassName,
  contentClassName = 'text-base',

  showDescription = true,
  showAvatar = true,
  showAvatarImage = true,
  dateBelow = false,
  showSectionLinks = true,
}: IProps) {
  const date = post.data.added

  //{post.data.description}

  return (
    <article className={cn('flex flex-col gap-y-4', className)}>
      {post.data.heroImage && (
        <PostImage post={post} className={imgClassName} />
      )}

      <BaseCol className={cn('gap-y-2', innerClassName)}>
        <BaseCol className="gap-y-1">
          {showSectionLinks && (
            <PostSectionLink post={post} textSize="text-xl md:text-base" />
          )}
          <PostTitleLink post={post} className={headerClassName} />
        </BaseCol>
        {showDescription && (
          <p
            className={cn('text-gray-500 dark:text-gray-400', contentClassName)}
          >
            {getPostExcerpt(post)}
          </p>
        )}

        {dateBelow ? (
          <>
            {showAvatar && (
              <CompactAvatars
                people={post.data.authors ?? []}
                showImages={showAvatarImage}
              />
            )}
            <FormattedDate date={date} />
          </>
        ) : (
          <PostAuthors post={post} showAvatar={showAvatar} />
        )}
      </BaseCol>
    </article>
  )
}
