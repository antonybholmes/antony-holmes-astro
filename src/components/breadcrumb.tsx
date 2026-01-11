import type { ReactNode } from 'react'

import type { IClassProps } from '@/interfaces/class-props'
import type { ColorMode } from '@/interfaces/color-mode'
import { cn } from '@/lib/shadcn-utils'
import type { ICrumb } from '@lib/crumbs'
import { BaseLink } from './link/base-link'
import { ThemeLink } from './link/theme-link'

const LINK_CLS = 'trans-color text-primary-color/60 hover:text-primary-color'

interface BreadcrumbProps extends IClassProps {
  crumbs: ICrumb[]
  showHome?: boolean
  mode?: ColorMode
}

export function Breadcrumb({
  crumbs,
  showHome = false,
  mode = 'light',
  className,
}: BreadcrumbProps) {
  if (!crumbs) {
    return null
  }

  const ret: ReactNode[] = []

  if (showHome) {
    ret.push(
      <li key="home">
        {/* <BaseLink
        href="/"
        aria-label="Home"
        className="trans-300 transition-color fill-primary-color/60 hover:fill-primary-color dark:fill-sky-400 dark:hover:fill-white"
      >
        <HomeIcon w="w-4" />
      </BaseLink> */}
        <BaseLink
          href="/"
          aria-label="Home"
          data-mode={mode}
          className="data-[mode=dark]:text-white"
        >
          Home
        </BaseLink>
      </li>
    )
  }
  // ret.push(<li key={`crumb-${ret.length}`}>{getCrumbLink(["Home", "/"], mode)}</li>)

  for (let i = 0; i < crumbs.length; ++i) {
    const crumb = crumbs[i]!

    if (showHome || i > 0) {
      ret.push(
        <li
          key={`divider-${i}`}
          className="text-foreground/50 data-[mode=dark]:text-white/50"
          data-mode={mode}
        >
          /
        </li>
      )
    }

    ret.push(
      <li key={`crumb-${i}`}>
        <ThemeLink
          href={crumb.path}
          aria-label={`Goto ${crumb.label}`}
          data-mode={mode}
          startingColor="text-foreground"
          className="data-[mode=dark]:text-white"
        >
          {crumb.label}
        </ThemeLink>
      </li>
    )
  }

  return (
    <ul
      className={cn(
        'flex flex-row flex-nowrap items-center gap-x-3 text-sm',
        className
      )}
    >
      {ret}
    </ul>
  )
}
