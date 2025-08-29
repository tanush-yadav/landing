import posthog from 'posthog-js'

export function initPostHog() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      capture_exceptions: true,
      debug: process.env.NODE_ENV === 'development',
    })
  }
}

// Initialize PostHog when this module is imported
initPostHog()
