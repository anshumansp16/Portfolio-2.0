'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const mainProjects = [
  {
    name: 'ScrapeHub',
    domain: 'AI Data Platform',
    description: 'AI-powered web scraping that turns any website into structured data with just a prompt. Competitor monitoring, lead gen, and price intelligence.',
    tags: ['AI', 'FastAPI', 'AWS', 'GPT-4o'],
    image: '/images/assets/scrapehub-new.png',
    link: 'https://scrape.anshumansp.com',
    stat: 'Live',
  },
  {
    name: 'LegalMind',
    domain: 'Legal Tech',
    description: 'Strategic legal intelligence platform. Track obligations, monitor portfolio risk, and maintain compliance — purpose-built for legal professionals.',
    tags: ['AI', 'Next.js', 'Enterprise', 'Security'],
    image: '/images/assets/legalmind.png',
    link: 'https://legal.anshumansp.com',
    stat: 'Live',
  },
  {
    name: 'TATVA',
    domain: 'Developer Tool',
    description: 'A CLI tool that compresses project setup from days to 15 minutes. Built-in best practices, templates, and automation for dev workflows.',
    tags: ['CLI', 'Python', 'DevOps', 'Automation'],
    image: '/images/assets/tatva.png',
    link: 'https://tatva.anshumansp.com',
    stat: '15 min setup',
  },
]

const smallProjects = [
  {
    name: 'GenAIVision',
    description: 'AI automation & consulting — 50+ systems deployed',
    link: 'https://genaivision.anshumansp.com',
    tags: ['AI', 'Consulting'],
  },
  {
    name: 'ResumePro',
    description: 'ATS-optimized resume builder with AI suggestions',
    link: 'https://resume.anshumansp.com',
    tags: ['SaaS', 'AI'],
  },
  {
    name: 'CrownKing',
    description: 'Premium men\'s jewelry e-commerce platform',
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

function ProjectCard({ proj, i }: { proj: typeof mainProjects[0]; i: number }) {
  return (
    <motion.a
      href={proj.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image frame */}
      <div className="relative overflow-hidden rounded-2xl mb-6"
        style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(9,9,18,0.8)' }}>
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.015)' }}>
          <div className="flex gap-1.5">
            {['rgba(255,95,87,0.4)', 'rgba(255,189,46,0.4)', 'rgba(39,201,63,0.4)'].map((c, ci) => (
              <div key={ci} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="flex-1 mx-4">
            <div className="h-4 rounded" style={{ background: 'rgba(255,255,255,0.04)', maxWidth: '180px' }} />
          </div>
        </div>

        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={proj.image}
            alt={proj.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: 'rgba(5,5,15,0.5)', backdropFilter: 'blur(2px)' }}>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
              style={{ background: 'rgba(59,130,246,0.9)', color: 'white', boxShadow: '0 8px 24px rgba(59,130,246,0.4)' }}>
              View Project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-label text-graphite" style={{ letterSpacing: '0.06em' }}>{proj.domain}</span>
          </div>
          <h3 className="text-headline-sm text-platinum mb-2" style={{ fontWeight: 500, letterSpacing: '-0.015em' }}>
            {proj.name}
          </h3>
          <p className="text-body-sm text-silver mb-4" style={{ fontWeight: 300, lineHeight: 1.7 }}>
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
        <div className="flex-shrink-0 text-right">
          <span className="text-body-sm font-mono" style={{ color: '#22D3EE', opacity: 0.7 }}>{proj.stat}</span>
        </div>
      </div>
    </motion.a>
  )
}

export function SelectedSystems() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-wide">
        {/* Main Projects */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-chip mb-6">More Work</div>
          <h2 className="text-display-sm md:text-display-md font-display text-platinum max-w-lg" style={{ fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Products I&apos;ve shipped
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-20">
          {mainProjects.map((proj, i) => (
            <ProjectCard key={proj.name} proj={proj} i={i} />
          ))}
        </div>

        {/* Smaller projects */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-headline-md font-display text-platinum" style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>
            Other projects
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {smallProjects.map((proj, i) => (
            <motion.a
              key={proj.name}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
