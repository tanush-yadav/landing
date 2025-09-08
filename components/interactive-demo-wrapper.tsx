'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const InteractiveDemo = dynamic(() => import('./interactive-demo'), {
  ssr: false,
})

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
  const [isLoaded, setIsLoaded] = useState(false)
  const demoSectionRef = useRef<HTMLDivElement>(null)

  // Handle trigger from hero section
  useEffect(() => {
    if (triggerDemoFromHero && selectedTaskFromHero) {
      // Reset the trigger first to ensure clean state
      setDemoTrigger(false)
      // Ensure demo is loaded when triggered from hero
      if (!isLoaded) {
        setIsLoaded(true)
      }
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
  }, [triggerDemoFromHero, selectedTaskFromHero, isLoaded])

  // Prefetch the demo bundle when section is near viewport
  useEffect(() => {
    const el = demoSectionRef.current
    if (!el || isLoaded) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Soft prefetch without mounting
            import('./interactive-demo')
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [isLoaded])

  return (
    <section ref={demoSectionRef} id="demo-section" className="relative">
      {/* Poster / Loader */}
      {!isLoaded ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 sm:p-12 text-center">
            <div className="mx-auto max-w-2xl">
              <h3 className="font-display text-2xl sm:text-3xl text-gray-900 mb-3">
                See It in Action
              </h3>
              <p className="text-gray-600 mb-6">
                Watch a live task run. No audio, quick and clean.
              </p>
              <button
                onClick={() => setIsLoaded(true)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 min-h-[48px]"
                aria-label="Load live demo"
              >
                Watch Live Demo
              </button>
            </div>
          </div>
        </div>
      ) : (
        <InteractiveDemo
          triggerDemo={demoTrigger}
          selectedTask={selectedTaskFromHero}
          onDemoComplete={onDemoComplete}
        />
      )}
    </section>
  )
}

export default InteractiveDemoWrapper
