import posthog from 'posthog-js'

export function initPostHog() {
  // Dev-only: filter noisy extension errors (e.g., chrome-extension://* Failed to fetch)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const isExtensionStack = (stack?: string) =>
      !!stack && stack.includes('chrome-extension://')

    window.addEventListener('error', (event: ErrorEvent) => {
      const filename = (event as any).filename as string | undefined
      if (
        filename?.startsWith?.('chrome-extension://') ||
        isExtensionStack(event.error?.stack)
      ) {
        event.preventDefault()
      }
    })

    window.addEventListener(
      'unhandledrejection',
      (event: PromiseRejectionEvent) => {
        const reason: any = (event as any).reason
        const message = reason?.message as string | undefined
        const stack = reason?.stack as string | undefined
        if (
          isExtensionStack(stack) ||
          (message === 'Failed to fetch' && isExtensionStack(stack))
        ) {
          event.preventDefault()
        }
      }
    )
  }

  // Skip PostHog initialization in development environment
  if (process.env.NODE_ENV === 'development') {
    console.log('[PostHog] Disabled in development environment')
    return
  }

  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      capture_exceptions: true,
      debug: false,
    })
  }
}

// Initialize PostHog when this module is imported
initPostHog()
