import type { ILinkProps } from '@/interfaces/link-props'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

const DURATION = 0.4
const BAR_WIDTH = '3px'
export const LINK_CLS =
  'block relative whitespace-nowrap font-semibold tracking-tight py-2 animate-button'

interface IHeaderLinkProps extends ILinkProps {
  isActive?: boolean
}

export const HeaderLink = ({
  href,
  isActive,
  children,
  ...props
}: IHeaderLinkProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [hover, setHover] = useState(false)

  const animationRef = useRef<gsap.core.Timeline>(null)
  const backRef = useRef<gsap.core.Timeline>(null)

  useEffect(() => {
    if (ref.current) {
      animationRef.current = gsap
        .timeline()
        .to(ref.current, {
          width: '100%',
          duration: 0.5,
          ease: 'power3.out',
        })
        .to(
          ref.current,
          {
            x: 5,
            delay: 0.2,
            duration: 0.5,
            ease: 'back.out ',
          },
          0
        )
        .to(
          ref.current,
          {
            x: 0,
            duration: 0.5,
            delay: 0.4,
            ease: 'power3.out',
          },
          0
        )
        .pause()

      backRef.current = gsap
        .timeline()
        .to(ref.current, {
          width: 0,
          duration: 0.5,
          ease: 'power3.inOut',
        })
        .pause()
    }
  }, [])

  // useEffect(() => {
  //   let t1 = gsap.timeline()

  //   if (hover) {
  //     t1.to(
  //       ref.current,
  //       {
  //         width: "100%",
  //         duration: DURATION,
  //         ease: "power3.out",
  //       },
  //       0
  //     )
  //       .to(
  //         ref.current,
  //         {
  //           x: 10,
  //           delay: 0.2,
  //           duration: DURATION,
  //           ease: "back.out(1)",
  //         },
  //         0
  //       )
  //       .to(
  //         ref.current,
  //         {
  //           x: 0,
  //           duration: DURATION,
  //           delay: 0.4,
  //           ease: "power3.out",
  //         },
  //         0
  //       )
  //       .play()
  //   } else {
  //     t1.to(
  //       ref.current,
  //       {
  //         width: 0,
  //         duration: DURATION,
  //         ease: "power3.out",
  //       },
  //       0
  //     ).play()
  //   }
  // }, [hover])

  const handleMouseEnter = () => {
    if (!isActive) {
      backRef.current?.pause()
      animationRef.current?.restart()
    }
  }

  const handleMouseLeave = () => {
    if (!isActive) {
      animationRef.current?.pause()
      backRef.current?.restart()
    }
  }

  return (
    <a
      href={href}
      data-state={isActive ? 'active' : 'inactive'}
      className="flex flex-col justify-center items-center relative data-[state=active]:font-semibold data-[state=active]:text-theme boldable-text-tab px-4 h-16"
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="flex flex-row items-center justify-center h-16 relative">
        {children}
        <span
          ref={ref}
          className="absolute w-0 left-0 bottom-0 bg-theme"
          style={{ height: BAR_WIDTH }}
        />
      </span>
    </a>
  )
}
