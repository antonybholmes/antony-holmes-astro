import { BaseLink } from '@components/link/base-link'
import { VCenterRow } from '@layout/v-center-row'

import type { IClassProps } from '@/interfaces/class-props'
import { getAuthorBaseUrl } from '@/lib/astro/author'
import { cn } from '@/lib/shadcn-utils'
import { Fragment } from 'react/jsx-runtime'
import { AvatarImage } from './avatar-image'

interface IProps extends IClassProps {
  people: string[]
  showImages?: boolean
  mode?: 'light' | 'dark'
}

export function CompactAvatars({
  people,
  showImages = true,
  mode = 'light',
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
              <a
                href={getAuthorBaseUrl(person)}
                aria-label={`Click to read more about ${person}`}
                className={cn('absolute block rounded-full', `ml-${index * 2}`)}
              >
                <AvatarImage person={person} className="h-10 w-10" />
              </a>
            </li>
          ))}
        </ul>
      )}

      <span className="text-sm font-semibold">
        {people.map((person, index) => (
          <Fragment key={index}>
            <BaseLink
              href={getAuthorBaseUrl(person)}
              aria-label={`Click to read more about ${person}`}
              //data-underline={true}
              data-mode={mode}
              className="hover:underline underline-offset-2 hover:text-sky-600 decoration-sky-600 data-[mode=dark]:text-white data-[mode=dark]:decoration-white data-[mode=dark]:hover:decoration-sky-400 data-[mode=dark]:hover:text-sky-400"
            >
              {person}
            </BaseLink>
            <span className="text-foreground/50">
              {index < people.length - 2 ? ',' : ''}
              {index === people.length - 2 ? ' & ' : ''}
            </span>
          </Fragment>
        ))}
      </span>
    </VCenterRow>
  )
}
