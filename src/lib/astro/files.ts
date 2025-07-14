import fs from 'fs'
import path from 'path'

/**
 * Recursively search for a file matching `id` with extensions in a base directory.
 * @param baseDir - the root directory to search (e.g. 'src/content/blog')
 * @param id - the id string from Astro content (e.g. '2025/another-post')
 * @param exts - possible extensions (default: ['.md', '.mdx'])
 * @returns full absolute path of the matching file or null if not found
 */
export function findFileById(
  baseDir: string,
  id: string,
  exts = ['.md', '.mdx']
): string | null {
  const targetPaths = exts.map(ext => path.join(baseDir, id + ext))

  // Check direct expected paths first
  for (const p of targetPaths) {
    if (fs.existsSync(p)) return p
  }

  // If not found directly, walk the directory recursively
  function walk(dir: string): string | null {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        const found = walk(entryPath)
        if (found) return found
      } else if (exts.some(ext => entry.name === id.split('/').pop() + ext)) {
        // Match filename ignoring folders? Less reliable.
        return entryPath
      }
    }

    return null
  }

  return walk(baseDir)
}

export function getAllFiles(dir: string, ret: string[] = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file: string) => {
    const p = path.join(dir, '/', file) //`${dirPath}/${file}`
    if (fs.statSync(p).isDirectory()) {
      getAllFiles(p, ret)
    } else {
      ret.push(p) //path.join(dirPath, "/", file))
    }
  })

  return ret
}

export function getAllMDFiles(dir: string): string[] {
  return getAllFiles(dir).filter(file => file.endsWith('.md'))
}
