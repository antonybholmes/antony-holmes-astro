import { httpFetch } from '@/lib/http/http-fetch'
import { Document } from 'flexsearch'
import { useEffect, useRef, useState } from 'react'
import { Autocomplete } from './autocomplete'

export default function SearchReact() {
  const [query, setQuery] = useState('')

  const [results, setResults] = useState<{ id: string; title: string }[]>([])
  const indexRef = useRef<Document | null>(null)
  const docMapRef = useRef<Map<string, { id: string; title: string }> | null>(
    null
  )

  const loadIndex = async () => {
    if (indexRef.current) return

    // const [indexJson, docsJson] = await Promise.all([
    //   fetch('/search/index.json').then(res => res.json()),
    //   fetch('/search/docs.json').then(res => res.json()),
    // ])

    const indexJson =
      await httpFetch.getJson<Record<string, string>>('/search/index.json')

    const docsJson =
      await httpFetch.getJson<{ id: string; title: string }[]>(
        '/search/docs.json'
      )

    //await fetch('/search/docs.json')
    //const docsJson = await docsRes.json()

    const idx = new Document({
      tokenize: 'forward',

      document: {
        id: 'id',
        index: ['title', 'body'],
      },
    })

    for (const [key, data] of Object.entries(indexJson)) {
      await idx.import(key as string, data as string)
    }

    indexRef.current = idx
    docMapRef.current = new Map(docsJson.map(doc => [doc.id, doc]))
  }

  //   useEffect(() => {
  //     async function loadIndex() {
  //       const [indexJson, docsJson] = await Promise.all([
  //         fetch('/search/index.json').then(res => res.json()),
  //         fetch('/search/docs.json').then(res => res.json()),
  //       ])

  //       const idx = new Document({
  //         tokenize: 'forward',

  //         document: {
  //           id: 'id',
  //           index: ['title', 'body'],
  //         },
  //       })

  //       for (const [key, data] of Object.entries(indexJson)) {
  //         await idx.import(key as string, data as string)
  //       }
  //       //await idx.import(indexJson);

  //       setIndex(idx)
  //       setDocuments(docsJson)
  //     }

  //     loadIndex()
  //   }, [])

  useEffect(() => {
    if (!query) {
      return
    }

    const runSearch = async () => {
      try {
        await loadIndex()
      } catch (error) {
        console.error('Error loading search index:', error)
        return
      }

      if (!indexRef.current || !docMapRef.current) {
        return
      }

      const rawResults = indexRef.current.search(query, { limit: 5 })
      const ids = [...new Set(rawResults.flatMap(entry => entry.result))]
      const flatIds = Array.isArray(ids[0]) ? ids.flat() : ids

      let found: { id: string; title: string }[] = []

      for (const id of flatIds) {
        const doc = docMapRef.current!.get(id as string)
        if (doc) {
          found.push(doc)
        }
      }

      setResults(found)
    }

    runSearch()
  }, [query])

  return (
    <div>
      <Autocomplete
        placeholder="Search posts..."
        value={query}
        onTextChange={v => setQuery(v)}
      >
        {results.map(result => (
          <li key={result.id} className="w-full">
            <a
              href={`/blog/${result.id}`}
              className="hover:bg-muted/50 p-1.5 w-full block"
            >
              {result.title}
            </a>
          </li>
        ))}
      </Autocomplete>
    </div>
  )
}
