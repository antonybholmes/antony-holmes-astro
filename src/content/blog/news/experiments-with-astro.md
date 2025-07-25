---
description: Redesigning the website using Astro.
sections:
  - 'News'
type: post
draft: true
title: 'Experiments with Astro'
authors:
  - 'Antony Holmes'
added: '2022-08-15'
tags:
  - 'Website'
  - 'Astro'
  - 'React'
---

If you're a developer and you are interested in how this site was made, read on.

<!-- more -->

The site was originally developed using Gatsby, a framework for building websites in React. Gatsby is component based and takes care of the tiresome routing, transpiling, and hot-reloading that can make React annoying.

Eventually I became annoyed that Gatsby loads itself as large JS blob even to render simple pages; I still think web pages should be as simple as possible, with a little JS sprinkled in for good measure so they load quickly. You should be able to right click and view a page source and still see something resembling HTML that you can inspect without developer tools.

With that in mind, I looked around for other static site tools and eventually settled on Astro since it allows me to continue to use React based developement, but strips almost all of the JS out of the final build so the site is an almost pure static site.

Most of the site that you see is static, rendered at build time and served as plain HTML for speed, SEO and accessibility. I used Tailwind to style components and React in place of React because it has a smaller footprint, runs faster and gives better overall Lighthouse scores (I find React tends to score badly on the mobile test because of having to load react and react-dom).

The Publications page includes a number of custom UI components I built such as radio buttons and checkboxes. These are built using SVG for the UI with a little CSS animation to make them more interactive.

The site is hosted on Cloudflare. I originally used Netlify but I found their free tier to be too restrictive, plus with GitHub I can deploy onto other platforms such as S3. This gives me the advantage of continuous deployment, but with
the low cost of S3+Cloudfront for serving content.

You can find the source code for the site [here](https://github.com/antonybholmes/www-antonyholmes-astro).
