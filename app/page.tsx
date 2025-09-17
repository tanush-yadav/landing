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

const TeamsSection = dynamic(() => import('@/components/teams-section'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading team...</div>
    </div>
  ),
})

export default function Home() {
  const [demoTrigger, setDemoTrigger] = useState(false)
  const [selectedTask, setSelectedTask] = useState('')
  const [isDemoRunning, setIsDemoRunning] = useState(false)
  const [showCreatorModal, setShowCreatorModal] = useState(false)
  const [modalDismissed, setModalDismissed] = useState(false)

  const handleDemoComplete = () => {
    setIsDemoRunning(false)
    setDemoTrigger(false)
  }

  const handleTeamsDelegation = (task: string) => {
    // Map team member tasks to demo workflows
    const teamTaskMapping: Record<string, string> = {
      'Fix authentication bug in login flow': 'fix-auth-bug',
      'Write blog post about new product features': 'blog-post',
      'Analyze Q4 marketing campaign metrics': 'competitor-research',
      'Run automated test suite for release': 'unit-tests',
      'Qualify and follow up with new leads': 'qualify-leads',
      "Organize tomorrow's stakeholder meeting": 'crm-updates',
    }

    const demoTaskId = teamTaskMapping[task] || 'fix-auth-bug'

    setSelectedTask('')
    setDemoTrigger(false)
    setIsDemoRunning(true)

    // Trigger demo after a brief delay
    setTimeout(() => {
      setSelectedTask(demoTaskId)
      setDemoTrigger(true)
    }, 100)
  }

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
      <Hero />

      {/* Moving testimonials - companies trust banner */}
      <MovingTestimonials />

      {/* Interactive Demo Section - Clean Professional UI */}
      <InteractiveDemoWrapper
        triggerDemoFromHero={demoTrigger}
        selectedTaskFromHero={selectedTask}
        onDemoComplete={handleDemoComplete}
      />

      {/* AI Teams Section */}
      <TeamsSection
        onDelegation={handleTeamsDelegation}
        isDemoRunning={isDemoRunning}
      />

      {/* CTA Section */}
      <CTASection />

      <CreatorListModal
        open={showCreatorModal}
        onClose={handleModalClose}
        onPrimaryAction={handleModalPrimaryAction}
      />
    </main>
  )
}
