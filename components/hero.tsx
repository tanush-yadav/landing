'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

// Platform tasks for YouTube, TikTok Shop, and Shopify
const floatingPills = [
  {
    id: 'youtube-tech-channels',
    platform: 'YouTube',
    icon: <Image src="/images/youtube.png" alt="YouTube" width={14} height={14} className="h-3.5 w-3.5" />,
    text: 'Search for youtubers talking about claude code',
    searchQuery: 'Search for youtubers talking about claude code',
  },
  {
    id: 'tiktok-beauty-creators',
    platform: 'TikTok Shop',
    icon: <Image src="/images/tiktok-shop-logo.png" alt="TikTok Shop" width={14} height={14} className="h-3.5 w-3.5" />,
    text: 'Find beauty TikTok creators > 50K followers',
    searchQuery: 'Find beauty TikTok creators > 50K followers',
  },
  {
    id: 'shopify-skincare-creators',
    platform: 'Shopify',
    icon: <Image src="/images/shopify-logo.png" alt="Shopify" width={14} height={14} className="h-3.5 w-3.5" />,
    text: 'Find niche skincare creators for product launches',
    searchQuery: 'Find niche skincare creators for product launches',
  },
]

interface HeroProps {
  onDemoTrigger?: (taskId?: string) => void
  isDemoRunning?: boolean
  onOpenModal?: () => void
  // Notify parent when the search query changes so other sections
  // (e.g., the live search animation) can reflect the selection.
  onSearchQueryChange?: (query: string) => void
}

