import fs from 'fs-extra'
import { basename } from 'path'
import sharp from 'sharp'

function resizeImage(f: string, out: string, size: number) {
  //if (!fs.existsSync(out)) {
  console.log(out)
  sharp(f).resize({ width: size }).toFile(out)
  //}
}

function placeHolder(f: string, out: string) {
  if (!fs.existsSync(out)) {
    console.log(out)
    sharp(f).resize({ width: 32 }).blur(4).toFile(out)
  }
}

let maxSize = '1024x1024'
let sizes = [800]

let dir = './content/img/blog'
let outDir = './public/img/blog'

let files = fs.readdirSync(dir)

let out

fs.ensureDir(outDir) //path.join(dir, "opt"))

// files object contains all files names
// log them on console
files
  .filter(file => {
    return file.includes('webp')
  })
  .forEach(file => {
    const f = `${dir}/${file}`

    const name = basename(file)

    out = `${outDir}/${name}`

    console.log(`Processing: ${f}`, out)

    resizeImage(f, out, 1600)

    //out = `${outDir}/${name.replace(maxSize, `${size}x${size}`)}.avif`
    //resizeImage(f, out, size)

    // placeholder
    // out = `${dir}/opt/${name.replace(maxSize, `placeholder`)}.webp`
    // placeHolder(f, out)

    // out = `${dir}/opt/${name.replace(maxSize, `placeholder`)}.avif`
    // placeHolder(f, out)
  })

// maxSize = "2048x1024"
// sizes = [800, 1600]

// dir = "./public/assets/posts"

// files = fs.readdirSync(dir)

// fs.ensureDir(path.join(dir, "opt"))

// // files object contains all files names
// // log them on console
// files
//   .filter(file => {
//     return file.includes("webp") && file.includes(maxSize)
//   })
//   .forEach(file => {
//     const f = `${dir}/${file}`

//     const name = path.parse(file).name

//     sizes.forEach(size => {
//       out = `${dir}/opt/${name.replace(
//         maxSize,
//         `${size}x${Math.floor(size / 2)}`
//       )}.webp`
//       resizeImage(f, out, size)

//       out = `${dir}/opt/${name.replace(
//         maxSize,
//         `${size}x${Math.floor(size / 2)}`
//       )}.avif`
//       resizeImage(f, out, size)
//     })

//     // placeholder
//     out = `${dir}/opt/${name.replace(maxSize, `placeholder`)}.webp`
//     placeHolder(f, out)

//     out = `${dir}/opt/${name.replace(maxSize, `placeholder`)}.avif`
//     placeHolder(f, out)
//   })
