import type { IClassProps } from '@/interfaces/class-props'
import { getUrlFriendlyImg } from '@lib/http/urls'
import { RoundedImage } from '../rounded-image'

export interface IAvatarProps extends IClassProps {
  person: string
}

interface IProps extends IAvatarProps {}

export function AvatarImage({ person, className, ...props }: IProps) {
  return (
    <RoundedImage
      src={`/img/people/${getUrlFriendlyImg(person)}`}
      alt={`A delightful photo of ${person}`}
      title={`A delightful photo of ${person}`}
      className={className}
    />
  )
}
