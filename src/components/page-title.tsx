import type { IClassProps } from '@/interfaces/class-props'
import { cn } from '@/lib/shadcn-utils'

export interface IPageTitleProps {
  title?: string
  superTitle?: string
  subTitle?: string
}

interface IProps extends IPageTitleProps, IClassProps {
  subClassName?: string
}

export const PageTitle = ({
  title,
  superTitle,
  subTitle,
  className,
  subClassName,
}: IProps) => (
  <header className={cn('flex flex-col gap-y-1', className)}>
    {superTitle && <h3 className="font-normal">{superTitle}</h3>}

    <h1 className="capitalize font-bold text-4xl">{title}</h1>

    {subTitle && (
      <h2 className={cn('font-normal', subClassName)}>{subTitle}</h2>
    )}
  </header>
)
