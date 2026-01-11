import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

import { BaseCol } from '@layout/base-col'

import type { ColorMode } from '@/interfaces/color-mode'
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
  mode?: ColorMode
}

export function FeaturedPost({
  post,
  className,
  imgClassName = 'rounded-2xl aspect-16/9 col-span-3',
  headerClassName = 'text-2xl md:text-3xl font-bold',
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
    <article className={cn('grid grid-cols-5 gap-4 group', className)}>
      <BaseCol className={cn('gap-y-2 col-span-2', innerClassName)}>
        <BaseCol className="gap-y-1">
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
        <PostImage post={post} className={imgClassName} />
      )}
    </article>
  )
}
