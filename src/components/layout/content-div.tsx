import { cn } from '@/lib/shadcn-utils'

import type { ColorMode } from '@/interfaces/color-mode'
import type { IDivProps } from '@interfaces/div-props'
import { Children } from 'react'
import { BaseCol } from './base-col'

export function ContentDiv({
  ref,
  className,
  padding = 'px-4',
  colCls = 'xl:w-3/5',
  contentCls,
  mode = 'light',
  children,
  ...props
}: IDivProps & {
  padding?: string
  colCls?: string
  contentCls?: string
  mode?: ColorMode
}) {
  const c = Children.toArray(children)

  if (c.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      data-mode={mode}
      className={cn('xl:px-0 grow w-full h-full', padding, className)}
      {...props}
    >
      {/* <BaseCol className="hidden h-full grow lg:flex">
        {c.length > 1 && c[0]}
      </BaseCol> */}
      <BaseCol className={cn('h-full mx-auto', colCls, contentCls)}>
        {c.length > 1 ? c[1] : c[0]}
      </BaseCol>
      {/* <BaseCol className="hidden h-full grow lg:flex">
        {c.length > 2 && c[2]}
      </BaseCol> */}
    </div>
  )
}
