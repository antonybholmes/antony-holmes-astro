---
title: 'Generating open graph images in Astro'
description: 'Auto make those pesky open graph.'
type: post

sections:
  - ['Engineering', 'Web']
authors:
  - 'Antony Holmes'
added: '2026-01-11'
tags:
  - 'Typescript'
  - 'Technical'
  - 'Tutorials'
---

If you haven't inspected the source of pages on this site, I use [Astro](https://astro.build/) to create it. Unlike a fully featured CMS, I have to implement some functionality myself to get some creature comforts. This trade-off is worth to me however since I can build and render the whole site in seconds and deploy it on Vercel, Cloudflare, Netlify etc as a static site with minimal resource and cost. This post is about one such feature I wanted to add: Open Graph images.

## Holding out for a hero

You may have noticed that my posts feature a hero image. These are either custom, or auto-selected from a prefined lists grouped by section topics using a hash of the post's title to get an image index (perhaps a topic for another post).

If I want to be hip and modern, I also need to create Open Graph images for social media, but this is time-consuming and boring to do manually (boo) so can I automate it?

I want to turn a hero image such as this:

![A hero image](/assets/images/blog/vanilla-cake.webp)

into this:

![An Open Graph image](/assets/images/og/the-vanilla-investor.png)

a smaller version that embeds the title with a glass like effect so it is more obvious what the post is about.

## Puppet power

