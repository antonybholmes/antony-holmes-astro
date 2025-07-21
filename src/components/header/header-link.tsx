import type { ColorMode } from '@/interfaces/color-mode'
import type { ILinkProps } from '@/interfaces/link-props'
import { useRef, useState } from 'react'

const BAR_WIDTH = '3px'
export const LINK_CLS =
  'block relative whitespace-nowrap font-semibold tracking-tight py-2 animate-button'

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

  const animationRef = useRef<gsap.core.Timeline>(null)
  const backRef = useRef<gsap.core.Timeline>(null)

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
      className="flex group flex-col justify-center items-center relative data-[state=active]:font-semibold data-[mode=dark]:text-white data-[state=active]:text-theme boldable-text-tab px-4 h-16"
      {...props}
      //onMouseEnter={handleMouseEnter}
      //onMouseLeave={handleMouseLeave}
    >
      <span className="flex flex-row items-center justify-center h-14 relative">
        {children}
        <span
          ref={ref}
          data-mode={mode}
          className="absolute w-full opacity-0 scale-x-80 left-0 bottom-0 bg-theme data-[mode=dark]:bg-white rounded-full group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-500 ease-in-out origin-center"
          style={{ height: BAR_WIDTH }}
        />
      </span>
    </a>
  )
}
