'use client'

import { useEffect, useRef, useState } from 'react'
<<<<<<< Updated upstream
// import Link from 'next/link'
import { ArrowRight, Users, FileText, TrendingUp, Settings } from 'lucide-react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Label from '@radix-ui/react-label'
=======
import Image from 'next/image'
import { ArrowRight, Search } from 'lucide-react'
>>>>>>> Stashed changes
import {
  cn,
  incrementDelegationClickCount,
  redirectToCalIfThresholdMet,
} from '@/lib/utils'
<<<<<<< Updated upstream
import { motion, AnimatePresence } from 'framer-motion'
=======
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
>>>>>>> Stashed changes

// Platform tasks for YouTube, TikTok Shop, and Shopify
const floatingPills = [
  {
    id: 'youtube-tech-channels',
    platform: 'YouTube',
    icon: <Image src="/images/youtube.png" alt="YouTube" width={18} height={18} className="h-4.5 w-4.5" />,
    text: 'Search for top tech YouTube channels',
    searchQuery: 'Search for top tech YouTube channels with high engagement',
  },
  {
    id: 'tiktok-beauty-creators',
    platform: 'TikTok Shop',
    icon: <Image src="/images/tiktok-shop-logo.png" alt="TikTok Shop" width={18} height={18} className="h-4.5 w-4.5" />,
    text: 'Find beauty TikTok creators with 50K+',
    searchQuery: 'Find beauty TikTok creators with 50K+ followers',
  },
  {
    id: 'shopify-skincare-creators',
    platform: 'Shopify',
    icon: <Image src="/images/shopify-logo.png" alt="Shopify" width={18} height={18} className="h-4.5 w-4.5" />,
    text: 'Find niche skincare creators for product launches',
    searchQuery: 'Find niche skincare creators for product launches',
  },
]

interface HeroProps {
  onDemoTrigger?: (taskId?: string) => void
  isDemoRunning?: boolean
}

const Hero = ({ onDemoTrigger, isDemoRunning = false }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPill, setSelectedPill] = useState<string | null>(null)
  const [isDelegating, setIsDelegating] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const delegatingTimerRef = useRef<number | null>(null)

  const handlePillClick = (pill: typeof floatingPills[0]) => {
    setSearchQuery(pill.searchQuery)
    setSelectedPill(pill.id)
  }

  const handleMagicClick = () => {
    if (searchQuery.trim() && !isDemoRunning) {
      const newCount = incrementDelegationClickCount()
      if (redirectToCalIfThresholdMet(newCount)) {
        return
      }
      setIsDelegating(true)
      // Trigger the demo animation and scroll with the search query
      if (onDemoTrigger) {
        onDemoTrigger(searchQuery)
      }
      // Reset delegating state after animation
      delegatingTimerRef.current = window.setTimeout(() => {
        setIsDelegating(false)
      }, 2000)
    }
  }

  useEffect(() => {
    return () => {
      if (delegatingTimerRef.current) {
        clearTimeout(delegatingTimerRef.current)
      }
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 sm:py-20"
    >
      {/* Enhanced Gradient Mesh Background with Glass Effect */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />

        {/* Glass texture layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/20" />

        {/* Subtle geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='black' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Enhanced Floating orbs with glass effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glass orb elements with subtle floating animation */}
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-purple-200/20 via-pink-100/15 to-transparent backdrop-blur-3xl border border-white/10 animate-float" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-200/20 via-cyan-100/15 to-transparent backdrop-blur-3xl border border-white/10 animate-float-delayed" />
        <div className="absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-gradient-to-bl from-indigo-100/25 via-purple-50/20 to-transparent backdrop-blur-2xl border border-white/5 animate-float" />
        <div className="absolute bottom-1/3 left-1/3 h-36 w-36 rounded-full bg-gradient-to-tr from-teal-100/20 via-emerald-50/15 to-transparent backdrop-blur-xl border border-white/5 animate-float-delayed" />

        {/* Additional depth layers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-radial from-white/5 to-transparent blur-3xl" />
      </div>

      {/* Frosted glass overlay for main content area */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent backdrop-blur-[0.5px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div
            className={cn(
              'inline-flex items-center justify-center mb-8 opacity-0',
              isVisible && 'animate-fade-in-down'
            )}
            role="status"
            aria-live="polite"
          >
            <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-gray-700 border border-white/40 shadow-lg ring-1 ring-gray-200/10">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Now: Watch AI Complete Real Tasks
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={cn(
              'text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6 opacity-0 leading-tight',
              isVisible && 'animate-fade-in-up'
            )}
            style={{ letterSpacing: '-0.02em' }}
          >
            find creators your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
              buyers already follow
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              'text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto opacity-0 px-4',
              isVisible && 'animate-fade-in-up animation-delay-200'
            )}
          >
            and negoatiate, manage, track attribution (autonomously)
          </p>

          {/* Floating Pills and Search Section */}
          <div
            className={cn(
              'w-full max-w-4xl mx-auto opacity-0',
              isVisible && 'animate-fade-in-up animation-delay-400'
            )}
          >
            {/* Task Options */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl ring-1 ring-gray-200/20 mb-6">
              <div className="space-y-3">
                {floatingPills.map((pill, index) => (
                  <motion.div
                    key={pill.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * index }}
                    onClick={() => handlePillClick(pill)}
                    className={cn(
                      'flex items-center justify-between p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 border',
                      selectedPill === pill.id
                        ? 'bg-gray-100 border-gray-600'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300',
                      isDemoRunning && 'cursor-not-allowed opacity-60'
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={cn(
                        'w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-200',
                        selectedPill === pill.id
                          ? 'border-gray-900 bg-gray-900'
                          : 'border-gray-400'
                      )}>
                        {selectedPill === pill.id && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {pill.icon}
                        <span className="text-gray-900 text-sm sm:text-base leading-snug">
                          {pill.text}
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs sm:text-sm">
                      3 mins
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Search Input and Magic Button */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl ring-1 ring-gray-200/20">
              <div className="space-y-4">
                {/* Large Search Input */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isDemoRunning}
                    placeholder="Search for YouTube channels, TikTok creators, and podcasts by describing what you're looking for..."
                    className={cn(
                      'w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 bg-white',
                      'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none',
                      'placeholder:text-gray-400 transition-all duration-200',
                      isDemoRunning && 'cursor-not-allowed opacity-60'
                    )}
                  />
                </div>

                {/* Magic Button */}
                <Button
                  onClick={handleMagicClick}
                  disabled={!searchQuery.trim() || isDelegating || isDemoRunning}
                  isLoading={isDelegating}
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="text-lg py-4"
                >
                  {isDemoRunning ? (
                    'Demo in Progress...'
                  ) : isDelegating ? (
                    'Finding creators...'
                  ) : (
                    <>
                      Magic
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div
            className={cn(
              'mt-12 mb-16 sm:mb-0 flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-gray-500 text-xs sm:text-sm opacity-0',
              isVisible && 'animate-fade-in animation-delay-600'
            )}
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Autonomous negotiation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Autonomous attribution</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>Autonomous management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2">
        <div
          className={cn(
            'flex flex-col items-center text-gray-400 transition-all duration-300 hover:text-gray-600 cursor-pointer opacity-0',
            isVisible && 'animate-fade-in animation-delay-800'
          )}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            })
          }}
        >
          <span className="text-sm font-medium mb-3">Scroll to explore</span>
          <div className="animate-bounce">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
