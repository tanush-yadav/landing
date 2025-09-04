'use client'

import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  className?: string
  type?: 'text' | 'card' | 'button' | 'image' | 'header'
  lines?: number
}

export default function LoadingSkeleton({ 
  className = '', 
  type = 'text',
  lines = 1 
}: LoadingSkeletonProps) {
  if (type === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-gray-200 rounded animate-shimmer skeleton ${
              i === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          />
        ))}
      </div>
    )
  }

  if (type === 'card') {
    return (
      <motion.div
        className={`bg-white rounded-2xl p-6 space-y-4 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-8 bg-gray-200 rounded w-2/3 animate-shimmer skeleton" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-shimmer skeleton" />
          <div className="h-4 bg-gray-200 rounded animate-shimmer skeleton" />
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-shimmer skeleton" />
        </div>
        <div className="h-10 bg-gray-200 rounded-lg animate-shimmer skeleton" />
      </motion.div>
    )
  }

  if (type === 'button') {
    return (
      <div className={`h-12 px-6 bg-gray-200 rounded-lg animate-shimmer skeleton ${className}`} />
    )
  }

  if (type === 'image') {
    return (
      <div className={`aspect-square bg-gray-200 rounded-lg animate-shimmer skeleton ${className}`} />
    )
  }

  if (type === 'header') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto animate-shimmer skeleton" />
        <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto animate-shimmer skeleton" />
      </div>
    )
  }

  return null
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-32 h-8 bg-gray-200 rounded animate-shimmer skeleton" />
            </div>
            <div className="hidden md:flex items-center gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-20 h-4 bg-gray-200 rounded animate-shimmer skeleton" />
              ))}
            </div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-shimmer skeleton" />
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full animate-shimmer skeleton" />
            <LoadingSkeleton type="header" />
            <div className="flex gap-4 justify-center">
              <LoadingSkeleton type="button" className="w-48" />
              <LoadingSkeleton type="button" className="w-40" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="space-y-24">
        {[1, 2, 3].map((section) => (
          <div key={section} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LoadingSkeleton type="header" className="mb-12" />
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((card) => (
                <LoadingSkeleton key={card} type="card" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}