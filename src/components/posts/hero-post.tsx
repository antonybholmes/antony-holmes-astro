import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

import { BaseCol } from '@layout/base-col'

import { getPostExcerpt } from '@/lib/post'
import { PostAuthorsAndDate } from './hero-post-small'

import { useState } from 'react'
import { BasePostImage } from './base-post-image'
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
  imgClassName = 'aspect-video',
  headerClassName = 'text-xl md:text-3xl lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold',
  innerClassName,
  contentClassName = 'text-base',
  showDescription = true,
  showAvatar = true,
  showSectionLinks = true,
  mode = 'light',
}: IProps) {
  const date = post.data.added

  const [hover, setHover] = useState(false)

  return (
    <article
      className={cn(
        'flex flex-col data-[mode=light]:bg-muted/30 data-[mode=dark]:bg-white/5 rounded-xl overflow-hidden',
        className
      )}
      data-mode={mode}
    >
      {post.data.resolvedHero && (
        <BasePostImage
          post={post}
          className={imgClassName}
          data-hover={hover}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      )}

      <BaseCol
        className={cn('p-4', innerClassName)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {showSectionLinks && (
          <PostSectionLink
            post={post}
            onMouseEnter={() => setHover(false)}
            onMouseLeave={() => setHover(true)}
          />
        )}
        <BaseCol className="gap-y-2">
          <PostTitleLink
            post={post}
            className={headerClassName}
            mode={mode}
            data-hover={hover}
          />

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
        </BaseCol>

        <PostAuthorsAndDate
          post={post}
          showAvatar={showAvatar}
          mode={mode}
          onMouseEnter={() => setHover(false)}
          onMouseLeave={() => setHover(true)}
          className="pt-4"
        />
      </BaseCol>
    </article>
  )
}
