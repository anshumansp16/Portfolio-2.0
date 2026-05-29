'use client'

import Image from 'next/image'
import Link from 'next/link'

const skills = [
  {
    category: 'AI & ML',
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

const identities = [
  {
    title: 'AI Engineer',
    description: 'Building production AI systems at scale. RAG pipelines, agentic workflows, browser automation, and enterprise integrations. 7+ products shipped and running.',
    highlights: ['7+ live products', 'Production-grade systems', 'Full-stack AI'],
  },
  {
    title: 'Content Creator',
    description: 'Hindi tech and AI tools content on YouTube. Breaking down complex AI concepts for Indian developers. Brand collaborations and a growing community.',
    highlights: ['13.3% avg CTR', '30+ videos', '1 brand collab (Thumbs.ai)'],
  },
  {
    title: 'Entrepreneur',
    description: 'Founder of KreatorOS, ScrapeHub, and TATVA. Turning ideas into real products that people use. From concept to production — the full stack of building.',
    highlights: ['KreatorOS — content platform', 'ScrapeHub — data tool', 'TATVA — dev CLI'],
  },
]

export function AboutContent() {
  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="container-wide">

        {/* Hero - Horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-10 md:gap-14 items-center mb-28">

          {/* Portrait */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden"
              style={{
                border: '3px solid rgba(59,130,246,0.3)',
                boxShadow: '0 0 0 6px rgba(59,130,246,0.06), 0 20px 60px rgba(0,0,0,0.3)',
              }}>
              <Image
                src="/images/assets/anshuman-portrait.png"
                alt="Anshuman Parmar"
                fill
                className="object-cover"
                style={{ objectPosition: '50% 0%' }}
                sizes="(max-width: 768px) 208px, 288px"
                priority
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <div className="section-chip mb-4">About</div>
            <h1 className="text-display-sm md:text-display-md font-display text-platinum mb-3"
              style={{ fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Anshuman Parmar
            </h1>
            <p className="text-body-lg text-accent-electric mb-5" style={{ fontWeight: 400 }}>
              AI Engineer / Content Creator / Entrepreneur
            </p>
            <p className="text-body text-silver/70 max-w-lg mb-8" style={{ fontWeight: 300, lineHeight: 1.8 }}>
              I build AI products, create tech content in Hindi for Indian developers, 
              and ship ideas from zero to production. Currently focused on KreatorOS and growing my YouTube channel.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link href="/work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:translate-y-[-1px]"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', boxShadow: '0 4px 14px rgba(59,130,246,0.3)' }}>
                See My Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </Link>
              <Link href="/connect"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-platinum transition-all duration-300 hover:bg-white/[0.06]"
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Three Identities */}
        <div className="mb-28">
          <h2 className="text-headline-lg font-display text-platinum mb-10"
            style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>
            What I Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {identities.map((identity) => (
              <div
                key={identity.title}
                className="p-6 md:p-7 rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
                style={{
                  background: 'rgba(255,255,255,0.015)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent-blue" />
                  <h3 className="text-body text-platinum font-medium">{identity.title}</h3>
                </div>
                <p className="text-body-sm text-silver/60 mb-5" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                  {identity.description}
                </p>
                <div className="space-y-1.5">
                  {identity.highlights.map((h) => (
                    <p key={h} className="text-label text-silver/40">{h}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="mb-28">
          <h2 className="text-headline-lg font-display text-platinum mb-10"
            style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>
            How I Think
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Ship First, Perfect Later', text: 'Done is better than perfect. I launch fast, gather feedback, and iterate.' },
              { title: 'Value Over Code', text: 'Every line of code should serve a real user need or business goal.' },
              { title: 'Constraints as Fuel', text: 'Limited time and resources force creative solutions.' },
              { title: 'Simplicity Is Hard', text: 'The discipline is in what you choose not to build.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0" style={{ background: 'rgba(59,130,246,0.2)' }} />
                <div>
                  <h3 className="text-body text-platinum font-medium mb-1">{item.title}</h3>
                  <p className="text-body-sm text-silver/50" style={{ fontWeight: 300 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h2 className="text-headline-lg font-display text-platinum mb-10"
            style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>
            Technical Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <h3 className="text-label mb-4" style={{ color: 'rgba(96,165,250,0.8)', letterSpacing: '0.06em' }}>
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded text-label text-silver/50"
                      style={{ background: 'rgba(255,255,255,0.03)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-body text-silver/70" style={{ fontWeight: 300 }}>
              Interested in working together or collaborating on content?
            </p>
            <Link href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:translate-y-[-1px]"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', boxShadow: '0 4px 14px rgba(59,130,246,0.3)' }}>
              Let&apos;s Connect
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
