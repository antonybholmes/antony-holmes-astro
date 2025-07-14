import { BaseLink } from '@components/link/base-link'
import { BaseCol } from '@layout/base-col'
import { VCenterRow } from '@layout/v-center-row'

import type { IClassProps } from '@/interfaces/class-props'
import { getAuthorBaseUrl } from '@/lib/astro/author'
import { cn } from '@/lib/shadcn-utils'
import { AvatarImage } from './avatar-image'

interface IProps extends IClassProps {
  person: string
  showTitle?: boolean
  isSmall?: boolean
}

export function Avatar({ person, isSmall = false, className }: IProps) {
  const href = getAuthorBaseUrl(person)

  return (
    <VCenterRow className={cn('gap-x-3', className)}>
      <BaseLink href={href} aria-label={`Click to read more about ${person}`}>
        <AvatarImage
          person={person}
          className={cn([isSmall, 'h-10 w-10', 'h-12 w-12'])}
        />
      </BaseLink>
      <BaseCol>
        <BaseLink
          href={href}
          aria-label={`Click to read more information about ${person}`}
          data-underline={true}
          className={cn('font-medium', [isSmall, 'text-sm'])}
        >
          {person}
        </BaseLink>
      </BaseCol>
    </VCenterRow>
  )
}
