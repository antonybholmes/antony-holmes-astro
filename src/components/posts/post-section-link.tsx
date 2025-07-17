import { BLOG_SLUG } from '@/consts'
import { getUrlFriendlyTag } from '@/lib/http/urls'
import { BaseLink } from '@components/link/base-link'
import { VCenterRow } from '@layout/v-center-row'
import { formatSection, sectionToParts } from '@lib/post'
import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

interface IProps extends IPostProps {
  textSize?: string
}

export function PostSectionLink({
  post,
  textSize = 'text-sm',
  className,
}: IProps) {
  // pick the first section
  const section = sectionToParts(post.data.sections?.[0] || 'Section')

  // convert the section to a name by taking the last part and formatting it
  const sectionName = formatSection(section[section.length - 1]!)

  // create a slug from the section
  const slug = getUrlFriendlyTag(post.data.sections?.[0] || 'section')

  // create the href for the post section link
  const href = `${BLOG_SLUG}/${slug}`

  return (
    <VCenterRow>
      <BaseLink
        href={href}
        aria-label={`Read more ${sectionName} posts`}
        title={`Read more ${sectionName} posts`}
        className={cn(
          'block bg-gradient-to-br from-violet-500 to-rose-500 bg-clip-text font-medium text-transparent',
          textSize,
          className
        )}
      >
        {sectionName}
      </BaseLink>
    </VCenterRow>
  )
}
