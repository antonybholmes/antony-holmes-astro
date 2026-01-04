import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { parseISO } from 'date-fns'

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/{*.md,*.mdx}' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      // Transform string to Date object
      title: z.string(),
      description: z.string().optional(),
      order: z.number().optional(),
      authors: z.array(z.string()).optional(),
      // Transform string to Date object
      added: z.string().transform<Date>(str => parseISO(str)),
      updated: z
        .string()
        .transform<Date>(str => parseISO(str))
        .optional(),
      //updatedDate: z.coerce.date().optional(),
      hero: z.string().optional(), //image().optional(),
      //heroAlt: z.string().optional(),
      heroAlt: z.string().optional(),
      tags: z.array(z.string()).optional(),
      sections: z.array(z.string()),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      rating: z.number().min(0).max(5).optional(),
      pros: z.array(z.string()).optional(),
      cons: z.array(z.string()).optional(),
      links: z
        .array(
          z.object({
            title: z.string(),
            url: z.string().url(),
          })
        )
        .optional(),
    }),
})

const notes = defineCollection({
  // Load Markdown and MDX files in the `src/content/notes/` directory.
  loader: glob({ base: './src/content/notes', pattern: '**/{*.md,*.mdx}' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      order: z.number().optional(),
      authors: z.array(z.string()).optional(),
      // Transform string to Date object
      added: z.string().transform<Date>(str => parseISO(str)),
      //updatedDate: z.coerce.date().optional(),
      //hero: image().optional(),
      tags: z.array(z.string()).optional(),
      sections: z.array(z.string()).optional(),
    }),
})

const people = defineCollection({
  // Load Markdown and MDX files in the `src/content/people /` directory.
  loader: glob({ base: './src/content/people', pattern: '**/{*.md,*.mdx}' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      name: z.string(),
      email: z.string().email(),
      title: z.string().optional(),
      description: z.string().optional(),
      pubmed: z.string().optional(),
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().optional(),
      image: z.string().optional(),
    }),
})

export const collections = { blog, notes, people }
