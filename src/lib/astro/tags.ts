import { getCollection, type CollectionEntry } from 'astro:content'

export function getTagPostMap<T extends CollectionEntry<'blog'>>(
  posts: T[],
  max: number = -1
): Map<string, T[]> {
  const tagMap = new Map<string, T[]>()

  for (const post of posts.filter(
    post => post.data.tags && post.data.tags.length > 0
  )) {
    for (let tag of post.data.tags!) {
      //tag = getUrlFriendlyTag(tag)
      if (!tagMap.has(tag)) {
        tagMap.set(tag, [])
      }

      if (max === -1 || tagMap.get(tag)!.length < max) {
        tagMap.get(tag)!.push(post)
      }
    }
  }

  return tagMap
}

//let cachedTags: { tag: string; count: number }[] | null = null

export async function getUniqueTags(): Promise<
  { name: string; count: number }[]
> {
  //if (cachedTags) return cachedTags

  const tagMap = getTagPostMap(await getCollection('blog'))

  const tags = [...tagMap.entries()]
    .sort((a, b) => {
      const d = b[1].length - a[1].length

      // sort by count descending, then alphabetically
      return a[0].localeCompare(b[0]) //d !== 0 ? d : a[0].localeCompare(b[0])
    })
    .map(e => ({ name: e[0], count: e[1].length }))

  return tags
}
