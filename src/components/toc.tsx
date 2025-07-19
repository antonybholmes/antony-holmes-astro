import { useEffect, useState } from 'react'

export interface ITocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<ITocItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    // Collect all h1, h2, h3 from the page that have IDs (added by rehype-slug)
    const elements = Array.from(
      // document.querySelectorAll('h1[id], h2[id], h3[id], h4[id]')
      // h1 is reserved for the main title, so we can skip it
      document.querySelectorAll('h2[id], h3[id], h4[id]')
    ) as HTMLElement[]

    const headingData = elements.map(el => ({
      id: el.id,
      text: el.innerText,
      level: Number(el.tagName.substring(1)),
    }))
    setHeadings(headingData)

    const onScroll = () => {
      const scrollPosition = window.scrollY + 100 // offset for better detection
      let current = headingData[0]?.id

      for (const heading of headingData) {
        const element = document.getElementById(heading.id)
        if (element && element.offsetTop <= scrollPosition) {
          current = heading.id
        } else {
          break
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (headings.length < 1) {
    return null
  }

  return (
    <nav className="text-sm">
      <h2 className="mb-4 text-base font-semibold border-b border-border/50 pb-2">
        Table of Contents
      </h2>
      <ul className="font-medium">
        {headings.map(({ id, text, level }) => (
          <li key={id} data-active={activeId === id} className="">
            <button
              data-active={activeId === id}
              className="w-full text-left text-foreground hover:text-theme hover:underline   data-[active=true]:text-theme data-[active=true]:bg-theme/10 rounded-theme py-2"
              onClick={() =>
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              style={{
                paddingLeft: `${level / 2}rem`,
              }}
              aria-label={`Scroll to ${text}`}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
