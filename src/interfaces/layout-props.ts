import { type IDivProps } from './div-props'

export interface ILayoutProps extends IDivProps {
  description?: string
  showTitle?: boolean
  subTitle?: string
  superTitle?: string
  tab?: string
  isIndexed?: boolean
  bg?: string
  added?: Date
  heroImage?: string
  heroImageAlt?: string
  heroImageTitle?: string
}
