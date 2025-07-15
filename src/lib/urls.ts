import { TAG_SLUG } from '@/consts'
import { getUrlFriendlyTag, PATH_SEP } from './http/urls'
import { range } from './math/range'

// export function getUrlFriendlyTag(tag: string): string {
//   return tag
//     .trim()
//     .toLowerCase()
//     .replaceAll('&', 'and')
//     .replaceAll(/[\ \-]+/g, '-')
// }

export function getUrlFriendlyImg(
  img: string,
  ext = 'webp',
  size: number | [number, number] | undefined = undefined
): string {
  if (size) {
    if (!Array.isArray(size)) {
      size = [size, size]
    }

    return `${getUrlFriendlyTag(img)}-${size[0]}x${size[1]}.${ext}`
  } else {
    return `${getUrlFriendlyTag(img)}.${ext}`
  }
}

export function getUrlFriendlyTags(tags: string[]): string[] {
  return tags.map(tag => getUrlFriendlyTag(tag))
}

// export function getFormattedTag(tag: string) {
//   return tag
//     .trim()
//     .replaceAll("-", " ")
//     .replaceAll(" and ", " & ")
//     .split(" ")
//     .map(tag => capitalize(tag))
//     .join(" ")
// }

export const getTagBaseUrl = (tag: string) => {
  return `${TAG_SLUG}/${getUrlFriendlyTag(tag)}`
}

export function getSlug(slug: string): string {
  return slug
    .replace(/\.md$/, '')
    .replaceAll('\\', PATH_SEP)
    .split(PATH_SEP)
    .map(p => getUrlFriendlyTag(p))
    .join(PATH_SEP)
    .toLowerCase()
}

export function getSlugDir(slug: string): string {
  if (!slug.includes(PATH_SEP)) {
    return ''
  }

  //console.log("test", slug, getSlug(slug).split(PATH_SEP).slice(0, -1).join(PATH_SEP))
  // remove last entry to get the dir part of the name
  return getSlug(slug).split(PATH_SEP).slice(0, -1).join(PATH_SEP)
}

export function getSlugBaseName(slug: string): string {
  // get the end of the path using slice and then return the last element
  return getSlugDir(slug).split(PATH_SEP).slice(-1)[0]
}

export function getSlugDirRoot(slug: string): string {
  return getSlugDir(slug).split(PATH_SEP)[0]
}

export function getSlugSubPaths(slug: string): string[] {
  const parts = getSlugDir(slug).split(PATH_SEP)

  const ret = range(0, parts.length).map(i =>
    parts.slice(0, i + 1).join(PATH_SEP)
  )

  return ret
}

export function getCanonicalSlug(path: string): string {
  return getSlug(path).replace(/^.+\//, '')
}

export function getDateFromSlug(slug: string): string {
  const match = slug.match(/(\d{4})-(\d{2})-(\d{2})/)
  return match ? match.slice(1, 4).join('-') : '2022-01-01'
}

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
