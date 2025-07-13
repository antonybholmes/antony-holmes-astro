import { Resvg } from '@resvg/resvg-js'
import { format } from 'date-fns'
import fs from 'fs/promises'
import { globby } from 'globby'
import matter from 'gray-matter'
import path from 'path'

function escapeXML(str: string): string {
  return str.replace(/[&<>"']/g, char => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    }
    return escapeMap[char] || char
  })
}

async function main() {
  const files = await globby('src/content/blog/**/*.md')
  const template = await fs.readFile('src/assets/og-template.svg', 'utf8')
  const outputDir = 'public/og'

  await fs.mkdir(outputDir, { recursive: true })

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    const { data } = matter(content)
    const title = escapeXML(data.title || 'Untitled')
    const author = escapeXML(data.author || 'Anonymous')
    const rawDate = data.added ? new Date(data.added) : new Date()
    const formattedDate = escapeXML(format(rawDate, 'MMM dd, yyyy'))

    const svg = template
      .replace('{{title}}', title)
      .replace('{{author}}', author)
      .replace('{{date}}', formattedDate)

    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1200 },
    })

    const rawBuffer = resvg.render().asPng()

    const png = new Uint8Array(
      rawBuffer.buffer,
      rawBuffer.byteOffset,
      rawBuffer.byteLength
    )

    const slug = data.slug || path.basename(file, '.md')
    const outputPath = path.join(outputDir, `${slug}.png`)
    await fs.writeFile(outputPath, png)
    console.log(`✅ Generated OG image for ${slug}`)
  }
}

main()
