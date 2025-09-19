'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { CSSProperties } from 'react'

export type WaveVariant =
  | 'hero'           // Full background with heavy overlay
  | 'section'        // Subtle section background
  | 'card'           // Card accent background
  | 'cta'            // CTA section with gradient overlay
  | 'testimonial'    // Testimonial section with blur
  | 'feature'        // Feature highlight with partial reveal
  | 'divider'        // Section divider accent
  | 'banner'         // Banner/notification background

interface WaveBackgroundProps {
  variant?: WaveVariant
  className?: string
  opacity?: number
  rotate?: number
  scale?: number
  position?: 'top' | 'bottom' | 'center' | 'left' | 'right'
  children?: React.ReactNode
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
  blur?: boolean
  mask?: 'fadeTop' | 'fadeBottom' | 'fadeLeft' | 'fadeRight' | 'radial' | 'none'
}

const variantStyles: Record<WaveVariant, {
  opacity: number
  scale: number
  rotate: number
  position: string
  overlay: boolean
  overlayOpacity: number
  blur: boolean
  mask?: string
}> = {
  hero: {
    opacity: 0.15,
    scale: 1.2,
    rotate: -5,
    position: 'absolute inset-0',
    overlay: true,
    overlayOpacity: 0.85,
    blur: false,
    mask: 'fadeBottom'
  },
  section: {
    opacity: 0.08,
    scale: 1.1,
    rotate: 0,
    position: 'absolute inset-0',
    overlay: true,
    overlayOpacity: 0.5,
    blur: true,
    mask: 'radial'
  },
  card: {
    opacity: 0.12,
    scale: 1.3,
    rotate: 15,
    position: 'absolute -inset-4',
    overlay: true,
    overlayOpacity: 0.7,
    blur: false,
    mask: 'fadeRight'
  },
  cta: {
    opacity: 0.2,
    scale: 1.4,
    rotate: -8,
    position: 'absolute inset-0',
    overlay: true,
    overlayOpacity: 0.6,
    blur: false,
    mask: 'fadeTop'
  },
  testimonial: {
    opacity: 0.06,
    scale: 1.5,
    rotate: 3,
    position: 'absolute inset-0',
    overlay: true,
    overlayOpacity: 0.4,
    blur: true,
    mask: 'radial'
  },
  feature: {
    opacity: 0.1,
    scale: 1.2,
    rotate: -12,
    position: 'absolute inset-0',
    overlay: true,
    overlayOpacity: 0.65,
    blur: false,
    mask: 'fadeLeft'
  },
  divider: {
    opacity: 0.05,
    scale: 2,
    rotate: 0,
    position: 'absolute inset-x-0 -inset-y-1/2',
    overlay: false,
    overlayOpacity: 0,
    blur: true,
    mask: 'none'
  },
  banner: {
    opacity: 0.15,
    scale: 1.1,
    rotate: 5,
    position: 'absolute inset-0',
    overlay: true,
    overlayOpacity: 0.75,
    blur: false,
    mask: 'fadeBottom'
  }
}

const maskGradients: Record<string, string> = {
  fadeTop: 'linear-gradient(to bottom, transparent, black 30%)',
  fadeBottom: 'linear-gradient(to top, transparent, black 30%)',
  fadeLeft: 'linear-gradient(to right, transparent, black 30%)',
  fadeRight: 'linear-gradient(to left, transparent, black 30%)',
  radial: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
  none: 'none'
}

export function WaveBackground({
  variant = 'section',
  className,
  opacity,
  rotate,
  scale,
  position,
  children,
  overlay,
  overlayColor = 'white',
  overlayOpacity,
  blur,
  mask
}: WaveBackgroundProps) {
  const styles = variantStyles[variant]

  const finalOpacity = opacity ?? styles.opacity
  const finalScale = scale ?? styles.scale
  const finalRotate = rotate ?? styles.rotate
  const finalOverlay = overlay ?? styles.overlay
  const finalOverlayOpacity = overlayOpacity ?? styles.overlayOpacity
  const finalBlur = blur ?? styles.blur
  const finalMask = mask ?? styles.mask ?? 'none'

  const positionClass = position
    ? position === 'top' ? 'absolute inset-x-0 top-0 h-1/2'
    : position === 'bottom' ? 'absolute inset-x-0 bottom-0 h-1/2'
    : position === 'left' ? 'absolute inset-y-0 left-0 w-1/2'
    : position === 'right' ? 'absolute inset-y-0 right-0 w-1/2'
    : styles.position
    : styles.position

  const imageStyle: CSSProperties = {
    opacity: finalOpacity,
    transform: `scale(${finalScale}) rotate(${finalRotate}deg)`,
    maskImage: maskGradients[finalMask],
    WebkitMaskImage: maskGradients[finalMask],
    filter: finalBlur ? 'blur(2px)' : undefined
  }

  const overlayStyle: CSSProperties = {
    opacity: finalOverlayOpacity,
    background: overlayColor === 'gradient'
      ? 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.95))'
      : overlayColor === 'dark-gradient'
      ? 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))'
      : overlayColor === 'purple-gradient'
      ? 'linear-gradient(135deg, rgba(139,92,246,0.05), rgba(59,130,246,0.05))'
      : overlayColor
  }

  return (
    <div className={cn('relative', className)}>
      {/* Wave Pattern Background */}
      <div
        className={cn(
          positionClass,
          'overflow-hidden pointer-events-none'
        )}
        aria-hidden="true"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/bg.png"
            alt=""
            fill
            className="object-cover"
            style={imageStyle}
            priority={variant === 'hero'}
            quality={variant === 'hero' ? 90 : 75}
          />
        </div>
      </div>

      {/* Overlay */}
      {finalOverlay && (
        <div
          className={cn(
            positionClass,
            'pointer-events-none'
          )}
          style={overlayStyle}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}

// Utility component for animated wave backgrounds
export function AnimatedWaveBackground({
  variant = 'section',
  className,
  children,
  ...props
}: WaveBackgroundProps & {
  animationDuration?: number
  animationDelay?: number
}) {
  return (
    <WaveBackground
      variant={variant}
      className={cn(
        'animate-float',
        className
      )}
      {...props}
    >
      {children}
    </WaveBackground>
  )
}