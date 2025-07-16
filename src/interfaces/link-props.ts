import { type ComponentProps } from 'react'

export interface ILinkProps extends ComponentProps<'a'> {
  selected?: boolean
  startingColor?: string
  endingColor?: string
  underline?: 'hover' | boolean
}
