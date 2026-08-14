import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

import { BaseCol } from '@layout/base-col'

import { getPostExcerpt } from '@/lib/post'
import { useState } from 'react'
import { BasePostImage } from './base-post-image'
import { PostAuthorsAndDate } from './hero-post-small'
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
  const [hover, setHover] = useState(false)

  return (
    <article
      data-mode={mode}
      className={cn(
        'flex flex-col gap-y-4 data-[mode=dark]:text-white',
        className
      )}
    >
      {post.data.resolvedHero && (
        <BasePostImage
          post={post}
          className="aspect-video w-full rounded-xl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          data-hover={hover}
        />
      )}
      <BaseCol
        className="gap-y-2"
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
          onMouseEnter={() => setHover(false)}
          onMouseLeave={() => setHover(true)}
        />
      </BaseCol>
    </article>
  )
}

// export function PostAuthorsAndDate({
//   post,
//   showAuthors = true,
//   showAvatar = true,
//   mode = 'light',
// }: {
//   post: IPost
//   showAuthors?: boolean
//   showAvatar?: boolean
//   mode?: ColorMode
// }) {
//   return (
//     <div className="flex flex-col xl:flex-row gap-x-2 gap-y-1 xl:items-center text-sm">
//       {showAuthors && (
//         <>
//           <CompactAvatars
//             people={post.data.authors ?? []}
//             showImages={showAvatar}
//             mode={mode}
//           />
//           <span
//             data-mode={mode}
//             className="hidden xl:block rounded-full w-1 h-1 aspect-square shrink-0 grow-0 bg-foreground/40 data-[mode=dark]:bg-white/40"
//           />
//         </>
//       )}

//       <FormattedDate date={post.data.added} mode={mode} />
//     </div>
//   )
// }
