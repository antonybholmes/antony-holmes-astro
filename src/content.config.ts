import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      // Transform string to Date object
      title: z.string(),
      description: z.string(),
      authors: z.array(z.string()).optional(),
      // Transform string to Date object
      added: z.coerce.date(),
      //updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(), //image().optional(),
      tags: z.array(z.string()).optional(),
      sections: z.array(z.string()).optional(),
    }),
})

const notes = defineCollection({
  // Load Markdown and MDX files in the `src/content/notes/` directory.
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      authors: z.array(z.string()).optional(),
      // Transform string to Date object
      added: z.coerce.date(),
      //updatedDate: z.coerce.date().optional(),
      //heroImage: image().optional(),
      tags: z.array(z.string()).optional(),
      sections: z.array(z.string()).optional(),
    }),
})

export const collections = { blog, notes }
