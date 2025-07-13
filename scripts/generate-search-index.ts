import { format } from 'date-fns'
import { Document } from 'flexsearch'
import fs from 'fs/promises'
import { globby } from 'globby'
import matter from 'gray-matter'
import path from 'path/win32'

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

const files = await globby('src/content/blog/**/*.md')

const index = new Document({
  tokenize: 'forward',
  cache: true,

  document: {
    id: 'id',
    index: ['title', 'body'],
  },
})

const documents: { id: string; title: string; body: string }[] = []

for (const file of files) {
  const fileContent = await fs.readFile(file, 'utf8')
  const { data, content } = matter(fileContent)
  const title = escapeXML(data.title || 'Untitled')
  const author = escapeXML(data.author || 'Anonymous')
  const rawDate = data.added ? new Date(data.added) : new Date()
  const formattedDate = escapeXML(format(rawDate, 'MMM dd, yyyy'))
  const slug = path.basename(file, '.md')
  const doc = {
    id: slug,
    title,
    body: content, // Use plain text or stripped markdown
  }

  console.log(doc)

  index.add(doc)

  documents.push(doc)
}

// Save binary index and documents
fs.mkdir('./public/search', { recursive: true })

const exportedIndex: Record<string, string> = {}

await index.export(async function (key, data) {
  exportedIndex[key] = data
})

await fs.writeFile('./public/search/index.json', JSON.stringify(exportedIndex))

await fs.writeFile(
  './public/search/docs.json',
  JSON.stringify(documents.map(({ id, title }) => ({ id, title })))
)

console.log('✅ FlexSearch index and docs generated')
