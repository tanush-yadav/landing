'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
          }}
        />
        <div className="gradient-mesh absolute inset-0 opacity-30" />
      </div>

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-400 opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-300 opacity-20 blur-3xl animate-pulse animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white opacity-10 blur-3xl animate-pulse animation-delay-200" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div
            className={cn(
              'inline-flex items-center justify-center mb-8 opacity-0',
              isVisible && 'animate-fade-in-down'
            )}
          >
            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-white border border-white/20">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Now with full codebase context
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={cn(
              'text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 opacity-0',
              isVisible && 'animate-fade-in-up'
            )}
          >
            Ticket to PR in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-primary-100">
              minutes
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              'text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto opacity-0',
              isVisible && 'animate-fade-in-up animation-delay-200'
            )}
          >
            Ship faster with full codebase context. Transform your development workflow with AI-powered code generation that understands your entire project.
          </p>

          {/* CTA Buttons */}
          <div
            className={cn(
              'flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0',
              isVisible && 'animate-fade-in-up animation-delay-400'
            )}
          >
            {/* Primary CTA */}
            <Link
              href="/get-started"
              className={cn(
                'group inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-medium transition-all duration-200',
                'bg-white text-gray-900 hover:bg-gray-50 hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600',
                'shadow-xl hover:shadow-2xl'
              )}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/demo"
              className={cn(
                'group inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-medium transition-all duration-200',
                'bg-white/10 backdrop-blur-md text-white border border-white/20',
                'hover:bg-white/20 hover:border-white/30 hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600'
              )}
            >
              <Play className="mr-2 h-4 w-4" />
              Request Demo
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className={cn(
              'mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm opacity-0',
              isVisible && 'animate-fade-in animation-delay-600'
            )}
          >
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>Trusted by 10,000+ developers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs mb-2">Scroll to explore</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero