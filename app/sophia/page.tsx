'use client'

import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import SophiaHeader from '@/components/sophia/SophiaHeader'
import HeroSection from '@/components/sophia/HeroSection'
import WhatSophiaDoesSection from '@/components/sophia/WhatSophiaDoesSection'
import IntegrationShowcase from '@/components/sophia/IntegrationShowcase'
import HowItWorksSection from '@/components/sophia/HowItWorksSection'
import UseCasesCarousel from '@/components/sophia/UseCasesCarousel'
import TrustSignalsSection from '@/components/sophia/TrustSignalsSection'
import PricingPreview from '@/components/sophia/PricingPreview'
import InteractiveDemo from '@/components/sophia/InteractiveDemo'
import SocialProofSection from '@/components/sophia/SocialProofSection'
import FinalCTASection from '@/components/sophia/FinalCTASection'
import FloatingSophia from '@/components/sophia/FloatingSophia'

export default function SophiaLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header Navigation */}
      <SophiaHeader />
      
      {/* Floating Sophia that follows scroll */}
      <FloatingSophia scrollYProgress={scrollYProgress} />

      {/* Hero Section */}
      <HeroSection />

      {/* What Sophia Does */}
      <div id="features">
        <WhatSophiaDoesSection />
      </div>

      {/* Integration Showcase */}
      <div id="integrations">
        <IntegrationShowcase />
      </div>

      {/* How It Works */}
      <div id="how-it-works">
        <HowItWorksSection />
      </div>

      {/* Use Cases Carousel */}
      <UseCasesCarousel />

      {/* Trust Signals */}
      <TrustSignalsSection />

      {/* Pricing Preview */}
      <div id="pricing">
        <PricingPreview />
      </div>

      {/* Interactive Demo */}
      <div id="demo">
        <InteractiveDemo />
      </div>

      {/* Social Proof */}
      <SocialProofSection />

      {/* Final CTA */}
      <FinalCTASection />
    </div>
  )
}