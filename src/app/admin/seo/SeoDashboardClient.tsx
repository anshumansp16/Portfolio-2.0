'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ADMIN_PASSWORD } from '@/lib/adminAuth'
import type { PostHealth } from './page'

interface TopicCoverage {
  slug: string
  label: string
  description: string
  postCount: number
}

const EXTERNAL_TOOLS = [
  {
    name: 'Google Search Console',
    url: 'https://search.google.com/search-console',
    note: 'Indexing status, query rankings, crawl errors. Add anshumansp.com as a property, verify with the HTML tag method, then paste the token into NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.',
  },
  {
    name: 'Bing Webmaster Tools',
    url: 'https://www.bing.com/webmasters',
    note: "Bing's index also feeds Copilot and much of ChatGPT search. Verify, then paste the token into NEXT_PUBLIC_BING_SITE_VERIFICATION.",
  },
  {
    name: 'Google Analytics 4',
    url: 'https://analytics.google.com',
    note: 'Free traffic analytics. Create a property, grab the Measurement ID (G-XXXXXXX), set NEXT_PUBLIC_GA_ID.',
  },
  {
    name: 'Rich Results Test',
    url: 'https://search.google.com/test/rich-results',
    note: 'Paste any /insights/[slug] URL to confirm the Article/BreadcrumbList JSON-LD validates.',
  },
]

export function SeoDashboardClient({
  posts,
  topicCoverage,
}: {
  posts: PostHealth[]
  topicCoverage: TopicCoverage[]
}) {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-noir-primary px-6">
        <div className="w-full max-w-sm">
          <p className="text-label text-graphite mb-4 text-center">SEO DASHBOARD</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && password === ADMIN_PASSWORD && setAuthed(true)}
            placeholder="Password"
            className="w-full px-4 py-3 mb-3 bg-noir-subtle border border-white/[0.06] rounded-lg text-platinum focus:border-accent-gold/50 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => (password === ADMIN_PASSWORD ? setAuthed(true) : alert('Wrong password'))}
            className="w-full px-4 py-3 bg-accent-gold text-noir-primary font-medium rounded-lg"
          >
            Enter
          </button>
        </div>
      </main>
    )
  }

  const totalIssues = posts.reduce((sum, p) => sum + p.issues.length, 0)

  return (
    <main className="min-h-screen bg-noir-primary pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-headline-lg font-display text-platinum mb-2">SEO / GEO Health</h1>
        <p className="text-body-sm text-silver/60 mb-12">
          Read-only report built from your content at request time — no database, no tracking pipeline.
          For real ranking/traffic numbers, use the external tools below (all free).
        </p>

        {/* External tools */}
        <section className="mb-12">
          <p className="text-label text-graphite mb-4">EXTERNAL TOOLS (SET THESE UP ONCE)</p>
          <div className="grid md:grid-cols-2 gap-4">
            {EXTERNAL_TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent-gold/40 transition-colors"
              >
                <p className="text-platinum font-medium mb-1">{tool.name} ↗</p>
                <p className="text-body-sm text-silver/50">{tool.note}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Topic coverage */}
        <section className="mb-12">
          <p className="text-label text-graphite mb-4">TOPIC HUB COVERAGE</p>
          <div className="grid md:grid-cols-2 gap-4">
            {topicCoverage.map((hub) => (
              <Link
                key={hub.slug}
                href={`/insights/topics/${hub.slug}`}
                className="block p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent-gold/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-platinum font-medium">{hub.label}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      hub.postCount === 0 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                    }`}
                  >
                    {hub.postCount} post{hub.postCount !== 1 ? 's' : ''}
                  </span>
                </div>
                <p className="text-body-sm text-silver/50">{hub.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Post health */}
        <section>
          <p className="text-label text-graphite mb-4">
            POST HEALTH — {totalIssues} issue{totalIssues !== 1 ? 's' : ''} across {posts.length} posts
          </p>
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.slug} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <Link href={`/insights/${post.slug}`} className="text-platinum font-medium hover:text-accent-gold">
                    {post.title}
                  </Link>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                      post.issues.length === 0 ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {post.issues.length === 0 ? 'clean' : `${post.issues.length} issue${post.issues.length !== 1 ? 's' : ''}`}
                  </span>
                </div>
                <p className="text-body-sm text-silver/50 mb-2">
                  {post.wordCount} words · {post.category} · {post.topics.length > 0 ? post.topics.join(', ') : 'no topic tag'}
                </p>
                {post.issues.length > 0 && (
                  <ul className="text-body-sm text-amber-400/80 list-disc pl-5 space-y-1">
                    {post.issues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
