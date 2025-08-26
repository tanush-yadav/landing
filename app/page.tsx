'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import IntegrationShowcase from '@/components/integration-showcase'
import InteractiveDemoWrapper from '@/components/interactive-demo-wrapper'

export default function Home() {
  const [demoTrigger, setDemoTrigger] = useState(false)
  const [selectedTask, setSelectedTask] = useState('')
  const [integrationDemoTrigger, setIntegrationDemoTrigger] = useState(false)
  const [integrationDemoType, setIntegrationDemoType] = useState<'slack' | 'linear' | null>(null)

  // Map hero task IDs to demo task IDs
  const taskMapping: Record<string, string> = {
    'refactor': 'refactor',
    'api': 'fix-auth-bug',
    'tests': 'fix-auth-bug',
    'blog': 'blog',
    'docs': 'blog',
    'copy': 'blog',
    'prospect': 'prospect',
    'email': 'prospect',
    'report': 'prospect',
    'process': 'process',
    'audit': 'process',
  }

  const handleDemoTrigger = (heroTaskId?: string) => {
    // Map the hero task to a demo task
    const demoTaskId = heroTaskId && taskMapping[heroTaskId] ? taskMapping[heroTaskId] : 'fix-auth-bug'
    setSelectedTask(demoTaskId)
    setDemoTrigger(true)
    
    // Reset trigger after a short delay
    setTimeout(() => setDemoTrigger(false), 100)
  }

  const handleIntegrationDemoTrigger = (demoType: 'slack' | 'linear') => {
    setIntegrationDemoType(demoType)
    setIntegrationDemoTrigger(true)
    
    // Reset trigger after a short delay
    setTimeout(() => setIntegrationDemoTrigger(false), 100)
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero
        onDemoTrigger={handleDemoTrigger}
      />

      {/* Interactive Demo Section - Clean Professional UI */}
      <InteractiveDemoWrapper 
        triggerDemoFromHero={demoTrigger}
        selectedTaskFromHero={selectedTask}
      />

      {/* Integration Showcase Section */}
      <IntegrationShowcase onDemoTrigger={handleIntegrationDemoTrigger} />
    </main>
  )
}
