import { BASE_COMPONENT_CLS } from '@/theme'
import { type ILinkProps } from '@interfaces/link-props'

import { cn } from '@/lib/shadcn-utils'

export const UNDERLINE_CLS =
  'data-[underline=true]:underline data-[underline=hover]:hover:underline data-[underline=false]:decoration-transparent'

const LINK_CLS = cn(BASE_COMPONENT_CLS, UNDERLINE_CLS)

export const BLANK_TARGET = '_blank'

export function BaseLink({
  ref,
  title,
  href = '',
  startingColor,
  endingColor,
  selected = false,
  underline = 'hover',
  target,
  className,
  children,
  ...props
}: ILinkProps) {
  if (!endingColor) {
    endingColor = startingColor
  }

  if (endingColor) {
    endingColor = `hover:${endingColor}`
  }

  if (!props['aria-label']) {
    if (title) {
      props['aria-label'] = title
    } else {
      props['aria-label'] = `Click to visit ${href}`
    }
  }

  // External links open in new windows, app urls do not.
  const isExt = href.startsWith('http') || href.startsWith('www')

  if (isExt && !target) {
    target = BLANK_TARGET
  }

  return (
    <a
      ref={ref}
      href={href}
      title={title}
      data-checked={selected}
      data-underline={underline}
      className={cn(LINK_CLS, startingColor, endingColor, className)}
      target={target}
      {...props}
    >
      {children}
    </a>
  )
}
