import { Quote } from 'lucide-react'
import type { ReactNode } from 'react'

export function QuotePanel({
  src,
  srcUrl,
  children,
}: {
  src?: string
  srcUrl?: string
  children: ReactNode
}) {
  let srcElem: ReactNode = null

  if (src) {
    srcElem = src

    if (srcUrl) {
      srcElem = <a href={srcUrl}>{src}</a>
    }
  }

  return (
    <blockquote>
      <span
        id="quote-panel-indicator"
        className="bg-linear-to-b from-blue-600 to-purple-600 absolute top-0 left-0 h-full w-0.75"
      />
      <Quote className="fill-foreground stroke-none rotate-180" size={32} />
      {children}
      {srcElem && <p className="text-right text-sm">&mdash; {srcElem}</p>}
    </blockquote>
  )
}
