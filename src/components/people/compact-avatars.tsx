import { BaseLink } from '@components/link/base-link'
import { VCenterRow } from '@layout/v-center-row'

import type { IClassProps } from '@/interfaces/class-props'
import { getAuthorBaseUrl } from '@/lib/astro/author'
import { cn } from '@/lib/shadcn-utils'
import { AvatarImage } from './avatar-image'

interface IProps extends IClassProps {
  people: string[]
  showImages?: boolean
}

export function CompactAvatars({
  people,
  showImages = true,
  className,
}: IProps) {
  return (
    <VCenterRow className="gap-x-1">
      {showImages && (
        <ul
          className={cn('relative h-10', className)}
          style={{ width: `${3 + (people.length - 1) * 0.5}rem` }}
        >
          {people.map((person, index) => (
            <li key={index}>
              <BaseLink
                href={getAuthorBaseUrl(person)}
                aria-label={`Click to read more about ${person}`}
                className={cn('absolute block rounded-full', `ml-${index * 2}`)}
              >
                <AvatarImage person={person} className="h-10 w-10" />
              </BaseLink>
            </li>
          ))}
        </ul>
      )}

      <ul className="flex flex-row flex-wrap items-center gap-x-1 text-sm font-medium">
        {people.map((person, index) => (
          <li key={index}>
            <BaseLink
              href={getAuthorBaseUrl(person)}
              aria-label={`Click to read more about ${person}`}
              data-underline={true}
            >
              {person}
            </BaseLink>
            {index < people.length - 2 ? <span>,</span> : <></>}
            {index === people.length - 2 ? (
              <span className="ml-1">&</span>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </VCenterRow>
  )
}
