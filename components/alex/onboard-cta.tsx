'use client'

import React, { useState, useCallback, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import { usePostHog } from 'posthog-js/react'
import { cn } from '@/lib/utils'
import { OnboardCTAProps } from '@/types/alex-agent'

interface ExtendedOnboardCTAProps extends OnboardCTAProps {
  analyticsEnabled?: boolean
  disabledTooltip?: string
}

const variantStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  gradient: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg animate-pulse-slow',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm btn-sm',
  md: 'px-6 py-3 text-base btn-md',
  lg: 'px-8 py-4 text-lg btn-lg',
}

export const OnboardCTA = React.memo(function OnboardCTA({
  text,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  onClick,
  trackingId,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId = 'onboard-cta',
  analyticsEnabled = true,
  disabledTooltip,
}: ExtendedOnboardCTAProps) {
  const posthog = usePostHog()
  const [isPressed, setIsPressed] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const hoverStartTime = useRef<number>(0)
  const lastClickTime = useRef<number>(0)

  // Debounce click handler
  const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    // Debounce rapid clicks
    const now = Date.now()
    if (now - lastClickTime.current < 500) {
      return
    }
    lastClickTime.current = now

    if (loading || disabled) return

    // Track analytics
    if (analyticsEnabled && trackingId && posthog) {
      posthog.capture('cta_clicked', {
        cta_id: trackingId,
        cta_text: text,
        cta_variant: variant,
        page: window.location.pathname,
        timestamp: now,
      })
    }

    try {
      setHasError(false)
      await onClick?.(e)
    } catch (error) {
      console.error('CTA click error:', error)
      setHasError(true)
      
      // Reset error state after 3 seconds
      setTimeout(() => setHasError(false), 3000)
    }
  }, [onClick, loading, disabled, analyticsEnabled, trackingId, text, variant, posthog])

  // Track hover duration
  const handleMouseEnter = useCallback(() => {
    hoverStartTime.current = Date.now()
    if (disabled && disabledTooltip) {
      setShowTooltip(true)
    }
  }, [disabled, disabledTooltip])

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false)
    
    if (hoverStartTime.current && analyticsEnabled && trackingId && posthog) {
      const hoverDuration = Date.now() - hoverStartTime.current
      if (hoverDuration > 500) { // Only track significant hovers
        posthog.capture('cta_hover', {
          cta_id: trackingId,
          hover_duration: hoverDuration,
        })
      }
    }
    hoverStartTime.current = 0
  }, [analyticsEnabled, trackingId, posthog])

  // Keyboard accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(e as any)
    }
  }, [handleClick])

  // Button text based on state
  const buttonText = useMemo(() => {
    if (loading) return 'Onboarding...'
    if (hasError) return 'Try Again'
    return text
  }, [loading, hasError, text])

  return (
    <div className="relative inline-block">
      {/* Screen reader announcements */}
      {loading && (
        <div role="status" className="sr-only">
          Loading, please wait
        </div>
      )}

      {/* Tooltip for disabled state */}
      {showTooltip && disabledTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10"
        >
          {disabledTooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}

      <motion.button
        type="button"
        role="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={loading || disabled}
        aria-label={ariaLabel || buttonText}
        aria-describedby={ariaDescribedby}
        aria-busy={loading}
        data-testid={dataTestId}
        className={cn(
          'relative inline-flex items-center justify-center',
          'font-semibold rounded-lg transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'w-full sm:w-auto',
          variantStyles[variant],
          sizeStyles[size],
          isPressed && 'scale-95',
          disabled && 'opacity-50 cursor-not-allowed',
          hasError && 'btn-error bg-red-600 hover:bg-red-700',
          className
        )}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <span
          data-testid="cta-content"
          className="flex items-center gap-2 flex-col sm:flex-row"
        >
          {/* Loading spinner */}
          {loading && (
            <Loader2
              data-testid="loading-spinner"
              className="w-4 h-4 animate-spin"
              aria-hidden="true"
            />
          )}

          {/* Button text */}
          <span>{buttonText}</span>

          {/* Arrow icon */}
          {!loading && (
            <motion.span
              data-testid="cta-icon"
              animate={{ x: isPressed ? 4 : 0 }}
              className={cn(
                'lucide-arrow-right transition-transform',
                'group-hover:translate-x-1'
              )}
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </motion.span>
          )}
        </span>
      </motion.button>
    </div>
  )
})

// Add CSS for pulse animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes pulse-slow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.9; }
    }
    .animate-pulse-slow {
      animation: pulse-slow 2s ease-in-out infinite;
    }
  `
  if (!document.head.querySelector('style[data-onboard-cta]')) {
    style.setAttribute('data-onboard-cta', 'true')
    document.head.appendChild(style)
  }
}