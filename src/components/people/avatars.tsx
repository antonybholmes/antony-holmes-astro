import { VCenterRow } from '@layout/v-center-row'

import type { IClassProps } from '@/interfaces/class-props'
import { cn } from '@/lib/shadcn-utils'
import { Avatar } from './avatar'

interface IProps extends IClassProps {
  people: string[]
  showTitle?: boolean
  isSmall?: boolean
}

export function Avatars({
  people,

  isSmall = false,
  className,
}: IProps) {
  return (
    <VCenterRow className={cn('gap-4', className)}>
      {people.map((person, index) => (
        <Avatar person={person} isSmall={isSmall} key={index} />
      ))}
    </VCenterRow>
  )
}
