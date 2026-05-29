'use client'

import { motion } from 'framer-motion'
import { useContent } from '@/lib/content'

const techItems = [
  'React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Node.js',
  'PostgreSQL', 'Redis', 'GraphQL', 'AWS EC2', 'GCP', 'Kubernetes',
  'Docker', 'Nginx', 'OpenAI', 'LangChain', 'Pinecone', 'RAG',
  'Tailwind CSS', 'Framer Motion', 'Prisma', 'CI/CD', 'Terraform',
]

// Duplicate for seamless loop
const marqueeItems = [...techItems, ...techItems]

export function TechMarquee() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #05050A, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #05050A, transparent)' }} />

      {/* Label */}
      <div className="text-center mb-6">
        <span className="section-chip">Tech Stack</span>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden">
        <div
          className="flex gap-3 animate-marquee whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-body-sm font-mono"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'rgba(238,237,245,0.5)',
                flexShrink: 0,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-electric opacity-60 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
