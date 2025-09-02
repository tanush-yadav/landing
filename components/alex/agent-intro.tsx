'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AgentIntroProps } from '@/types/alex-agent'

interface ExtendedAgentIntroProps extends AgentIntroProps {
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
}

export const AgentIntro = React.memo(function AgentIntro({
  tagline,
  description,
  animated = false,
  typingSpeed = 50,
  showCursor = false,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId = 'agent-intro',
  onAnimationStart,
  onAnimationComplete,
}: ExtendedAgentIntroProps) {
  const [displayedTagline, setDisplayedTagline] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [showTypingCursor, setShowTypingCursor] = useState(false)

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Determine if animation should run
  const shouldAnimate = animated && !prefersReducedMotion

  // Typing animation effect
  useEffect(() => {
    if (!shouldAnimate || !tagline) {
      setDisplayedTagline(tagline)
      setIsTypingComplete(true)
      return
    }

    // Call onAnimationStart
    onAnimationStart?.()

    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    setDisplayedTagline('')
    setShowTypingCursor(showCursor)
    setIsTypingComplete(false)

    const typeNextCharacter = () => {
      if (currentIndex < tagline.length) {
        setDisplayedTagline(tagline.slice(0, currentIndex + 1))
        currentIndex++
        timeoutId = setTimeout(typeNextCharacter, typingSpeed)
      } else {
        setIsTypingComplete(true)
        setShowTypingCursor(false)
        onAnimationComplete?.()
      }
    }

    timeoutId = setTimeout(typeNextCharacter, typingSpeed)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [tagline, shouldAnimate, typingSpeed, showCursor, onAnimationStart, onAnimationComplete])

  // Handle empty tagline edge case
  if (!tagline && !description) {
    return null
  }

  return (
    <div
      data-testid={dataTestId}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      className={cn(
        'max-w-3xl mx-auto text-center space-y-4',
        className
      )}
    >
      {/* Screen reader only text for immediate access */}
      {shouldAnimate && (
        <span className="sr-only">{tagline}</span>
      )}

      {/* Tagline with typing animation */}
      <h2
        data-testid="agent-tagline"
        role="heading"
        aria-level={2}
        aria-live={shouldAnimate ? 'polite' : 'off'}
        aria-atomic="true"
        className={cn(
          'text-4xl md:text-5xl lg:text-6xl font-bold',
          'text-gradient bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent',
          'break-words'
        )}
      >
        <AnimatePresence mode="wait">
          {shouldAnimate ? (
            <motion.span
              key="animated-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {displayedTagline}
              {showTypingCursor && !isTypingComplete && (
                <span
                  data-testid="typing-cursor"
                  className="inline-block w-[3px] h-[1em] ml-1 bg-blue-600 animate-blink"
                />
              )}
            </motion.span>
          ) : (
            <motion.span
              key="static-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {tagline}
            </motion.span>
          )}
        </AnimatePresence>
      </h2>

      {/* Description text */}
      {description && (
        <motion.p
          data-testid="agent-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingComplete || !shouldAnimate ? 1 : 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={cn(
            'text-lg md:text-xl text-gray-600 dark:text-gray-300',
            'leading-relaxed'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
})

// Add CSS for cursor blinking animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    .animate-blink {
      animation: blink 1s infinite;
    }
  `
  if (!document.head.querySelector('style[data-agent-intro]')) {
    style.setAttribute('data-agent-intro', 'true')
    document.head.appendChild(style)
  }
}