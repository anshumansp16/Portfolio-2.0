import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blogs'

const URL = 'https://anshumansp.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = blogPosts.map((post) => ({
    url: `${URL}/insights/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const routes = ['', '/about', '/work', '/insights', '/connect'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  return [...routes, ...posts]
}
