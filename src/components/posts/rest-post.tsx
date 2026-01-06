import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

import { BaseCol } from '@layout/base-col'

import { FormattedDate } from '@components/formatted-date'
import { CompactAvatars } from '@components/people/compact-avatars'

import { getPostExcerpt, type IPost } from '@/lib/post'
import { PostImage } from './post-image'
import { PostSectionLink } from './post-section-link'
import { PostTitleLink } from './post-title-link'

interface IProps extends IPostProps {
  showAvatar?: boolean
  showAuthors?: boolean
  showDescription?: boolean
  showSectionLinks?: boolean
}

export function RestPost({
  post,
  showAvatar = false,
  showAuthors = false,
  showDescription = true,
  showSectionLinks = false,
  mode = 'light',
  className,
}: IProps) {
  return (
    <article
      data-mode={mode}
      className={cn(
        'group flex flex-col gap-y-4 data-[mode=dark]:text-white',
        className
      )}
    >
      {post.data.resolvedHero && (
        <PostImage post={post} className="aspect-video w-full rounded-xl" />
      )}
      <BaseCol className="gap-y-1">
        <BaseCol>
          {showSectionLinks && <PostSectionLink post={post} />}
          <PostTitleLink
            post={post}
            className="text-2xl lg:text-xl font-semibold"
            mode={mode}
          />
        </BaseCol>
        {/* <CondComp cond={showDescription}>
          <HTML html={post.excerpt} className="text-sm text-gray-600" />
        </CondComp> */}

        {showDescription && (
          <p
            data-mode={mode}
            className="text-foreground/70 data-[mode=dark]:text-white/50"
          >
            {getPostExcerpt(post)}
          </p>
        )}

        <PostAuthorsAndDate
          post={post}
          showAuthors={showAuthors}
          showAvatar={showAvatar}
          mode={mode}
        />
      </BaseCol>
    </article>
  )
}

export function PostAuthorsAndDate({
  post,
  showAuthors = true,
  showAvatar = true,
  mode = 'light',
}: {
  post: IPost
  showAuthors?: boolean
  showAvatar?: boolean
  mode?: 'light' | 'dark'
}) {
  return (
    <div className="flex flex-col xl:flex-row gap-x-2 gap-y-1 xl:items-center text-sm">
      {showAuthors && (
        <>
          <CompactAvatars
            people={post.data.authors ?? []}
            showImages={showAvatar}
            mode={mode}
          />
          <span
            data-mode={mode}
            className="hidden xl:block rounded-full w-1 h-1 aspect-square shrink-0 grow-0 bg-foreground/40 data-[mode=dark]:bg-white/40"
          />
        </>
      )}

      <FormattedDate date={post.data.added} mode={mode} />
    </div>
  )
}
