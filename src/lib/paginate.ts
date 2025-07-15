import { RECORDS_PER_PAGE } from '@/consts'

export type AstroPage = { props: any; params: any }

export type PaginationType = 'posts' | 'post'

export interface IPaginationProps<T> {
  type: PaginationType
  page: number
  pages: number
  data: T[]
}

export function paginate<T>(
  data: T[],
  slugRoot: string = ''
): {
  params: { slug?: string }
  props: IPaginationProps<T>
}[] {
  const paths = []

  const pages = getPageCount(data)

  // if not the root, add a trailing slash for consistency
  if (slugRoot.length > 0 && !slugRoot.endsWith('/')) {
    slugRoot += '/'
  }

  //if (slugRoot !== '') {
  paths.push({
    params: {
      // if slugRoot is empty use undefined rather than an empty string
      //  https://docs.astro.build/en/guides/routing/
      slug: slugRoot !== '' ? slugRoot : undefined,
    },
    props: {
      type: 'posts' as PaginationType,
      page: 0,
      pages,
      data: getPageItems(data, 0),
    },
  })
  //}

  // add page to slug since we are going to generate an array of
  // slugs one for each page of results
  slugRoot += 'page/'

  for (let page = 0; page < pages; page++) {
    paths.push({
      params: {
        slug: `${slugRoot}${page + 1}`,
      },
      props: {
        type: 'posts' as PaginationType,
        page,
        pages,
        data: getPageItems(data, page),
      },
    })
  }

  return paths
}

export function getPageCount<T>(
  items: T[],
  pageSize: number = RECORDS_PER_PAGE
): number {
  return Math.floor((items.length - 1) / pageSize) + 1
}

export function getPageItems<T>(
  items: T[],
  page: number = 0,
  pageSize: number = RECORDS_PER_PAGE
): T[] {
  const start = page * pageSize
  return items.slice(start, start + pageSize)
}
