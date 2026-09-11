import { Metadata } from 'next'
import { blogPosts, categories, topicHubs } from '@/data/blogs'
import { InsightsContent } from '@/components/insights/InsightsContent'
import { breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Insights — Anshuman Parmar',
  description: 'Thoughts on AI engineering, building products, content creation, and the developer mindset. Writing from someone who ships.',
  keywords: ['AI Blog', 'Tech Articles', 'Developer Insights', 'AI Engineering', 'Anshuman Parmar'],
  alternates: {
    canonical: 'https://anshumansp.com/insights',
    types: { 'application/rss+xml': 'https://anshumansp.com/insights/rss.xml' },
  },
  openGraph: {
    title: 'Insights — Anshuman Parmar',
    description: 'Thoughts on AI engineering, building products, content creation, and the developer mindset.',
    url: 'https://anshumansp.com/insights',
    images: [{ url: '/images/assets/anshuman-portrait.png', width: 1200, height: 630, alt: 'Anshuman Parmar Insights' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights — Anshuman Parmar',
    description: 'Thoughts on AI engineering, building products, content creation, and the developer mindset.',
    images: ['/images/assets/anshuman-portrait.png'],
  },
}

export default function InsightsPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://anshumansp.com' },
    { name: 'Insights', url: 'https://anshumansp.com/insights' },
  ])

  return (
    <main className="relative min-h-screen bg-noir-primary pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InsightsContent posts={blogPosts} categories={categories} topicHubs={topicHubs} />
    </main>
  )
}
