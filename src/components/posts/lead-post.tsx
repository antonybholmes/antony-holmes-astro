import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

import { BaseCol } from '@layout/base-col'

import { getPostExcerpt } from '@/lib/post'
import { PostAuthorsAndDate } from './hero-post-small'
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
  mode?: 'light' | 'dark'
}

export function LeadPost({
  post,
  className,
  imgClassName = 'aspect-video rounded-xl',
  headerClassName = 'text-xl md:text-3xl lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold',
  innerClassName,
  contentClassName = 'text-base',
  showDescription = true,
  showAvatar = true,
  showSectionLinks = true,
  mode = 'light',
}: IProps) {
  const date = post.data.added

  //{post.data.description}

  return (
    <article
      className={cn('grid grid-cols-1 lg:grid-cols-5 gap-8', className)}
      data-mode={mode}
    >
      {post.data.resolvedHero && (
        <PostImage
          post={post}
          className={cn('lg:hidden col-span-3', imgClassName)}
        />
      )}

      <BaseCol
        className={cn('gap-y-2 -translate-y-1 col-span-2', innerClassName)}
      >
        <BaseCol>
          {showSectionLinks && <PostSectionLink post={post} />}
          <PostTitleLink post={post} className={headerClassName} mode={mode} />
        </BaseCol>
        {showDescription && (
          <p
            data-mode={mode}
            className={cn(
              'text-foreground/50 data-[mode=dark]:text-white/50',
              contentClassName
            )}
          >
            {getPostExcerpt(post)}
          </p>
        )}

        <PostAuthorsAndDate post={post} showAvatar={showAvatar} mode={mode} />
      </BaseCol>

      {post.data.resolvedHero && (
        <PostImage
          post={post}
          className={cn('hidden lg:block col-span-3', imgClassName)}
        />
      )}
    </article>
  )
}
