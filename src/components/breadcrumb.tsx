import type { ReactNode } from 'react'

import type { IClassProps } from '@/interfaces/class-props'
import { cn } from '@/lib/shadcn-utils'
import { ChevronRightIcon } from '@components/icons/chevron-right-icon'
import type { ICrumb } from '@lib/crumbs'
import { BaseLink } from './link/base-link'

const LINK_CLS = 'trans-color text-primary-color/60 hover:text-primary-color'

interface BreadcrumbProps extends IClassProps {
  crumbs: ICrumb[]
  showHome?: boolean
}

export function Breadcrumb({
  crumbs,
  showHome = false,
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
        <BaseLink href="/" aria-label="Home" className={LINK_CLS}>
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
        <li key={`divider-${i}`}>
          <ChevronRightIcon
            w="w-3"
            //className="trans-300 transition-all stroke-primary-color/60 group-hover:translate-x-0.5 group-hover:stroke-primary-color dark:group-hover:stroke-white"
          />
        </li>
      )
    }

    ret.push(
      <li key={`crumb-${i}`}>
        <BaseLink
          href={crumb.path}
          aria-label={`Goto ${crumb.name}`}
          className={LINK_CLS}
        >
          {crumb.name}
        </BaseLink>
      </li>
    )
  }

  return (
    <ul
      className={cn(
        'flex flex-row flex-nowrap items-center gap-x-1 text-xs',
        className
      )}
    >
      {ret}
    </ul>
  )
}
