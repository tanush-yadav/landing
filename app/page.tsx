'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import InteractiveDemoWrapper from '@/components/interactive-demo-wrapper'

export default function Home() {
  const [demoTrigger, setDemoTrigger] = useState(false)
  const [selectedTask, setSelectedTask] = useState('')

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
    // Map the hero task to a demo task
    const demoTaskId =
      heroTaskId && taskMapping[heroTaskId]
        ? taskMapping[heroTaskId]
        : 'fix-auth-bug'
    setSelectedTask(demoTaskId)
    setDemoTrigger(true)

    // Reset trigger after demo has had time to start
    setTimeout(() => setDemoTrigger(false), 1500)
  }


  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero onDemoTrigger={handleDemoTrigger} />

      {/* Interactive Demo Section - Clean Professional UI */}
      <InteractiveDemoWrapper
        triggerDemoFromHero={demoTrigger}
        selectedTaskFromHero={selectedTask}
      />
    </main>
  )
}
