'use client'

import React, { useState, useEffect, useRef } from 'react'
import InteractiveDemo from './interactive-demo'

interface InteractiveDemoWrapperProps {
  triggerDemoFromHero?: boolean
  selectedTaskFromHero?: string
}

const InteractiveDemoWrapper = ({
  triggerDemoFromHero,
  selectedTaskFromHero,
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
        // Don't reset key - let the demo manage its own state
      }, 1000)
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
      />
    </section>
  )
}

export default InteractiveDemoWrapper
