import { useKeyDownListener } from '@/hooks/keydown-listener'
import { Search as SearchIcon } from 'lucide-react'
import { useState, type SetStateAction } from 'react'
import { BaseCol } from './layout/base-col'
import { VCenterRow } from './layout/v-center-row'
import { Dialog, DialogContent, DialogTrigger } from './shadcn/ui/themed/dialog'

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

const initPagefind = async (): Promise<Pagefind> => {
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

export const Search = () => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>()
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
          if (
            data.raw_url.endsWith('guides-and-tutorials/') ||
            data.raw_url.includes('page') ||
            data.raw_url.includes('tag') ||
            data.raw_url.includes('read-time') ||
            data.raw_url.includes('changelog') ||
            data.raw_url.includes('terms/') ||
            data.raw_url.endsWith('calculators/')
          ) {
            continue
          }

          results.push(data)
        }
        setIsSearching(false)
        setResults(results)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={openSearchBar}>
      <DialogTrigger
        data-open={open}
        className="cursor-pointer text-white/80 hover:text-white data-[open=true]:text-white trans-color"
      >
        <SearchIcon size={20} />
      </DialogTrigger>
      <DialogContent
        overlayVariant="default"
        overlayColor="trans"
        contentVariant="glass"
        position="1/10"
        className="px-8 py-5 search w-19/20 lg:w-2/3 xl:w-1/2"
      >
        <BaseCol className="gap-y-6">
          <VCenterRow className="py-1 gap-x-2 text-white/80 placeholder:text-white/50 text-sm">
            <SearchIcon size={20} />
            <input
              value={searchTerm}
              onChange={e => onChange(e.target.value)}
              placeholder="Search..."
              className="outline-none text-white"
            />
          </VCenterRow>
          {results.length > 0 && (
            <BaseCol className="gap-y-2">
              {results.map(result => (
                <div
                  key={result.raw_url}
                  onSelect={() => {
                    window.location.href = result.raw_url
                  }}
                  className="grid  grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  <div className="aspect-4/3 lg:aspect-video overflow-hidden rounded-lg bg-muted/50">
                    <img
                      src={result.meta.image}
                      className="h-full object-center object-cover"
                    />
                  </div>
                  <div className="col-span-3 lg:col-span-4">
                    <a
                      className="w-full overflow-hidden text-sm font-bold sm:text-base"
                      href={result.raw_url}
                    >
                      {result.meta.title}
                    </a>
                    <div
                      className="text-xs sm:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: result.excerpt,
                      }}
                    />
                  </div>
                </div>
              ))}
            </BaseCol>
          )}
        </BaseCol>
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
