import { useEffect, useState } from 'react'

const PATH = '/assets/images/og'

export function OGImage() {
  const [title, setTitle] = useState('')
  const [img, setImg] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const rawTitle = params.get('title') || ''
    const img = rawTitle.trim().toLowerCase().replace(/\s+/g, '-')
    setTitle(
      rawTitle
        .trim()
        .replaceAll('-', ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    setImg(img)
  }, [])

  if (!img) {
    return null
  }

  return (
    <img
      src={`${PATH}/${encodeURIComponent(img)}.png`}
      alt={title}
      title={title}
      aria-label={title}
      style={{ maxWidth: '1200px' }}
    />
  )
}
