import { Hero } from './_components/Hero'
import { Philosophy } from './_components/Philosophy'
import { Metrics } from './_components/Metrics'
import { SelectedSystems } from './_components/SelectedSystems'
import { Talks } from './_components/Talks'
import { ProcessSection } from './_components/ProcessSection'
import { Testimonials } from './_components/Testimonials'
import { TechStack } from './_components/TechStack'
import { ConnectCTA } from './_components/ConnectCTA'
import { MuseumSpine } from '@/components/ui/MuseumSpine'
import { ProofStrip } from '@/components/ui/ProofStrip'
import { ProblemsISolve } from './_components/ProblemsISolve'
import { WhoThisIsFor } from './_components/WhoThisIsFor'
import { FAQ } from './_components/FAQ'

export default function HomePage() {
  return (
    <>
      {/* Museum spine - continuous thread */}
      <MuseumSpine />

      <main className="relative">
        {/* Scene 1: Arrival */}
        <Hero />

        {/* Quiet proof strip */}
        <ProofStrip />

        {/* Scene 2: Problems I Solve */}
        <ProblemsISolve />

        {/* Scene 3: Principles */}
        <Philosophy />

        {/* Scene 4: Evidence */}
        <Metrics />

        {/* Scene 5: Selected Systems */}
        <SelectedSystems />

        {/* Scene 6: Talks & Teaching */}
        <Talks />

        {/* Scene 7: Process */}
        <ProcessSection />

        {/* Scene 8: Who This Is For */}
        <WhoThisIsFor />

        {/* Scene 9: Social Proof */}
        <Testimonials />

        {/* Scene 10: Tech Stack */}
        <TechStack />

        {/* Scene 11: FAQ */}
        <FAQ />

        {/* Scene 12: Connect CTA */}
        <ConnectCTA />

        {/* Footer handled by layout */}
      </main>
    </>
  )
}
