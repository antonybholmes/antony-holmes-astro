import { TARGET_BLANK } from '@/consts'
import { httpFetch } from '@/lib/http/http-fetch'
import { RotateCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BaseRow } from './layout/base-row'
import { BaseLink } from './link/base-link'

interface IQuote {
  quote: string
  url: string
}

export function RandomQuote() {
  const [quotes, setQuotes] = useState<IQuote[]>([])

  const [quote, setQuote] = useState<IQuote | null>(null)

  async function fetchQuote() {
    const quotes = await httpFetch.getJson<IQuote[]>('/api/quotes.json')
    setQuotes(quotes)
    getQuote(quotes)
  }

  async function getQuote(quotes: IQuote[]) {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote({
      quote: quotes[randomIndex].quote,
      url: quotes[randomIndex].url,
    })
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  if (!quote) {
    return <span id="random-quote">Loading something stupid...</span>
  }

  return (
    <BaseRow
      id="random-quote"
      className="group gap-x-3 items-start justify-between w-full"
    >
      {quote.url ? (
        <BaseLink href={quote.url} target={TARGET_BLANK}>
          {`"${quote.quote}"`}
        </BaseLink>
      ) : (
        <span> {`"${quote.quote}"`} </span>
      )}
      <button
        onClick={() => getQuote(quotes)}
        className="group group-hover:opacity-100 opacity-0 transition-opacity cursor-pointer"
        title="Another delicious quote, perhaps?"
      >
        <RotateCw className="opacity-50 hover:opacity-100 trans-opacity stroke-foreground w-4 h-4 aspect-square animate-[spin_3s_linear_infinite]" />
      </button>
    </BaseRow>
  )
}
