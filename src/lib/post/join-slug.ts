import type { SlugPath } from '@/consts'

export function joinSlug(...parts: SlugPath[]): SlugPath {
  return parts.flatMap(part => part)
}

/**
 * Give all posts a flat slug based on their id.
 * This is useful for generating URLs that are independent of the file structure.
 *
 * @param post
 * @returns
 */
export function getPostFlatSlug(post: { id: string }): string {
  return post.id.split('/').pop() || post.id
}
