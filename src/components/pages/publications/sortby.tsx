import {
  RadioGroup,
  RadioGroupItem,
} from "@components/shadcn/ui/themed/radio-group"
import type { IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"

const ITEMS = [
  "Publication Date",
  "Title",
  "Journal",
  "First Author",
  "Last Author",
]

interface SortProps extends IElementProps {
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
      className={cn("mt-4 flex flex-col gap-y-1", className)}
    >
      <>
        {ITEMS.map((text: string, index: number) => {
          return <RadioGroupItem key={index} value={text} />
        })}
      </>
    </RadioGroup>
  )
}
