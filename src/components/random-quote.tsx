import { TARGET_BLANK } from '@/consts'
import { httpFetch } from '@/lib/http/http-fetch'
import { RotateCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { VCenterRow } from './layout/v-center-row'
import { BaseLink } from './link/base-link'

export function RandomQuote() {
  const [quote, setQuote] = useState<{ quote: string; url: string } | null>(
    null
  )

  async function fetchQuote() {
    const quotes =
      await httpFetch.getJson<{ quote: string; url: string }[]>('/quotes.json')

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
    <VCenterRow id="random-quote" className="group gap-x-2">
      {quote.url ? (
        <BaseLink href={quote.url} target={TARGET_BLANK}>
          {`"${quote.quote}"`}
        </BaseLink>
      ) : (
        <span> {`"${quote.quote}"`} </span>
      )}
      <button
        onClick={() => fetchQuote()}
        className="group-hover:opacity-100 opacity-0 transition-opacity cursor-pointer"
        title="Another delicious quote, perhaps?"
      >
        <RotateCw className="stroke-foreground w-4 h-4 aspect-square" />
      </button>
    </VCenterRow>
  )
}
