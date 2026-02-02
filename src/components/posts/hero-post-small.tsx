import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

import { BaseCol } from '@layout/base-col'

import { FormattedDate } from '@components/formatted-date'
import { CompactAvatars } from '@components/people/compact-avatars'

import type { ColorMode } from '@/interfaces/color-mode'
import { getPostExcerpt, type IPost } from '@/lib/post'
import { Circle } from 'lucide-react'

import type { IDivProps } from '@/interfaces/div-props'
import { useState } from 'react'
import { BasePostImage } from './base-post-image'
import { PostSectionLink } from './post-section-link'
import { PostTitleLink } from './post-title-link'

interface IProps extends IPostProps {
  showBorder?: boolean
  showAvatar?: boolean
  showAuthors?: boolean
  showDescription?: boolean
  showSectionLinks?: boolean
}

export function HeroPostSmall({
  post,
  showBorder = false,
  showAvatar = false,
  showAuthors = false,
  showDescription = true,
  showSectionLinks = false,
  mode = 'light',
  className,
}: IProps) {
  const hasImage = Boolean(post.data.resolvedHero)
  const [hover, setHover] = useState(false)

  return (
    <article
      id="hero-post-small"
      data-show-border={showBorder}
      data-mode={mode}
      className={cn(
        '  grid grid-cols-1 gap-y-4 data-[mode=dark]:text-white data-[show-border=true]:pt-6 data-[show-border=true]:border-border/50 data-[show-border=true]:border-t',
        hasImage && 'md:grid-cols-3 md:gap-x-5',
        className
      )}
    >
      {post.data.resolvedHero && (
        <BasePostImage
          post={post}
          className="col-span-1 aspect-video md:aspect-4/3 rounded-lg"
          data-hover={hover}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      )}
      <BaseCol
        className="col-span-2 gap-y-2 -translate-y-1"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <BaseCol>
          {showSectionLinks && (
            <PostSectionLink
              post={post}
              onMouseEnter={() => setHover(false)}
              onMouseLeave={() => setHover(true)}
            />
          )}
          <PostTitleLink
            post={post}
            className="text-xl font-semibold"
            mode={mode}
            data-hover={hover}
          />
        </BaseCol>

        {showDescription && (
          <p
            data-mode={mode}
            className="text-foreground/40 data-[mode=dark]:text-white/50 text-base"
          >
            {getPostExcerpt(post)}
          </p>
        )}

        <PostAuthorsAndDate
          post={post}
          showAuthors={showAuthors}
          showAvatar={showAvatar}
          mode={mode}
          onMouseEnter={() => setHover(false)}
          onMouseLeave={() => setHover(true)}
        />
      </BaseCol>
    </article>
  )
}

interface IPostAuthorsAndDate extends IDivProps {
  post: IPost
  showAuthors?: boolean
  showAvatar?: boolean
  mode?: ColorMode
}

export function PostAuthorsAndDate({
  post,
  showAuthors = true,
  showAvatar = true,
  mode = 'light',
  className,
  ...props
}: IPostAuthorsAndDate) {
  return (
    <div
      className={cn(
        'flex flex-row gap-x-2 gap-y-2 items-center text-sm',
        className
      )}
      {...props}
    >
      {showAuthors && (
        <>
          <CompactAvatars
            people={post.data.authors ?? []}
            showImages={showAvatar}
            mode={mode}
          />
          <Circle
            data-mode={mode}
            className="fill-foreground/50 data-[mode=dark]:fill-white/40"
            size={8}
          />
        </>
      )}

      <FormattedDate date={post.data.added} mode={mode} />
    </div>
  )
}
