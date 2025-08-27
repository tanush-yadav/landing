'use client'

import React, { useState, useEffect, useRef } from 'react'
import InteractiveDemo from './interactive-demo'

interface InteractiveDemoWrapperProps {
  triggerDemoFromHero?: boolean
  selectedTaskFromHero?: string
  onDemoComplete?: () => void
  isDemoRunning?: boolean
}

const InteractiveDemoWrapper = ({
  triggerDemoFromHero,
  selectedTaskFromHero,
  onDemoComplete,
  isDemoRunning,
}: InteractiveDemoWrapperProps) => {
  const [demoTrigger, setDemoTrigger] = useState(false)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const [lastScrollTime, setLastScrollTime] = useState(0)
  const demoSectionRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle trigger from hero section
  useEffect(() => {
    if (triggerDemoFromHero && selectedTaskFromHero) {
      setIsUserScrolling(true)
      
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

  // Detect user scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsUserScrolling(true)
      setLastScrollTime(Date.now())

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set new timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false)
      }, 3000) // Consider user idle after 3 seconds of no scrolling
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

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
        isUserInteracting={isUserScrolling}
        isAutoPlaying={false}
        onDemoComplete={onDemoComplete}
        isDemoRunning={isDemoRunning}
      />
    </section>
  )
}

export default InteractiveDemoWrapper