const Hero = ({ onDemoTrigger, isDemoRunning = false, onOpenModal, onSearchQueryChange }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPill, setSelectedPill] = useState<string | null>(null)
  const [isDelegating, setIsDelegating] = useState(false)
  const [isTypingDemo, setIsTypingDemo] = useState(false)
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Demo typing animation
  useEffect(() => {
    if (!isVisible || searchQuery || isDemoRunning) return

    const demoQueries = [
      'Find beauty creators with 100K+ followers who post skincare content',
      'Search for tech YouTubers reviewing productivity software',
      'Discover lifestyle influencers promoting sustainable fashion'
    ]

    let timeoutId: NodeJS.Timeout

    const startTypingDemo = () => {
      const randomQuery = demoQueries[Math.floor(Math.random() * demoQueries.length)]
      setIsTypingDemo(true)
      setTypedText('')

      let charIndex = 0
      const typeChar = () => {
        if (charIndex < randomQuery.length) {
          setTypedText(randomQuery.substring(0, charIndex + 1))
          charIndex++
          timeoutId = setTimeout(typeChar, 50 + Math.random() * 50) // Variable typing speed
        } else {
          // Pause for 2 seconds, then clear and start over
          timeoutId = setTimeout(() => {
            setTypedText('')
            setIsTypingDemo(false)
            timeoutId = setTimeout(startTypingDemo, 3000) // Wait 3 seconds before next demo
          }, 2000)
        }
      }

      // Start typing after 2 seconds
      timeoutId = setTimeout(typeChar, 2000)
    }

    // Start the demo after component is visible
    timeoutId = setTimeout(startTypingDemo, 1000)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isVisible, searchQuery, isDemoRunning])

  const delegatingTimerRef = useRef<number | null>(null)

  const handlePillClick = (pill: typeof floatingPills[0]) => {
    setSearchQuery(pill.searchQuery)
    setSelectedPill(pill.id)
    // Propagate selection upward so the demo's live search mirrors it
    onSearchQueryChange?.(pill.searchQuery)
  }

  const handleMagicClick = () => {
    if (searchQuery.trim() && !isDemoRunning) {
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
      className="relative flex items-center justify-center overflow-hidden px-4 pt-28 pb-8 sm:pt-36 sm:pb-10"
    >
      {/* Enhanced Gradient Mesh Background with Glass Effect */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      </div>

      {/* Enhanced Floating orbs with glass effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft orbs */}
        <div className="absolute -top-44 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-purple-200/25 via-pink-100/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-56 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-200/20 via-cyan-100/15 to-transparent blur-[120px]" />
        <div className="absolute top-1/3 right-[18%] h-40 w-40 rounded-full bg-gradient-to-bl from-indigo-100/30 to-transparent blur-3xl" />
      </div>

      {/* Light haze overlay for main content area */}
      {/* <div className="absolute inset-0 bg-white/10" /> */}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Badge */}
          <div
            className={cn(
              'mb-4 flex items-center justify-center opacity-0',
              isVisible && 'animate-fade-in-down'
            )}
            role="status"
            aria-live="polite"
          >
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              Get creators in your niche
            </button>
          </div>

          {/* Main Headline */}
          <h1
            className={cn(
              'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-3 opacity-0 leading-[1.1] sm:leading-tight',
              isVisible && 'animate-fade-in-up'
            )}
            style={{ letterSpacing: '-0.02em' }}
          >
            find creators your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 mt-1">
              buyers already follow
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              'text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto opacity-0 px-2 sm:px-4',
              isVisible && 'animate-fade-in-up animation-delay-200'
            )}
          >
            and negotiate, manage, track attribution (autonomously)
          </p>

          {/* Floating Pills and Search Section */}
          <div
            className={cn(
              'mx-auto w-full max-w-lg opacity-0 sm:max-w-2xl md:max-w-2xl lg:max-w-2xl',
              isVisible && 'animate-fade-in-up animation-delay-400'
            )}
          >
            {/* Task Options */}
            <div className="mb-2 rounded-[16px] border border-slate-100 bg-white p-2 shadow-[0_10px_30px_-25px_rgba(15,23,42,0.4)] sm:mb-3 sm:p-2.5">
              <div className="space-y-4">
                {floatingPills.map((pill, index) => (
                  <motion.div
                    key={pill.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * index }}
                    onClick={() => handlePillClick(pill)}
                    className={cn(
                      'flex items-center justify-between rounded-lg border p-1.5 sm:p-2 transition-all duration-200 cursor-pointer',
                      selectedPill === pill.id
                        ? 'border-slate-300 bg-slate-100 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                      isDemoRunning && 'cursor-not-allowed opacity-60'
                    )}
                  >
                    <div className="flex items-center gap-1.5 flex-1">
                      <div className={cn(
                        'w-3.5 h-3.5 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-200',
                        selectedPill === pill.id
                          ? 'border-gray-900 bg-gray-900'
                          : 'border-gray-400'
                      )}>
                        {selectedPill === pill.id && (
                          <div className="w-1 h-1 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {pill.icon}
                        </div>
                        <span className="break-words text-[11px] leading-tight text-slate-900 sm:text-xs md:text-sm">
                          {pill.text}
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500 text-[10px] sm:text-xs flex-shrink-0 ml-2">
                      3 mins
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Search Input and Magic Button */}
            <div className="rounded-[16px] border border-slate-100 bg-white p-2.5 shadow-[0_10px_30px_-25px_rgba(15,23,42,0.4)] sm:p-3">
              <div className="space-y-4">
                {/* Large Search Input */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery || (isTypingDemo ? typedText : '')}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setIsTypingDemo(false)
                      setTypedText('')
                      onSearchQueryChange?.(e.target.value)
                    }}
                    onFocus={() => {
                      setIsTypingDemo(false)
                      setTypedText('')
                    }}
                    disabled={isDemoRunning}
                    placeholder={!isTypingDemo && !searchQuery ? "Search for creators..." : ""}
                    className={cn(
                      'w-full rounded-lg border border-slate-200 bg-white pl-8 pr-2.5 text-xs leading-tight text-slate-900 shadow-inner transition sm:pl-9 sm:text-xs md:text-sm',
                      'py-1.5 sm:py-2 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200',
                      'placeholder:text-slate-400 placeholder:text-[11px] sm:placeholder:text-xs',
                      isTypingDemo && 'text-slate-600',
                      isDemoRunning && 'cursor-not-allowed opacity-60'
                    )}
                  />
                  {isTypingDemo && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-0.5 h-4 bg-gray-400 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Magic Button */}
                <Button
                  onClick={handleMagicClick}
                  disabled={isDelegating || isDemoRunning}
                  variant="ghost"
                  aria-busy={isDelegating}
                  className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 py-3 px-6 text-white shadow-lg transition-all hover:purple-400 hover:text-white disabled:opacity-70"
                >
                  {isDemoRunning ? (
                    'Demo in Progress...'
                  ) : isDelegating ? (
                    'Finding creators...'
                  ) : (
                    <>
                      See Live
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div
            className={cn(
              'mt-6 flex flex-wrap items-center justify-center gap-3 px-4 text-xs text-slate-500 opacity-0 sm:mt-8 sm:gap-4',
              isVisible && 'animate-fade-in animation-delay-600'
            )}
          >
            <div className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-emerald-500"
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
            <div className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-blue-500"
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
            <div className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-purple-500"
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
      {/* <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
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
      </div> */}
    </section>
  )
}

export default Hero
