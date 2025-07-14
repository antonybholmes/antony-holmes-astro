/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
//import Button from "../../components/button"
//import PublicationYears from "./publicationyears"

import { HCenterRow } from '@layout/h-center-row'

import { TEXT_SHOW_MORE } from '@/consts'
import type { IClassProps } from '@/interfaces/class-props'
import { BasePublicationList } from './base-publication-list'

interface IProps extends IClassProps {
  publications: any[]
  showAbstract?: boolean
  showCount?: boolean
  showMoreButton?: boolean
  showMoreOnClick?: any
  page?: number
  pageBreak?: number
}

export function Publications({
  publications,
  showAbstract,
  showCount,
  showMoreButton,
  showMoreOnClick,
  page = 0,
  pageBreak = -1,
  className,
}: IProps) {
  return (
    <>
      {/* {publications.length > 0 && showCount && (
        <HCenterRow className="mb-8 justify-between">
          <div>

            {`${publications.length} ${
              publications.length !== 1 ? "results" : "result"
            }`}
          </div>
        </HCenterRow>
      )} */}

      {publications.length > 0 && (
        <BasePublicationList
          publications={publications}
          showAbstract={showAbstract}
          showCount={showCount}
          page={page}
          pageBreak={pageBreak}
          className={className}
        />
      )}

      {showMoreButton ? (
        <HCenterRow className="mt-8">
          <div>
            <button
              aria-label={TEXT_SHOW_MORE}
              onClick={showMoreOnClick}
              className="px-4 py-2"
            >
              {TEXT_SHOW_MORE}
            </button>
          </div>
        </HCenterRow>
      ) : (
        <></>
      )}
    </>
  )
}
