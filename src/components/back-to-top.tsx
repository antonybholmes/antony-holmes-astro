import { cn } from '@/lib/shadcn-utils'
import { gsap } from 'gsap'
import { ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const SCROLL_THRESHOLD = 300
//const SCALE = 1.1

const CLS = `fixed bottom-6 right-6 z-50
        h-12 w-12 rounded-full aspect-square
        bg-foreground/70 backdrop-blur-sm text-background
        flex items-center justify-center
        shadow-lg hover:bg-foreground/90 cursor-pointer`

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  //const [hover, setHover] = useState(false)

  const buttonRef = useRef(null)
  const arrowRef = useRef(null)

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

  useEffect(() => {
    gsap.to([buttonRef.current, arrowRef.current], {
      y: visible ? 0 : '-0.5rem',
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0.8,
      duration: 0.4,
      ease: 'back.out',
      stagger: 0.05,
    })
  }, [visible])

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      //onMouseEnter={() => setHover(true)}
      //onMouseLeave={() => setHover(false)}
      title="Back to top"
      className={cn(
        CLS,
        visible ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      // style={{
      //   transform: `scale(${visible ? '1' : '0.8'})`,
      //   opacity: visible ? 1 : 0,
      // }}
    >
      <ChevronUp
        ref={arrowRef}
        className="w-6 h-6 aspect-square "
        // style={{
        //   transform: `scale(${visible ? 1 : 1.25})`,
        //   opacity: visible ? 1 : 0,
        // }}
      />
    </button>
  )
}
