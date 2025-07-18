import { getCollection } from 'astro:content'
import { sectionToParts } from '../post'
import { growingSubsets } from '../utils'
import type { PostWithHero } from './post'

export function getPostSectionMap(
  posts: PostWithHero[],
  max: number = -1
): Map<string, PostWithHero[]> {
  const sectionMap = new Map<string, PostWithHero[]>()

  //sectionMap.set('All', posts)
  sectionMap.set('All categories', max === -1 ? posts : posts.slice(0, max))

  for (const post of posts) {
    for (const section of post.data.sections ?? []) {
      // for each section, create all growing subsets of url names
      // e.g. from ["Reviews", "Engineering", "AI"] we get:
      // [["Reviews"], ["Reviews",Engineering"], ["Reviews","Engineering","AI"]]
      // so we can map each post to more specific sections
      for (const sectionNames of growingSubsets(sectionToParts(section))) {
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

let cachedSections: string[] | null = null

export async function getUniqueSections(): Promise<string[]> {
  if (cachedSections) return cachedSections

  const posts = await getCollection('blog')

  const sections = new Set<string>()

  for (const post of posts) {
    for (const section of post.data.sections ?? []) {
      for (const sectionNames of growingSubsets(sectionToParts(section))) {
        const sectionName = sectionNames.join('/')
        sections.add(sectionName)
      }
    }
  }

  cachedSections = [...sections].sort()

  return cachedSections
}
