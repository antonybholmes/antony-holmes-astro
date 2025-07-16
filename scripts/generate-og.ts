import { Resvg } from '@resvg/resvg-js'
import { format } from 'date-fns'
import fs from 'fs'
import { globby } from 'globby'
import matter from 'gray-matter'
import path from 'path'

const OUTPUT_DIR = 'public/img/og'

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
  const files = await globby('src/content/blog/**/{*.md,*.mdx}')
  const template = await fs.readFileSync('src/assets/og-template.svg', 'utf8')

  await fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const file of files) {
    const content = await fs.readFileSync(file, 'utf8')
    const { data } = matter(content)
    const title = escapeXML(data.title || 'Untitled')
    const authors = data.authors
    const rawDate = data.added ? new Date(data.added) : new Date()
    const formattedDate = escapeXML(format(rawDate, 'MMM dd, yyyy'))

    const svg = template
      .replace('{{title}}', title)
      .replace(
        '{{author}}',
        authors && authors.length > 0 ? authors.join(', ') : 'Anonymous'
      )
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
    const outputPath = path.join(OUTPUT_DIR, `${slug}.png`)

    if (!fs.existsSync(outputPath)) {
      await fs.writeFileSync(outputPath, png)
      console.log(`✅ Generated OG image for ${slug}`)
    } else {
      console.log(`⚠️ OG image for ${slug} already exists, skipping`)
    }
  }
}

main()
