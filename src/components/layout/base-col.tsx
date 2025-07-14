import { cn } from '@/lib/shadcn-utils'
import type { IDivProps } from '@interfaces/div-props'

export function BaseCol({ ref, className, children, ...props }: IDivProps) {
  return (
    <div ref={ref} className={cn('flex flex-col', className)} {...props}>
      {children}
    </div>
  )
}
