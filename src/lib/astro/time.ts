import { render, type CollectionEntry } from 'astro:content'

export async function getTimePostMap<T extends CollectionEntry<'blog'>>(
  posts: T[],
  max: number = -1
): Promise<Map<number, T[]>> {
  const tagMap = new Map<number, T[]>()

  for (const post of posts) {
    const { remarkPluginFrontmatter } = await render(post)

    const time = remarkPluginFrontmatter?.readingTime?.minutes ?? 0

    if (!tagMap.has(time)) {
      tagMap.set(time, [])
    }

    if (max === -1 || tagMap.get(time)!.length < max) {
      tagMap.get(time)!.push(post)
    }
  }

  return tagMap
}
