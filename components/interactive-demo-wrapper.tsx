'use client'

import React, { useState, useEffect, useRef } from 'react'
import InteractiveDemo from './interactive-demo'

interface InteractiveDemoWrapperProps {
  triggerDemoFromHero?: boolean
  selectedTaskFromHero?: string
}

const InteractiveDemoWrapper = ({ triggerDemoFromHero, selectedTaskFromHero }: InteractiveDemoWrapperProps) => {
  const [demoTrigger, setDemoTrigger] = useState(false)
  const [selectedTask, setSelectedTask] = useState('fix-auth-bug')
  const [demoKey, setDemoKey] = useState(0)
  const demoSectionRef = useRef<HTMLDivElement>(null)

  // Handle trigger from hero section
  useEffect(() => {
    if (triggerDemoFromHero) {
      // Update selected task if provided
      if (selectedTaskFromHero) {
        setSelectedTask(selectedTaskFromHero)
      }
      
      // Scroll to demo section
      setTimeout(() => {
        if (demoSectionRef.current) {
          demoSectionRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
      
      // Trigger demo animation after scroll
      setTimeout(() => {
        setDemoTrigger(true)
        // Reset key to restart demo
        setDemoKey(prev => prev + 1)
      }, 1000)
    }
  }, [triggerDemoFromHero, selectedTaskFromHero])

  return (
    <section ref={demoSectionRef} id="demo-section" className="min-h-screen bg-linear-bg-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Interactive Demo Component */}
        <InteractiveDemo 
          key={demoKey}
          triggerDemo={demoTrigger} 
          selectedTask={selectedTask}
        />
      </div>
    </section>
  )
}

export default InteractiveDemoWrapper