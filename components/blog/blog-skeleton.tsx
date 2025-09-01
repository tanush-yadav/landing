/**
 * BlogSkeleton Component
 * 
 * Loading skeleton for blog page with shimmer animation
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/design-system'

interface BlogSkeletonProps {
  showHero?: boolean
  cardCount?: number
  className?: string
}

const BlogSkeleton: React.FC<BlogSkeletonProps> = ({ 
  showHero = true, 
  cardCount = 6,
  className 
}) => {
  return (
    <div className={cn('w-full', className)}>
      {/* Hero Skeleton */}
      {showHero && (
        <div className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge Skeleton */}
              <div className="inline-flex mb-6">
                <div className="h-8 w-40 bg-gray-200 rounded-full animate-pulse" />
              </div>

              {/* Title Skeleton */}
              <div className="h-16 w-96 max-w-full bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse" />

              {/* Description Skeleton */}
              <div className="space-y-3 mb-8">
                <div className="h-6 w-full max-w-3xl bg-gray-200 rounded mx-auto animate-pulse" />
                <div className="h-6 w-4/5 max-w-3xl bg-gray-200 rounded mx-auto animate-pulse" />
              </div>

              {/* Search Bar Skeleton */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="h-14 bg-gray-200 rounded-2xl animate-pulse" />
                
                {/* Quick Topics Skeleton */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Stats Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <div className="h-8 w-16 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded mx-auto animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="h-12 w-full max-w-md bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Results Count Skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded mb-8 animate-pulse" />

        {/* Cards Grid Skeleton */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cardCount }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              {/* Card Image Skeleton */}
              <div className="relative h-48 w-full bg-gray-200 animate-pulse">
                <div className="absolute top-4 left-4">
                  <div className="h-7 w-24 bg-gray-300 rounded-lg animate-pulse" />
                </div>
              </div>

              {/* Card Content Skeleton */}
              <div className="p-6">
                {/* Title */}
                <div className="space-y-2 mb-4">
                  <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Excerpt */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-20 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-6 w-16 bg-gray-200 rounded-md animate-pulse" />
                </div>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                    <div className="space-y-1">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex gap-4">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Shimmer Effect Overlay */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogSkeleton

// Individual Card Skeleton for reuse
export const BlogCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn(
      "overflow-hidden rounded-2xl border border-gray-200 bg-white relative",
      className
    )}>
      {/* Card Image Skeleton */}
      <div className="relative h-48 w-full bg-gray-200 animate-pulse">
        <div className="absolute top-4 left-4">
          <div className="h-7 w-24 bg-gray-300 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Card Content Skeleton */}
      <div className="p-6">
        {/* Title */}
        <div className="space-y-2 mb-4">
          <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-20 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-6 w-16 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex gap-4">
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
}