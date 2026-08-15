import { HEADING_FONT } from '@/consts'
import type { ILinkProps } from '@/interfaces/link-props'
import { sectionToSlug, type IPost } from '@lib/post'
import { cn } from '@lib/shadcn-utils'

interface IProps extends ILinkProps {
  post: IPost
  textSize?: string
  root?: string
}

export function PostSectionLink({
  post,
  textSize = 'text-base',
  className,
  root = '/',
  ...props
}: IProps) {
  if (!post.data.sections || post.data.sections.length === 0) {
    return null
  }

  // pick the first section
  const section = post.data.sections[0] //sectionToParts(post.data.sections?.[0] ?? 'Section')

  // convert the section to a name by taking the last part and formatting it
  const sectionName = section[section.length - 1]!

  // create the href for the post section link
  const href = `${root}/${sectionToSlug(section)}` //`${BLOG_SLUG}/${sectionToSlug(section)}`

  return (
    <a
      href={href}
      aria-label={`Read more ${sectionName} posts`}
      title={`Read more ${sectionName} posts`}
      className={cn(
        'text-gradient font-medium hover:underline',
        textSize,
        className
      )}
      style={{ fontFamily: HEADING_FONT }}
      {...props}
    >
      {sectionName}
    </a>
  )
}
