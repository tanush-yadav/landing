'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { AgentAvatarProps } from '@/types/alex-agent'

const sizeMap = {
  sm: { width: 48, height: 48, className: 'w-12 h-12' },
  md: { width: 64, height: 64, className: 'w-16 h-16' },
  lg: { width: 96, height: 96, className: 'w-24 h-24' },
  xl: { width: 128, height: 128, className: 'w-32 h-32' },
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-yellow-500',
}

export function AgentAvatar({
  src,
  alt,
  size = 'md',
  loading = 'lazy',
  fallback,
  showStatus = false,
  status = 'online',
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId = 'agent-avatar',
}: AgentAvatarProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3

  const sizeConfig = sizeMap[size]
  const shouldShowFallback = imageError || !src

  // Handle image load error with retry logic
  const handleImageError = useCallback(() => {
    if (retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1)
        setImageError(false)
      }, Math.pow(2, retryCount) * 500) // Exponential backoff
    } else {
      setImageError(true)
    }
  }, [retryCount, maxRetries])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  // Generate image sources for different formats
  const generateImageSrc = (format: string) => {
    if (!src) return ''
    const basePath = src.replace(/\.[^/.]+$/, '')
    return `${basePath}.${format}`
  }

  // Get first letter for default fallback
  const getInitial = () => {
    return alt ? alt.charAt(0).toUpperCase() : 'A'
  }

  return (
    <div
      data-testid={dataTestId}
      role="img"
      aria-label={ariaLabel || alt}
      aria-describedby={ariaDescribedby}
      className={cn(
        'relative inline-block rounded-full overflow-hidden',
        `avatar-${size}`,
        sizeConfig.className,
        className
      )}
    >
      {/* Blur placeholder */}
      {!imageLoaded && (
        <div
          data-blur-placeholder
          className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 animate-pulse"
        />
      )}

      {/* Skeleton loader */}
      {!imageLoaded && !shouldShowFallback && (
        <div
          data-testid="avatar-skeleton"
          className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"
        />
      )}

      {/* Image with multiple format support */}
      {!shouldShowFallback && (
        <picture data-testid="agent-avatar-picture">
          {/* AVIF source for modern browsers */}
          <source
            type="image/avif"
            srcSet={generateImageSrc('avif')}
            media="(min-width: 0px)"
          />
          {/* WebP source */}
          <source
            type="image/webp"
            srcSet={generateImageSrc('webp')}
            media="(min-width: 0px)"
          />
          {/* Responsive sources for different viewports */}
          <source
            media="(min-width: 768px)"
            srcSet={`${src} 2x`}
          />
          <source
            media="(min-width: 0px)"
            srcSet={src}
          />
          <Image
            src={src + (retryCount > 0 ? `?retry=${retryCount}` : '')}
            alt={alt}
            width={sizeConfig.width}
            height={sizeConfig.height}
            loading={loading}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className={cn(
              'object-cover w-full h-full',
              !imageLoaded && 'opacity-0'
            )}
          />
        </picture>
      )}

      {/* Fallback display */}
      {shouldShowFallback && (
        <>
          {fallback ? (
            <Image
              src={fallback}
              alt={alt}
              width={sizeConfig.width}
              height={sizeConfig.height}
              loading={loading}
              className="object-cover w-full h-full"
            />
          ) : (
            <div
              data-testid="avatar-fallback"
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-2xl"
            >
              {getInitial()}
            </div>
          )}
        </>
      )}

      {/* Status indicator */}
      {showStatus && (
        <div
          data-testid="avatar-status"
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
            `status-${status}`,
            statusColors[status]
          )}
        />
      )}
    </div>
  )
}