/**
 * BlogHero Component
 *
 * Hero section for the blog page with title, description, and search functionality
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, BookOpen, Users, Lightbulb } from 'lucide-react'
import CountUp from 'react-countup'
import { cn, typography } from '@/lib/design-system'

interface BlogHeroProps {
  onSearch?: (query: string) => void
  className?: string
}

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
    { label: 'AI Automation', icon: TrendingUp },
    { label: 'Best Practices', icon: Lightbulb },
    { label: 'Team Management', icon: Users },
    { label: 'Workflows', icon: BookOpen },
  ]

  return (
    <section
      data-testid="blog-hero"
      className={cn(
        'relative overflow-hidden py-20 lg:py-28',
        // Enhanced gradient with better color depth and vibrancy
        'bg-gradient-to-br from-indigo-50 via-white to-blue-50',
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/20 text-sm font-medium text-indigo-600 mb-6"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Latest Insights & Updates
          </motion.div>

          {/* Main Title */}
          <motion.h1
            data-testid="hero-title"
            className={cn(typography.hero, 'mb-6', typography.heroGradient)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Learn How We Do It
          </motion.h1>

          {/* Description */}
          <motion.p
            data-testid="hero-description"
            className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Latest insights on AI automation, agentic workflows, and team
            productivity. Learn how leading teams are transforming their work
            with AI.
          </motion.p>

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
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
                </div>
                <input
                  data-testid="search-input"
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                  className={cn(
                    'block w-full pl-14 pr-32 py-4 text-lg',
                    'bg-white border-2 border-gray-200 rounded-2xl',
                    'placeholder:text-gray-400 text-gray-900',
                    'hover:shadow-lg hover:border-gray-300',
                    'focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20',
                    'focus:outline-none',
                    'transition-all duration-200',
                    'disabled:opacity-60 disabled:cursor-not-allowed'
                  )}
                />
                {/* Search loading spinner */}
                {isSearching && (
                  <div className="absolute right-36 inset-y-0 flex items-center">
                    <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
                <button
                  type="submit"
                  className={cn(
                    'absolute inset-y-0 right-2 px-6 my-2 rounded-xl',
                    'bg-gradient-to-r from-indigo-600 to-indigo-700',
                    'text-white font-medium',
                    'hover:from-indigo-700 hover:to-indigo-800',
                    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                    'transition-all duration-200',
                    'flex items-center justify-center'
                  )}
                >
                  <span className="hidden sm:inline mr-2">Search</span>
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Quick Search Topics with Enhanced Micro-interactions */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">Popular topics:</p>
              <div className="flex flex-wrap gap-2 justify-center">
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
                    className={cn(
                      'relative inline-flex items-center px-4 py-2 rounded-full',
                      'bg-white/60 backdrop-blur-sm border border-white/20',
                      'text-sm font-medium text-gray-700',
                      'hover:bg-white/80 hover:shadow-md',
                      'transition-all duration-200',
                      'overflow-hidden group',
                      // Mobile touch target optimization
                      'min-h-[48px] min-w-[48px]',
                      '-webkit-tap-highlight-color-transparent',
                      'active:bg-white/90'
                    )}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      rotate: index % 2 === 0 ? 1 : -1,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <topic.icon className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">{topic.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Section with Spring Animations - Mobile Optimized */}
          <motion.div
            className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 -mx-4 px-4 sm:mx-auto sm:px-0"
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
              { label: 'Articles', value: '25+', number: 25, suffix: '+', gradient: 'from-indigo-600 to-blue-600' },
              { label: 'Categories', value: '4', number: 4, suffix: '', gradient: 'from-blue-600 to-violet-600' },
              { label: 'Authors', value: '8', number: 8, suffix: '', gradient: 'from-violet-600 to-indigo-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className={cn(
                  'relative bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6',
                  'hover:bg-white/80 hover:shadow-xl transition-all duration-300',
                  'cursor-pointer group overflow-hidden',
                  'min-w-[140px] sm:min-w-0', // Minimum width for mobile scroll
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
                  className={cn("text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent", stat.gradient)}
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
                    enableScrollSpy 
                    scrollSpyOnce 
                    scrollSpyDelay={100}
                  />
                </motion.div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BlogHero
