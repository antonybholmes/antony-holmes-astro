import { cn } from '@lib/class-names'

import type { IDivProps } from '@interfaces/div-props'
import { Children } from 'react'
import { BaseCol } from './base-col'

export function SidebarDiv({ ref, className, children, ...props }: IDivProps) {
  const c = Children.toArray(children)

  if (c.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn('grid grid-cols-1 md:grid-cols-4 gap-8', className)}
      {...props}
    >
      <BaseCol className="col-span-3">{c[0]}</BaseCol>
      <aside className="hidden md:flex flex-col shrink-0">
        {c.length > 1 && c[1]}
      </aside>
    </div>
  )
}
