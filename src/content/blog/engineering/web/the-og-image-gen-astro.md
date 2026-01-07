---
title: 'Generating open graph images in Astro'
description: 'Auto make those pesky open graph.'
type: post
draft: true
sections:
  - ['Engineering', 'Web']
authors:
  - 'Antony Holmes'
added: '2026-01-10'
tags:
  - 'Typescript'
  - 'Technical'
  - 'Tutorials'
---

Generating open graph images in Astro
Jun 12, 2025
#technical #learning #project #meta
Something that always bugged me about this blog is that the open graph/social sharing images used this for every single post:

Original blog social card

I had made myself a blank SVG template (of just the rainbow-colored x pattern) for each post literally years ago, but didn’t want to manually create an image per blog post.

There are different solutions out there for this, like the Satori library, or using a service like Cloudinary, but they didn’t fit exactly how I wanted to build the images, and I clearly have a problem with control.

So, I built myself my own solution!

Using Puppeteer for screenshotting
Last year, I made a small demo for Cosynd with Puppeteer that screenshotted websites and put it into a PDF for our website copyright offering, aptly named screenshot-demo.

I liked how simple that script was, and thought I could follow a similar strategy for generating images. My idea was to:

Put my blank SVG template on a webpage
Position some text with a white background on top of the image
Adjust the font size based on the length of the post title
Screenshot it with Puppeteer
And then from there, I’d do this for every blog title I’ve written. Seemed simple enough?

Reader, it was not. BUT it worked out in the end!

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
