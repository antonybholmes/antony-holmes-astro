import { ICON_CLS, type IIconProps } from '@interfaces/icon-props'
import { cn } from '@lib/shadcn-utils'

const Y2 = 12
const Y1 = Y2 - 6
const Y3 = Y2 + 6

export function IndexArrowIcon({
  w = 'w-4 h-4',
  stroke = 'stroke-white',
  strokeWidth = 2.5,
  hover,
  className,
}: IIconProps) {
  // const lineRef = useRef<SVGLineElement>(null)
  // const arrowRef = useRef<SVGPathElement>(null)
  // const animationRef = useRef<gsap.core.Timeline>(null)

  // useEffect(() => {
  //   if (lineRef.current && arrowRef.current) {
  //     animationRef.current = gsap
  //       .timeline()
  //       .to(lineRef.current, {
  //         opacity: 1,
  //         duration: 0.5,
  //         ease: 'power2.out',
  //       })
  //       .to(
  //         arrowRef.current,
  //         {
  //           x: '6px',
  //           duration: 0.5,
  //           ease: 'elastic.out',
  //         },
  //         '<'
  //       )

  //       .pause()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (hover === 'on') {
  //     animationRef.current?.play()
  //   } else if (hover === 'off') {
  //     animationRef.current?.reverse()
  //   } else {
  //     animationRef.current?.pause()
  //   }
  // }, [hover])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 24 24`}
      className={cn(ICON_CLS, w, stroke, className)}
      style={{ strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }}
      strokeWidth={strokeWidth}
    >
      <line
        //ref={lineRef}
        x1={7}
        y1={Y2}
        x2={18}
        y2={Y2}
        className="scale-x-0 duration-400 group-hover:scale-x-100 transition-transform origin-center"
      />
      <path
        //ref={arrowRef}
        d={`M 9,${Y1} L 15,${Y2} L 9,${Y3}`}
        className="transition-transform duration-500 ease-in-out group-hover:translate-x-[6px]"
      />
    </svg>
  )
}
