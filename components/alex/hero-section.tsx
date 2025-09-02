'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AgentAvatar } from './agent-avatar'
import { AgentIntro } from './agent-intro'
import { OnboardCTA } from './onboard-cta'
import { AlexHeroSectionProps } from '@/types/alex-agent'

export function HeroSection({
  profile,
  onOnboardClick,
  analyticsEnabled = true,
  className,
  'aria-label': ariaLabel,
  'data-testid': dataTestId = 'alex-hero-section',
}: AlexHeroSectionProps) {
  const handleOnboardClick = () => {
    onOnboardClick?.()
    // Smooth scroll to onboarding section
    const onboardingSection = document.getElementById('onboarding-section')
    if (onboardingSection) {
      onboardingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      data-testid={dataTestId}
      aria-label={ariaLabel || 'Alex Agent Hero Section'}
      className={cn(
        'relative min-h-[80vh] flex items-center justify-center overflow-hidden',
        'bg-gradient-to-br from-blue-50 via-white to-cyan-50',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Agent Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
            className="flex justify-center"
          >
            <AgentAvatar
              src={profile.avatar}
              alt={profile.name}
              size="xl"
              showStatus
              status="online"
              className="ring-4 ring-white shadow-2xl"
            />
          </motion.div>

          {/* Agent Introduction */}
          <AgentIntro
            tagline={profile.tagline}
            description={profile.description}
            animated
            typingSpeed={40}
            showCursor
          />

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="pt-4"
          >
            <OnboardCTA
              text="Onboard Alex to Your Team"
              variant="gradient"
              size="lg"
              onClick={handleOnboardClick}
              trackingId="hero-onboard-cta"
              analyticsEnabled={analyticsEnabled}
              className="transform hover:scale-105 transition-transform"
            />
          </motion.div>

          {/* Capabilities badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 pt-8"
          >
            {profile.capabilities.slice(0, 4).map((capability, index) => (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200"
              >
                <span className="text-lg">{capability.icon}</span>
                <span>{capability.title}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="flex justify-center items-center gap-8 pt-12 text-gray-600"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-sm">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">&lt;30s</div>
              <div className="text-sm">Review Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm">Accuracy</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-sm">Scroll to explore</span>
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Add CSS for blob animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes blob {
      0%, 100% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `
  if (!document.head.querySelector('style[data-hero-section]')) {
    style.setAttribute('data-hero-section', 'true')
    document.head.appendChild(style)
  }
}