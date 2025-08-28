/**
 * Skeleton Loading Components
 * 
 * Provides loading states for async content with shimmer effects
 * 
 * @example
 * ```tsx
 * <SkeletonCard />
 * <SkeletonText lines={3} />
 * <SkeletonButton />
 * ```
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

// Base skeleton component
export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 rounded-md',
        className
      )}
      {...props}
    />
  );
};

// Text skeleton with multiple lines
interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText = ({ lines = 1, className }: SkeletonTextProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-gray-200 rounded animate-pulse',
            i === lines - 1 && lines > 1 && 'w-3/4'
          )}
        />
      ))}
    </div>
  );
};

// Button skeleton
export const SkeletonButton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'h-10 px-4 bg-gray-200 rounded-lg animate-pulse inline-block',
        className
      )}
    />
  );
};

// Card skeleton
export const SkeletonCard = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 p-6 space-y-4',
        className
      )}
    >
      <Skeleton className="h-12 w-3/4" />
      <SkeletonText lines={3} />
      <div className="flex gap-2">
        <SkeletonButton className="w-24" />
        <SkeletonButton className="w-24" />
      </div>
    </div>
  );
};

// Avatar skeleton
export const SkeletonAvatar = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'h-10 w-10 bg-gray-200 rounded-full animate-pulse',
        className
      )}
    />
  );
};

// Image skeleton with shimmer effect
export const SkeletonImage = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-200 rounded-lg animate-pulse',
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
    </div>
  );
};

// Demo card skeleton for the interactive demo section
export const SkeletonDemoCard = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-6 space-y-4',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SkeletonAvatar />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
      <SkeletonText lines={2} />
      <div className="flex gap-2">
        <Skeleton className="h-2 flex-1 rounded-full" />
      </div>
    </div>
  );
};

// Table skeleton
export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex gap-4 p-4 bg-gray-50 rounded-t-lg">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/6" />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-t border-gray-100">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      ))}
    </div>
  );
};