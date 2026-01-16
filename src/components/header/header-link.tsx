import type { ColorMode } from '@/interfaces/color-mode'
import type { ILinkProps } from '@/interfaces/link-props'
import { useRef, useState } from 'react'

const BAR_WIDTH = '3px'
export const LINK_CLS =
  'block relative whitespace-nowrap font-semibold tracking-tight py-2 animate-button'

const A_CLS = `flex group flex-col  justify-center trans-color 
  data-[state=active]:font-medium text-foreground/60 
  data-[mode=trans]:text-white/50 data-[mode=dark]:text-white/80 
  data-[mode=light]:data-[state=active]:text-foreground 
  data-[mode=trans]:data-[state=active]:text-white 
  data-[mode=dark]:data-[state=active]:text-white 
  data-[mode=dark]:hover:text-white
  data-[mode=light]:hover:text-foreground
  data-[mode=trans]:hover:text-white boldable-text-tab h-12
  border-b border-transparent
  data-[mode=light]:data-[state=active]:border-foreground
  data-[mode=dark]:data-[state=active]:border-background
  data-[mode=trans]:data-[state=active]:border-background`

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
      <span className="flex flex-row items-center justify-center relative">
        {children}
      </span>
    </a>
  )
}
