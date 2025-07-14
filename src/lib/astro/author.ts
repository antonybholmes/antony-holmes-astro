import type { CollectionEntry } from 'astro:content'
//import { join } from "path"
import { getAllFiles } from './files'

import { PEOPLE_SLUG } from '@/consts'

import { getUrlFriendlyTag } from '@lib/urls'

export interface IAuthorMap {
  [key: string]: CollectionEntry<'people'>
}

export interface IAuthorFields {
  name: string
  title: string
  email: string
  pubmed: string
}

export interface IPostAuthor {
  slug: string
  frontmatter: IAuthorFields
}

export interface IAuthor extends IPostAuthor {
  html: string
}

const PEOPLE_DIR = 'src/content/people'

export function getAuthorPaths() {
  return getAllFiles(PEOPLE_DIR)
}

// export function getAuthorBySlug(slug: string): IPostAuthor {
//   slug = getCanonicalSlug(slug)
//   const fullPath = `${PEOPLE_DIR}/${slug}.md`

//   return { slug: slug, frontmatter: getAuthorFrontmatter(fullPath) }
// }

// export const getAuthorFrontmatter = (path: string): IAuthorFields => {
//   const items: IAuthorFields = {
//     id: "",
//     name: "",
//     title: "",
//     email: "",
//     rawContent: "",
//     rawExcerpt: "",
//     pubmed: "",
//   }

//   getFrontmatter(path, items)

//   return items
// }

// export function getAllAuthors(): IPostAuthor[] {
//   const paths = getAuthorPaths()
//   const authors = paths.map(path => getAuthorBySlug(path))
//   return authors
// }

export function getAuthorMap(authors: CollectionEntry<'people'>[]): IAuthorMap {
  return Object.fromEntries(
    authors.map(x => [getUrlFriendlyTag(x.data.name), x])
  )
}

// export async function addAuthorHtml(author: IPostAuthor): Promise<IAuthor> {
//   return {
//     ...author,
//     html: await markdownHtml(author.frontmatter.rawContent || ""),
//   }
// }

// export function addHtmlToAuthors(authors: IPostAuthor[]): Promise<IAuthor>[] {
//   return authors.map(author => addAuthorHtml(author))
// }

export function getAuthorBaseUrl(name: string) {
  return `${PEOPLE_SLUG}/${getUrlFriendlyTag(name)}`
}
