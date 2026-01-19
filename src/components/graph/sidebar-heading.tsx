import { VCenterRow } from '../layout/v-center-row'

interface IProps {
  title: string
  tooltip?: string
}

export function SidebarHeading({ title }: IProps) {
  return (
    <VCenterRow className="justify-between">
      <div className="font-semibold text-sm mb-1">{title}</div>

      {/* {tooltip && <ToolTip text={tooltip} />} */}
    </VCenterRow>
  )
}
