/**
 * BlogHero Component
 *
 * Hero section for the blog page with title, description, and search functionality
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  TrendingUp,
  BookOpen,
  Sparkles,
  Zap,
  Brain,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/design-system'

// Dynamically import CountUp to avoid SSR issues
const CountUp = dynamic(() => import('react-countup'), {
  ssr: false,
  loading: () => <span>...</span>,
})

interface BlogHeroProps {
  onSearch?: (query: string) => void
  className?: string
}

const SEARCH_PLACEHOLDERS = [
  'Search AI automation insights...',
  'Find productivity tips...',
  'Explore agentic workflows...',
  'Discover team solutions...',
]

const BlogHero: React.FC<BlogHeroProps> = ({ onSearch, className }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      setIsSearching(true)
      onSearch(searchQuery.trim())
      // Reset searching state after a brief delay
      setTimeout(() => setIsSearching(false), 800)
    }
  }

  const quickSearchTopics = [
    {
      label: 'AI Strategy',
      icon: TrendingUp,
      color: 'from-violet-600 to-indigo-600',
    },
    { label: 'Automation', icon: Zap, color: 'from-amber-600 to-orange-600' },
    {
      label: 'Engineering',
      icon: Brain,
      color: 'from-emerald-600 to-teal-600',
    },
    { label: 'Business', icon: BookOpen, color: 'from-rose-600 to-pink-600' },
  ]

  // Typing animation for search placeholder
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      data-testid="blog-hero"
      className={cn(
        'relative overflow-hidden py-16 sm:py-20 lg:py-28',
        // Modern mesh gradient background
        'bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80',
        'min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]', // Better mobile height
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-visible">
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-100/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />

        {/* Animated background orbs - Extended beyond viewport */}
        {/* Top left orb */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-violet-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />

        {/* Bottom right orb */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed" />

        {/* Center orb with pulse animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse-slow" />

        {/* Additional decorative orbs */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-pink-300 to-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-sky-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-delayed" />

        {/* Subtle noise texture for depth */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Enhanced Badge with Glow Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              type: 'spring',
              stiffness: 100,
            }}
            className="inline-block mb-6"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 blur-lg opacity-40 animate-pulse" />
              <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-white/40 shadow-lg">
                <Sparkles className="h-4 w-4 text-indigo-600 animate-pulse" />
                <span className="text-sm  bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Latest Insights & Updates
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Title with Split Animation */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
              data-testid="hero-title"
              className={cn(
                'font-display',
                'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
                'tracking-tight',
                'bg-gradient-to-br from-gray-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent',
                'leading-[1.1]'
              )}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              Learn How We
              <span className="block mt-2">
                <motion.span
                  className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Transform Work
                </motion.span>
              </span>
            </motion.h1>
          </div>

          {/* Enhanced Description with Word Animation */}
          <motion.div
            data-testid="hero-description"
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="inline">
              {'Latest insights on '.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                >
                  {word}
                </motion.span>
              ))}
              <span className="font-semibold text-indigo-600">
                AI automation
              </span>
              ,{' '}
              <span className="font-semibold text-purple-600">
                agentic workflows
              </span>
              , and{' '}
              <span className="font-semibold text-pink-600">
                team productivity
              </span>
              .
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            data-testid="search-section"
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                  <Search className="h-5 w-5 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200" />
                </div>
                <AnimatePresence mode="wait">
                  <motion.input
                    key={placeholderIndex}
                    data-testid="search-input"
                    type="text"
                    placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isSearching}
                    aria-label="Search blog posts"
                    aria-describedby="search-hint"
                    className={cn(
                      'block w-full pl-14 pr-32 py-3 sm:py-4 text-base sm:text-lg',
                      'bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl',
                      'placeholder:text-gray-400 text-gray-900',
                      'hover:shadow-xl hover:border-indigo-300/50 hover:bg-white',
                      'focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white',
                      'focus:outline-none',
                      'transition-all duration-300 ease-out',
                      'disabled:opacity-60 disabled:cursor-not-allowed'
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
                {/* Search loading spinner */}
                {isSearching && (
                  <div className="absolute right-36 inset-y-0 flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                )}
                <motion.button
                  type="submit"
                  aria-label="Search"
                  className={cn(
                    'absolute inset-y-0 right-2 px-4 sm:px-6 my-2 rounded-xl',
                    'bg-gradient-to-r from-indigo-600 to-purple-600',
                    'text-white font-medium shadow-lg',
                    'hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl',
                    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                    'transition-all duration-300',
                    'flex items-center justify-center group',
                    'min-w-[48px]' // Mobile touch target
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="hidden sm:inline mr-2">Search</span>
                  <Search className="h-4 w-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                </motion.button>
              </div>
            </form>

            {/* Enhanced Quick Search Topics with Gradient Borders */}
            <div className="mt-8">
              <motion.p
                className="text-sm text-gray-500 mb-4 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                🔥 Trending topics
              </motion.p>
              <div className="flex flex-wrap gap-3 justify-center">
                {quickSearchTopics.map((topic, index) => (
                  <motion.button
                    key={topic.label}
                    onClick={() => {
                      setSearchQuery(topic.label)
                      if (onSearch) {
                        setIsSearching(true)
                        onSearch(topic.label)
                        setTimeout(() => setIsSearching(false), 800)
                      }
                    }}
                    aria-label={`Search for ${topic.label}`}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Gradient border container */}
                    <div
                      className={cn(
                        'relative p-[2px] rounded-full',
                        'bg-gradient-to-r',
                        topic.color,
                        'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      )}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 blur-md" />
                    </div>

                    {/* Button content */}
                    <div
                      className={cn(
                        'relative inset-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full',
                        'bg-white/80 backdrop-blur-sm border border-gray-200/50',
                        'text-sm font-semibold text-gray-700',
                        'group-hover:bg-white group-hover:shadow-lg group-hover:border-transparent',
                        'transition-all duration-300',
                        'overflow-hidden',
                        // Mobile touch target
                        'min-h-[48px]',
                        '-webkit-tap-highlight-color-transparent'
                      )}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                      <topic.icon
                        className={cn(
                          'h-4 w-4 relative z-10 transition-all duration-300',
                          'group-hover:rotate-12'
                        )}
                      />
                      <span className="relative z-10 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {topic.label}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Stats Section with Better Mobile Scroll - disabled */}
          {false && (
            <motion.div
              className="relative mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {/* Scroll indicator for mobile */}
              <div className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-white via-white/80 to-transparent pl-8 pr-2">
                <div className="text-xs text-gray-400 animate-pulse flex items-center gap-1">
                  <span>Swipe</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <motion.div
                className="flex sm:grid sm:grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-auto sm:px-0 snap-x snap-mandatory scroll-smooth scrollbar-hide"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {[
                  {
                    label: 'Articles',
                    value: '6',
                    number: 6,
                    suffix: '',
                    gradient: 'from-indigo-600 to-blue-600',
                  },
                  {
                    label: 'Categories',
                    value: '2',
                    number: 2,
                    suffix: '',
                    gradient: 'from-blue-600 to-violet-600',
                  },
                  {
                    label: 'Author',
                    value: '1',
                    number: 1,
                    suffix: '',
                    gradient: 'from-violet-600 to-indigo-600',
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className={cn(
                      'relative bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6',
                      'hover:bg-white/80 hover:shadow-xl transition-all duration-300',
                      'cursor-pointer group overflow-hidden',
                      'min-w-[120px] sm:min-w-0', // Better mobile scroll width
                      'flex-shrink-0 sm:flex-shrink' // Prevent shrinking on mobile
                    )}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: 'spring',
                          stiffness: 100,
                          damping: 10,
                          delay: index * 0.1,
                        },
                      },
                    }}
                    whileHover={{
                      y: -4,
                      transition: { type: 'spring', stiffness: 300 },
                    }}
                  >
                    {/* Gradient background animation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <motion.div
                      className={cn(
                        'text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent',
                        stat.gradient
                      )}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        delay: 1 + index * 0.1,
                        stiffness: 200,
                      }}
                    >
                      <CountUp
                        start={0}
                        end={stat.number}
                        duration={2}
                        suffix={stat.suffix}
                        enableScrollSpy={false}
                      />
                    </motion.div>
                    <div className="text-sm text-gray-600 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BlogHero
