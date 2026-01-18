'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import Image from 'next/image'

interface SystemProps {
  index: string
  name: string
  domain: string
  outcome: string
  constraints: string[]
  role: string
  image: string
  link?: string
  delay: number
}

function Exhibit({ index, name, domain, outcome, constraints, role, image, link, delay }: SystemProps) {
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
      {/* Artifact Frame */}
      <div className="relative group mb-8">
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
                className="object-contain transition-all duration-700 group-hover:scale-[1.02]"
                style={{
                  filter: 'grayscale(0.15) contrast(1.05)',
                }}
              />
            </div>
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.15) 100%)',
            }}
          />
        </div>
      </div>

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
        className="text-body-sm text-graphite/60 mb-4"
        style={{
          fontWeight: 300,
          fontStyle: 'italic',
        }}
      >
        {role}
      </p>

      {/* Link */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-body-sm text-silver/60 hover:text-platinum transition-colors duration-300"
          style={{ fontWeight: 300 }}
        >
          View system →
        </a>
      )}

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
    constraints: [
      'Scope: templates, environments, deploy steps',
      'Constraint: consistency across projects',
      'Owned: workflow design + automation surface',
    ],
    role: 'CLI development, SDLC automation',
    image: '/images/assets/tatva.png',
  },
  {
    index: '02',
    name: 'Aarambh',
    domain: 'PLATFORM',
    outcome: 'A learning platform built around retention loops and operational reliability',
    constraints: [
      'Scope: user journeys, content delivery, admin ops',
      'Constraint: performance under real traffic',
      'Owned: platform architecture + delivery quality',
    ],
    role: 'Platform architecture, delivery systems',
    image: '/images/assets/aarambh.png',
  },
  {
    index: '03',
    name: 'CrownKing',
    domain: 'COMMERCE',
    outcome: 'Commerce system tuned for conversion, catalog scale, and clean operations',
    constraints: [
      'Scope: product flows, payments, fulfillment',
      'Constraint: speed + trust',
      'Owned: end-to-end build + iteration',
    ],
    role: 'E-commerce architecture, payment systems',
    image: '/images/assets/crownking.png',
  },
]

export function SelectedSystems() {
  return (
    <section className="relative py-40 md:py-48">
      <Container size="narrow">
        {/* Section Label */}
        <motion.div
          className="mb-20"
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
        <div className="space-y-32">
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