I came across a [post](https://cassidoo.co/post/og-image-gen-astro/) discussing this very concept, which got me thinking. Cassidy uses [Puppeteer](https://www.npmjs.com/package/puppeteer) to do the leg work. Puppeteer is a JS package to automate Chrome/Chromium browsers by creating a headless instance of a browser and allowing it to be manipulated with an API. Hence, we can automate creating web pages, rendering them and saving images of the page very easily without having to duct tape together a janky solution using lots of separate packages.

Her solution uses an SVG template, which is modified and then rendered to an image file. Let's take this a step further. Since I already have my hero images, why not generate a custom web page exactly the size needed for an OG image (1200 x 630)? This gives me the full power of CSS to create whatever graphics effects I want (specifically blurred backdrops which are not supported in SVG).

## I love it when a plan comes together

My posts are written in Markdown. The frontmatter looks similar to this

```markdown
---
title: 'The Vanilla Investor'
description: "You get what you don't pay for."
sections:
  - ['Finance']
type: post
hero: 'vanilla-cake.webp'
---
```

The <code>hero</code> key specifies the image I want (I have some functions that translate names to webp image files so that I don't need to write complete paths in my posts).

I use <code>[gray-matter](https://www.npmjs.com/package/gray-matter)</code> to automate extracting the <code>title</code> and <code>hero</code> from a post.

Now I have most of what I need. The final part was creating a HTML template to create a custom webpage which can be turned into an image:

```html
<!-- og-template.html -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />

    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <style>
      html,
      body {
        width: 1200px;
        height: 630px;
        margin: 0;
        font-family: 'Inter', sans-serif;
        overflow: hidden;
      }
    </style>
  </head>

  <body>
    <div class="relative h-full w-full overflow-hidden rounded-[4rem]">
      <img src="{{hero}}" class="absolute z-10 h-full w-full object-cover" />

      <!-- Glass card -->
      <div
        class="absolute right-8 bottom-8 left-8 z-20 flex flex-col justify-center gap-y-6 rounded-[2rem] bg-white/10 px-16 py-12 backdrop-blur-xl"
      >
        <h1 class="text-6xl font-bold text-white">{{title}}</h1>
        <p class="text-4xl font-medium text-white/90">{{author}}</p>
        <p class="text-3xl text-white/90">{{date}}</p>
      </div>
    </div>
  </body>
</html>
```

Before rendering each page, I replace the placeholder <code>{{title}}</code>, <code>{{author}}</code>, and <code>{{date}}</code> with the appropriate values from a post.

Now the part you've been waiting for, the script to actually make all of this come together:

```typescript
// scripts/generate-og.ts

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
```

This script can then be made to function through your <code>packages.json</code>:

```javascript
"scripts": {
    "generate:og": "tsx scripts/generate-og.ts",
  }
// ...
```

I can now run <code>pnpm generate:og</code> to create my Open Graph images. I like to do this on my workstation just before I push site updates to production so that images are added into my repo without having to run this step on a remote system (I'm not a huge fan of making everything serverless, fine in principal, but really a way to bilk people for build minutes in practice).

My first strat: A page per blog post
Initially, I set up a fairly simple Astro page with HTML and CSS:

## // [og].astro

## let text = "Hello, world!"

<div class="svg-container">
	<img src="../img/blank-card-opt.svg" class="svg-image" />

    <div class="svg-text-group">
    	<div class="svg-overlay-text" id="title">{text}</div>
    	<div class="svg-overlay-text-sub">a blog post by cassidoo</div>
    </div>

</div>

<style>
  ...
</style>

With this, I was able to work out what size and positioning I wanted my text to be, and how I wanted it to adjust based on the length of the blog post title (both in spacing and in size). I used some dummy strings to do this pretty manually (like how I wanted it to change ever so slightly for titles that were 4 lines tall, etc.).

Amusing note, this kind of particular design work is really fun for me, and basically impossible for AI tools to get right. They do not have my eyes nor my opinions! I liked feeling artistic as I scooted each individual pixel around (for probably too much time) and made it feel “perfect” to me (and moved things in a way that probably 0 other people will ever notice).

Once I was happy with the dummy design I had going, I added a getStaticPaths() function to generate an HTML page for every post, so that Puppeteer could make a screenshot for each of them.

// In the frontmatter of [og].astro
import { getCollection } from "astro:content";

export async function getStaticPaths() {
let posts = await getCollection("posts");

    return posts.map((post) => {
    	return {
    		params: { og: post.id },
    		props: { text: post.data.title },
    	};
    });

}

const { text } = Astro.props;
My next (better) strat: A single page template
With the previous strategy, everything worked well. But, my build times were somewhat long, because altogether the build was generating an HTML page per post (for people to read), a second HTML page per post (to be screenshotted), and then a screenshot image from that second HTML page. It was a bit too much.

So, before I get into the Puppeteer script part with you, I’ll skip to the part where I changed up my strategy (as the kids say) to use a single page template that accepted the blog post title as a query parameter.

The Astro page I showed you before is almost exactly the same, except:

It didn’t have to be a dynamic route anymore, so instead of the variable name [og].astro I changed it to just open-graph.astro
It didn’t need the frontmatter anymore, because it wasn’t rendering any pages or text at build time
It added a script for getting text from the query parameters
The new script on the page looked like this, which I put on the bottom of the page in a <script> tag so it would run client-side:

// open-graph.astro, formerly [og].astro
function decodeHtmlEntities(text) {
const textarea = document.createElement("textarea");
textarea.innerHTML = text;
return textarea.value;
}

const params = new URLSearchParams(window.location.search);
const rawTitle = params.get("title") || "Untitled";
const title = decodeHtmlEntities(rawTitle);
document.getElementById("title").textContent = title;
(That decodeHtmlEntities function is an interesting trick I learned a while back where textarea tags treat content as plaintext to avoid accidental or dangerous script execution, and their value gives you decoded text without any HTML tags. I had some blog post titles that had quotes and other special characters in them, and this small function fixed them from breaking in the rendered image!)

Now, if you wanted to see a blog post image pre-screenshot, you can go to the open graph route here on my website and see the rendered card!

The Puppeteer script
In my src/scripts/ folder, I have a script that looks mostly like this:

const puppeteer = require('puppeteer');
const fs = require('fs');
const posts = [...]; // these blog titles and slugs came from a script I wrote separately
const \_\_dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
const templatePath = path.join(\_\_dirname, "../dist/open-graph/index.html");
const browser = await puppeteer.launch();
const page = await browser.newPage();

    for (const post of posts) {
    	const url = `file://${templatePath}?title=${encodeURIComponent(post.title)}`;
    	await page.goto(url);
    	await page.setViewport({ width: 1200, height: 630 });
    	await page.screenshot({ path: `./public/og-images/${post.id}.png`, type: "png" });
    }

    await browser.close();

})();
This takes the template (templatePath), launches a browser, navigates to the template page, loops through each post, sizes it to the standard Open Graph size (1200x630px), and saves the screenshot to my designated output folder.

From here, I added the script to my package.json:

"scripts": {
"build": "astro build && node src/scripts/og-generation.js",
"og": "node src/scripts/og-generation.js"
// ...
}
I can now run npm run og to render the images, or have them render right after astro build!

This is a GitHub Gist of the actual full code for both the script and the template!

Putting it all together!
There was a lot of trial and error with this method, but I’m happy with it. I learned a bunch, and I can finally share my own blog posts without thinking, “gosh, I should eventually make those open graph images” (which I did literally every time I shared a post).

If you need more resources on this strategy in general:

How Emma Goto does her Astro social cards (I did all this work and then stumbled upon her incredibly similar solution to what I did + very helpful post, written just 3 months ago. Sigh. This would have been useful, ha, but c’est la vie!)
The template and script I wrote, in case you missed it
My open graph page that I now use to preview images
Making Puppeteer work at build time on Netlify
I hope this is helpful for ya!
