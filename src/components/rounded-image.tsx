import { cn } from '@/lib/shadcn-utils'
import type { ComponentProps } from 'react'

export function RoundedImage({ className, ...props }: ComponentProps<'img'>) {
  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden aspect-square',
        className
      )}
    >
      <img
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          width: '100%',
          height: '100%',
        }}
        {...props}
      />
    </div>
  )
}
