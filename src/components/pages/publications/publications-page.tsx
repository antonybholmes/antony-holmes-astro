import { HCenterRow } from '@layout/h-center-row'
//import { SearchBar } from '@components/search/searchbar'
import { Switch } from '@components/shadcn/ui/themed/switch'
import { VCenterRow } from '@layout/v-center-row'

import getAuthorPublications from '@lib/pub/author-publications'
import getJournalPublications from '@lib/pub/journal-publications'
import pubYearCount from '@lib/pub/pub-year-count'
import sortPublications from '@lib/pub/sort-publications'

import { getTopAuthors } from '@/lib/publications/top-authors'
import { getTopJournals } from '@/lib/publications/top-journals'

import { TEXT_SHOW_MORE } from '@/consts'
import { BaseCol } from '@layout/base-col'

import { SidebarDiv } from '@/components/layout/sidebar-div'
import { httpFetch } from '@/lib/http/http-fetch'
import type { IPublication } from '@/lib/publications/publication'
import { useEffect, useState } from 'react'
import { JournalFilter } from './journal-filter'
import { Publications } from './publications'

const EMPTY_QUERY = ''

//const RECORDS_PER_PAGE = [25, 50, 100, 200, 500, 1000]

export const PUB_API_URL = '/api/publications/lab.json'

function searchAuthors(q: string, publication: IPublication) {
  for (let author of publication.authorList) {
    if (author.toLowerCase().includes(q)) {
      return true
    }
  }

  return false
}

export function search(
  query: { text: string; field: string },
  publications: IPublication[]
): IPublication[] {
  let ret: IPublication[] = []

  let ql = query.text.toLowerCase()

  for (let publication of publications) {
    let found = false

    switch (query.field) {
      case 'author':
        found = searchAuthors(ql, publication)
        break
      case 'journal':
        found = publication.journal.toLowerCase() === ql
        break
      case 'year':
        found = publication.year.toString() === ql
        break
      case 'pmid':
        found = publication.pmid.toString() === ql
        break
      case 'pmcid':
        found = publication.pmcid === ql
        break
      default:
        found = publication.pmid.toString().includes(ql)

        if (!found && publication.pmcid) {
          // try pmcid
          found = publication.pmcid.toLowerCase().includes(ql)
        }

        if (!found) {
          // try journal
          found = publication.title.toLowerCase().includes(ql)
        }

        if (!found) {
          // try journal
          found = publication.journal.toLowerCase().includes(ql)
        }

        if (!found) {
          // try authors
          found = searchAuthors(ql, publication)
        }

        // if (!found) {
        //   // try people
        //   for (let person of publication.peopleList) {
        //     //if (person.frontmatter.name.toLowerCase().includes(ql)) {
        //     if (person.toLowerCase().includes(ql)) {
        //       found = true
        //       break
        //     }
        //   }
        // }

        // if (!found) {
        //   // try id
        //   for (let person of publication.people) {
        //     if (person.frontmatter.personId.toLowerCase().includes(ql)) {
        //       found = true
        //       break
        //     }
        //   }
        // }

        if (!found) {
          // try year
          found = publication.year.toString().includes(ql)
        }

        break
    }

    if (found) {
      ret.push(publication)
    }
  }

  return ret
}

function booleanSearchAnd(s1: any, s2: any): any {
  const titles: Set<any> = new Set()

  s2.map((publication: any) => {
    titles.add(publication.title)
  })

  return s1.filter((publication: any) => {
    return titles.has(publication.title)
  })
}

