import type { IClassProps } from '@/interfaces/class-props'
import { format } from 'date-fns'

interface IProps extends IClassProps {
  date: Date
}

export function FormattedDate({ date, className }: IProps) {
  const formattedDate = format(date, 'MMM dd')
  const formattedYear = format(date, 'yyyy')

  return (
    <time date-time={date.toISOString()} className={className}>
      {formattedDate},{' '}
      <a href={`/blog/year/${formattedYear}`} className="hover:underline">
        {formattedYear}
      </a>
    </time>
  )
}
