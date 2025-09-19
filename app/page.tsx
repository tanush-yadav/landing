'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import { CTASection } from '@/components/cta-section'
import MovingTestimonials from '@/components/moving-testimonials'
import { CreatorListModal } from '@/components/creator-list-modal'
import { WaveDivider } from '@/components/ui/wave-divider'

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

// Team section (restored from feature/teams-section)
const TeamsSection = dynamic(() => import('@/components/teams-section'), {
  ssr: false,
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
    async (payload: { website: string; workEmail: string }) => {
      try {
        const response = await fetch('/api/creator-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const errorBody = await response.json().catch(() => null)
          console.error('Failed to save creator list request', errorBody)

          const message =
            typeof errorBody?.error === 'string'
              ? errorBody.error
              : 'Something went wrong while saving your request.'

          return { success: false as const, error: message }
        }

        const heroSection = document.getElementById('hero')
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        return { success: true as const }
      } catch (error) {
        console.error('Failed to save creator list request', error)

        return {
          success: false as const,
          error: 'Network error. Please try again in a moment.',
        }
      }
    },
    []
  )

  return (
    <main id="main">
      <Navigation />
      <section data-section="hero">
        <Hero
          onDemoTrigger={handleHeroDemoTrigger}
          isDemoRunning={isDemoRunning}
          onOpenModal={handleOpenModal}
          onSearchQueryChange={handleSearchQueryChange}
        />
      </section>

      <WaveDivider variant="subtle" position="bottom" />

      <section
        data-section="interactive-demo"
        className="mt-4 sm:mt-6 md:mt-8"
      >
        <InteractiveDemoWrapper
          triggerDemoFromHero={demoTrigger}
          selectedTaskFromHero={selectedTask}
          heroSearchQuery={heroSearchQuery}
          onDemoComplete={handleDemoComplete}
        />
      </section>

      <WaveDivider variant="accent" position="bottom" />

      <section
        data-section="moving-testimonials"
        className="mt-16 sm:mt-20 md:mt-24"
      >
        <MovingTestimonials />
      </section>

      <WaveDivider variant="subtle" position="top" />

      <section
        data-section="attribution-outcomes"
        className="mt-16 sm:mt-20 md:mt-24"
      >
        <AttributionOutcomes />
      </section>

      <WaveDivider variant="accent" position="bottom" />

      <section data-section="teams" className="mt-16 sm:mt-20 md:mt-24">
        <TeamsSection onOpenModal={handleOpenModal} />
      </section>

      <WaveDivider variant="strong" position="top" />

      <section data-section="cta-section" className="mt-16 sm:mt-20 md:mt-24">
        <CTASection onOpenModal={handleOpenModal} />
      </section>

      <CreatorListModal
        open={showCreatorModal}
        onClose={handleModalClose}
        onPrimaryAction={handleModalPrimaryAction}
      />
    </main>
  )
}
