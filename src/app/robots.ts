import { MetadataRoute } from 'next'

const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Explicit allow rules so posts can be discovered and cited by
      // chatbots (ChatGPT, Claude, Perplexity) and Google's AI Overviews.
      ...AI_CRAWLERS.map((agent) => ({
        userAgent: agent,
        allow: '/',
        disallow: ['/admin/', '/api/'],
      })),
    ],
    sitemap: 'https://anshumansp.com/sitemap.xml',
    host: 'https://anshumansp.com',
  }
}
