import { useKeyDownListener } from '@/hooks/keydown-listener'
import type { ColorMode } from '@/interfaces/color-mode'
import { Search as SearchIcon } from 'lucide-react'
import { useState, type SetStateAction } from 'react'
import { BaseCol } from './layout/base-col'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './shadcn/ui/themed/dialog'

const SEARCH_CLS = `cursor-pointer 
    text-foreground/80 hover:text-foreground data-[open=true]:text-foreground 
    data-[mode=dark]:text-white/80 data-[mode=dark]:hover:text-white 
    data-[mode=dark]:data-[open=true]:text-white trans-color`

const SEARCH_INPUT_CLS = `flex flex-row py-1 gap-x-3 group text-sm font-normal 
  text-foreground/60 hover:text-foreground focus-visible:text-foreground
  data-[has-search=true]:text-foreground
  outline-none border-none trans-color`

type SearchResultData = {
  meta: { image: string; title: string }
  excerpt: string
  raw_url: string
}

type SearchResult = {
  data: () => Promise<SearchResultData>
}

type SearchResponse = {
  results: SearchResult[]
}

type Pagefind = {
  init: () => void
  debouncedSearch: (value: string) => Promise<SearchResponse>
}

async function initPagefind(): Promise<Pagefind> {
  try {
    const module = import.meta.env.DEV
      ? '../../dist/pagefind/pagefind.js'
      : '/pagefind/pagefind.js'
    const pagefind = (await import(/* @vite-ignore */ module)) as Pagefind

    pagefind.init()

    return pagefind
  } catch (e) {
    return {
      init: () => {},
      debouncedSearch: async (v: string) => ({
        results: [],
      }),
    }
  }
}

// function filter(data: SearchResultData): boolean {
//   return (
//     data.raw_url.includes('page') ||
//     data.raw_url.includes('tag') ||
//     data.raw_url.includes('read-time') ||
//     data.raw_url.includes('year') ||
//     data.raw_url.includes('changelog') ||
//     data.raw_url.includes('terms') ||
//     data.raw_url.includes('all') ||
//     data.raw_url.includes('latest') ||
//     !data.raw_url.includes('/') ||
//     data.raw_url.endsWith('calculators/') ||
//     data.raw_url.endsWith('finance/') ||
//     data.raw_url.endsWith('news/') ||
//     data.raw_url.endsWith('engineering/') ||
//     data.raw_url.endsWith('technology/') ||
//     data.raw_url.endsWith('blog/') ||
//     data.raw_url.endsWith('guides-and-tutorials/') ||
//     data.raw_url.endsWith('dist/') ||
//     data.raw_url.endsWith('about/') ||
//     data.raw_url.endsWith('films/') ||
//     data.raw_url.endsWith('reviews/') ||
//     data.raw_url.endsWith('health/') ||
//     data.raw_url.endsWith('brokerages/') ||
//     data.raw_url.endsWith('credit-cards/') ||
//     data.raw_url === '/'
//   )
// }

export function Search({ mode = 'light' }: { mode: ColorMode }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [results, setResults] = useState<SearchResultData[]>([])
  const [pagefind, setPagefind] = useState<Pagefind>()

  async function openSearchBar(open: SetStateAction<boolean>) {
    setOpen(open)
    if (open && !pagefind && !isLoading) {
      setIsLoading(true)
      setPagefind(await initPagefind())
      setIsLoading(false)
    }
  }

  useKeyDownListener(e => {
    if (e instanceof KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        openSearchBar(open => !open)
      }
    }
  })

  async function onChange(value: string) {
    setSearchTerm(value)

    if (pagefind) {
      setIsSearching(true)
      const search = await pagefind.debouncedSearch(value)
      if (search) {
        console.log(search)
        const results = []
        for (const result of search.results) {
          if (results.length == 5) {
            break
          }

          const data = await result.data()

          // filter out guides, tags, read-time, changelog, terms, calculators
          //if (filter(data)) {
          //  continue
          //}

          results.push(data)
        }

        console.log(results)

        setIsSearching(false)
        setResults(results)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={openSearchBar}>
      <DialogTrigger data-open={open} data-mode={mode} className={SEARCH_CLS}>
        <SearchIcon size={20} />
      </DialogTrigger>
      <DialogContent
        overlayVariant="default"
        overlayColor="trans"
        contentVariant="glass"
        position="20"
        className="p-4 search w-19/20 lg:w-2/3 xl:w-1/2 2xl:w-1/3 flex flex-col gap-y-4"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle
            className={SEARCH_INPUT_CLS}
            data-has-search={searchTerm.length > 0}
          >
            <SearchIcon size={20} />
            <input
              value={searchTerm}
              onChange={e => onChange(e.target.value)}
              placeholder="Search..."
              className="outline-none placeholder:text-foreground/50"
            />
          </DialogTitle>
        </DialogHeader>
        {results.length > 0 && (
          <BaseCol>
            {results.map(result => (
              <a
                key={result.raw_url}
                href={result.raw_url}
                className="flex flex-row -mx-2 gap-4 hover:bg-foreground/10 outline-none border-none focus-visible:bg-foreground/10 p-2 rounded-xl trans-color"
                tabIndex={0}
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-muted  w-20 min-w-20 max-w-20">
                  <img
                    src={result.meta.image}
                    className="h-full object-center object-cover"
                  />
                </div>
                <div className="col-span-3 lg:col-span-5 py-1">
                  <h2 className="w-full overflow-hidden text-sm font-semibold">
                    {result.meta.title}
                  </h2>
                  <div
                    className="text-xs"
                    dangerouslySetInnerHTML={{
                      __html: result.excerpt,
                    }}
                  />
                </div>
              </a>
            ))}
          </BaseCol>
        )}

        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
