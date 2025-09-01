/**
 * BlogCardSkeleton Component
 * 
 * Premium loading skeleton for blog cards with animated pulse effect
 */

'use client';

import React from 'react';
import { cn } from '@/lib/design-system';

interface BlogCardSkeletonProps {
  className?: string;
}

const BlogCardSkeleton: React.FC<BlogCardSkeletonProps> = ({ className }) => {
  return (
    <div
      data-testid="blog-card-skeleton"
      className={cn(
        // Base card styling to match actual card
        'relative overflow-hidden rounded-2xl border border-gray-200',
        'bg-white shadow-lg',
        className
      )}
    >
      {/* Featured Image Skeleton */}
      <div className="relative h-48 w-full bg-gray-200 animate-pulse">
        {/* Category Badge Skeleton */}
        <div className="absolute top-4 left-4">
          <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-14 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Author and Meta Information Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Author Avatar Skeleton */}
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
            
            {/* Author Info Skeleton */}
            <div className="space-y-1">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Arrow Skeleton */}
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Meta Information Skeleton */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
};

export default BlogCardSkeleton;

/**
 * BlogGridSkeleton Component
 * 
 * Grid of skeleton cards for loading state
 */
export const BlogGridSkeleton: React.FC<{ count?: number; className?: string }> = ({ 
  count = 6, 
  className 
}) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
};