import { Metadata } from 'next'
import { blogPosts, categories } from '@/data/blogs'
import { InsightsContent } from '@/components/insights/InsightsContent'

export const metadata: Metadata = {
  title: 'Insights - Anshuman Parmar',
  description: 'Thoughts on AI, enterprise architecture, philosophy, and building scalable systems.',
}

export default function InsightsPage() {
  return (
    <main className="relative min-h-screen bg-noir-primary pt-32 pb-20">
      <InsightsContent posts={blogPosts} categories={categories} />
    </main>
  )
}
