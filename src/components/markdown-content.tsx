import { cn } from '@/lib/shadcn-utils'
import type { IDivProps } from '@interfaces/div-props'

export function MarkdownContent({
  ref,
  className,
  children,
  ...props
}: IDivProps) {
  return (
    <main ref={ref} className={cn('markdown', className)} {...props}>
      {children}
    </main>
  )
}
