import { TARGET_BLANK } from '@/consts'
import { httpFetch } from '@/lib/http/http-fetch'
import { useEffect, useState } from 'react'
import { BaseLink } from './link/base-link'

export function RandomQuote() {
  const [quote, setQuote] = useState<{ quote: string; url: string } | null>(
    null
  )

  useEffect(() => {
    const fetchQuote = async () => {
      const quotes =
        await httpFetch.getJson<{ quote: string; url: string }[]>(
          '/quotes.json'
        )

      const randomIndex = Math.floor(Math.random() * quotes.length)
      setQuote({
        quote: quotes[randomIndex].quote,
        url: quotes[randomIndex].url,
      })
    }

    fetchQuote()
  }, [])

  if (!quote) {
    return <span id="random-quote">Loading something stupid...</span>
  }

  return (
    <span id="random-quote">
      {quote.url ? (
        <BaseLink href={quote.url} target={TARGET_BLANK}>
          {`"${quote.quote}"`}
        </BaseLink>
      ) : (
        `"${quote.quote}"`
      )}
    </span>
  )
}
