import { blogPosts, topicHubs } from '@/data/blogs'
import { SeoDashboardClient } from './SeoDashboardClient'

export const metadata = {
  robots: { index: false, follow: false },
}

export interface PostHealth {
  slug: string
  title: string
  category: string
  date: string
  wordCount: number
  excerptLength: number
  hasHeroImage: boolean
  topics: string[]
  issues: string[]
}

function checkPost(post: (typeof blogPosts)[number]): PostHealth {
  const wordCount = post.content.split(/\s+/).filter(Boolean).length
  const issues: string[] = []

  if (wordCount < 600) issues.push('Thin content (<600 words) — Google/LLMs favor depth on a specific problem')
  if (post.excerpt.length < 50) issues.push('Excerpt too short for a good meta description')
  if (post.excerpt.length > 160) issues.push('Excerpt exceeds ~160 chars — will get truncated in search snippets')
  if (!post.heroImage) issues.push('No hero image — hurts social shares and OG cards')
  if (post.topics.length === 0) issues.push('Not tagged to a topic hub — invisible on /insights/topics/*')
  if (!/^##\s/m.test(post.content)) issues.push('No H2 headings found — hurts scannability and AI-extraction')

  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    wordCount,
    excerptLength: post.excerpt.length,
    hasHeroImage: Boolean(post.heroImage),
    topics: post.topics,
    issues,
  }
}

export default function SeoDashboardPage() {
  const posts = blogPosts.map(checkPost)
  const topicCoverage = topicHubs.map((hub) => ({
    ...hub,
    postCount: blogPosts.filter((p) => p.topics.includes(hub.slug)).length,
  }))

  return <SeoDashboardClient posts={posts} topicCoverage={topicCoverage} />
}
