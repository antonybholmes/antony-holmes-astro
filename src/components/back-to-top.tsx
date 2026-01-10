import { cn } from '@/lib/shadcn-utils'
import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 300
const SCALE = 1.1

const CLS = `fixed bottom-6 right-6 z-50
        h-12 w-12 rounded-full aspect-square
        bg-foreground/70 backdrop-blur-sm text-background
        flex items-center justify-center
        shadow-lg transition-all duration-300 ease-in-out
        hover:bg-foreground/90 cursor-pointer`

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const parentScale = hover ? SCALE : 1

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title="Back to top"
      className={cn(
        CLS,
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
      style={{ transform: `scale(${parentScale})` }}
    >
      <ChevronUp
        className="transition-all duration-300 ease-in-out w-6 h-6 aspect-square"
        style={{ transform: `scale(${1 / parentScale})` }}
      />
    </button>
  )
}
