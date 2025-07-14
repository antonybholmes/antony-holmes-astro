import { VCenterRow } from "@components/v-center-row"
import type { IElementProps } from "@interfaces/element-props"
import { H2_CLS } from "@theme"
import type { ReactNode } from "react"

interface IProps extends IElementProps {
  headerChildren?: ReactNode
}

export function PostSection({ title, headerChildren, children }: IProps) {
  return (
    <section className="flex flex-col gap-y-8">
      <VCenterRow className="border-t-4 border-b border-foreground py-3 justify-between">
        <h2 className={H2_CLS}>{title}</h2>
        <VCenterRow>{headerChildren && headerChildren}</VCenterRow>
      </VCenterRow>

      {children}
    </section>
  )
}
