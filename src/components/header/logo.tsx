import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { HCenterRow } from '../layout/h-center-row'

export function Logo() {
  const ref = useRef<HTMLAnchorElement>(null)
  const animationRef = useRef<gsap.core.Timeline>(null)

  useEffect(() => {
    if (ref.current) {
      animationRef.current = gsap
        .timeline()
        .to(ref.current, {
          duration: 0.5,
          borderRadius: '2rem',
          ease: 'power2.in',
        })
        .to(ref.current, {
          duration: 0.25,
          width: '3rem',
          height: '3rem',

          ease: 'power2.out',
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
    <HCenterRow
      className="items-center w-12 h-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        ref={ref}
        href="/"
        className="flex w-10 h-10 aspect-square rounded-[1rem] bg-gradient-to-br from-cyan-400 to-blue-500 flex-row items-center justify-center font-semibold text-lg text-white"
        aria-label="Home"
      >
        ah
      </a>
    </HCenterRow>
  )
}
