import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogBySlug, getAllBlogSlugs } from '@/data/blogs'
import { BlogContent } from '@/components/blog/BlogContent'

// Social Icons
const LinkedInIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - Anshuman Parmar`,
    description: post.excerpt,
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="relative min-h-screen bg-noir-primary pt-32 pb-20">
      {/* Wide container for blog layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-body-sm text-silver/60 hover:text-platinum transition-colors mb-12"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Insights</span>
        </Link>

        {/* Article Header - Centered */}
        <header className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-accent-gold/10 rounded-full text-label text-accent-gold">
              {post.category}
            </span>
            <span className="text-body-sm text-silver/40">{post.readTime}</span>
          </div>

          <h1 className="text-display-sm md:text-display-md font-display text-platinum mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-body-lg text-silver/70 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-noir-subtle border border-white/[0.06] flex items-center justify-center">
              <span className="text-lg font-display text-platinum">AP</span>
            </div>
            <div>
              <p className="text-body-sm text-platinum font-medium">{post.author}</p>
              <p className="text-body-sm text-silver/50">{post.date}</p>
            </div>
          </div>
        </header>

        {/* Hero Image - Full width */}
        {post.heroImage && (
          <div className="relative w-full aspect-[21/9] mb-16 rounded-2xl overflow-hidden">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir-primary/40 via-transparent to-transparent" />
          </div>
        )}

        {/* Article Content with Sidebar */}
        <div className="max-w-3xl xl:max-w-none">
          <BlogContent content={post.content} />
        </div>

        {/* Author Section */}
        <footer className="max-w-3xl mt-20 pt-12 border-t border-white/[0.06]">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 border border-white/[0.06] flex items-center justify-center">
              <span className="text-3xl font-display text-platinum">AP</span>
            </div>
            <div className="flex-1">
              <p className="text-label text-graphite mb-2">WRITTEN BY</p>
              <h3 className="text-headline-sm font-display text-platinum mb-3">
                {post.author}
              </h3>
              <p className="text-body text-silver/70 mb-6 leading-relaxed">
                Senior Full Stack Developer specializing in AI systems, browser automation,
                and scalable web applications. Building production-grade solutions that deliver
                measurable business impact.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/anshumansp16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-body-sm text-silver/80"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/anshumansp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-body-sm text-silver/80"
                >
                  <GitHubIcon />
                  GitHub
                </a>
                <a
                  href="https://x.com/AnshumanSP16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-body-sm text-silver/80"
                >
                  <XIcon />
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* CTA */}
        <div className="max-w-3xl mt-16 p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-headline-sm font-display text-platinum mb-2">
                Enjoyed this article?
              </h3>
              <p className="text-body-sm text-silver/60">
                Explore more insights on AI, automation, and system design.
              </p>
            </div>
            <Link href="/insights" className="luxury-button group whitespace-nowrap">
              <span className="relative z-10">View All Insights</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
