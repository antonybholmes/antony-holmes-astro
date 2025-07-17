import { gsap } from 'gsap'
import { ChevronUp } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { VCenterRow } from './layout/v-center-row'

export function Signature() {
  const spanBRef = useRef<HTMLSpanElement>(null)
  const insertRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (spanBRef.current && insertRef.current) {
      timelineRef.current = gsap
        .timeline()
        .to(spanBRef.current, {
          y: -6,
          duration: 0.3,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        })
        .to(
          insertRef.current,
          {
            y: 4,
            duration: 0.3,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
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
    timelineRef.current?.pause()

    gsap
      .timeline()
      .to(spanBRef.current, { y: 0, duration: 0.2 })
      .to(insertRef.current, { y: 0, duration: 0.2 }, '<') // reset position
  }

  return (
    <VCenterRow className="text-foreground/80 relative text-base font-bold">
      <span>Antony</span>
      <span
        className="relative flex h-full w-4 flex-row items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          className="absolute -top-2 -rotate-25 text-sky-700"
          ref={spanBRef}
        >
          B
        </span>
        <ChevronUp
          className="text-foreground/40 absolute top-3 h-4 w-4"
          ref={insertRef}
        />
      </span>

      <span>Holmes</span>
    </VCenterRow>
  )
}
