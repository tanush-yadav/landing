'use client'

import React, { useState, useEffect, useRef } from 'react'
import InteractiveDemo from './interactive-demo'

interface InteractiveDemoWrapperProps {
  triggerDemoFromHero?: boolean
  selectedTaskFromHero?: string
  onDemoComplete?: () => void
}

const InteractiveDemoWrapper = ({
  triggerDemoFromHero,
  selectedTaskFromHero,
  onDemoComplete,
}: InteractiveDemoWrapperProps) => {
  const [demoTrigger, setDemoTrigger] = useState(false)
  const demoSectionRef = useRef<HTMLDivElement>(null)

  // Handle trigger from hero section
  useEffect(() => {
    if (triggerDemoFromHero && selectedTaskFromHero) {
      // Reset the trigger first to ensure clean state
      setDemoTrigger(false)

      // Scroll to demo section
      setTimeout(() => {
        if (demoSectionRef.current) {
          demoSectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }, 100)

      // Trigger demo animation after scroll
      setTimeout(() => {
        setDemoTrigger(true)
      }, 1000)
      
      // Reset trigger after a delay to prepare for next run
      setTimeout(() => {
        setDemoTrigger(false)
      }, 1500)
    } else if (!triggerDemoFromHero) {
      // When hero trigger is false, ensure demo trigger is also false
      setDemoTrigger(false)
    }
  }, [triggerDemoFromHero, selectedTaskFromHero])


  return (
    <section
      ref={demoSectionRef}
      id="demo-section"
      className="relative"
    >
      {/* Interactive Demo Component */}
      <InteractiveDemo
        triggerDemo={demoTrigger}
        selectedTask={selectedTaskFromHero}
        onDemoComplete={onDemoComplete}
      />
    </section>
  )
}

export default InteractiveDemoWrapper
