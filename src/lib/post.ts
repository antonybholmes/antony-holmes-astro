// post functions that work in browser

//import { join } from "path"

import { BLOG_SLUG } from '@/consts'
import { capitalCase } from './text/capital-case'
import { getSlug, getSlugBaseName, getSlugDir, getSlugSubPaths } from './urls'

export const POSTS_DIR = 'src/content/posts'
export const REVIEWS_DIR = 'src/content/review'

export function formatSection(section: string): string {
  return section
    .replace(/-+/g, ' ')
    .replace('and', '&')
    .split(' ')
    .map(t => capitalCase(t))
    .join(' ')
}

interface IPost {
  id: string
  body?: string | undefined
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