function booleanSearchOr(s1: any, s2: any): any {
  const pubMap: any = {}

  s1.map((publication: any) => {
    if (!(publication.year in pubMap)) {
      pubMap[publication.year] = {}
    }

    if (!(publication.month in pubMap[publication.year])) {
      pubMap[publication.year][publication.month] = {}
    }

    pubMap[publication.year][publication.month][publication.title] = publication
  })

  s2.map((publication: any) => {
    if (!(publication.year in pubMap)) {
      pubMap[publication.year] = {}
    }

    if (!(publication.month in pubMap[publication.year])) {
      pubMap[publication.year][publication.month] = {}
    }

    if (!(publication.title in pubMap[publication.year][publication.month])) {
      pubMap[publication.year][publication.month][publication.title] =
        publication
    }
  })

  const ret = []

  for (let year of Object.keys(pubMap).sort().reverse()) {
    for (let month of Object.keys(pubMap[year]).sort().reverse()) {
      for (let title of Object.keys(pubMap[year][month])) {
        ret.push(pubMap[year][month][title])
      }
    }
  }

  return ret
}

function results(search: string, page: number, filteredPublications: any[]) {
  if (filteredPublications.length === 0) {
    return `Your search for ${search} retrieved no results`
  }

  const x = page + 1
  const y = filteredPublications.length
  const suffix = filteredPublications.length !== 1 ? 'results' : 'result'

  if (y > x) {
    return `Page ${x} of ${y} ${suffix}`
  } else {
    return `${y} ${suffix}`
  }
}

