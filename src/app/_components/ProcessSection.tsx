'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface StepProps {
  number: string
  title: string
  timeframe: string
  description: string
  bullets: string[]
  index: number
}

function Step({ number, title, timeframe, description, bullets, index }: StepProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 1,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex gap-6 md:gap-8">
        {/* Step Number Circle */}
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(184, 134, 11, 0.05) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            <span
              className="font-mono text-accent-gold"
              style={{
                fontSize: '18px',
                fontWeight: 500,
              }}
            >
              {number}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-12 md:pb-16">
          {/* Title & Timeframe */}
          <div className="mb-4">
            <h3
              className="text-headline-md font-display text-platinum mb-2"
              style={{
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h3>
            <p
              className="font-mono text-accent-gold/70"
              style={{ fontSize: '11px', letterSpacing: '0.08em' }}
            >
              {timeframe}
            </p>
          </div>

          {/* Description */}
          <p
            className="text-body-lg text-silver/80 mb-6"
            style={{
              fontWeight: 300,
              letterSpacing: '0.01em',
              lineHeight: 1.7,
            }}
          >
            {description}
          </p>

          {/* Bullets */}
          <ul className="space-y-3">
            {bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="text-body text-silver/70 flex items-start gap-3"
                style={{
                  fontWeight: 300,
                  letterSpacing: '0.01em',
                  lineHeight: 1.6,
                }}
              >
                <span className="text-accent-gold/40 mt-1 text-xs">•</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Connecting Line (except for last step) */}
      {index < 2 && (
        <div
          className="absolute left-[23px] md:left-[27px] top-[56px] md:top-[64px] bottom-0 w-px"
          style={{
            background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
          }}
        />
      )}
    </motion.div>
  )
}

const steps = [
  {
    number: '01',
    title: 'Discovery & Assessment',
    timeframe: 'FREE — 30 MINUTES',
    description: 'We analyze your operations and identify where AI can create the most value. Clear ROI projections, no obligations—just clarity on what\'s possible.',
    bullets: [
      'Understand your business challenges and goals',
      'Identify high-impact AI opportunities',
      'Provide ballpark ROI estimates',
      'Discuss technical feasibility and approach',
    ],
  },
  {
    number: '02',
    title: 'Custom AI Design',
    timeframe: '1-2 WEEKS',
    description: 'I design your AI solution—RAG systems, intelligent agents, custom models, or workflow automation—tailored to your specific needs and infrastructure.',
    bullets: [
      'Detailed technical architecture and approach',
      'Integration plan with existing systems',
      'Timeline and milestone breakdown',
      'Clear pricing and deliverables',
    ],
  },
  {
    number: '03',
    title: 'Build, Deploy & Scale',
    timeframe: '2-4 WEEKS',
    description: 'I build production-grade AI systems, deploy them to your infrastructure, and ensure your team can leverage and maintain them. Ongoing support available.',
    bullets: [
      'Production-ready system with documentation',
      'Deployment with monitoring and observability',
      'Team training and handoff materials',
      'Post-launch optimization and support',
    ],
  },
]

export function ProcessSection() {
  return (
    <section className="relative py-20 md:py-28">
      <Container size="narrow">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p
            className="font-mono text-graphite/60 mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.1em' }}
          >
            HOW WE'LL WORK TOGETHER
          </p>
          <h2
            className="text-headline-md md:text-headline-lg lg:text-display-sm font-display text-platinum max-w-2xl mx-auto"
            style={{
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
            }}
          >
            Simple, Transparent Process
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <Step key={step.number} {...step} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a
            href="/connect"
            className="luxury-button-refined luxury-button-primary group inline-flex"
          >
            <span className="relative z-10">Start Your Free Consultation</span>
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
