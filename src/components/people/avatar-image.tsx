import type { IClassProps } from '@/interfaces/class-props'
import { getUrlFriendlyImg } from '@lib/http/urls'
import { RoundedImage } from '../rounded-image'

export interface IAvatarProps extends IClassProps {
  person: string
}

interface IProps extends IAvatarProps {
  alt?: string
}

export function AvatarImage({ person, className, alt, ...props }: IProps) {
  if (!alt) {
    alt = `A most delightful photo of ${person}`
  }

  return (
    <RoundedImage
      src={`/assets/images/people/${getUrlFriendlyImg(person)}`}
      alt={alt}
      title={alt}
      className={className}
    />
  )
}
