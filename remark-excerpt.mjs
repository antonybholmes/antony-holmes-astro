import { toString } from 'mdast-util-to-string'
import { EXIT, visit } from 'unist-util-visit'

export function remarkExcerpt() {
  return function (tree, file) {
    visit(tree, 'paragraph', node => {
      // Extract the text content of the first paragraph
      file.data.astro.frontmatter.description = toString(node)
      // Stop traversal after finding the first paragraph
      return EXIT
    })
  }
}
