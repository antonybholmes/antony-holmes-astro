import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { VCenterRow } from './layout/v-center-row'

export function Signature() {
  const antonyRef = useRef<HTMLSpanElement>(null)
  const holmesRef = useRef<HTMLSpanElement>(null)
  const spanBRef = useRef<HTMLSpanElement>(null)
  const insertRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    timelineRef.current = gsap
      .timeline()
      .to(
        antonyRef.current,
        {
          duration: 1,
          opacity: 0.6,
          ease: 'power3.inOut',
        },
        0
      )
      .to(
        holmesRef.current,
        {
          x: '1.5rem',
          duration: 1,
          opacity: 0.6,
          //ease: 'elastic.out',
          //yoyo: true,
          //repeat: -1,
          ease: 'power3.inOut',
        },
        0
      )
      .to(
        spanBRef.current,
        {
          opacity: 1,
          duration: 1,
          x: 0,

          //fontSize: '2rem',
          ease: 'power3.inOut',
          //scale: 1.2,
          //ease: 'elastic.out',
          //yoyo: true,
          //repeat: -1,
        },
        0
      )

      .pause()

    return () => {
      // Clean up on unmount
      timelineRef.current?.kill()
    }
  }, [])

  const handleMouseEnter = () => {
    timelineRef.current?.play()
  }

  const handleMouseLeave = () => {
    timelineRef.current?.reverse()

    //gsap.timeline().reverse()
    //.to(spanBRef.current, { rotate: -25, duration: 0.2 })
    //.to(insertRef.current, { y: 0, duration: 0.2 }, '<') // reset position
  }

  return (
    <VCenterRow
      className="relative text-2xl font-bold h-8 gap-x-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      //style={{ fontFamily: 'var(--font-heading)' }}
    >
      <span
        ref={antonyRef}
        className="pointer-events-none bg-linear-to-br from-cyan-300 to-blue-600 bg-clip-text text-transparent left-0"
      >
        Antony
      </span>
      <VCenterRow
        className="relative gap-x-2"

        //style={{ fontFamily: 'var(--font-heading)' }}
      >
        <span
          className="text-sky-700 pointer-events-none absolute opacity-0"
          //style={{ fontFamily: 'Dancing Script' }}
          ref={spanBRef}
          style={{ transform: 'translateX(0.5rem)' }}
        >
          B.
        </span>
        {/* <ChevronUp
        className="text-foreground/40 absolute scale-y-150 top-5 h-4 w-4 left-20 pointer-events-none"
        ref={insertRef}
      /> */}

        <span
          ref={holmesRef}
          className="  pointer-events-none bg-linear-to-br from-cyan-300 to-blue-600 bg-clip-text text-transparent"
        >
          Holmes
        </span>
      </VCenterRow>
    </VCenterRow>
  )
}
