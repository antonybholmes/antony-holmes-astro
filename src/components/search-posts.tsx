import { Document } from 'flexsearch'
import { useEffect, useRef, useState } from 'react'

export default function SearchReact() {
  const [query, setQuery] = useState('')

  const [results, setResults] = useState<{ id: string; title: string }[]>([])
  const indexRef = useRef<Document | null>(null)
  const docMapRef = useRef<Map<string, { id: string; title: string }> | null>(
    null
  )

  const loadIndex = async () => {
    if (indexRef.current) return

    const [indexJson, docsJson] = await Promise.all([
      fetch('/search/index.json').then(res => res.json()),
      fetch('/search/docs.json').then(res => res.json()),
    ])

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
    docMapRef.current = new Map(
      docsJson.map((doc: { id: string }) => [doc.id, doc])
    )
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
      await loadIndex()

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
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <a href={`/blog/${result.id}`}>{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
