/**
 * Blog Loading States
 * 
 * Skeleton components for blog sections with smooth animations
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-system';

// Blog Card Skeleton
export const BlogCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.div
      className={cn(
        "bg-white rounded-2xl overflow-hidden",
        "border border-gray-200/50 shadow-sm",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Category and Read Time */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
        </div>

        {/* Author Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

// Blog Grid Skeleton
export const BlogGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <BlogCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
};

export default BlogGridSkeleton;