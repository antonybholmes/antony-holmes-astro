import { Star, StarHalf } from 'lucide-react'

interface IProps {
  rating: number
}

export const StarRating = ({ rating }: IProps) => {
  const n = Math.floor(rating)

  const stars = []

  for (let i = 0; i < n; ++i) {
    stars.push(
      <li className="hover:scale-125 opacity-75 hover:opacity-100 duration-500 transition-all ease-in-out">
        <Star className="w-6" key={stars.length} fill="" stroke="" />
      </li>
    )
  }

  if (rating > n) {
    stars.push(
      <li className="flex flex-row opacity-75 hover:opacity-100 hover:scale-125 duration-500 transition-all ease-in-out">
        <StarHalf className="w-6" key={stars.length} fill="" stroke="" />
        <StarHalf
          className="w-6 -scale-x-100 -ml-6"
          key={stars.length}
          fill="white"
          stroke=""
        />
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

  stars.push(
    <li>
      <span>{rating} / 5</span>
    </li>
  )

  return (
    <ul className="flex flex-row items-center flex-nowrap gap-1 fill-amber-300 stroke-amber-300 text-sm">
      {stars}
    </ul>
  )
}
