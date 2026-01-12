import { useEffect, useState } from 'react'

import { BaseLink } from '@components/link/base-link'
import { BaseRow } from '@layout/base-row'
import { HCenterCol } from '@layout/h-center-col'

import { ThemeLink } from '@/components/link/theme-link'
import type { IClassProps } from '@/interfaces/class-props'
import type { IPublication } from '@/lib/publications/publication'
import { cn } from '@/lib/shadcn-utils'
import { ChevronRightIcon } from 'lucide-react'

type AbstractProps = {
  publication: any
  isExpanded: boolean
}

function Abstract({ publication, isExpanded = false }: AbstractProps) {
  return (
    <>
      <div className="mt-2 text-sm text-foreground/50">
        <p className={cn('overflow-hidden', !isExpanded && 'h-0')}>
          {publication.abstract}
        </p>
      </div>
    </>
  )
}

function pubmedUrl(pubmed: number) {
  return `https://pubmed.ncbi.nlm.nih.gov/${pubmed}/`
}

function doiUrl(doi: string) {
  return `https://doi.org/${doi}`
}

function getUrl(publication: any) {
  if (publication.doi !== '') {
    return doiUrl(publication.doi)
  } else if (publication.pmid !== '') {
    return pubmedUrl(publication.pmid)
  } else {
    return ''
  }
}

interface BasePublicationProps extends IClassProps {
  index?: number
  publication: IPublication
  showCount?: boolean
  showAbstract?: boolean
}

export function BasePublication({
  index = -1,
  publication,
  showAbstract = false,
  showCount = false,
  className,
}: BasePublicationProps) {
  const [isExpanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(showAbstract)
  }, [showAbstract])

  // const _handlePubClick = (journal: string) {
  //   if (onPubClick !== null) {
  //     onPubClick(journal)
  //   }
  // }

  const url = getUrl(publication)

  const authors = publication.authorList
    .join(', ')
    .replace('Holmes A', 'Holmes AB')
    .replace(/Holmes AB+/, 'Holmes AB')
    .replace('Holmes AB', '<strong>Holmes AB</strong>')

  const links = []

  // links.push(
  //   <li key={links.length}>
  //     {publication.journal}. {publication.year}.
  //   </li>
  // )

  // if (showDOI && publication.doi !== "") {
  //   links.push(
  //     <li key={links.length}>
  //       {`DOI: `}
  //       <BlackLink
  //         ariaLabel="View article from DOI"
  //         href={doiUrl(publication.doi)}
  //       >
  //         {publication.doi}
  //       </BlackLink>
  //     </li>
  //   )
  // }

  if (publication.pmid) {
    links.push(
      <li key={links.length}>
        {`PMID: `}
        <BaseLink
          aria-label="View article from PubMed ID"
          href={pubmedUrl(publication.pmid)}
          data-underline={true}
        >
          {publication.pmid}
        </BaseLink>
      </li>
    )
  }

  // if (publication.pmcid && publication.pmcid !== "") {
  //   links.push(
  //     <li key={links.length}>
  //       {`PMC: `}
  //       <BlackLink
  //         ariaLabel="View article from PubMed PMC ID"
  //         href={pubmedUrl(publication.pmcid)}
  //       >
  //         {publication.pmcid}
  //       </BlackLink>
  //     </li>
  //   )
  // }

  const title = publication.title

  return (
    <article
      className={cn('publication flex flex-row gap-x-3 text-sm', className)}
    >
      <HCenterCol className="mt-1 grow-0 gap-y-2">
        {showCount && (
          <div className="text-center text-foreground/70">{`${index + 1}`}</div>
        )}
        {/* <button
          title={`${isExpanded ? 'Hide' : 'Show'} abstract`}
          onClick={() => setExpanded(!isExpanded)}
          className="cursor-pointer border border-foreground flex flex-row items-center justify-center rounded-sm w-4 h-4 aspect-square"
        >
          {isExpanded ? <Minus className="w-4" /> : <Plus className="w-4" />}
        </button> */}
      </HCenterCol>

      <div className="grow group">
        <BaseRow className="gap-x-2">
          <div className="grow">
            <h2 className="tracking-tight">
              {url !== '' ? (
                <ThemeLink
                  aria-label="View article"
                  href={url}
                  //data-underline={true}
                  className="group-hover:underline group-hover:text-theme"
                >
                  {title}
                </ThemeLink>
              ) : (
                title
              )}
            </h2>
            {/* We need to use `dangerouslySetInnerHTML` here to allow HTML
            rendering for the authors. */}
            <span dangerouslySetInnerHTML={{ __html: authors }} />

            <ul className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-emerald-600">
              <li>
                {publication.journal}. {publication.year}.
              </li>
            </ul>

            <ul className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-emerald-600">
              {links.map(link => link)}
            </ul>

            <button
              title={`${isExpanded ? 'Hide' : 'Show'} abstract`}
              onClick={() => setExpanded(!isExpanded)}
              className="cursor-pointer flex flex-row items-center justify-center gap-x-0.5 text-foreground/50"
            >
              <ChevronRightIcon
                className={cn('trans-transform w-4 h-4 aspect-square', {
                  'rotate-90': isExpanded,
                })}
              />
              <span>Abstract</span>
            </button>
          </div>
          {/* <VCenterRow>
            <PillButton
              ariaLabel="Show abstract"
              className="h-7 w-7 min-w-7 stroke-gray-400 hover:bg-gray-200 hover:stroke-gray-900"
              onClick={() => setExpanded(!isExpanded)}
            >
              <ChevronRightIcon
                className={cn(
                  "trans-300 w-3 stroke-2  transition-transform",
                  [isExpanded, "rotate-90"]
                )}
              />
            </PillButton>
          </VCenterRow> */}
        </BaseRow>

        {isExpanded && publication.abstract !== '' ? (
          <Abstract publication={publication} isExpanded={isExpanded} />
        ) : (
          <></>
        )}
      </div>
    </article>
  )
}
