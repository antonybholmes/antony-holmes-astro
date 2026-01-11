import { cn } from '@/lib/shadcn-utils'

import type { ColorMode } from '@/interfaces/color-mode'
import type { IDivProps } from '@interfaces/div-props'
import { Children } from 'react'
import { BaseCol } from './base-col'

export function ContentDiv({
  ref,
  className,
  contentCls,
  mode = 'light',
  children,
  ...props
}: IDivProps & { contentCls?: string; mode?: ColorMode }) {
  const c = Children.toArray(children)

  if (c.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      data-mode={mode}
      className={cn(
        'grid grid-cols-1 lg:grid-cols-4 px-4 lg:px-0 grow h-full',
        className
      )}
      {...props}
    >
      <BaseCol className="hidden h-full grow lg:flex">
        {c.length > 1 && c[0]}
      </BaseCol>
      <BaseCol className={cn('col-span-2 h-full grow', contentCls)}>
        {c.length > 1 ? c[1] : c[0]}
      </BaseCol>
      <BaseCol className="hidden h-full grow lg:flex">
        {c.length > 2 && c[2]}
      </BaseCol>
    </div>
  )
}
