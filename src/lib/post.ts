// post functions that work in browser

//import { join } from "path"

import { BLOG_SLUG, POST_EXCERPT_MARKER } from '@/consts'
import { capitalCase } from './text/capital-case'
import { getSlug, getSlugBaseName, getSlugDir, getSlugSubPaths } from './urls'

export const POSTS_DIR = 'src/content/posts'
export const REVIEWS_DIR = 'src/content/review'

/**
 * Represents a blog post because we need something independent of astro:content that
 * works client side.
 */
export interface IPost {
  id: string
  body?: string

  data: {
    authors?: string[]
    description?: string
    heroImage?: string
    heroImageAlt?: string
    title: string

    added: Date
    updated?: Date
    sections?: string[][]
    tags: string[]
  }
}

/**
 * Format a section id which is a slug into a human readable string.
 * It replaces dashes with spaces, capitalizes each word, and replaces 'and' with '&'.
 * It also replaces slashes with ' / ' to indicate hierarchy but in a more readable way.
 * @param section
 * @returns
 */
export function formatSection(section: string): string {
  return section
    .replace('/', ' / ')
    .replace(/-+/g, ' ')
    .replace('and', '&')
    .split(' ')
    .map(t => capitalCase(t))
    .join(' ')
}

// export function getPostExcerpt(post: IPost) {
//   console.log(post.body)
//   const sentences =
//     post.body?.split('\n').filter((x: string) => x.length > 0) ?? []

//   if (sentences.length > 0) {
//     return sentences[0]
//   } else {
//     return ''
//   }
// }

export function getPostUrl(post: IPost): string {
  return `${BLOG_SLUG}/${getSlug(post.id)}`
}

export function getPostSlugDir(post: IPost): string {
  return getSlugDir(getSlug(post.id))
}

export function getPostSection(post: IPost): string {
  return getSlugBaseName(post.id)
}

/**
 * Returns all path combinations from a post.id slug
 * @param post
 * @returns
 */
export function getPostSlugSubPaths(post: IPost): string[] {
  return getSlugSubPaths(post.id)
}

// export function getAllPosts(authorMap: IAuthorMap): IAuthorPost[] {
//   return sortPosts(
//     getPostPaths().map(path => getPostByPath(path)),
//     authorMap
//   )
// }

// export function getAllPosts(authorMap: IAuthorMap): IAuthorPost[] {
//   return sortPosts(
//     getPostPaths()
//       .map(path => getPostByPath(path))
//       .concat(getReviewPaths().map(path => getReviewByPath(path))),
//     authorMap
//   )
// }

// export function getAllPostsAndReviews(): IBasePost[] {
//   return getAllPosts().concat(getAllReviews())
// }

// export const allPostsBySlugMap = (
//   posts: { slug: string; fields: IFieldMap }[],
// ) => {
//   let ret: IPost = {}

//   posts.forEach(post => {
//     ret[post.slug] = post
//   })

//   return ret
// }

// export function getCategories(post: CollectionEntry<"posts">) {
//   const ret: IFieldMap = []

//   post.data.categories.forEach(category => {
//     let path = category.split("/").concat(["All"])

//     let pathMap: IPost = {}
//     ret.push(pathMap)

//     pathMap[path[0]] = {}
//     pathMap[path[0]]["All"] = {}

//     path.forEach(p => {
//       if (!(p in pathMap)) {
//         pathMap[p] = {}
//       }

//       pathMap = pathMap[p]
//     })
//   })

//   return ret
// }

// export function getCategoryPostMap(
//   posts: CollectionEntry<"blog">[],
//   max: number = -1
// ): IFieldMap {
//   const categoryMap: IFieldMap = {}

//   posts.forEach(post => {
//     post.data.categories.forEach((category: string) => {
//       const path = category.split("/")
//       const c = path[0]
//       const s = path.length > 1 ? path[1] : "All"

//       if (!(c in categoryMap)) {
//         categoryMap[c] = {}
//       }

//       if (!(s in categoryMap[c])) {
//         categoryMap[c][s] = []
//       }

//       if (!("All" in categoryMap[c])) {
//         categoryMap[c]["All"] = []
//       }

//       if (max === -1 || categoryMap[c][s].length < max) {
//         categoryMap[c][s].push(post)
//       }

//       if (s !== "All") {
//         // every post is added to all by default
//         if (max === -1 || categoryMap[c]["All"].length < max) {
//           categoryMap[c]["All"].push(post)
//         }
//       }
//     })
//   })

//   return categoryMap
//}

export interface IPostFields {
  index: number
  title: string
  type: string
  description: string
  hero: string
  heroCaption: string
  authors: string[]
  categories: string[]
  related: string[]
  status: string
  tags: string[]
  pros: string[]
  cons: string[]
  details: string[]
  rating: number
}

// export interface IBasePost extends IMarkdownBase {
//   frontmatter: IPostFields
//   //stats: IReadingStats
// }

// export const getPostFrontmatter = (path: string): IPostFields => {
//   const items: IPostFields = {

//     index: -1,
//     title: '',
//     description: '',
//     //rawContent: '',
//     //rawExcerpt: '',
//     hero: '',
//     heroCaption: '',
//     authors: [],
//     categories: [],
//     tags: [],
//     type: 'post',
//     related: [],
//     status: 'draft',
//     pros: [],
//     cons: [],
//     details: [],
//     rating: 0,
//   }

//   getFrontmatter(path, items)

//   return items
// }

/**
 * Turns a slug into a file path and uses that to read
 * the post data.
 *
 * @param slug a post slug
 * @returns a post with basic frontmatter loaded.
 */
// export function getPostBySlug(slug: string): IBasePost {
//   return getPostByPath(`${POSTS_DIR}/${slug}.md`)
// }

// export function getPostByPath(path: string, index: number = -1): IBasePost {
//   // const fullPath = join(
//   //   isPublished ? POSTS_DIR : DRAFTS_DIR,
//   //   `${slug}.md`
//   // )

//   const post = {
//     fields: getFields(index, path),
//     frontmatter: getPostFrontmatter(path),
//   }

//   // if (post.data.hero === "") {
//   //   post.data.hero = `generic${(index % GENERIC_IMAGES) + 1}`
//   // }

//   return post
// }

export function getPostExcerpt(post: IPost): string {
  // 1. Use description if provided
  if (post.data.description) {
    return post.data.description.trim()
  }

  const markdown = post.body

  if (!markdown) {
    return ''
  }

  if (markdown.includes(POST_EXCERPT_MARKER)) {
    const beforeMore = markdown.split(POST_EXCERPT_MARKER)[0]
    return beforeMore.trim().replace(/\n/g, ' ')
  }

  // 3. Fallback to first non-empty paragraph
  const firstParagraph = markdown
    .split('\n\n') // Split into paragraphs
    .find(p => p.trim().length > 0) // Find first non-empty

  return firstParagraph?.replace(/\n/g, ' ').trim() ?? ''
}
