import fallbackImages from '../../fallback-images.json'

export function fixHeroPath(hero: string): string {
  // dont need to bother with path
  if (!hero.includes('/')) {
    hero = `/assets/images/blog/${hero}`
  }

  if (!hero.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i)) {
    hero += '.webp'
  }

  return hero
}

/**
 * Tries to resolve the hero image for a post. If the post has a hero image set, it will return that.
 * If not, it will return a fallback image based on the post's sections.
 * If no sections match, it will return a generic fallback image.
 * @param entry
 * @returns
 */
export function getHeroImage(
  title: string,
  hero: string | undefined | null,
  sections: string[][]
): string {
  if (hero) {
    return fixHeroPath(hero)
  }

  const hash = hashSlug(title)

  if (sections?.some(s => s.includes('Transit'))) {
    return fallbackImages['transit'][hash % fallbackImages['transit'].length]
  }

  if (sections?.some(s => s.includes('Engineering'))) {
    return fallbackImages['engineering'][
      hash % fallbackImages['engineering'].length
    ]
  }

  if (sections?.some(s => s.includes('Health'))) {
    return fallbackImages['health'][hash % fallbackImages['health'].length]
  }

  if (sections?.some(s => s.includes('Films'))) {
    return fallbackImages['films'][hash % fallbackImages['films'].length]
  }

  if (
    sections?.some(
      s =>
        s.includes('Finance') ||
        s.includes('Economics') ||
        s.includes('Business') ||
        s.includes('Brokerages') ||
        s.includes('Investing') ||
        s.includes('Trading') ||
        s.includes('Retirement')
    )
  ) {
    return fallbackImages['finance'][hash % fallbackImages['finance'].length]
  }

  if (sections?.some(s => s.includes('Photos'))) {
    return fallbackImages['photos'][hash % fallbackImages['photos'].length]
  }

  if (sections?.some(s => s.includes('Phone'))) {
    return fallbackImages['phone'][hash % fallbackImages['phone'].length]
  }

  if (sections?.some(s => s.includes('Bank') || s.includes('Credit'))) {
    return fallbackImages['bank'][hash % fallbackImages['bank'].length]
  }

  if (sections?.some(s => s.includes('News'))) {
    return fallbackImages['news'][hash % fallbackImages['news'].length]
  }

  return fallbackImages['default'][hash % fallbackImages['default'].length]
}

// Simple hash for consistent fallback selection
function hashSlug(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0 // Convert to 32bit int
  }
  return Math.abs(hash)
}
