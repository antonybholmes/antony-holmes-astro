import { type IDivProps } from './div-props'

export interface ILayoutProps extends IDivProps {
  description?: string

  tab?: string
  isIndexed?: boolean
  bg?: string
  //added?: Date
  heroImage?: string
  heroImageAlt?: string
  heroImageTitle?: string
}
