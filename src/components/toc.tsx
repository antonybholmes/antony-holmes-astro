import { useEffect, useState } from 'react'

export function TableOfContents() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    // Collect all h1, h2, h3 from the page that have IDs (added by rehype-slug)
    const elements = Array.from(
      document.querySelectorAll('h1[id], h2[id], h3[id]')
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

  return (
    <nav className="sticky top-40">
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            style={{
              marginLeft: (level - 1) * 16,
              marginBottom: 8,
              fontWeight: activeId === id ? 'bold' : 'normal',
              color: activeId === id ? '#0070f3' : '#000',
              cursor: 'pointer',
            }}
            onClick={() =>
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            {text}
          </li>
        ))}
      </ul>
    </nav>
  )
}
