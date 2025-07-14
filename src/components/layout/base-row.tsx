import { cn } from '@/lib/shadcn-utils'
import { type IDivProps } from '@interfaces/div-props'

export const ROW_CLS = 'flex flex-row'

export function BaseRow({
  ref,
  selected,
  className,
  children,
  ...props
}: IDivProps) {
  return (
    <div
      ref={ref}
      className={cn(ROW_CLS, className)}
      data-checked={selected}
      {...props}
    >
      {children}
    </div>
  )
}
