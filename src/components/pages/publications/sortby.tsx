import type { IClassProps } from '@/interfaces/class-props'
import { cn } from '@/lib/shadcn-utils'
import {
  RadioGroup,
  RadioGroupItem,
} from '@components/shadcn/ui/themed/radio-group'

const ITEMS = [
  'Publication Date',
  'Title',
  'Journal',
  'First Author',
  'Last Author',
]

interface SortProps extends IClassProps {
  onChange: any
  selected: string
}

export function SortOrder({ className }: SortProps) {
  //const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <RadioGroup
      //items={ITEMS}
      //selected={selected}
      //onClick={onClick}
      className={cn('mt-4 flex flex-col gap-y-1', className)}
    >
      <>
        {ITEMS.map((text: string, index: number) => {
          return <RadioGroupItem key={index} value={text} />
        })}
      </>
    </RadioGroup>
  )
}
