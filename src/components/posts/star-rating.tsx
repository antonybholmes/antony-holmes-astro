import { Star } from 'lucide-react'
import { VCenterRow } from '../layout/v-center-row'

interface IProps {
  rating: number
}

const STAR_WIDTH = 1.5 // Width of each star icon
const STAR_GAP = 0.25 // Gap between stars in rem
const STAR_COUNT = 5 // Total number of stars
const STAR_CLS =
  'shrink-0 flex flex-row items-center relative w-6 hover:scale-125 trans-transform'
//const WIDTH = STAR_COUNT * STAR_WIDTH + (STAR_COUNT - 1) * STAR_GAP

export const StarRating = ({ rating }: IProps) => {
  const stars = []

  const n = Math.floor(rating)
  const r = rating - n

  for (let i = 0; i < n; ++i) {
    stars.push(
      <li className={STAR_CLS} key={i}>
        <Star className="w-6" fill="" stroke="" />
      </li>
    )
    // emptyStars.push(
    //   <li className=" shrink-0" key={i}>
    //     <Star className="w-6" fill="" stroke="" />
    //   </li>
    // )
  }

  if (r > 0) {
    stars.push(
      <li className={STAR_CLS} key={stars.length}>
        <Star className="w-6 absolute left-0" fill="white" stroke="" />
        <VCenterRow
          className="absolute left-0 justify-start overflow-hidden"
          style={{ width: `${STAR_WIDTH * r}rem` }}
        >
          <Star className="w-6 shrink-0" fill="" stroke="" />
        </VCenterRow>
      </li>
    )
  }

  //Pad so each is 5 stars in length
  while (stars.length < 5) {
    stars.push(
      <li className={STAR_CLS} key={stars.length}>
        <Star className="w-6" key={stars.length} fill="white" stroke="" />
      </li>
    )
  }

  return (
    <VCenterRow className="gap-x-5">
      <ul className="flex flex-row gap-x-1 items-center flex-nowrap fill-amber-300 stroke-amber-300 text-sm">
        {stars}
      </ul>

      <span className=" text-sm flex flex-row gap-x-2 items-center">
        <span className="text-2xl font-medium">{rating.toLocaleString()}</span>
        <span className="text-foreground/25">/</span>
        <span className="text-2xl text-foreground/75">5</span>
      </span>
    </VCenterRow>
  )
}
