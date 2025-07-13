import fs from 'fs'
//const { format } = require('date-fns')

export function remarkModifiedTime() {
  return function (tree, file) {
    const filePath = file.history[0]
    const stats = fs.statSync(filePath)
    console.log('Last modified time:', stats.mtime)
    file.data.astro.frontmatter.lastModified = stats.mtime //format(
    //stats.mtime,
    //'MMM dd, yyyy HH:mm:ss'
    //)
  }
}
