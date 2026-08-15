// @ts-check
import { satteri } from '@astrojs/markdown-satteri'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { readingTime } from '@xsynaptic/satteri-reading-time'
import { defineConfig, fontProviders } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://antonyholmes.dev',
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
  },
  // markdown: {
  //   // Applied to .md and .mdx files
  //   processor: unified({
  //     remarkPlugins: [remarkReadingTime, remarkSectionize],
  //     rehypePlugins: [rehypeSlug],
  //   }),
  // },
  markdown: {
    processor: satteri({ mdastPlugins: [readingTime()] }),
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Mona Sans',
      cssVariable: '--font-sans',
    },
  ],
  //base: '/',
  output: 'static',
  integrations: [mdx(), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  redirects: {
    '/blog/tags': '/blog/tag',
  },
})
