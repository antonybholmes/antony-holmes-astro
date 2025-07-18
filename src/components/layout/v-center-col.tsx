import { cn } from '@/lib/shadcn-utils'
import { type IDivProps } from '@interfaces/div-props'
import { BaseCol } from './base-col'

export function VCenterCol({ ref, className, children, ...props }: IDivProps) {
  return (
    <BaseCol ref={ref} className={cn('justify-center', className)} {...props}>
      {children}
    </BaseCol>
  )
}
