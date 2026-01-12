import { getHeroImage } from '@/lib/astro/hero'
import { format } from 'date-fns'
import fs from 'fs'
import { globby } from 'globby'
import matter from 'gray-matter'
import path from 'path'
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cwd = process.cwd()

const CHROME_PATH = '/usr/bin/google-chrome'
const OUTPUT_DIR = 'public/assets/images/og'
const RX = 60

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
  //const template = fs.readFileSync('src/assets/og-template.svg', 'utf8')
  const template = fs.readFileSync('src/assets/og-template.html', 'utf8')

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    const { data } = matter(content)

    const slug = data.slug || path.basename(file).replace(/\.(md|mdx)$/, '')
    const outputPath = path.join(OUTPUT_DIR, `${slug}.png`)

    if (fs.existsSync(outputPath)) {
      console.log(`⚠️  OG image already exists for ${slug}, skipping.`)
      continue
    }

    const title = escapeXML(data.title || 'Untitled')
    const authors = data.authors
    const rawDate = data.added ? new Date(data.added) : new Date()
    const formattedDate = escapeXML(format(rawDate, 'MMM dd, yyyy'))

    let hero = getHeroImage(data.title, data.hero, data.sections ?? [])

    // fix for full path
    hero = `public${hero}`

    // hero is webp so embed as data URI

    let html = template
      .replace('{{title}}', title)
      .replace(
        '{{author}}',
        authors && authors.length > 0 ? authors.join(', ') : 'Anonymous'
      )
      .replace('{{date}}', formattedDate)
      .replaceAll('{{rx}}', RX.toString())

    if (fs.existsSync(hero)) {
      // convert to png

      const heroBuffer = fs.readFileSync(hero)
      //const pngBuffer = await sharp(heroBuffer).png().toBuffer()
      const base64Hero = heroBuffer.toString('base64')
      const dataUri = `data:image/webp;base64,${base64Hero}`

      const bgPath = path.join(cwd, hero)

      html = html.replace('{{hero}}', dataUri)
    }

    //console.log('Generating OG image for:', svg)

    // const resvg = new Resvg(svg, {
    //   fitTo: { mode: 'width', value: 1200 },
    // })

    //const pngBuffer = resvg.render().asPng()

    // const webpBuffer = await sharp(pngBuffer)
    //   .webp({ quality: 90 }) // adjust quality
    //   .toBuffer()

    // const buffer = new Uint8Array(
    //   webpBuffer.buffer,
    //   webpBuffer.byteOffset,
    //   webpBuffer.byteLength
    // )

    // const buffer = new Uint8Array(
    //   pngBuffer.buffer,
    //   pngBuffer.byteOffset,
    //   pngBuffer.byteLength
    // )

    //const outputPath = path.join(OUTPUT_DIR, `${slug}.webp`)

    //fs.writeFileSync(outputPath, buffer)
    //console.log(`✅ Generated OG image for ${slug}`)

    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: 'shell',
    })

    const page = await browser.newPage()

    // IMPORTANT: viewport defines output size
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1, // set to 2 for retina (2400x1260)
    })

    // const contentHtml = `
    // <html>
    //   <body style="
    //     margin: 0;
    //     width: 1200px;
    //     height: 630px;
    //     overflow: hidden;
    //     background: transparent;
    //   ">
    //     ${svg}
    //   </body>
    // </html>`

    //console.log('contentHtml', html)

    await page.setContent(html, { waitUntil: 'networkidle0' })

    //await page.waitForSelector('svg')

    // Screenshot entire viewport (exact size)
    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
      omitBackground: true,
    })

    console.log(`✅ Generated OG image for ${outputPath}`)

    await browser.close()
  }
}

main()
