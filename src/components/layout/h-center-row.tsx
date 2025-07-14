import { cn } from '@/lib/shadcn-utils'
import { type IDivProps } from '@interfaces/div-props'
import { BaseRow } from './base-row'

export function HCenterRow({ ref, className, children, ...props }: IDivProps) {
  return (
    <BaseRow ref={ref} className={cn('justify-center', className)} {...props}>
      {children}
    </BaseRow>
  )
}
