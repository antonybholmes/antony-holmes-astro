import { gsap } from 'gsap'
import { ChevronUp } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { VCenterRow } from './layout/v-center-row'

export function Signature() {
  const antonyRef = useRef<HTMLSpanElement>(null)
  const holmesRef = useRef<HTMLSpanElement>(null)
  const spanBRef = useRef<HTMLSpanElement>(null)
  const insertRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (spanBRef.current && insertRef.current) {
      timelineRef.current = gsap
        .timeline()
        .to(spanBRef.current, {
          rotate: 0,
          duration: 1,
          ease: 'elastic.out',
          //yoyo: true,
          //repeat: -1,
        })
        .to(
          spanBRef.current,
          {
            y: '0.75rem',
            duration: 1,
            ease: 'elastic.out',
            //yoyo: true,
            //repeat: -1,
          },
          '<'
        )
        .to(
          insertRef.current,
          {
            y: 3,
            opacity: 0,
            duration: 0.3,
            ease: 'power1.inOut',
            //yoyo: true,
            //repeat: -1,
          },
          '<'
        )
        .to(
          antonyRef.current,
          {
            x: '-0.25rem',

            duration: 0.3,
            ease: 'power1.inOut',
            //yoyo: true,
            //repeat: -1,
          },
          '<'
        )
        .to(
          holmesRef.current,
          {
            x: '0.25rem',

            duration: 0.3,
            ease: 'power1.inOut',
            //yoyo: true,
            //repeat: -1,
          },
          '<'
        )
        .pause()
    }

    return () => {
      // Clean up on unmount
      timelineRef.current?.kill()
    }
  }, [])

  const handleMouseEnter = () => {
    console.log('Mouse entered signature area')
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
      className="text-foreground/80 relative text-2xl font-semibold items-stretch"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={antonyRef}
        className="pointer-events-none bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent"
      >
        Antony
      </span>
      <span className="relative flex grow w-3 flex-row items-center justify-center pointer-events-none">
        <span
          className="absolute -top-4 -rotate-25 text-sky-700 pointer-events-none"
          ref={spanBRef}
        >
          B
        </span>
        <ChevronUp
          className="text-foreground/40 absolute top-4 h-4 w-4 pointer-events-none"
          ref={insertRef}
        />
      </span>

      <span
        ref={holmesRef}
        className="pointer-events-none bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent"
      >
        Holmes
      </span>
    </VCenterRow>
  )
}
