import type { IElementProps } from "@interfaces/element-props"

import { ChevronRightIcon } from "@components/icons/chevron-right-icon"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@components/shadcn/ui/themed/dropdown-menu"
import { formatSection } from "@lib/post"

import { useEffect, useState } from "react"
import { PostCol } from "./post-col"

interface IProps extends IElementProps {
  section: string
  postMap: Map<string, any[]>
}

export function PostCategoryCol({ section, postMap }: IProps) {
  const [_section, setSection] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setSection(section)
  }, [section])

  const posts = postMap.get(_section)

  return (
    <PostCol
      title={formatSection(_section)}
      posts={posts ?? []}
      page={0}
      pages={0}
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="flex flex-row items-center gap-x-1 text-xs">
          <span>All categories</span>
          <ChevronRightIcon
            data-open={open}
            className="data-[open=false]:rotate-90 data-[open=true]:-rotate-90 transition-all trans-500"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {[...postMap.keys()].sort().map((s, si) => (
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
