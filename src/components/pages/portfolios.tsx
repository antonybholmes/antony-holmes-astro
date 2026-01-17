// interface Props {
//   portfolio: any
// }

import { ThemeIndexLink } from '../link/theme-index-link'

interface IProps {
  portfolio: IPortfolio
  index: number
}

function Portfolio({ portfolio, index }: IProps) {
  const maxRows: number = Math.max(
    ...portfolio.brokerages.map((brokerage: any) => {
      return brokerage.stocks.length
    })
  )

  return (
    <>
      <h1 className="text-2xl font-bold">{portfolio.name}</h1>
      <p className="mt-4">{portfolio.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {portfolio.brokerages.map((brokerage: any, porfolioIndex: number) => {
          let bg: string

          switch (brokerage.name) {
            case 'Fidelity':
              bg = 'text-emerald-500'
              break
            case 'Schwab':
              bg = 'text-blue-500'
              break
            default:
              bg = 'text-rose-500'
              break
          }
          return (
            <div key={porfolioIndex}>
              <div key={porfolioIndex}>
                <h2 className="font-semibold text-sm text-foreground/50 uppercase">
                  {brokerage.name}
                </h2>

                <table key={porfolioIndex} className="w-full">
                  <tbody>
                    {brokerage.stocks.map(
                      (stock: any, brokerageIndex: number) => {
                        return (
                          <tr key={brokerageIndex}>
                            <td className="mb-2 truncate m-0 p-0">
                              <p className="font-semibold">{stock.name}</p>
                              <p>{stock.ticker}</p>
                            </td>

                            <td className="mb-2 text-right">
                              {Math.round(stock.pc * 100)}%
                            </td>
                          </tr>
                        )
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>

      {/* <PortfolioTagsList portfolio={portfolio} /> */}

      <div className="mt-8">
        <ThemeIndexLink
          href={portfolio.url}
          title="Backtest portfolio on Portfolio Visualizer"
        >
          Backtest Portfolio
        </ThemeIndexLink>
      </div>
    </>
  )
}

export interface IStock {
  name: string
  ticker: string
  pc: number // percentage change
}

export interface IBrokerage {
  name: string
  stocks: IStock[]
}

export interface IPortfolio {
  name: string
  description: string
  url: string
  brokerages: IBrokerage[]
}

export function PortfolioPage({ portfolios }: { portfolios: IPortfolio[] }) {
  return (
    <ul className="flex flex-col gap-8">
      {portfolios.map((portfolio: IPortfolio, index: number) => {
        return (
          <li
            key={index}
            className="flex flex-col border border-border/50 rounded-2xl p-8"
          >
            <Portfolio index={index} portfolio={portfolio} />
          </li>
        )
      })}
    </ul>
  )
}
