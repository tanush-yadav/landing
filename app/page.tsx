'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import { CTASection } from '@/components/cta-section'
import MovingTestimonials from '@/components/moving-testimonials'
import { CreatorListModal } from '@/components/creator-list-modal'

// Lazy load heavy components
const InteractiveDemoWrapper = dynamic(
  () => import('@/components/interactive-demo-wrapper'),
  {
    loading: () => (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading demo...</div>
      </div>
    ),
    ssr: false,
  }
)

const AttributionOutcomes = dynamic(() => import('@/components/attribution-outcomes'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading analytics...</div>
    </div>
  ),
})

export default function Home() {
  const [demoTrigger, setDemoTrigger] = useState(false)
  const [selectedTask, setSelectedTask] = useState('')
  const [isDemoRunning, setIsDemoRunning] = useState(false)
  const [heroSearchQuery, setHeroSearchQuery] = useState('')
  const [showCreatorModal, setShowCreatorModal] = useState(false)
  const [modalDismissed, setModalDismissed] = useState(false)

  const handleDemoComplete = () => {
    setIsDemoRunning(false)
    setDemoTrigger(false)
  }

  const handleHeroDemoTrigger = useCallback((searchQuery?: string) => {
    const sanitizedQuery = searchQuery?.trim() ||
      'Find fashion creators driving spring campaigns'

    setSelectedTask('')
    setDemoTrigger(false)
    setIsDemoRunning(true)
    setHeroSearchQuery(sanitizedQuery)

    setTimeout(() => {
      setSelectedTask('qualify-leads')
      setDemoTrigger(true)
    }, 100)

    setTimeout(() => {
      setDemoTrigger(false)
    }, 1600)
  }, [])

  // Keep the live search animation in sync with the hero selection
  const handleSearchQueryChange = useCallback((query: string) => {
    setHeroSearchQuery(query)
  }, [])


  useEffect(() => {
    if (modalDismissed) return

    const timer = window.setTimeout(() => {
      setShowCreatorModal(true)
    }, 4000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [modalDismissed])

  const handleModalClose = useCallback(() => {
    setShowCreatorModal(false)
    setModalDismissed(true)
  }, [])

  const handleOpenModal = useCallback(() => {
    setShowCreatorModal(true)
  }, [])

  const handleModalPrimaryAction = useCallback(
    (_payload: { website: string; workEmail: string }) => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    []
  )

  return (
    <main id="main" className="min-h-screen">
      <Navigation />
      <Hero
        onDemoTrigger={handleHeroDemoTrigger}
        isDemoRunning={isDemoRunning}
        onOpenModal={handleOpenModal}
        onSearchQueryChange={handleSearchQueryChange}
      />

      {/* Moving testimonials - companies trust banner */}
      <MovingTestimonials />

      {/* Interactive Demo Section - Clean Professional UI */}
      <InteractiveDemoWrapper
        triggerDemoFromHero={demoTrigger}
        selectedTaskFromHero={selectedTask}
        heroSearchQuery={heroSearchQuery}
        onDemoComplete={handleDemoComplete}
      />

      {/* Attribution and Outcomes Section */}
      <AttributionOutcomes />

      {/* CTA Section */}
      <CTASection onOpenModal={handleOpenModal} />

      <CreatorListModal
        open={showCreatorModal}
        onClose={handleModalClose}
        onPrimaryAction={handleModalPrimaryAction}
      />
    </main>
  )
}
