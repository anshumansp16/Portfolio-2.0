import { Metadata } from 'next'
import { blogPosts, categories } from '@/data/blogs'
import { InsightsContent } from '@/components/insights/InsightsContent'

export const metadata: Metadata = {
  title: 'Insights — Anshuman Parmar',
  description: 'Thoughts on AI engineering, building products, content creation, and the developer mindset. Writing from someone who ships.',
  keywords: ['AI Blog', 'Tech Articles', 'Developer Insights', 'AI Engineering', 'Anshuman Parmar'],
  alternates: { canonical: 'https://anshumansp.com/insights' },
  openGraph: {
    title: 'Insights — Anshuman Parmar',
    description: 'Thoughts on AI engineering, building products, content creation, and the developer mindset.',
    url: 'https://anshumansp.com/insights',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anshuman Parmar Insights' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights — Anshuman Parmar',
    description: 'Thoughts on AI engineering, building products, content creation, and the developer mindset.',
    images: ['/og-image.jpg'],
  },
}

export default function InsightsPage() {
  return (
    <main className="relative min-h-screen bg-noir-primary pt-32 pb-20">
      <InsightsContent posts={blogPosts} categories={categories} />
    </main>
  )
}
