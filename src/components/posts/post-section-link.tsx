import { BLOG_HOME_SLUG, HEADING_FONT, type SlugPath } from '@/consts'
import type { ILinkProps } from '@/interfaces/link-props'
import { postSectionToSlug, type IPost } from '@/lib/post/post'
import { slugPathToSlug } from '@/lib/post/slug'
import { cn } from '@lib/shadcn-utils'

interface IProps extends ILinkProps {
  post: IPost
  textSize?: string
  root?: SlugPath
}

export function PostSectionLink({
  post,
  textSize = 'text-base',
  className,
  root = BLOG_HOME_SLUG, // default to the home path if not provided
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
  const href = `${slugPathToSlug(root)}/${postSectionToSlug(post)}`

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
