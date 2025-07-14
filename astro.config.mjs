// @ts-check
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import rehypeSlug from 'rehype-slug'
import remarkSectionize from 'remark-sectionize'
import { remarkReadingTime } from './remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://antonyholmes.dev',
  compressHTML: true,
  markdown: {
    // Applied to .md and .mdx files
    remarkPlugins: [remarkReadingTime, remarkSectionize],
    rehypePlugins: [rehypeSlug],
  },
  //base: '/',
  output: 'static',
  integrations: [mdx(), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
})
