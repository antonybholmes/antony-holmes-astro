import type { IPostProps } from "./post-tags"
import { PreviewPost } from "./preview-post"

export function LatestPost({ post }: IPostProps) {
  return (
    <PreviewPost
      post={post}
      showAvatarImage={false}
      headerClassName="text-3xl"
    />
  )
}
