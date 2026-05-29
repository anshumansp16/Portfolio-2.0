import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Work — Anshuman Parmar',
  description: 'KreatorOS, ScrapeHub, LegalMind, TATVA and more — AI products, SaaS platforms, and developer tools built and shipped to production.',
  keywords: ['KreatorOS', 'ScrapeHub', 'LegalMind', 'TATVA', 'AI Products', 'SaaS', 'Portfolio', 'Anshuman Parmar'],
  alternates: { canonical: 'https://anshumansp.com/work' },
  openGraph: {
    title: 'Work — Anshuman Parmar',
    description: 'AI products, SaaS platforms, and developer tools built and shipped to production.',
    url: 'https://anshumansp.com/work',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anshuman Parmar Work' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work — Anshuman Parmar',
    description: 'AI products, SaaS platforms, and developer tools built and shipped to production.',
    images: ['/og-image.jpg'],
  },
}

const featuredProjects = [
  {
    name: 'KreatorOS',
    domain: 'AI Content Platform',
    description: 'The operating system for content creators. AI-powered captions in 12+ languages, smart clips, trending ideas, and multi-platform publishing.',
    tags: ['Next.js', 'AI/ML', 'SaaS', 'Multi-language'],
    image: '/images/assets/kreatoros-dashboard.png',
    link: 'https://creative.anshumansp.com',
    stat: 'Live',
  },
  {
    name: 'ScrapeHub',
    domain: 'AI Data Platform',
    description: 'Turn any website into structured data with just a prompt. Competitor monitoring, lead gen, and price intelligence for data teams.',
    tags: ['AI', 'FastAPI', 'AWS', 'GPT-4o'],
    image: '/images/assets/scrapehub-new.png',
    link: 'https://scrape.anshumansp.com',
    stat: 'Live',
  },
  {
    name: 'LegalMind',
    domain: 'Legal Tech',
    description: 'Strategic legal intelligence platform. Track obligations, monitor portfolio risk, and maintain compliance for legal professionals.',
    tags: ['AI', 'Next.js', 'Enterprise', 'SOC 2'],
    image: '/images/assets/legalmind.png',
    link: 'https://legal.anshumansp.com',
    stat: 'Live',
  },
  {
    name: 'TATVA',
    domain: 'Developer Tool',
    description: 'A CLI that compresses setup to deploy into a repeatable path. Reduced setup time from days to 15 minutes with built-in best practices.',
    tags: ['CLI', 'Python', 'DevOps', 'Automation'],
    image: '/images/assets/tatva.png',
    link: 'https://tatva.anshumansp.com',
    stat: '15 min setup',
  },
]

const smallProjects = [
  {
    name: 'GenAIVision',
    description: 'AI automation consulting — 50+ systems deployed for enterprise clients',
    link: 'https://genaivision.anshumansp.com',
    tags: ['AI', 'Consulting'],
  },
  {
    name: 'ResumePro',
    description: 'ATS-optimized resume builder with AI writing suggestions',
    link: 'https://resume.anshumansp.com',
    tags: ['SaaS', 'AI'],
  },
  {
    name: 'CrownKing',
    description: 'Premium men\'s jewelry e-commerce with payment integration',
    link: 'https://crownking.anshumansp.com',
    tags: ['E-Commerce', 'Next.js'],
  },
  {
    name: 'Aarambh',
    description: 'AI-powered learning platform for students',
    link: 'https://aarambh.anshumansp.com',
    tags: ['EdTech', 'AI'],
  },
]

