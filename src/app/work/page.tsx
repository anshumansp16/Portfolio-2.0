import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { ProjectCard } from '@/components/ui/ProjectCard'

export const metadata: Metadata = {
  title: 'Work - Anshuman Parmar',
  description: 'Explore my portfolio of AI-driven enterprise solutions and scalable systems.',
}

const projects = [
  {
    title: 'TATVA',
    description: 'A CLI that compresses setup → deploy into a repeatable path. Built for consistency across projects with streamlined workflow design and automation surface.',
    category: 'Tooling',
    tags: ['CLI', 'Templates', 'Environments', 'Deploy', 'SDLC Automation'],
    link: '/work/tatva',
    metrics: [
      { label: 'Scope', value: 'CLI' },
      { label: 'Focus', value: 'Workflow' },
      { label: 'Role', value: 'Dev' },
    ],
  },
  {
    title: 'Aarambh',
    description: 'A learning platform built around retention loops and operational reliability. Handles user journeys, content delivery, and admin ops with performance under real traffic.',
    category: 'Platform',
    tags: ['User Journeys', 'Content Delivery', 'Admin Ops', 'Performance', 'Architecture'],
    link: '/work/aarambh',
    metrics: [
      { label: 'Scope', value: 'Platform' },
      { label: 'Focus', value: 'Retention' },
      { label: 'Role', value: 'Architect' },
    ],
  },
  {
    title: 'CrownKing',
    description: 'Commerce system tuned for conversion, catalog scale, and clean operations. Handles product flows, payments, and fulfillment with speed and trust.',
    category: 'Commerce',
    tags: ['E-commerce', 'Payments', 'Product Flows', 'Fulfillment', 'Architecture'],
    link: '/work/crownking',
    metrics: [
      { label: 'Scope', value: 'Commerce' },
      { label: 'Focus', value: 'Conversion' },
      { label: 'Role', value: 'Build' },
    ],
  },
]

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-noir-primary pt-32 pb-20">
      {/* Hero Section */}
      <Container size="wide">
        <div className="text-center space-y-6 mb-20">
          <p className="text-label text-graphite">MY WORK</p>
          <h1 className="text-display-md font-display text-platinum">
            Portfolio & Case Studies
          </h1>
          <p className="text-body text-silver/70 max-w-2xl mx-auto">
            Transforming enterprise challenges into scalable AI solutions. Each
            project represents a commitment to excellence, innovation, and
            measurable business impact.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-body text-silver/70 mb-6">
            Interested in collaborating on your next project?
          </p>
          <a href="/connect" className="luxury-button group inline-flex">
            <span className="relative z-10">Let's Build Something Amazing</span>
          </a>
        </div>
      </Container>
    </main>
  )
}
