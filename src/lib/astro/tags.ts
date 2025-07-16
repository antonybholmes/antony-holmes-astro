import { getCollection, type CollectionEntry } from 'astro:content'

export function getTagPostMap(
  posts: CollectionEntry<'blog'>[],
  max: number = -1
): Map<string, CollectionEntry<'blog'>[]> {
  const tagMap = new Map<string, CollectionEntry<'blog'>[]>()

  posts
    .filter(post => post.data.tags && post.data.tags.length > 0)
    .forEach(post => {
      post.data.tags!.forEach((tag: string) => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, [])
        }

        if (max === -1 || tagMap.get(tag)!.length < max) {
          tagMap.get(tag)!.push(post)
        }
      })
      //})
    })

  return tagMap
}

let cachedTags: { tag: string; count: number }[] | null = null

export async function getUniqueTags(): Promise<
  { tag: string; count: number }[]
> {
  if (cachedTags) return cachedTags

  const tagMap = getTagPostMap(await getCollection('blog'))

  const tags = [...tagMap.entries()]
    .sort((a, b) => {
      const d = b[1].length - a[1].length

      // sort by count descending, then alphabetically
      return d !== 0 ? d : a[0].localeCompare(b[0])
    })
    .map(e => ({ tag: e[0], count: e[1].length }))

  cachedTags = tags

  return cachedTags
}
