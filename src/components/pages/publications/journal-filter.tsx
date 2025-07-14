import { VCenterRow } from '@components/layout/v-center-row'
import { Checkbox } from '@components/shadcn/ui/themed/check-box'

interface JournalProps {
  index: number
  journal: [string, number]
  isSelected: boolean
  onClick: (text: string, selected: boolean) => void
}

export function Journal({ index, journal, isSelected, onClick }: JournalProps) {
  return (
    <li>
      <Checkbox
        index={index}
        onCheckedChange={state => onClick(journal[0], state)}
        checked={isSelected}
        aria-label={`Show ${journal[1]} articles`}
      >
        <VCenterRow className=" justify-between">
          <span className="3xl:hidden">
            {journal[0]} ({journal[1]})
          </span>
          <span className="hidden 3xl:block">
            {journal[0]} ({journal[1]})
          </span>
        </VCenterRow>
      </Checkbox>

      {/* <CheckBox onChange={() => onClick(journal[0], !selected)} selected={selected}>{`${useElipsis(journal[0])} (${journal[1]})`}</CheckBox> */}
    </li>
  )
}

interface JournalFilterProps {
  journals: [string, number][]
  selected: Set<string>
  onClick: any
  max: number
}

export function JournalFilter({
  journals,
  selected,
  onClick,
  max = 10,
}: JournalFilterProps) {
  // journals = journals.slice(
  //   0,
  //   isExpanded ? (showAll ? journals.length : max) : 0
  // )

  return (
    <div className="text-xs">
      {/* <ToggleSwitch
        isSelected={showAll}
        onClick={onShowAll}
        className="text-sm font-bold"
      >
        Journals
      </ToggleSwitch> */}

      <p className="font-semibold">Top Journals</p>

      <ul className="mt-2 flex flex-col gap-y-1">
        {journals.slice(0, max).map((journal: any, index: number) => {
          return (
            <Journal
              index={index}
              journal={journal}
              isSelected={selected.has(journal[0])}
              key={index}
              onClick={onClick}
            />
          )
        })}
      </ul>

      {/* <Button
        onClick={onShowAll}
        ariaLabel="Show more items"
        className={cn(BASE_BUTTON_CLS, "trans-300 transition-transform w-full", [
          showAll,
          "rotate-180",
        ])}
      >
        <ChevronDownIcon className="w-3 stroke-gray-500 stroke-2" />
      </Button> */}
    </div>
  )
}
