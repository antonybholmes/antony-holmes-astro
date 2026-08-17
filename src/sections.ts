export const ENGINEERING_DESCRIPTION = `Over the years, I've had the opportunity to work on a variety of engineering projects, 
using multiple programming languages. Here's a few of my insights, experiences, and lessons learned.`

export const REVIEW_DESCRIPTION = `A collection of reviews of things that interest me.`

export const BOOKS_DESCRIPTION = `Do you like words and the smell of paper? Then you might enjoy reading books.`

export const FINANCE_DESCRIPTION = `Understanding finance is crucial. I share my thoughts on personal finance,
investments, and economic insights to help you make informed financial decisions.`

export const NEWS_DESCRIPTION = `Here's the scoop.`

export const PHOTOS_DESCRIPTION = `A collection of my photos.`

export const SECTION_DESCRIPTIONS: Record<string, string> = {
  engineering: ENGINEERING_DESCRIPTION,
  reviews: REVIEW_DESCRIPTION,
  books: BOOKS_DESCRIPTION,
  finance: FINANCE_DESCRIPTION,
  news: NEWS_DESCRIPTION,
  photos: PHOTOS_DESCRIPTION,
}

export function getSectionDescription(section: string): string {
  const key = section.toLowerCase()
  return SECTION_DESCRIPTIONS[key] ?? ''
}
