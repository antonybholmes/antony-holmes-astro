import type { IClassProps } from '@/interfaces/class-props'
import { cn } from '@/lib/shadcn-utils'
import { Avatar } from './avatar'

interface IProps extends IClassProps {
  people: string[]
  showImage?: boolean
  showTitle?: boolean
  isSmall?: boolean
}

export function Avatars({
  people,
  showImage = true,
  showTitle = true,
  isSmall = false,
  className,
}: IProps) {
  return (
    <ul className={cn('flex flex-row items-center gap-4', className)}>
      {people.map((person, index) => (
        <Avatar
          person={person}
          showImage={showImage}
          showTitle={showTitle}
          isSmall={isSmall}
          key={index}
        />
      ))}
    </ul>
  )
}
