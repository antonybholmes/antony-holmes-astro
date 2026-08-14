import { BLOG_SLUG } from '@/consts'
import type { IClassProps } from '@/interfaces/class-props'
import { getUrlFriendlyTag } from '@/lib/http/urls'
import { cn } from '@/lib/shadcn-utils'
import { ThemeLink } from './link/theme-link'

export function SideTags({
  tags = [],
  className,
}: IClassProps & { tags?: string[] | undefined }) {
  return (
    <ul
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 text-xs',
        className
      )}
    >
      {tags.map(tag => {
        const t = getUrlFriendlyTag(tag)

        return (
          <li
            className="border-border/50 hover:border-border trans-color rounded-full border px-3 py-1.5"
            key={t}
          >
            <ThemeLink
              startingColor="text-foreground"
              endingColor="text-theme"
              href={`${BLOG_SLUG}/tag/${t}`}
            >
              {tag}
            </ThemeLink>
          </li>
        )
      })}
    </ul>
  )
}
