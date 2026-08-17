import { BLOG_HOME_SLUG, type SlugPath } from '@/consts'
import { PATH_SEP } from '../http/urls'
import { growingSubsets } from '../utils'
import { getPostFlatSlug, joinSlug } from './join-slug'
import {
  fixPath,
  formatSection,
  getPostSlugs,
  postSectionToSlugPath,
  sectionToSlug,
  type IPost,
} from './post'

export function slugToBreadcrumbs(path: SlugPath): SlugPath {
  const pathSubsets = growingSubsets(path.map(p => p.path))

  const crumbs: SlugPath = []

  for (const [pi, part] of path.entries()) {
    const subset = pathSubsets[pi]

    const slug = sectionToSlug(subset)

    const name = formatSection(part.name)

    crumbs.push({ name, path: fixPath(slug) })
  }

  return crumbs
}

export function getPostSectionBreadcrumbs(
  post: IPost,
  root = BLOG_HOME_SLUG
): SlugPath {
  const slugPath = joinSlug(root, postSectionToSlugPath(post))

  return slugToBreadcrumbs(slugPath)
}

export function slugPathToSlug(path: SlugPath): string {
  return fixPath(path.map(r => r.path).join(PATH_SEP))
}

/**
 * Turns a slug into a path that can be used in the URL.
 * @param path
 * @returns
 */
export function pathToSlug(path: SlugPath | undefined = undefined): string {
  return path ? fixPath(path.map(r => r.path).join(PATH_SEP)) : ''
}

export function getPostFlatUrl(
  post: IPost,
  root: SlugPath = BLOG_HOME_SLUG
): string {
  return fixPath(`${pathToSlug(root)}/${getPostFlatSlug(post)}`)
}

export function getPostUrls(
  post: IPost,
  root: SlugPath = BLOG_HOME_SLUG
): string[] {
  const paths: string[] = getPostSlugs(post).map(path => {
    return fixPath(`${pathToSlug(root)}/${path}`)
  })

  return paths
}
