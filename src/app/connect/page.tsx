import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Connect - Anshuman Parmar',
  description: 'Get in touch to discuss AI solutions and enterprise architecture.',
}

const contactMethods = [
  {
    icon: '📧',
    title: 'Email',
    description: 'For project inquiries and collaborations',
    link: 'mailto:anshumansp16@gmail.com',
    cta: 'Send an Email',
  },
  {
    icon: '💼',
    title: 'LinkedIn',
    description: 'Connect with me professionally',
    link: 'https://www.linkedin.com/in/anshumansp16',
    cta: 'View Profile',
  },
  {
    icon: '🐙',
    title: 'GitHub',
    description: 'Explore my open-source contributions',
    link: 'https://github.com/anshumansp16/',
    cta: 'Check Repositories',
  },
  {
    icon: '𝕏',
    title: 'X (Twitter)',
    description: 'Follow for tech insights and updates',
    link: 'https://x.com/AnshumanSP16',
    cta: 'Follow Me',
  },
]

export default function ConnectPage() {
  return (
    <main className="relative min-h-screen bg-noir-primary pt-32 pb-20">
      <Container size="wide">
        <div className="text-center space-y-6 mb-20">
          <p className="text-label text-graphite">LET'S CONNECT</p>
          <h1 className="text-display-md font-display text-platinum">
            Start a Conversation
          </h1>
          <p className="text-body text-silver/70 max-w-2xl mx-auto">
            Whether you have a project in mind, want to collaborate, or just chat
            about AI and technology, I'd love to hear from you.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactMethods.map((method) => (
            <Card key={method.title} className="text-center">
              <div className="text-5xl mb-4">{method.icon}</div>
              <h3 className="text-headline-sm font-display text-platinum mb-2">
                {method.title}
              </h3>
              <p className="text-body-sm text-silver/70 mb-6">
                {method.description}
              </p>
              <a
                href={method.link}
                className="luxury-link text-accent-gold text-body-sm font-medium"
              >
                {method.cta} →
              </a>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <h2 className="text-headline-lg font-display text-platinum text-center mb-8">
              Send a Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-label text-graphite mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-noir-subtle border border-white/[0.06] rounded-lg text-platinum focus:border-accent-gold/50 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-label text-graphite mb-2">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-noir-subtle border border-white/[0.06] rounded-lg text-platinum focus:border-accent-gold/50 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-label text-graphite mb-2">
                  SUBJECT
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-noir-subtle border border-white/[0.06] rounded-lg text-platinum focus:border-accent-gold/50 focus:outline-none transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label className="block text-label text-graphite mb-2">
                  MESSAGE
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 bg-noir-subtle border border-white/[0.06] rounded-lg text-platinum focus:border-accent-gold/50 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button type="submit" className="luxury-button w-full">
                <span className="relative z-10">Send Message</span>
              </button>
            </form>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-body-sm text-silver/70">
            I typically respond within 24-48 hours.
          </p>
        </div>
      </Container>
    </main>
  )
}
