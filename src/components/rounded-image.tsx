import { cn } from '@/lib/shadcn-utils'
import type { ComponentProps } from 'react'

export function RoundedImage({ className, ...props }: ComponentProps<'img'>) {
  if (!props.alt) {
    props.alt = props.title
  }

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden aspect-square shrink-0 grow-0',
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
