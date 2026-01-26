'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import Image from 'next/image'

interface SystemProps {
  index: string
  name: string
  domain: string
  outcome: string
  businessOutcome: string
  constraints: string[]
  role: string
  image: string
  link?: string
  delay: number
}

function Exhibit({ index, name, domain, outcome, businessOutcome, constraints, role, image, link, delay }: SystemProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 1.4,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Business Outcome Badge */}
      <motion.div
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(184, 134, 11, 0.04) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.15)',
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      >
        <svg
          className="w-4 h-4 text-accent-gold/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        <span
          className="text-body-sm text-accent-gold/90"
          style={{
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          {businessOutcome}
        </span>
      </motion.div>

      {/* Artifact Frame */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group mb-8 block cursor-pointer"
      >
        {/* Browser Frame Container */}
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(255, 255, 255, 0.01)',
          }}
        >
          {/* Browser Top Bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-graphite/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-graphite/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-graphite/40" />
            </div>
          </div>

          {/* Image Container with Padding */}
          <div className="relative px-6 py-6">
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={image}
                alt={`${name} artifact`}
                fill
                className="object-contain transition-all duration-700 group-hover:scale-[1.05]"
                style={{
                  filter: 'grayscale(0.15) contrast(1.05)',
                }}
              />
            </div>
          </div>

          {/* Hover Overlay - Slides from bottom */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.8) 40%, transparent 100%)',
            }}
          >
            <motion.div
              className="flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
              }}
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-ink font-medium text-sm">Look at system</span>
              <svg
                className="w-4 h-4 text-ink"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.div>
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.15) 100%)',
            }}
          />
        </div>
      </a>

      {/* Label Row */}
      <div className="flex items-baseline gap-4 mb-4">
        <span
          className="font-mono text-graphite/60"
          style={{ fontSize: '11px', letterSpacing: '0.08em' }}
        >
          {index}
        </span>
        <h3
          className="text-headline-md text-platinum font-display"
          style={{
            fontWeight: 400,
            letterSpacing: '-0.02em',
          }}
        >
          {name}
        </h3>
        <span
          className="font-mono text-graphite/50 ml-auto"
          style={{ fontSize: '10px', letterSpacing: '0.08em' }}
        >
          {domain}
        </span>
      </div>

      {/* Outcome */}
      <p
        className="text-body-lg text-platinum/70 mb-6"
        style={{
          fontWeight: 300,
          letterSpacing: '-0.01em',
          lineHeight: 1.7,
        }}
      >
        {outcome}
      </p>

      {/* Constraints */}
      <div className="space-y-2.5 mb-6">
        {constraints.map((constraint, idx) => (
          <p
            key={idx}
            className="text-body text-silver/50 flex items-start gap-3"
            style={{
              fontWeight: 300,
              letterSpacing: '0.01em',
            }}
          >
            <span className="text-accent-gold/40 mt-1 text-xs">—</span>
            {constraint}
          </p>
        ))}
      </div>

      {/* Role */}
      <p
        className="text-body-sm text-graphite/60"
        style={{
          fontWeight: 300,
          fontStyle: 'italic',
        }}
      >
        {role}
      </p>

      {/* Light falloff separator */}
      <div
        className="absolute -bottom-16 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          filter: 'blur(0.5px)',
        }}
      />
    </motion.div>
  )
}

const systems = [
  {
    index: '01',
    name: 'TATVA',
    domain: 'TOOLING',
    outcome: 'A CLI that compresses setup → deploy into a repeatable path',
    businessOutcome: 'Reduced setup time from days to 15 minutes',
    constraints: [
      'Scope: templates, environments, deploy steps',
      'Constraint: consistency across projects',
      'Owned: workflow design + automation surface',
    ],
    role: 'CLI development, SDLC automation',
    image: '/images/assets/tatva.png',
    link: 'https://tatva.anshumansp.com',
  },
  {
    index: '02',
    name: 'ScrapeHub',
    domain: 'AI PLATFORM',
    outcome: 'AI-powered web scraping infrastructure with intelligent extraction and async job processing',
    businessOutcome: 'Built for industrial-grade data collection at scale',
    constraints: [
      'Scope: Apify integration, GPT-4o-mini extraction, async job queue',
      'Constraint: Cost optimization (90% reduction), scalability',
      'Owned: Full-stack architecture + dataset generation pipeline',
    ],
    role: 'Platform architecture, AI integration, distributed systems',
    image: '/images/assets/scrapehub.png',
    link: 'https://scrape.anshumansp.com',
  },
  {
    index: '03',
    name: 'CrownKing',
    domain: 'COMMERCE',
    outcome: 'Commerce system tuned for conversion, catalog scale, and clean operations',
    businessOutcome: 'Optimized for conversion stability and clean ops under growth',
    constraints: [
      'Scope: product flows, payments, fulfillment',
      'Constraint: speed + trust',
      'Owned: end-to-end build + iteration',
    ],
    role: 'E-commerce architecture, payment systems',
    image: '/images/assets/crownking.png',
    link: 'https://resume.anshumansp.com',
  },
  {
    index: '04',
    name: 'Aarambh',
    domain: 'PLATFORM',
    outcome: 'A learning platform built around retention loops and operational reliability',
    businessOutcome: 'Designed for 10K+ concurrent users with 99.9% uptime',
    constraints: [
      'Scope: user journeys, content delivery, admin ops',
      'Constraint: performance under real traffic',
      'Owned: platform architecture + delivery quality',
    ],
    role: 'Platform architecture, delivery systems',
    image: '/images/assets/aarambh.png',
    link: 'https://aarambh.anshumansp.com',
  },
]

export function SelectedSystems() {
  return (
    <section className="relative py-20 md:py-28">
      <Container size="narrow">
        {/* Section Label */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p
            className="font-mono text-graphite/60"
            style={{ fontSize: '11px', letterSpacing: '0.1em' }}
          >
            SELECTED SYSTEMS
          </p>
        </motion.div>

        {/* Exhibits */}
        <div className="space-y-20 md:space-y-28">
          {systems.map((system, index) => (
            <Exhibit
              key={system.name}
              {...system}
              delay={index * 0.15}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
