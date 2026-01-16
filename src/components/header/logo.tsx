import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

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
    <a
      ref={ref}
      href="/"
      className="flex w-9 h-9 aspect-square rounded-xl bg-blue-500 hover:bg-fuchsia-400 flex-row items-center justify-center font-semibold text-lg text-white hover:rounded-none transition-all duration-500 ease-in-out"
      aria-label="Home"
    >
      ah
    </a>
  )
}
