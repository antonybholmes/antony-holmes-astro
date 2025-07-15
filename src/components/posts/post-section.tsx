import type { IChildrenProps } from '@/interfaces/children-props'
import { VCenterRow } from '@layout/v-center-row'

import type { ReactNode } from 'react'
import { BaseLink } from '../link/base-link'

interface IProps extends IChildrenProps {
  title: string
  href?: string
  headerChildren?: ReactNode
}

export function PostSection({ title, href, headerChildren, children }: IProps) {
  return (
    <section className="flex flex-col gap-y-8">
      <VCenterRow className="border-t-3 border-b border-foreground/75 py-3 justify-between">
        <h2>{href ? <BaseLink href={href}>{title}</BaseLink> : title}</h2>
        <VCenterRow>{headerChildren && headerChildren}</VCenterRow>
      </VCenterRow>

      {children}
    </section>
  )
}
