// post functions for use only in astro header for rendering pages, i.e. for
// functions that will not run within the browser. This is because we cannot
// load a lot of astros templates into the browser and they cause an overhead
// so we must firewall functions designed to deal interact in astro components
// (server like) vs those that are for the client.

import { getCollection, type CollectionEntry } from 'astro:content'

import { range } from '../math/range'
import { getSlugSubPaths } from '../urls'
import { getAllMDFiles } from './files'

import { getUrlFriendlyTag } from '../http/urls'
import { POSTS_DIR, REVIEWS_DIR } from '../post'

export function getPostPaths() {
  return getAllMDFiles(POSTS_DIR)
}

export function getReviewPaths() {
  return getAllMDFiles(REVIEWS_DIR)
}

/**
 * Sort post in descending order by date added. If there is a date tie,
 * then order by title.
 * @param posts
 * @returns
 */
export function sortPostsByDateDesc(
  posts: CollectionEntry<'blog'>[]
): CollectionEntry<'blog'>[] {
  const ret = posts
    // .filter(post => {
    //   return (
    //     process.env.NODE_ENV === "development" ||
    //     post.data.status === "added"
    //   )
    // })
    // sort posts by date in descending order
    .sort((a, b) => {
      let d =
        new Date(b.data.updated ?? b.data.added).getTime() -
        new Date(a.data.updated ?? a.data.added).getTime()

      if (d !== 0) {
        return d
      }

      // dates equal so compare names
      return a.data.title.localeCompare(b.data.title)
    })

  return ret
}

// export function getPostExcerpt(post: CollectionEntry<'blog'>) {
//   const sentences = (post.body ?? '').split('\n').filter(x => x.length > 0)

//   if (sentences.length > 0) {
//     return sentences[0]
//   } else {
//     return ''
//   }
// }

export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  let posts = await getCollection('blog')

  // filter out posts that are drafts
  // this is useful for development so we can see all posts
  // but in production we only want to show published posts
  // and not drafts
  // this is also useful for the blog page where we want to show
  // all posts but not drafts
  // so we can use this function to get all posts
  // and then filter out drafts
  // in the component that renders the posts
  // this way we can still see drafts in development
  // but not in production
  if (import.meta.env.PROD) {
    posts = posts.filter(({ data }) => data.draft !== true)
  }

  // fix id to flatten the path
  posts = posts.map(post => {
    // flatten the path to just the slug
    post.id = post.id.split('/').pop() ?? post.id
    return post
  })

  return posts
}

export async function getSortedPosts(): Promise<CollectionEntry<'blog'>[]> {
  return sortPostsByDateDesc(await getPublishedPosts())
}

/**
 * Returns all path combinations from a post.id slug
 * @param post
 * @returns
 */
export function getPostSlugSubPaths(post: CollectionEntry<'blog'>): string[] {
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
//   let ret: any = {}

//   posts.forEach(post => {
//     ret[post.slug] = post
//   })

//   return ret
// }

// export function getCategories(post: CollectionEntry<"posts">) {
//   const ret: IFieldMap = []

//   post.data.categories.forEach(category => {
//     let path = category.split("/").concat(["All"])

//     let pathMap: any = {}
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

export function getTagPaths(tag: string): string[] {
  const parts = tag.split('/')

  const ret = range(0, parts.length).map(i =>
    parts
      .slice(0, i + 1)
      .map(p => getUrlFriendlyTag(p))
      .join('/')
  )

  return ret
}

export function getAuthorPostMap(
  posts: CollectionEntry<'blog'>[],
  max: number = -1
): Map<string, CollectionEntry<'blog'>[]> {
  const tagMap = new Map<string, CollectionEntry<'blog'>[]>()

  posts
    .filter(post => post.data.authors && post.data.authors.length > 0)
    .forEach(post => {
      post.data.authors!.forEach((author: string) => {
        const a = getUrlFriendlyTag(author)

        if (!tagMap.has(a)) {
          tagMap.set(a, [])
        }

        if (max === -1 || tagMap.get(a)!.length < max) {
          tagMap.get(a)!.push(post)
        }
      })
    })

  return tagMap
}
