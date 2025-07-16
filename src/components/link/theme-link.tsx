import { cn } from '@/lib/shadcn-utils'
import { FOCUS_RING_CLS } from '@/theme'
import { type ILinkProps } from '@interfaces/link-props'
import { BaseLink } from './base-link'

export const BASE_THEME_LINK_CLS = FOCUS_RING_CLS

interface IThemeLinkProps extends ILinkProps {
  startingColor?: string
  endingColor?: string
}

export function ThemeLink({
  ref,
  startingColor = 'text-foreground',
  endingColor = 'text-theme',
  className,
  children,
  ...props
}: IThemeLinkProps) {
  return (
    <BaseLink
      ref={ref}
      startingColor={startingColor}
      endingColor={endingColor}
      className={cn(BASE_THEME_LINK_CLS, className)}
      {...props}
    >
      {children}
    </BaseLink>
  )
}
