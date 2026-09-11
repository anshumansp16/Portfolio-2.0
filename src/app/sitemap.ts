import { MetadataRoute } from 'next'
import { blogPosts, topicHubs } from '@/data/blogs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anshumansp.com'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/connect`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  const topicRoutes: MetadataRoute.Sitemap = topicHubs.map((hub) => ({
    url: `${baseUrl}/insights/topics/${hub.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const parsedDate = new Date(post.date)
    return {
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: Number.isNaN(parsedDate.getTime()) ? now : parsedDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }
  })

  return [...staticRoutes, ...topicRoutes, ...postRoutes]
}
