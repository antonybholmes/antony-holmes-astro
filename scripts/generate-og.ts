import { getHeroImage } from '@/lib/astro/hero'
import { Resvg } from '@resvg/resvg-js'
import { format } from 'date-fns'
import fs from 'fs'
import { globby } from 'globby'
import matter from 'gray-matter'
import path from 'path'
import sharp from 'sharp'

const OUTPUT_DIR = 'public/assets/images/og'

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
  const template = fs.readFileSync('src/assets/og-template.svg', 'utf8')

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    const { data } = matter(content)
    const title = escapeXML(data.title || 'Untitled')
    const authors = data.authors
    const rawDate = data.added ? new Date(data.added) : new Date()
    const formattedDate = escapeXML(format(rawDate, 'MMM dd, yyyy'))

    let hero = getHeroImage(data.title, data.hero, data.sections ?? [])

    // fix for full path
    hero = `public${hero}`

    console.log('hero', hero)

    // hero is webp so embed as data URI

    let svg = template
      .replace('{{title}}', title)
      .replace(
        '{{author}}',
        authors && authors.length > 0 ? authors.join(', ') : 'Anonymous'
      )
      .replace('{{date}}', formattedDate)

    if (fs.existsSync(hero)) {
      // convert to png

      console.log('heroPath', hero)

      const heroBuffer = fs.readFileSync(hero)
      const pngBuffer = await sharp(heroBuffer).png().toBuffer()
      const base64Hero = pngBuffer.toString('base64')
      const dataUri = `data:image/png;base64,${base64Hero}`
      svg = svg.replace('{{hero}}', dataUri)
    }

    //console.log('Generating OG image for:', svg)

    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1200 },
    })

    const pngBuffer = resvg.render().asPng()

    const webpBuffer = await sharp(pngBuffer)
      .webp({ quality: 90 }) // adjust quality
      .toBuffer()

    // const buffer = new Uint8Array(
    //   webpBuffer.buffer,
    //   webpBuffer.byteOffset,
    //   webpBuffer.byteLength
    // )

    const buffer = new Uint8Array(
      pngBuffer.buffer,
      pngBuffer.byteOffset,
      pngBuffer.byteLength
    )

    const slug = data.slug || path.basename(file).replace(/\.(md|mdx)$/, '')
    const outputPath = path.join(OUTPUT_DIR, `${slug}.png`)
    //const outputPath = path.join(OUTPUT_DIR, `${slug}.webp`)

    //if (!fs.existsSync(outputPath)) {
    fs.writeFileSync(outputPath, buffer)
    console.log(`✅ Generated OG image for ${slug}`)
    //} else {
    //  console.log(`⚠️ OG image for ${slug} already exists, skipping`)
    //}
  }
}

main()
