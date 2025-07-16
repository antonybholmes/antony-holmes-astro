import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

export async function GET(context: APIContext): Promise<Response> {
  const posts = await getCollection('blog')

  const tags = new Set<string>()

  for (const post of posts) {
    if (post.data.tags) {
      for (const tag of post.data.tags) {
        tags.add(tag)
      }
    }
  }

  const data = {
    tags: [...tags].sort(),
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
