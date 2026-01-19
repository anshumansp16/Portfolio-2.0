import { Metadata } from 'next'
import { Mail, Linkedin, Github, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ContactForm } from './_components/ContactForm'

export const metadata: Metadata = {
  title: 'Connect - Anshuman Parmar',
  description: 'Get in touch to discuss AI solutions and enterprise architecture.',
}

export default function ConnectPage() {
  return (
    <main className="relative min-h-screen bg-ink pt-32 pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-display-md font-display text-platinum mb-4">
              Get in Touch
            </h1>
            <p className="text-body text-silver/80 max-w-2xl">
              I'm always interested in discussing new projects, creative ideas, or opportunities to collaborate.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-headline-sm font-display text-platinum mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <a
                    href="mailto:anshumansp16@gmail.com"
                    className="group flex items-start gap-4 transition-colors"
                  >
                    <div className="mt-1 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-accent-gold/50 transition-colors">
                      <Mail className="w-5 h-5 text-graphite group-hover:text-accent-gold transition-colors" />
                    </div>
                    <div>
                      <p className="text-label text-graphite mb-1">Email</p>
                      <p className="text-body text-platinum group-hover:text-accent-gold transition-colors">
                        anshumansp16@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/anshumansp16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 transition-colors"
                  >
                    <div className="mt-1 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-accent-gold/50 transition-colors">
                      <Linkedin className="w-5 h-5 text-graphite group-hover:text-accent-gold transition-colors" />
                    </div>
                    <div>
                      <p className="text-label text-graphite mb-1">LinkedIn</p>
                      <p className="text-body text-platinum group-hover:text-accent-gold transition-colors">
                        linkedin.com/in/anshumansp16
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/anshumansp16/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 transition-colors"
                  >
                    <div className="mt-1 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-accent-gold/50 transition-colors">
                      <Github className="w-5 h-5 text-graphite group-hover:text-accent-gold transition-colors" />
                    </div>
                    <div>
                      <p className="text-label text-graphite mb-1">GitHub</p>
                      <p className="text-body text-platinum group-hover:text-accent-gold transition-colors">
                        github.com/anshumansp16
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://x.com/anshumansp16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 transition-colors"
                  >
                    <div className="mt-1 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-accent-gold/50 transition-colors">
                      <X className="w-5 h-5 text-graphite group-hover:text-accent-gold transition-colors" />
                    </div>
                    <div>
                      <p className="text-label text-graphite mb-1">X (Twitter)</p>
                      <p className="text-body text-platinum group-hover:text-accent-gold transition-colors">
                        @anshumansp16
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-body-sm text-silver/60">
                  Response time: 24-48 hours
                </p>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
