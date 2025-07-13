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
    <nav className="text-sm">
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            data-active={activeId === id}
            className="data-[active=true]:font-bold data-[active=true]:text-theme data-[active=true]:bg-theme/10 rounded-theme py-2 cursor-pointer"
            style={{
              paddingLeft: `${level / 2}rem`,
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
