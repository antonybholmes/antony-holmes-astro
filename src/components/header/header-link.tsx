import type { ColorMode } from '@/interfaces/color-mode'
import type { ILinkProps } from '@/interfaces/link-props'
import { useRef, useState } from 'react'

const BAR_WIDTH = '3px'
export const LINK_CLS =
  'block relative whitespace-nowrap font-semibold tracking-tight py-2 animate-button'

const A_CLS = `"flex group flex-col justify-center 
  items-center relative data-[state=active]:font-semibold text-foreground/50 
  data-[mode=trans]:text-white/50 data-[mode=dark]:text-white/50 
  data-[mode=light]:data-[state=active]:text-foreground data-[mode=trans]:data-[state=active]:text-white 
  data-[mode=dark]:data-[state=active]:text-white boldable-text-tab h-16`

interface IHeaderLinkProps extends ILinkProps {
  isActive?: boolean
  mode?: ColorMode
}

export const HeaderLink = ({
  href,
  isActive,
  mode = 'light',
  children,
  ...props
}: IHeaderLinkProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [hover, setHover] = useState(false)

  // const animationRef = useRef<gsap.core.Timeline>(null)
  // const backRef = useRef<gsap.core.Timeline>(null)

  // useEffect(() => {
  //   if (ref.current) {
  //     animationRef.current = gsap
  //       .timeline()
  //       .to(
  //         ref.current,
  //         {
  //           scale: 1,
  //           opacity: 1,
  //           transformOrigin: 'center',
  //           duration: 0.5,
  //           ease: 'power2.out',
  //         },
  //         0
  //       )

  //       .pause()

  //     backRef.current = gsap
  //       .timeline()
  //       .to(
  //         ref.current,
  //         {
  //           scale: 0,
  //           opacity: 0,
  //           transformOrigin: 'center',
  //           duration: 0.5,
  //           ease: 'power2.out',
  //         },
  //         0
  //       )
  //       .pause()
  //   }
  // }, [])

  // const handleMouseEnter = () => {
  //   if (!isActive) {
  //     backRef.current?.pause()
  //     animationRef.current?.restart()
  //   }
  // }

  // const handleMouseLeave = () => {
  //   if (!isActive) {
  //     animationRef.current?.pause()
  //     backRef.current?.restart()
  //   }
  // }

  return (
    <a
      href={href}
      data-state={isActive ? 'active' : 'inactive'}
      data-mode={mode}
      className={A_CLS}
      {...props}
      //onMouseEnter={handleMouseEnter}
      //onMouseLeave={handleMouseLeave}
    >
      <span className="flex flex-row items-center justify-center h-14 relative">
        {children}
        <span
          ref={ref}
          data-mode={mode}
          className="absolute w-full opacity-0 scale-x-80 left-0 bottom-0 bg-theme data-[mode=trans]:bg-white data-[mode=dark]:bg-white rounded-full group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-500 ease-in-out origin-center"
          style={{ height: BAR_WIDTH }}
        />
      </span>
    </a>
  )
}