export default function WorkPage() {
  return (
    <main className="relative min-h-screen pt-32 md:pt-40 pb-20">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-14 md:mb-18">
          <div className="section-chip mb-5">Portfolio</div>
          <h1 className="text-display-sm md:text-display-md font-display text-platinum mb-4" style={{ fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Work I&apos;ve shipped
          </h1>
          <p className="text-body-lg text-silver max-w-2xl" style={{ fontWeight: 300, lineHeight: 1.75 }}>
            AI products, SaaS platforms, developer tools, and e-commerce — from concept to production.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-20">
          {featuredProjects.map((proj) => (
            <a
              key={proj.name}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block`}
            >
              <div className="relative overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(9,9,18,0.8)' }}>
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.015)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,95,87,0.4)' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,189,46,0.4)' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(39,201,63,0.4)' }} />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-4 rounded" style={{ background: 'rgba(255,255,255,0.04)', maxWidth: '180px' }} />
                  </div>
                </div>

                <div className={`relative w-full overflow-hidden aspect-[16/10]`}>
                  <Image
                    src={proj.image}
                    alt={proj.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(5,5,15,0.5)', backdropFilter: 'blur(2px)' }}>
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                      style={{ background: 'rgba(59,130,246,0.9)', color: 'white', boxShadow: '0 8px 24px rgba(59,130,246,0.4)' }}>
                      View Live
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-label text-graphite" style={{ letterSpacing: '0.06em' }}>{proj.domain}</span>
                  </div>
                  <h2 className="text-headline-sm text-platinum mb-2" style={{ fontWeight: 500, letterSpacing: '-0.015em' }}>
                    {proj.name}
                  </h2>
                  <p className="text-body-sm text-silver mb-3" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded font-mono text-label"
                        style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.1)', color: 'rgba(96,165,250,0.6)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-body-sm font-mono flex-shrink-0" style={{ color: '#22D3EE', opacity: 0.7 }}>{proj.stat}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Smaller Projects */}
        <div className="mb-8">
          <h3 className="text-headline-md font-display text-platinum mb-6" style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>
            Other projects
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {smallProjects.map((proj) => (
            <a
              key={proj.name}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-body text-platinum font-medium">{proj.name}</h4>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-graphite group-hover:text-accent-electric transition-colors">
                  <path d="M3 11L11 3M11 3H6M11 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-body-sm text-silver mb-3" style={{ fontWeight: 300, lineHeight: 1.6 }}>
                {proj.description}
              </p>
              <div className="flex gap-2">
                {proj.tags.map((tag) => (
                  <span key={tag} className="text-label text-graphite">{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="mb-16 p-6 md:p-10 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col gap-8">
            <div className="flex-1">
              <div className="section-chip mb-4">Media Kit</div>
              <h3 className="text-headline-md font-display text-platinum mb-3" style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>
                Brand Collaborations
              </h3>
              <p className="text-body text-silver mb-6" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                Hindi tech and AI tools content for Indian developers aged 18-30. 
                Open to sponsored videos, product reviews, and integration partnerships.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { value: '13.3%', label: 'Avg CTR', note: 'Top 1%' },
                  { value: '385+', label: 'Subscribers', note: 'Growing' },
                  { value: '30+', label: 'Videos', note: 'Published' },
                  { value: '1', label: 'Brand Deal', note: 'Thumbs.ai' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="text-lg font-mono font-semibold text-accent-electric">{stat.value}</div>
                    <div className="text-label text-silver/60">{stat.label}</div>
                    <div className="text-label text-graphite mt-0.5">{stat.note}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {['AI Tools', 'Hindi Tech', 'Developer Content', 'Product Reviews'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded text-label text-silver/50"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl" style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.1)' }}>
              <p className="text-body-sm text-silver/60 mb-2">For collaborations</p>
              <a href="mailto:anshumansp16@gmail.com" className="text-body text-platinum hover:text-accent-electric transition-colors font-medium break-all">
                anshumansp16@gmail.com
              </a>
              <p className="text-label text-graphite mt-3">Channel: Anshuman Parmar</p>
              <p className="text-label text-graphite">Audience: Indian developers, 18-30</p>
              <p className="text-label text-graphite">Previous: Thumbs.ai</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-10 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-body text-silver mb-4" style={{ fontWeight: 300 }}>
            Interested in working together?
          </p>
          <Link href="/connect" className="btn-primary">
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
