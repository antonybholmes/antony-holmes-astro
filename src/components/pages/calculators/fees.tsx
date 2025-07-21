import { FeeGraph } from '@/components/graph/fee-graph'
import SidebarHeading from '@/components/graph/sidebar-heading'
import { BaseCol } from '@/components/layout/base-col'
import { SidebarDiv } from '@/components/layout/sidebar-div'
import { NumericalInput } from '@/components/shadcn/ui/themed/numerical-input'
import { Slider } from '@/components/shadcn/ui/themed/slider'
import { useEffect, useState } from 'react'

export function FeesPage() {
  const [arr, setARR] = useState(8)
  const [er, setER] = useState(1)
  const [frontLoad, setFrontLoad] = useState(5)
  const [startingBalance, setStartingBalance] = useState(10000)
  const [years, setYears] = useState(40)
  const [savings, setSavings] = useState(1000)
  const [data1, setData1] = useState<number[]>([])
  const [data2, setData2] = useState<number[]>([])

  const createData = () => {
    const d1: number[] = []
    const d2: number[] = []
    let b1 = startingBalance
    let b2 = startingBalance * (1 - frontLoad / 100)

    const inc = savings * 12

    for (var i = 0; i < years; ++i) {
      d1.push(b1)
      d2.push(b2)
      b1 = b1 * (1 + arr / 100) + inc
      b2 = b2 * (1 + (arr - er) / 100) + inc
    }

    setData1(
      d1.map((x: number) => {
        return x / 1000000
      })
    )

    setData2(
      d2.map((x: number) => {
        return x / 1000000
      })
    )
  }

  // useEffect(() => {
  //   createData()
  // },
  // [])

  useEffect(() => {
    createData()
  }, [arr, er, startingBalance, frontLoad, savings, years])

  return (
    <SidebarDiv className="mt-8">
      <div>
        <FeeGraph data1={data1} data2={data2} />

        {/* <HCenterRow className="mb-16">
            <BlueAlert>
              Fees could cost you $
              {Math.round(
                (data1[data1.length - 1] - data2[data2.length - 1]) * 1000000
              ).toLocaleString()}{" "}
              over {years} years!
            </BlueAlert>
          </HCenterRow> */}
      </div>

      <BaseCol className="gap-y-2 text-sm">
        <div>
          <SidebarHeading
            title="Annual Rate Of Return"
            tooltip="How much you expect your assets to increase by per year."
          />
          <NumericalInput
            value={arr}
            prefix="%"
            //prefixLeft={false}
            //alignLeft={false}
            onNumChange={setARR}
          />
          {/* <RangeSlider
                  value={arr}
                  onChange={(v: number) => setARR(v)}
                  className="mt-4"
                /> */}
          <Slider
            value={[arr]}
            onValueChange={(v: number[]) => setARR(v[0]!)}
            className="mt-2"
          />
        </div>
        <div>
          <SidebarHeading
            title="Expense Ratio"
            tooltip="Yearly cost to own fund as % of assets."
          />
          <NumericalInput value={er} onNumChange={setER} prefix="%" />
          <Slider
            value={[er]}
            onValueChange={(v: number[]) => setER(v[0]!)}
            className="mt-2"
          />
        </div>
        <div>
          <SidebarHeading
            title="Front-End Load"
            tooltip="Cost to buy cost. Avoid funds with this."
          />
          <NumericalInput
            value={frontLoad}
            prefix="%"
            onNumChange={setFrontLoad}
          />
          <Slider
            value={[frontLoad]}
            onValueChange={(v: number[]) => setFrontLoad(v[0]!)}
            className="mt-2"
          />
        </div>
        <div>
          <SidebarHeading
            title="Starting Balance"
            tooltip="How much money you start with."
          />
          <NumericalInput
            value={startingBalance}
            limit={[1, 1000000]}
            step={10000}
            prefix="$"
            onNumChange={setStartingBalance}
          />
          <Slider
            value={[startingBalance]}
            min={1}
            max={1000000}
            step={10000}
            onValueChange={(v: number[]) => setStartingBalance(v[0]!)}
            className="mt-2"
          />
        </div>
        <div>
          <SidebarHeading
            title="Savings Per Month"
            tooltip="How much you save a month."
          />
          <NumericalInput
            value={savings}
            limit={[0, 1000000]}
            step={10000}
            prefix="$"
            onNumChange={setSavings}
          />
          <Slider
            value={[savings]}
            min={0}
            max={100000}
            step={1000}
            onValueChange={(v: number[]) => setSavings(v[0]!)}
            className="mt-2"
          />
        </div>
        <div>
          <SidebarHeading
            title="Years"
            tooltip="How many years you want to invest for."
          />
          <NumericalInput
            value={years}
            limit={[1, 100]}
            prefix="years"
            onNumChange={setYears}
          />
          <Slider
            value={[years]}
            min={1}
            max={100}
            onValueChange={(v: number[]) => setYears(v[0]!)}
            className="mt-2"
          />
        </div>
      </BaseCol>
    </SidebarDiv>
  )
}
