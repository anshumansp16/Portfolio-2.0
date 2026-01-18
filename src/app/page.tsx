import { Hero } from './_components/Hero'
import { Philosophy } from './_components/Philosophy'
import { Metrics } from './_components/Metrics'
import { SelectedSystems } from './_components/SelectedSystems'
import { Talks } from './_components/Talks'
import { HowIWork } from './_components/HowIWork'
import { Testimonials } from './_components/Testimonials'
import { TechStack } from './_components/TechStack'
import { ConnectCTA } from './_components/ConnectCTA'
import { MuseumSpine } from '@/components/ui/MuseumSpine'
import { ProofStrip } from '@/components/ui/ProofStrip'

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

        {/* Scene 2: Principles */}
        <Philosophy />

        {/* Scene 3: Evidence */}
        <Metrics />

        {/* Scene 4: Selected Systems */}
        <SelectedSystems />

        {/* Scene 5: Talks & Teaching */}
        <Talks />

        {/* Scene 6: Engagement */}
        <HowIWork />

        {/* Scene 7: Social Proof */}
        <Testimonials />

        {/* Scene 8: Tech Stack */}
        <TechStack />

        {/* Scene 9: Connect CTA */}
        <ConnectCTA />

        {/* Footer handled by layout */}
      </main>
    </>
  )
}
