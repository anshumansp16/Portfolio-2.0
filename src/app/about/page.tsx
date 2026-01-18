import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'About - Anshuman Parmar',
  description: 'Learn more about my journey in AI architecture and enterprise systems.',
}

const skills = [
  {
    category: 'AI & Automation',
    items: ['RAG Systems', 'LangChain', 'LangGraph', 'OpenAI', 'Claude', 'Gemini', 'ChromaDB', 'Pinecone', 'Selenium', 'Playwright'],
  },
  {
    category: 'Backend & APIs',
    items: ['Python', 'FastAPI', 'Node.js', 'Express.js', 'REST/GraphQL', 'WebSocket', 'Microservices'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript ES6+', 'Tailwind CSS', 'Redux', 'React Query', 'Three.js'],
  },
  {
    category: 'Database & Cloud',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'Vercel'],
  },
]

const experience = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Thunder Marketing Corporation',
    period: 'April 2025 - Present',
    description: 'Architected enterprise-scale browser automation platform using Selenium & Playwright, processing 50K+ automated tasks daily with 99.9% reliability. Built production FastAPI microservices architecture handling 10K+ concurrent requests. Engineered AI-powered automation systems integrating GPT-4, Claude, and custom LLMs. Developed Next.js dashboards with real-time monitoring and implemented CI/CD pipelines reducing deployment time by 60%.',
  },
  {
    role: 'AI Engineer',
    company: 'Sazag Infotech Private Limited',
    period: 'April 2024 - March 2025',
    description: 'Designed production-grade RAG systems and agentic AI architectures for enterprise clients, improving query accuracy by 40% through vector database optimization. Built Chrome extensions and browser automation tools generating 30% cost savings. Containerized applications using Docker/Kubernetes for seamless scaling. Developed scalable Python FastAPI backends integrated with AWS/GCP.',
  },
  {
    role: 'Full Stack Developer',
    company: 'Freelance',
    period: 'August 2022 - March 2024',
    description: 'Delivered 25+ production web applications using React.js, Next.js, and modern frontend frameworks, maintaining 99% client satisfaction rating. Migrated 15+ legacy applications to AWS cloud infrastructure, achieving 50% cost reduction and 95+ Google PageSpeed scores. Integrated RESTful APIs, payment gateways, and authentication systems. Mentored 3 junior developers improving team code quality by 40%.',
  },
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-noir-primary pt-32 pb-20">
      <Container size="wide">
        {/* Hero */}
        <div className="text-center space-y-6 mb-20">
          <p className="text-label text-accent-gold">ABOUT</p>
          <h1 className="text-display-md font-display text-platinum">
            Builder. Thinker. Craftsman.
          </h1>
          <p className="text-body-lg text-silver/50 max-w-xl mx-auto">
            I care about things that last.
          </p>
        </div>

        {/* Bio */}
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <p className="text-body-lg text-silver/90 leading-relaxed">
            I build production AI systems and browser automation at scale. Not demos—systems
            that handle 50K+ daily tasks with 99.9% reliability. The kind that stay shipped.
          </p>
          <p className="text-body text-silver/80 leading-relaxed">
            5+ years of deep work in Generative AI, RAG systems, and enterprise automation.
            I've reduced operational costs by 60% through intelligent systems and improved
            reliability by 85% through architecture that respects constraints.
          </p>
        </div>

        {/* Philosophy - How I Think */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-headline-lg font-display text-platinum text-center mb-12">
            How I Think
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-headline-sm font-display text-accent-gold">
                Constraints as Fuel
              </h3>
              <p className="text-body text-silver/70 leading-relaxed">
                I see limitations as creative fuel, not obstacles. The tightest deadlines
                produce the cleanest solutions. Unlimited resources lead to bloat.
                Constraints force decisions—and decisions are where craft lives.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-headline-sm font-display text-accent-gold">
                Value Over Code
              </h3>
              <p className="text-body text-silver/70 leading-relaxed">
                Technical excellence means nothing without value creation. I'm not just
                a coder—I understand that beautiful systems no one needs are just
                expensive art projects. The graveyard of startups proves this daily.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-headline-sm font-display text-accent-gold">
                Output Over Hours
              </h3>
              <p className="text-body text-silver/70 leading-relaxed">
                I value async, deep work, and trust over surveillance. The best work
                happens in focused blocks, not in meetings. What ships matters more
                than what's measured. Activity isn't progress.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-headline-sm font-display text-accent-gold">
                Frameworks, Not Rules
              </h3>
              <p className="text-body text-silver/70 leading-relaxed">
                I think in frameworks. Reversible vs irreversible decisions.
                Speed vs analysis trade-offs. First principles over best practices.
                Context determines correctness—there are no universal answers.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-headline-sm font-display text-accent-gold">
                Timing Is Everything
              </h3>
              <p className="text-body text-silver/70 leading-relaxed">
                What works at 0→1 kills you at 1→100. Microservices before
                product-market fit is suicide. Monoliths at scale is suffocation.
                The right decision at the wrong time is the wrong decision.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-headline-sm font-display text-accent-gold">
                Simplicity Is Hard
              </h3>
              <p className="text-body text-silver/70 leading-relaxed">
                Junior engineers add complexity to solve problems. Senior engineers
                remove it. The discipline isn't in what you add—it's in what you
                choose not to. Simple systems stay simple. Clever ones don't.
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h2 className="text-headline-lg font-display text-platinum text-center mb-12">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup) => (
              <Card key={skillGroup.category}>
                <h3 className="text-label text-accent-gold mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-noir-subtle border border-white/[0.06] rounded-full text-label-sm text-silver"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-20">
          <h2 className="text-headline-lg font-display text-platinum text-center mb-12">
            Experience
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {experience.map((exp) => (
              <Card key={exp.company}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-headline-sm font-display text-platinum mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-body-sm text-accent-gold">{exp.company}</p>
                  </div>
                  <p className="text-label text-graphite mt-2 md:mt-0">
                    {exp.period}
                  </p>
                </div>
                <p className="text-body-sm text-silver/70">{exp.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-body text-silver/70 mb-6">
            Want to learn more or discuss a project?
          </p>
          <a href="/connect" className="luxury-button group inline-flex">
            <span className="relative z-10">Get in Touch</span>
          </a>
        </div>
      </Container>
    </main>
  )
}
