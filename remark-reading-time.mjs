import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree)
    const { minutes, text } = getReadingTime(textOnPage)

    const m = Math.max(1, Math.ceil(minutes))

    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.readingTime = {
      text: `${m} min read`,
      minutes: m,
    }
    //data.astro.frontmatter.minutes = Math.ceil(minutes).toString()

    //console.log('Reading time:', text, minutes)
  }
}
