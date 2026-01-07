import { getCollection } from 'astro:content'
import { growingSubsets } from '../utils'
import type { PostWithHero } from './post'

export function getPostSectionMap(
  posts: PostWithHero[],
  max: number = -1
): Map<string, PostWithHero[]> {
  const sectionMap = new Map<string, PostWithHero[]>()

  //sectionMap.set('All', posts)
  sectionMap.set('All', max === -1 ? posts : posts.slice(0, max))

  for (const post of posts) {
    for (const section of post.data.sections ?? []) {
      // for each section, create all growing subsets of url names
      // e.g. from ["Reviews", "Engineering", "AI"] we get:
      // [["Reviews"], ["Reviews",Engineering"], ["Reviews","Engineering","AI"]]
      // so we can map each post to more specific sections
      for (const sectionNames of growingSubsets(section)) {
        const sectionName = sectionNames.join('/')

        if (!sectionMap.has(sectionName)) {
          sectionMap.set(sectionName, [])
        }

        // if max is -1 or the section has less than max posts, add the post
        if (max === -1 || sectionMap.get(sectionName)!.length < max) {
          sectionMap.get(sectionName)!.push(post)
        }
      }
    }
  }

  return sectionMap
}

//let cachedSections: string[] | null = null

export async function getUniqueSections(): Promise<
  { name: string; count: number }[]
> {
  //if (cachedSections) return cachedSections

  const tagMap = getPostSectionMap(await getCollection('blog'))

  const tags = [...tagMap.entries()]
    .sort((a, b) => {
      const d = b[1].length - a[1].length

      // sort by count descending, then alphabetically
      return d !== 0 ? d : a[0].localeCompare(b[0])
    })
    .map(e => ({ name: e[0], count: e[1].length }))

  return tags
}
