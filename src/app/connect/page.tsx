import { Metadata } from 'next'
import { Mail, Linkedin, Github, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ContactForm } from './_components/ContactForm'

export const metadata: Metadata = {
  title: 'Connect - Anshuman Parmar',
  description: 'Get in touch to discuss AI solutions and intelligent systems for your business.',
}

export default function ConnectPage() {
  return (
    <main className="relative min-h-screen bg-ink pt-32 pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-display-sm md:text-display-md font-display text-platinum mb-4">
              Get in Touch
            </h1>
            <p className="text-body-sm md:text-body text-silver/80 max-w-2xl mb-8">
              I work with a small number of clients at a time to design and ship systems that last.
              If you're experiencing operational pain, let's discuss how AI integration can help.
            </p>

            {/* Qualification Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Good Fit */}
              <div className="relative">
                <div className="absolute inset-0 border border-white/[0.04] rounded-lg" />
                <div className="relative p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                      }}
                    >
                      <svg
                        className="w-3.5 h-3.5 text-green-500/80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-headline-sm font-display text-platinum">
                      Good Fit
                    </h3>
                  </div>
                  <ul className="space-y-2 text-body-sm text-silver/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500/60 mt-1">✓</span>
                      Experiencing operational pain from manual processes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500/60 mt-1">✓</span>
                      Clear business problems needing AI solutions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500/60 mt-1">✓</span>
                      Want production-grade systems, not experiments
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500/60 mt-1">✓</span>
                      Ready to invest in long-term solutions
                    </li>
                  </ul>
                </div>
              </div>

              {/* Not a Fit */}
              <div className="relative">
                <div className="absolute inset-0 border border-white/[0.04] rounded-lg" />
                <div className="relative p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                      }}
                    >
                      <svg
                        className="w-3.5 h-3.5 text-red-500/80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <h3 className="text-headline-sm font-display text-platinum">
                      Probably Not a Fit
                    </h3>
                  </div>
                  <ul className="space-y-2 text-body-sm text-silver/60">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500/60 mt-1">✗</span>
                      Just exploring without specific needs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500/60 mt-1">✗</span>
                      Need quick demos or experiments only
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500/60 mt-1">✗</span>
                      Looking for the cheapest possible option
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500/60 mt-1">✗</span>
                      Want consulting without implementation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
