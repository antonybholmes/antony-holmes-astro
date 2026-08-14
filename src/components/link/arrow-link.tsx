import { IndexArrowIcon } from '@/components/icons/index-arrow-icon'
import { type ILinkProps } from '@interfaces/link-props'
import { cn } from '@lib/shadcn-utils'
import { useState } from 'react'
import { BaseLink } from './base-link'

export function ArrowLink({
  stroke = 'stroke-foreground',
  className,
  children,
  ...props
}: ILinkProps & { stroke?: string }) {
  const [hover, setHover] = useState<'initial' | 'on' | 'off'>('initial')

  return (
    <BaseLink
      className={cn(
        'inline-flex gap-x-1 flex-row items-center group',
        className
      )}
      onMouseEnter={() => {
        setHover('on')
      }}
      onMouseLeave={() => setHover('off')}
      {...props}
    >
      {children}

      <IndexArrowIcon className="w-4" stroke={stroke} hover={hover} />
    </BaseLink>
  )
}
