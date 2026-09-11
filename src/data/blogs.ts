import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface FaqItem {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  topics: string[]
  readTime: string
  date: string
  author: string
  heroImage: string
  content: string
  faq: FaqItem[]
  sourceUrl?: string
}

// Topic hubs power /insights/topics/[topic]. Add an entry here when you
// start writing in a new area — posts opt in via the `topics` frontmatter
// array in content/blog/*.md.
export const topicHubs: { slug: string; label: string; description: string }[] = [
  {
    slug: 'agents-llms',
    label: 'AI Agents & LLMs',
    description: 'Building agents on top of GPT-4, Claude, and other hosted LLMs — architecture, orchestration, and production tradeoffs.',
  },
  {
    slug: 'local-llms',
    label: 'Local LLMs & Self-Hosting',
    description: 'Running models on your own hardware — Ollama, quantization, local inference, and privacy-first setups.',
  },
  {
    slug: 'systems-i-build',
    label: 'Systems I Build',
    description: 'Production engineering — the architecture, scale, and failure modes behind systems I have actually shipped.',
  },
  {
    slug: 'apps-i-publish',
    label: 'Apps I Publish',
    description: 'The apps and products I ship, explained simply — what they do, why they exist, and how they work.',
  },
]

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

let cache: BlogPost[] | null = null

function loadPosts(): BlogPost[] {
  if (cache) return cache

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
    const { data, content } = matter(raw)

    return {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? '',
      category: data.category ?? 'Uncategorized',
      topics: Array.isArray(data.topics) ? data.topics : [],
      readTime: data.readTime ?? '',
      date: data.date ?? '',
      author: data.author ?? 'Anshuman Parmar',
      heroImage: data.heroImage ?? '',
      content: content.trim(),
      faq: Array.isArray(data.faq) ? data.faq : [],
      sourceUrl: data.sourceUrl,
    }
  })

  // Newest first — relies on date being sortable text like "December 2025";
  // falls back to file order if parsing fails.
  posts.sort((a, b) => {
    const da = Date.parse(a.date)
    const db = Date.parse(b.date)
    if (Number.isNaN(da) || Number.isNaN(db)) return 0
    return db - da
  })

  cache = posts
  return posts
}

export const blogPosts: BlogPost[] = loadPosts()

// Categories for filtering
export const categories = [
  'All',
  ...Array.from(new Set(blogPosts.map((p) => p.category))),
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug)
}

export function getPostsByTopic(topic: string): BlogPost[] {
  return blogPosts.filter((post) => post.topics.includes(topic))
}

export function getTopicHub(topic: string) {
  return topicHubs.find((h) => h.slug === topic)
}
