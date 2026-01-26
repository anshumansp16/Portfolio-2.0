import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Work - Anshuman Parmar',
  description: 'Explore my portfolio of AI solutions and intelligent systems for businesses.',
}

const projects = [
  {
    index: '01',
    title: 'TATVA',
    domain: 'TOOLING',
    description: 'A CLI that compresses setup → deploy into a repeatable path. Built for consistency across projects with streamlined workflow design and automation surface.',
    details: [
      'Scope: templates, environments, deploy steps',
      'Constraint: consistency across projects',
      'Owned: workflow design + automation surface',
    ],
    role: 'CLI development, SDLC automation',
    image: '/images/assets/tatva.png',
    tags: ['CLI', 'Templates', 'Environments', 'Deploy'],
    link: 'https://tatva.anshumansp.com',
  },
  {
    index: '02',
    title: 'ScrapeHub',
    domain: 'AI PLATFORM',
    description: 'AI-powered web scraping infrastructure with intelligent extraction, async job processing, and enterprise-grade dataset generation. Built with FastAPI, Next.js, and GPT-4o-mini for industrial-scale data collection.',
    details: [
      'Scope: Apify integration, GPT-4o-mini extraction, async job queue',
      'Constraint: Cost optimization (90% reduction), scalability',
      'Owned: Full-stack architecture + dataset generation pipeline',
    ],
    role: 'Platform architecture, AI integration, distributed systems',
    image: '/images/assets/scrapehub.png',
    tags: ['AI', 'Web Scraping', 'FastAPI', 'Async Jobs'],
    link: 'https://scrape.anshumansp.com',
  },
  {
    index: '03',
    title: 'CrownKing',
    domain: 'COMMERCE',
    description: 'Commerce system tuned for conversion, catalog scale, and clean operations. Handles product flows, payments, and fulfillment with speed and trust.',
    details: [
      'Scope: product flows, payments, fulfillment',
      'Constraint: speed + trust',
      'Owned: end-to-end build + iteration',
    ],
    role: 'E-commerce architecture, payment systems',
    image: '/images/assets/crownking.png',
    tags: ['E-commerce', 'Payments', 'Product Flows'],
    link: 'https://resume.anshumansp.com',
  },
  {
    index: '04',
    title: 'Aarambh',
    domain: 'PLATFORM',
    description: 'A learning platform built around retention loops and operational reliability. Handles user journeys, content delivery, and admin ops with performance under real traffic.',
    details: [
      'Scope: user journeys, content delivery, admin ops',
      'Constraint: performance under real traffic',
      'Owned: platform architecture + delivery quality',
    ],
    role: 'Platform architecture, delivery systems',
    image: '/images/assets/aarambh.png',
    tags: ['User Journeys', 'Content Delivery', 'Admin Ops'],
    link: 'https://aarambh.anshumansp.com',
  },
  {
    index: '05',
    title: 'GwaliorFix',
    domain: 'CIVIC TECH',
    description: 'Civic complaint leaderboard enabling citizens to report, track, and verify municipal issues with public accountability. Built with Next.js 14, FastAPI, and AI verification for transparency.',
    details: [
      'Scope: complaint reporting, AI verification, ward leaderboards',
      'Constraint: public accountability, viral mechanics',
      'Owned: full-stack civic platform + AI verification pipeline',
    ],
    role: 'Civic platform architecture, AI verification systems',
    image: '/images/assets/gwaliorfix.png',
    tags: ['Civic Tech', 'AI Verification', 'Next.js', 'FastAPI'],
    link: 'https://gwaliorfix.anshumansp.com',
  },
]

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-ink pt-32 md:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-label text-graphite mb-4">WORK</p>
          <h1 className="text-display-sm md:text-display-md font-display text-platinum mb-6">
            Selected Systems
          </h1>
          <p className="text-body text-silver/70 max-w-xl">
            Systems built for scale, reliability, and real-world constraints.
          </p>
        </div>

        {/* Projects Grid - Horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden block cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                  style={{
                    filter: 'grayscale(0.1) contrast(1.02)',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)',
                  }}
                />
                {/* Domain tag */}
                <span
                  className="absolute top-4 left-4 px-2.5 py-1 text-xs text-silver/70 rounded-full"
                  style={{
                    background: 'rgba(10, 10, 10, 0.7)',
                    backdropFilter: 'blur(8px)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {project.domain}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                {/* Title Row */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                    className="font-mono text-graphite/50"
                    style={{ fontSize: '10px', letterSpacing: '0.08em' }}
                  >
                    {project.index}
                  </span>
                  <h2 className="text-headline-sm text-platinum font-display">
                    {project.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-body-sm text-silver/60 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Role */}
                <p className="text-xs text-graphite/50 mb-4 italic">
                  {project.role}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs text-silver/40 border border-white/[0.04] rounded"
                      style={{ fontSize: '10px' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-white/[0.06]">
          <p className="text-body text-silver/70 mb-4">
            Interested in working together?
          </p>
          <a
            href="/connect"
            className="group inline-flex items-center gap-3 text-platinum hover:text-accent-gold transition-colors"
          >
            <span className="text-body font-medium">Start a conversation</span>
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </main>
  )
}
