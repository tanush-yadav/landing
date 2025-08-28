import posthog from 'posthog-js'

const analyticsEnabled =
  process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' ||
  process.env.NODE_ENV === 'production'

if (typeof window !== 'undefined' && analyticsEnabled) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') {
          ph.debug();
        }
      },
    });
  }
}