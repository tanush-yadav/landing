'use client'
import { useEffect } from 'react'
import { initPostHog } from '../instrumentation-client'

export default function PostHogAnalytics() {
  useEffect(() => {
    void initPostHog()
  }, [])
  
  return null
}