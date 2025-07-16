import { capitalCase } from './text/capital-case'
import { fixName, type UndefStr } from './text/text'

const EXCLUDE = ['Tag', 'Category', 'Section', 'Page']

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
  const segments = url.split('/').filter((s: string) => s.length > 0)

  const crumbs: ICrumb[] = []

  for (let i = 0; i < segments.length; ++i) {
    // strip date from slug then attempt to convert
    // to more readable form by capitalizing and
    // changing dashes to spaces.
    const label = _formatName(segments[i])

    const path = `/${segments.slice(0, i + 1).join('/')}`
    if (!EXCLUDE.includes(label) && label.search(/^\d+$/) === -1) {
      crumbs.push({ label, path })
    }
  }

  return crumbs
}
