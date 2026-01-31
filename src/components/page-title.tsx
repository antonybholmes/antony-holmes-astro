import type { IClassProps } from '@/interfaces/class-props'
import type { ColorMode } from '@/interfaces/color-mode'
import { cn } from '@/lib/shadcn-utils'

export interface IPageTitleProps {
  title?: string
  superTitle?: string
  subTitle?: string
}

interface IProps extends IPageTitleProps, IClassProps {
  subClassName?: string
  mode?: ColorMode
}

export const PageTitle = ({
  title,
  superTitle,
  subTitle,
  mode = 'light',
  className,
  subClassName,
}: IProps) => (
  <header className={cn('flex flex-col gap-y-1', className)}>
    {superTitle && <h3 className="font-normal">{superTitle}</h3>}

    <h1
      data-mode={mode}
      className="font-bold text-5xl data-[mode=dark]:text-white"
    >
      {title}
    </h1>

    {subTitle && (
      <h2 className={cn('font-normal', subClassName)}>{subTitle}</h2>
    )}
  </header>
)
