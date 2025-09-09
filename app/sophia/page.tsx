'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useScroll } from 'framer-motion'

// Core components - load immediately
import ComposioNav from '@/components/sophia/composio/ComposioNav'
import ComposioHero from '@/components/sophia/composio/ComposioHero'
import MetricsSection from '@/components/sophia/composio/MetricsSection'

// Lazy load secondary components
const FeatureShowcase = dynamic(
  () => import('@/components/sophia/composio/FeatureShowcase'),
  { ssr: false }
)

const PricingSection = dynamic(
  () => import('@/components/sophia/composio/PricingSection'),
  { ssr: false }
)
const FinalCTA = dynamic(
  () => import('@/components/sophia/composio/FinalCTA'),
  { ssr: false }
)
const FloatingSophiaIndicator = dynamic(
  () => import('@/components/sophia/composio/FloatingSophiaIndicator'),
  { ssr: false }
)

export default function SophiaLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FAF9F7] text-black overflow-x-hidden"
      style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
    >
      {/* Navigation */}
      <ComposioNav />

      {/* Floating Sophia Indicator */}
      <FloatingSophiaIndicator scrollYProgress={scrollYProgress} />

      {/* Hero Section with gradient background */}
      <ComposioHero />

      {/* Animated Metrics */}
      <MetricsSection />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Pricing */}
      <PricingSection />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  )
}
