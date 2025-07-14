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
    {superTitle && <h3 className="text-lg font-normal">{superTitle}</h3>}

    <h1 className="text-4xl font-semibold capitalize">{title}</h1>

    {subTitle && (
      <h2 className={cn('text-lg font-normal', subClassName)}>{subTitle}</h2>
    )}
  </header>
)
