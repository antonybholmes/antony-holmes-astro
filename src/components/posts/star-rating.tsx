import { Star, StarHalf } from 'lucide-react'
import { VCenterRow } from '../layout/v-center-row'

interface IProps {
  rating: number
}

//const STAR_WIDTH = 1.5 // Width of each star icon
//const STAR_GAP = 0.25 // Gap between stars in rem
//const STAR_COUNT = 5 // Total number of stars
//const WIDTH = STAR_COUNT * STAR_WIDTH + (STAR_COUNT - 1) * STAR_GAP

// export const StarRating = ({ rating }: IProps) => {
//   const stars = []
//   const emptyStars = []

//   const n = Math.floor(rating)
//   const r = rating - n

//   for (let i = 0; i < 5; ++i) {
//     stars.push(
//       <li className="shrink-0" key={i}>
//         <Star className="w-6" fill="" stroke="" />
//       </li>
//     )
//     emptyStars.push(
//       <li className=" shrink-0" key={i}>
//         <Star className="w-6" fill="" stroke="" />
//       </li>
//     )
//   }

//   //Pad so each is 5 stars in length
//   // while (stars.length < 5) {
//   //   stars.push(
//   //     <li className="hover:scale-125 opacity-75 hover:opacity-100 duration-500 transition-all ease-in-out">
//   //       <Star className="w-6" key={stars.length} fill="white" stroke="" />
//   //     </li>
//   //   )
//   // }

//   return (
//     <VCenterRow className="gap-x-2">
//       <VCenterRow className="relative" style={{ width: `${WIDTH}rem` }}>
//         <ul className="absolute overflow-hidden left-0  gap-x-1 flex flex-row items-center flex-nowrap fill-white stroke-amber-300 text-sm">
//           {emptyStars}
//         </ul>
//         <ul
//           className="absolute bg-body overflow-hidden left-0 flex flex-row gap-x-1 items-center flex-nowrap fill-amber-300 stroke-amber-300 text-sm"
//           style={{
//             width: `${n * (STAR_WIDTH + STAR_GAP) + r * STAR_WIDTH}rem`,
//           }}
//         >
//           {stars}
//         </ul>
//       </VCenterRow>
//       <span className="text-sm text-foreground/50">
//         {rating.toLocaleString()} / 5
//       </span>
//     </VCenterRow>
//   )
// }

export const StarRating = ({ rating }: IProps) => {
  const stars = []

  const n = Math.floor(rating)
  const r = rating - n

  for (let i = 0; i < n; ++i) {
    stars.push(
      <li className="shrink-0" key={i}>
        <Star className="w-6" fill="" stroke="" />
      </li>
    )
  }

  if (r > 0) {
    stars.push(
      <li
        className="shrink-0 flex flex-row grow-0 gap-0 items-center"
        key={stars.length}
      >
        <StarHalf className="w-6" fill="" stroke="" />
        <StarHalf className="w-6 -ml-6 -scale-x-100" fill="white" stroke="" />
      </li>
    )
  }

  //Pad so each is 5 stars in length
  while (stars.length < 5) {
    stars.push(
      <li className="hover:scale-125 opacity-75 hover:opacity-100 duration-500 transition-all ease-in-out">
        <Star className="w-6" key={stars.length} fill="white" stroke="" />
      </li>
    )
  }

  return (
    <VCenterRow className="gap-x-2">
      <ul className="flex flex-row gap-x-1 items-center flex-nowrap fill-amber-300 stroke-amber-300 text-sm">
        {stars}
      </ul>

      <span className="text-sm text-foreground/50">
        {rating.toLocaleString()} / 5
      </span>
    </VCenterRow>
  )
}
