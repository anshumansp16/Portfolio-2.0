import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostsByTopic, getTopicHub, topicHubs } from '@/data/blogs'
import { breadcrumbJsonLd } from '@/lib/seo'

interface TopicPageProps {
  params: Promise<{ topic: string }>
}

export async function generateStaticParams() {
  return topicHubs.map((hub) => ({ topic: hub.slug }))
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic } = await params
  const hub = getTopicHub(topic)

  if (!hub) {
    return { title: 'Topic Not Found' }
  }

  const title = `${hub.label} — Anshuman Parmar`
  const url = `https://anshumansp.com/insights/topics/${hub.slug}`

  return {
    title,
    description: hub.description,
    keywords: [hub.label, 'Anshuman Parmar', 'AI Engineering'],
    alternates: { canonical: url },
    openGraph: {
      title,
      description: hub.description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: hub.description,
    },
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params
  const hub = getTopicHub(topic)

  if (!hub) {
    notFound()
  }

  const posts = getPostsByTopic(topic)
  const url = `https://anshumansp.com/insights/topics/${hub.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.label,
    description: hub.description,
    url,
    isPartOf: {
      '@type': 'Blog',
      name: 'Anshuman Parmar — Insights',
      url: 'https://anshumansp.com/insights',
    },
    hasPart: posts.map((post) => ({
      '@type': 'Article',
      headline: post.title,
      url: `https://anshumansp.com/insights/${post.slug}`,
    })),
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://anshumansp.com' },
    { name: 'Insights', url: 'https://anshumansp.com/insights' },
    { name: hub.label, url },
  ])

  return (
    <main className="relative min-h-screen bg-noir-primary pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-body-sm text-silver/60 hover:text-platinum transition-colors mb-12"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Insights</span>
        </Link>

        <div className="text-center mb-16">
          <p className="text-label text-accent-gold mb-4">TOPIC</p>
          <h1 className="text-display-md md:text-display-lg font-display text-platinum mb-6">
            {hub.label}
          </h1>
          <p className="text-body-lg text-silver/60 max-w-2xl mx-auto">
            {hub.description}
          </p>
        </div>

        {/* Other topic hubs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {topicHubs.map((t) => (
            <Link
              key={t.slug}
              href={`/insights/topics/${t.slug}`}
              className={`px-4 py-2 rounded-full text-body-sm transition-all duration-300 ${
                t.slug === hub.slug
                  ? 'bg-accent-gold text-noir-primary font-medium'
                  : 'bg-white/[0.03] text-silver/60 hover:bg-white/[0.06] hover:text-silver'
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group block h-full">
                <article className="h-full rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir-primary via-noir-primary/20 to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-noir-primary/80 backdrop-blur-sm rounded-full text-label-sm text-accent-gold">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-headline-sm font-display text-platinum mb-3 group-hover:text-accent-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-body-sm text-silver/60 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-label-sm text-graphite">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <h3 className="text-headline-sm font-display text-platinum mb-2">
              New writing on {hub.label.toLowerCase()} is on the way
            </h3>
            <p className="text-body-sm text-silver/60 mb-6 max-w-md mx-auto">
              This hub is being built out. In the meantime, browse everything I&apos;ve written so far.
            </p>
            <Link href="/insights" className="text-accent-gold hover:underline">
              View all insights →
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