export function PublicationsPage() {
  const [publications, setPublications] = useState<IPublication[]>([])

  const [journals, setJournals] = useState<any[]>([])

  const [_, setAuthors] = useState<any[]>([])

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [sortOrder] = useState('Publication Date')
  //const [journals, setJournals] = useState<Array<[string, number]>>(useTopJournals(pubs))
  const [selectedJournals, setSelectedJournals] = useState<Set<string>>(
    new Set<string>()
  )

  const [selectedAuthors] = useState<Set<string>>(new Set<string>())

  const [showAbstract, setShowAbstract] = useState(false)

  //const [instituteOnly, setInstituteOnly] = useState(true)
  const [firstAuthorOnly] = useState(true) //id === "all")
  const [descending] = useState(true)

  const [searchFilteredPublications, setSearchFilteredPublications] = useState<
    any[]
  >([])

  const [yearFilteredPublications, setYearFilteredPublications] = useState<
    any[]
  >([])

  const [sortedPublications, setSortedPublications] = useState<IPublication[]>(
    []
  )

  //const [pagePublications, setPagePublications] = useState<any[]>([])

  const [pageStart, setPageStart] = useState(-1)
  const [pageEnd, setPageEnd] = useState(-1)
  const [pages, setPages] = useState(-1)

  const [yearData, setYearData] = useState<any[]>([])
  const [year1, setYear1] = useState(-1)
  const [year2, setYear2] = useState(-1)

  useEffect(() => {
    async function fetchData() {
      const publications = await httpFetch.getJson<IPublication[]>(
        '/api/publications.json'
      )

      setPublications(publications)
      setAuthors(getTopAuthors(publications))
      setJournals(getTopJournals(publications))
    }
    fetchData()
  }, [])

  useEffect(() => {
    //setPage(0)
    // setPages(
    //  Math.floor(
    //     (searchFilteredPublications.length + recordsPerPage - 1) / recordsPerPage
    //  )
    //)

    //setPagePublications(searchFilteredPublications.slice(0, recordsPerPage))

    setYearData(pubYearCount(searchFilteredPublications))
  }, [searchFilteredPublications])

  useEffect(() => {
    setYear1(0)
    setYear2(yearData.length - 1)
  }, [yearData])

  useEffect(() => {
    if (publications.length > 0 && yearData.length > 0) {
      setYearFilteredPublications(
        searchFilteredPublications.filter(publication => {
          return (
            publication.year >= yearData[year1].name &&
            publication.year <= yearData[year2].name
          )
        })
      )
    } else {
      setYearFilteredPublications([])
    }

    setPageStart(0)
    setPageEnd(0)
  }, [year1, year2])

  useEffect(() => {
    setSortedPublications(
      sortPublications(yearFilteredPublications, sortOrder, descending)
    )
  }, [yearFilteredPublications, sortOrder, descending])

  // useEffect(() => {
  //   setPages(
  //     Math.floor(
  //       (sortedPublications.length + recordsPerPage - 1) / recordsPerPage
  //     )
  //   )

  //   updatePagePublications()
  // }, [sortedPublications])

  // useEffect(() => {
  //   updatePagePublications()
  // }, [pageStart, pageEnd])

  // const updatePagePublications = () => {
  //   const s1 = pageStart * recordsPerPage
  //   const s2 = pageEnd * recordsPerPage
  //   setPagePublications(sortedPublications.slice(s1, s2 + recordsPerPage))
  // }

  // useEffect(() => {
  //   setRecordsPerPage(recordsPerPage[recordsPerPageIndex])
  // }, [recordsPerPageIndex])

  useEffect(() => {
    // if (query !== '') {
    //   updateFilteredPublications(
    //     getBooleanSearch(
    //       query,
    //       publications,
    //       search,
    //       booleanSearchAnd,
    //       booleanSearchOr
    //     )
    //   )
    // } else {
    updateFilteredPublications(publications)
    //}
  }, [query, firstAuthorOnly, selectedJournals, selectedAuthors, publications])

  // // If pubs are populated or user applies a filter, update
  // useEffect(() => {
  //   updatePublications()
  //   //setRecordsPerPage(recordsPerPage)
  // }, [
  //   pubs,
  //   selected,
  //   instituteOnly,
  //   firstAuthorOnly,
  //   sortOrder,
  //   descending,
  // ])

  function updateFilteredPublications(publications: any[]) {
    // if (instituteOnly) {
    //   pubs = getInstitutePublications(pubs)
    // }

    // if (firstAuthorOnly) {
    //   pubs = useFirstAuthorPublications(pubs)
    // }

    if (selectedJournals.size > 0) {
      publications = getJournalPublications(publications, selectedJournals)
    }

    if (selectedAuthors.size > 0) {
      publications = getAuthorPublications(publications, selectedAuthors)
    }

    setSearchFilteredPublications(publications)
  }

  function onSearch(text: string, clicked: boolean) {
    if (clicked) {
      setQuery(text)
    }
  }

  function showMoreOnClick() {
    setPageEnd(Math.min(pageEnd + 1, pages - 1))
  }

  function onJournalClick(journal: string, selected: boolean) {
    //setQuery(journal)

    let sj = new Set(selectedJournals)

    if (selected) {
      sj.add(journal)
    } else {
      sj.delete(journal)
    }

    setSelectedJournals(sj)
  }

  //const hasSearchResults = query !== EMPTY_QUERY
  //let publications: any[] = hasSearchResults
  ///  ? filteredPublications
  // : pubs

  //let yearFilteredPublications = filteredPublications

  // if (filterYears.length > 0 && filterYears[0] !== -1) {
  //   yearFilteredPublications = publications.filter((publication: any) {
  //     return filterYears.includes(publication.year)
  //   })
  // } else {
  //   yearFilteredPublications = publications
  // }

  //const offset = (page - 1) * recordsPerPageIndex

  // let pagedPublications = filteredPublications.slice(
  //   offset,
  //   offset + recordsPerPage
  // )

  return (
    <SidebarDiv>
      <>
        <VCenterRow className="justify-between pt-2 text-xs">
          <span>{results(query, pageStart, yearFilteredPublications)}</span>
          <Switch
            onCheckedChange={state => setShowAbstract(state)}
            checked={showAbstract}
            aria-label="Show abstracts"
          >
            Show abstracts
          </Switch>
        </VCenterRow>

        <Publications
          publications={sortedPublications}
          showAbstract={showAbstract}
          showCount={true}
          className="mt-8"
          //page={pageStart}
          //pageBreak={recordsPerPage}
        />

        {pageStart < pages - 1 && (
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
        )}
      </>

      <BaseCol className="text-sm">
        <JournalFilter
          journals={journals}
          selected={selectedJournals}
          onClick={onJournalClick}
          max={8}
        />

        {/* <AuthorFilter
          authors={authors.slice(0, 20)}
          selected={selectedAuthors}
          onClick={onAuthorClick}
          max={8}
        /> */}
      </BaseCol>
    </SidebarDiv>
  )
}
