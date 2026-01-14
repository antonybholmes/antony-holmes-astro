import { capitalCase } from './text/capital-case'
import { fixName, type UndefStr } from './text/text'

// Parts of the path to exclude from breadcrumbs navigation
const EXCLUDE = new Set(['tag', 'category', 'section', 'page'])

export type ICrumb = {
  label: string
  path: string
}

export interface ICrumbProps {
  //showCrumbs?: boolean
  crumbs?: ICrumb[]
}

function _formatName(name: string) {
  return fixName(capitalCase(name.replace(/^\d{4}-\d{2}-\d{2}-/, '')))
}

export function createCrumbs(url: UndefStr): ICrumb[] {
  url = url ?? '/'

  console.log(`Creating crumbs for url: ${url}`)
  const segments = url
    .split('/')
    .filter(
      (s: string) => s.length > 0 && !EXCLUDE.has(s) && s.search(/^\d+$/) === -1
    )
    .slice(0, -1)

  const crumbs: ICrumb[] = []

  for (let i = 0; i < segments.length; ++i) {
    // strip date from slug then attempt to convert
    // to more readable form by capitalizing and
    // changing dashes to spaces.
    const label = _formatName(segments[i])

    const path = `/${segments.slice(0, i + 1).join('/')}`

    crumbs.push({ label, path })
  }

  return crumbs
}
