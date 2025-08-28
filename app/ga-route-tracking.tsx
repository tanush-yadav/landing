'use client'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

function GARouteTrackingInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const fullPath = pathname + (searchParams?.toString() ? `?${searchParams}` : '')
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-PRENL31DQR', { page_path: fullPath })
    }
  }, [pathname, searchParams])
  
  return null
}

export default function GARouteTracking() {
  return (
    <Suspense fallback={null}>
      <GARouteTrackingInner />
    </Suspense>
  )
}