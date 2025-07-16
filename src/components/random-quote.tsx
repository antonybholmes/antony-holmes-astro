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
    return (
      <span id="random-quote" className="text-foreground/50">
        Loading...
      </span>
    )
  }

  return (
    <span id="random-quote" className="text-foreground/50">
      {quote.url ? (
        <BaseLink
          href={quote.url}
          target={TARGET_BLANK}
          className="hover:underline"
        >
          {`"${quote.quote}"`}
        </BaseLink>
      ) : (
        `"${quote.quote}"`
      )}
    </span>
  )
}
