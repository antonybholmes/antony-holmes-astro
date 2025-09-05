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

export function HeroPost({
  post,
  className,
  imgClassName = ' aspect-16/9',
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
    <article
      className={cn(
        'flex flex-col gap-y-4 group pb-6 bg-muted/30 rounded-2xl overflow-hidden h-full',
        className
      )}
    >
      {post.data.resolvedHero && (
        <PostImage post={post} className={imgClassName} />
      )}

      <BaseCol className={cn('gap-y-2 px-4', innerClassName)}>
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
    </article>
  )
}
