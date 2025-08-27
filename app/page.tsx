'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import InteractiveDemoWrapper from '@/components/interactive-demo-wrapper'

export default function Home() {
  const [demoTrigger, setDemoTrigger] = useState(false)
  const [selectedTask, setSelectedTask] = useState('')
  const [isDemoRunning, setIsDemoRunning] = useState(false)

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
  }


  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero onDemoTrigger={handleDemoTrigger} isDemoRunning={isDemoRunning} />

      {/* Interactive Demo Section - Clean Professional UI */}
      <InteractiveDemoWrapper
        triggerDemoFromHero={demoTrigger}
        selectedTaskFromHero={selectedTask}
        onDemoComplete={handleDemoComplete}
        isDemoRunning={isDemoRunning}
      />
    </main>
  )
}
