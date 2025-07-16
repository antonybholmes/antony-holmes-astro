import type { IFieldMap } from '@interfaces/field-map'

import versionConfig from '../version.json'

//export const SITE = "https://edb.rdf-lab.org"
export const SITE_TITLE = 'Antony Holmes'
export const SITE_SUBTITLE = 'Researcher & Software Engineer in New York'
export const SITE_AUTHOR = 'Antony Holmes'
export const APP_NAME = SITE_TITLE
// id for internally indentifying app and for use in prefixes etc
export const APP_ID = 'antonyholmes.dev'
export const SITE_DOMAIN = 'antonyholmes.dev'

export const HEADER_SEP = '-'

export const SITE_DESCRIPTION =
  "Antony Holmes's personal website for sharing experiments, tools, and resources related to software development, data science, and more."
export const EMAIL = 'hello@antonyholmes.dev'
export const RECORDS_PER_PAGE = 12
export const SEARCH_RECORDS_PER_PAGE = 5
export const AUTHOR_LATEST_POSTS = 5
export const VERSION = versionConfig.version
export const UPDATED = versionConfig.updated
export const GITHUB_URL = 'https://github.com/antonybholmes'
export const ANIMATION_DURATION_S = 0.3
export const ANIMATION_DURATION_MS = 250

export const TAG_SLUG = 'tag'
export const PAGE_1_SLUG = 'page-1'
export const PEOPLE_SLUG = '/people'
export const BLOG_SLUG = '/blog'

export const YEAR = new Date().getFullYear()

export const TEXT_SHOW_MORE = 'Show More'
export const TEXT_FILE = 'File'
export const TEXT_OPEN_FILE = 'Open Files from Device'
export const TEXT_RUN = 'Run'

export const STATUS_CODE_OK = 200

export const STATUS_SUCCESS = 'success'
export const STATUS_FAIL = 'fail'

export const COLOR_THEME = 'theme'

export const TRUE = 'true'
export const FALSE = 'false'
export const TEXT_HOME = 'Home'
export const TEXT_OK = 'Ok'
export const TEXT_CANCEL = 'Cancel'
export const TEXT_CLOSE = 'Close'
export const TEXT_CLEAR = 'Clear'
export const TEXT_CONTINUE = 'Continue'
export const TEXT_CONFIRM = 'Confirm'
export const TEXT_OPTIONS = 'Options'
export const TEXT_SETTINGS = 'Settings'
export const TEXT_HISTORY = 'History'
export const TEXT_SAVE = 'Save'
export const TEXT_SAVE_AS = 'Save As'
export const TEXT_EXPORT = 'Export'
export const TEXT_RESET = 'Reset'
export const TEXT_UPDATE = 'Update'
export const TEXT_OPEN = 'Open'
export const TEXT_NEW = 'New'
export const TEXT_NAME = 'Name'
export const TEXT_DRAG_HERE = 'Drop File(s) Here to Open'
export const TEXT_DELETE = 'Delete'
export const TEXT_DISPLAY = 'Display'
export const TEXT_DOWNLOAD_AS_TXT = 'Download as TXT'
export const TEXT_DOWNLOAD_AS_CSV = 'Download as CSV'
export const TEXT_SHOW = 'Show'
export const TEXT_TITLE = 'Title'
export const TEXT_BORDER = 'Border'
export const TEXT_SIGN_IN = 'Sign In'
export const TEXT_NEXT = 'Next'
export const TEXT_SIGN_OUT = 'Sign Out'
export const TEXT_SIGNED_OUT = 'Signed Out'
export const TEXT_SELECT_ALL = 'Select All'
export const TEXT_UNSELECT_ALL = 'Unselect All'
export const TEXT_SEARCH = 'Search'
export const TEXT_UNLABELLED = '<Unlabelled>'
export const TEXT_ADD = 'Add'
export const TEXT_HELP = 'Help'
export const TEXT_NA = 'NA'
export const TEXT_ZOOM = 'Zoom'
export const TEXT_SAVE_IMAGE = 'Save Image'
export const TEXT_SAVE_TABLE = 'Save Table'
export const TEXT_REMOVE_FROM_CART = 'Remove from Cart'

export const POST_EXCERPT_MARKER = '<!-- more -->'

export const SVG_CRISP_EDGES = 'crispEdges'

export interface IDialogParams {
  id: string
  params?: IFieldMap
}

export const NO_DIALOG: IDialogParams = { id: '' }

export const DEFAULT_DATE_FORMAT = 'MM/dd/yyyy'

export const SITE_URL = 'https://antonyholmes.dev'

export const TARGET_BLANK = '_blank'

export const MENU_ITEMS: {
  label: string
  path: string
  icon: string
  ariaLabel: string
}[] = [
  {
    label: TEXT_HOME,
    path: '/',
    icon: 'home',
    ariaLabel: 'Home',
  },
  {
    label: 'Blog',
    path: '/blog',
    icon: 'blog',
    ariaLabel: 'Blog',
  },
  // {
  //   label: 'Projects',
  //   href: '/projects',
  //   icon: 'projects',
  //   ariaLabel: 'Projects',
  // },
  {
    label: 'Resume',
    path: '/resume',
    icon: 'resume',
    ariaLabel: 'Resume',
  },
  {
    label: 'Publications',
    path: '/publications',
    icon: 'publications',
    ariaLabel: 'Publications',
  },
]

export const FOOTER_ITEMS = [
  // {
  //   label: 'Browse By Category',
  //   items: [
  //     {
  //       label: 'Blog',
  //       href: '/blog',
  //     },
  //     {
  //       label: 'Publications',
  //       href: '/publications',
  //     },
  //     {
  //       label: 'Projects',
  //       href: '/projects',
  //     },
  //     {
  //       label: 'People',
  //       href: '/people',
  //     },
  //   ],
  // },
  {
    label: 'General',
    items: [
      {
        label: 'About Antony',
        href: '/people/antony-holmes',
      },
      {
        label: 'About This Site',
        href: '/about',
      },
      {
        label: 'Contact',
        href: '/contact',
      },
    ],
  },
]
