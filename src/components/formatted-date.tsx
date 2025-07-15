import type { IClassProps } from '@/interfaces/class-props'
import { cn } from '@/lib/shadcn-utils'
import { format } from 'date-fns'

interface IProps extends IClassProps {
  date: Date
  mode?: 'light' | 'dark'
}

export function FormattedDate({ date, className, mode = 'light' }: IProps) {
  const formattedDate = format(date, 'MMM dd')
  const formattedYear = format(date, 'yyyy')

  return (
    <time
      date-time={date.toISOString()}
      className={cn('data-[mode=dark]:text-white', className)}
      data-mode={mode}
    >
      {formattedDate},{' '}
      <a
        href={`/blog/year/${formattedYear}`}
        className="underline-offset-2 hover:underline"
      >
        {formattedYear}
      </a>
    </time>
  )
}
