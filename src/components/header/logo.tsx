import { cn } from '@/lib/shadcn-utils'
import { useState } from 'react'
import { HCenterRow } from '../layout/h-center-row'

export function Logo() {
  const [hover, setHover] = useState<null | boolean>(null)
  //const [down, setDown] = useState(false)

  return (
    <HCenterRow
      className="items-center w-12 h-12"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a
        href="/"
        className={cn(
          'flex w-10 h-10 aspect-square rounded-[1rem] bg-gradient-to-br from-cyan-400 to-blue-500 flex-row items-center justify-center font-semibold text-lg text-white trans-all',
          hover === true && 'animate-round-then-scale',
          hover === false && 'animate-scale-then-round'
        )}
        aria-label="Home"
      >
        ah
      </a>
    </HCenterRow>
  )
}
