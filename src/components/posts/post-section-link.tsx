import { BLOG_SLUG, HEADING_FONT } from '@/consts'
import { sectionToSlug } from '@lib/post'
import { cn } from '@lib/shadcn-utils'
import type { IPostProps } from './post-tags'

interface IProps extends IPostProps {
  textSize?: string
}

export function PostSectionLink({
  post,
  textSize = 'text-base',
  className,
}: IProps) {
  if (!post.data.sections || post.data.sections.length === 0) {
    return null
  }

  // pick the first section
  const section = post.data.sections[0] //sectionToParts(post.data.sections?.[0] ?? 'Section')

  // convert the section to a name by taking the last part and formatting it
  const sectionName = section[section.length - 1]!

  // create the href for the post section link
  const href = `${BLOG_SLUG}/${sectionToSlug(section)}`

  return (
    <a
      href={href}
      aria-label={`Read more ${sectionName} posts`}
      title={`Read more ${sectionName} posts`}
      className={cn(
        'inline-block text-gradient font-medium',
        textSize,
        className
      )}
      style={{ fontFamily: HEADING_FONT }}
    >
      {sectionName}
    </a>
  )
}
