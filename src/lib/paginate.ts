import { RECORDS_PER_PAGE, type SlugPath } from '@/consts'
import type { CollectionEntry } from 'astro:content'
import { pathToSlug } from './post/slug'

export type PageType = 'posts' | 'post' | 'review'

export type AstroPage<T> = {
  props: {
    title?: string
    description?: string
    pageTitle?: string
    showTitle?: boolean
    root?: SlugPath
    featuredPosts?: T[]
    type: PageType
    page: number
    pages: number
    data: T[]
    isTopLevelPage?: boolean
    person?: CollectionEntry<'people'>
  }
  params: { slug: string | undefined }
}

export interface IPageProps {
  page: number
  pages: number
  isTopLevelPage?: boolean // to indicate if this is the index page which is also page 0 but different to page/1
}

export interface IPaginationProps<T> extends IPageProps {
  type: PageType
  data: T[]
}

interface IPaginateOptions {
  slug?: SlugPath
  title?: string
}

export function paginate<T>(
  data: T[],
  options: IPaginateOptions = {}
): AstroPage<T>[] {
  let { slug, title = '' } = options

  const paths = []

  const pages = getPageCount(data)

  let path = pathToSlug(slug)

  // if not the root, add a trailing slash for consistency
  // if (path.length > 0 && !path.endsWith('/')) {
  //   path += '/'
  // }

  // generate a root page which is functionally the same as page 0
  // but has the root url rather than page/1 to make for nicer urls
  // once user moves to page 2 they will be on page/2 and the ui will
  // switch to page/1 page/2 etc
  paths.push({
    params: {
      // if slugRoot is empty use undefined rather than an empty string
      //  https://docs.astro.build/en/guides/routing/
      //  (Setting the rest parameter to undefined allows it to match the top level page.)
      slug: path !== '' ? path : undefined,
    },
    props: {
      type: 'posts' as PageType,
      title: title ? title : undefined,
      pageTitle: title ? title : undefined,
      showTitle: title ? true : false,
      page: 0,
      pages,
      //root: slug,
      data: getPageItems(data, 0),
      isTopLevelPage: true,
    },
  })
  //}

  // add page to slug since we are going to generate an array of
  // slugs one for each page of results
  path += '/page'

  for (let page = 0; page < pages; page++) {
    paths.push({
      params: {
        slug: `${path}/${page + 1}`,
      },
      props: {
        type: 'posts' as PageType,
        title: title ? title : undefined,
        pageTitle: title
          ? `${title} - Page ${page + 1} of ${pages}`
          : undefined,
        showTitle: title ? true : false,
        page,
        pages,
        //root: slug,
        data: getPageItems(data, page),
        isTopLevelPage: false,
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
