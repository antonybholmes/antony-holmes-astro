import { ChevronRightIcon } from '@components/icons/chevron-right-icon'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/shadcn/ui/themed/dropdown-menu'
import { formatSection } from '@lib/post'

import type { IClassProps } from '@/interfaces/class-props'
import { useEffect, useState } from 'react'
import { PostCol } from './post-col'

interface IProps extends IClassProps {
  section: string
  href?: string
  postMap: Map<string, any[]>
}

export function PostSectionCol({ section, href, postMap }: IProps) {
  const [_section, setSection] = useState(section)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setSection(section)
  }, [section])

  const posts = postMap.get(_section)

  return (
    <PostCol
      title="Popular"
      href={href}
      posts={posts ?? []}
      page={0}
      pages={0}
      showSectionLinks={_section === 'All'}
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="flex flex-row items-center gap-x-1 text-sm">
          <span>{formatSection(_section)}</span>
          <ChevronRightIcon
            data-open={open}
            className="data-[open=false]:rotate-90 data-[open=true]:-rotate-90 transition-transform duration-500"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {[...postMap.keys()]
            .sort()
            .filter(s => !s.includes('/'))
            .map((s, si) => (
              <DropdownMenuCheckboxItem
                checked={s === _section}
                onCheckedChange={() => setSection(s)}
                key={si}
              >
                {formatSection(s)}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </PostCol>
  )
}
