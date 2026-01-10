import { cn } from '@/lib/shadcn-utils'
import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 300

const CLS = `fixed bottom-6 right-6 z-50
        h-11 w-11 rounded-full
        bg-foreground/70 backdrop-blur-sm text-background
        flex items-center justify-center
        shadow-lg transition-all duration-300 ease-in-out
        hover:bg-foreground/90 cursor-pointer`

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      title="Back to top"
      className={cn(
        CLS,
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      )}
    >
      <ChevronUp />
    </button>
  )
}
