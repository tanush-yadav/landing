import type { PostHog } from 'posthog-js'

// Allow explicit control via env flag, fallback to production check
const analyticsFlag = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS
const analyticsEnabled =
  analyticsFlag ? analyticsFlag === 'true' : process.env.NODE_ENV === 'production'

export async function initPostHog() {
  if (typeof window === 'undefined' || !analyticsEnabled) return
  
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!posthogKey) return
  
  // Dynamically import posthog to avoid SSR issues
  const { default: posthog } = await import('posthog-js')
  
  posthog.init(posthogKey, {
    // Only set api_host if explicitly provided
    ...(process.env.NEXT_PUBLIC_POSTHOG_HOST
      ? { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST }
      : {}),
    
    // Opt into stable defaults for SPA behavior
    defaults: '2025-05-24',
    
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    
    loaded: (ph: PostHog) => {
      if (process.env.NODE_ENV === 'development') {
        ph.debug()
      }
    },
  })
}