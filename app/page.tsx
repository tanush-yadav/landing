'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import { CTASection } from '@/components/cta-section'

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
  // removed unused teamsDelegation state

  // Map hero task IDs to demo workflow IDs
  const taskMapping: Record<string, string> = {
    // Engineering tasks
    'auth-bug-fix': 'fix-auth-bug',
    'payment-api-error': 'payment-api-error',
    'user-service-tests': 'unit-tests',
    // Content tasks
    'blog-post': 'blog-post',
    'email-campaign': 'email-campaign',
    'api-docs': 'api-docs',
    // Sales tasks
    'qualify-leads': 'qualify-leads',
    'competitor-research': 'competitor-research',
    'crm-update': 'crm-updates',
    // Operations tasks
    'aws-audit': 'aws-audit',
    'monitoring-setup': 'api-monitoring',
    'deployment-docs': 'deployment-docs',
  }

  const handleDemoTrigger = (heroTaskId?: string) => {
    // Don't allow new demo if one is already running
    if (isDemoRunning) {
      return
    }

    // Map the hero task to a demo task
    const demoTaskId =
      heroTaskId && taskMapping[heroTaskId]
        ? taskMapping[heroTaskId]
        : 'fix-auth-bug'

    // Force a reset by changing task to empty then back
    // This ensures the demo component fully resets
    setSelectedTask('')
    setDemoTrigger(false)
    setIsDemoRunning(true)

    // Then set the new task and trigger after a brief delay
    setTimeout(() => {
      setSelectedTask(demoTaskId)
      setDemoTrigger(true)
    }, 100)
  }

  const handleDemoComplete = () => {
    setIsDemoRunning(false)
    // Ensure trigger is reset when demo completes
    setDemoTrigger(false)
    // no-op
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

    // no-op
    setSelectedTask('')
    setDemoTrigger(false)
    setIsDemoRunning(true)

    // Trigger demo after a brief delay
    setTimeout(() => {
      setSelectedTask(demoTaskId)
      setDemoTrigger(true)
    }, 100)
  }

  return (
    <main id="main" className="min-h-screen">
      <Navigation />
      <Hero onDemoTrigger={handleDemoTrigger} isDemoRunning={isDemoRunning} />

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
    </main>
  )
}
