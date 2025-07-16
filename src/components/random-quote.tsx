import { httpFetch } from '@/lib/http/http-fetch'
import { useEffect, useState } from 'react'

export function RandomQuote() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const fetchQuote = async () => {
      const quotes = await httpFetch.getJson<string[]>('/quotes.json')

      const randomIndex = Math.floor(Math.random() * quotes.length)
      setQuote(`"${quotes[randomIndex]}"`)
    }

    fetchQuote()
  }, [])

  return (
    <span id="random-quote" className="text-foreground/50">
      {quote}
    </span>
  )
}
