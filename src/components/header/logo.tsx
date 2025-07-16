import { HCenterRow } from '../layout/h-center-row'

export function Logo() {
  //const [hover, setHover] = useState(false)
  //const [down, setDown] = useState(false)

  return (
    <HCenterRow className="items-center w-12 h-12">
      <a
        href="/"
        className="flex w-10 h-10 aspect-square rounded-[1rem] animate-scale-then-round hover:animate-round-then-scale bg-gradient-to-br from-cyan-400 to-blue-500 flex-row items-center justify-center font-semibold text-lg text-white trans-all"
        aria-label="Home"
      >
        ah
      </a>
    </HCenterRow>
  )
}
