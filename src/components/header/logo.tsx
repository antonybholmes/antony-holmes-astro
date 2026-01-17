import { gsap } from 'gsap'
import { DraftingCompass } from 'lucide-react'
import { useEffect, useRef } from 'react'

const LOGO_CLS = `flex w-10 h-10 aspect-square rounded-2xl bg-blue-500 
  hover:bg-violet-400 flex-row items-center justify-center font-bold 
  text-lg text-white hover:rounded-none transition-all duration-500 ease-in-out
  relative group overflow-hidden`

export function Logo() {
  const ref = useRef<HTMLAnchorElement>(null)
  const animationRef = useRef<gsap.core.Timeline>(null)

  useEffect(() => {
    if (ref.current) {
      animationRef.current = gsap
        .timeline()
        .to(ref.current, {
          duration: 0.5,
          borderRadius: 0,
          opacity: 0.9,
          ease: 'power.out',
        })

        .pause()
    }
  }, [])

  const handleMouseEnter = () => {
    animationRef.current?.play()
  }

  const handleMouseLeave = () => {
    animationRef.current?.reverse()
  }

  return (
    <a ref={ref} href="/" className={LOGO_CLS} aria-label="Home">
      <DraftingCompass className="absolute left-1/2 top-1/2 -translate-1/2 group-hover:opacity-0 group-hover:scale-80 transition-all duration-500 ease-in-out" />
      <span className="absolute left-1/2 top-1/2 -translate-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-80 transition-all duration-500 ease-in-out">
        ah
      </span>
    </a>
  )
}
