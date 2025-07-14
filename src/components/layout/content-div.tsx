import { cn } from '@/lib/shadcn-utils'

import type { IDivProps } from '@interfaces/div-props'
import { Children } from 'react'
import { BaseCol } from './base-col'

export function ContentDiv({ ref, className, children, ...props }: IDivProps) {
  const c = Children.toArray(children)

  if (c.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn('grid grid-cols-1 md:grid-cols-5', className)}
      {...props}
    >
      <BaseCol className="hidden md:flex">{c.length > 1 && c[0]}</BaseCol>
      <BaseCol className="col-span-3">{c.length > 1 ? c[1] : c[0]}</BaseCol>
      <BaseCol className="hidden md:flex">{c.length > 2 && c[2]}</BaseCol>
    </div>
  )
}
