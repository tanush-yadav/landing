'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'

interface WaveDividerProps {
  className?: string
  variant?: 'subtle' | 'accent' | 'strong'
  position?: 'top' | 'bottom'
}

export function WaveDivider({
  className,
  variant = 'subtle',
  position = 'bottom'
}: WaveDividerProps) {
  const variantStyles = {
    subtle: {
      opacity: 0.03,
      height: 'h-24',
      blur: true
    },
    accent: {
      opacity: 0.06,
      height: 'h-32',
      blur: false
    },
    strong: {
      opacity: 0.1,
      height: 'h-40',
      blur: false
    }
  }

  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden pointer-events-none',
        styles.height,
        position === 'top' ? '-mb-1' : '-mt-1',
        className
      )}
      aria-hidden="true"
    >
      <div className={cn(
        'absolute inset-0',
        position === 'top' ? 'rotate-180' : ''
      )}>
        <Image
          src="/images/bg.png"
          alt=""
          fill
          className={cn(
            'object-cover scale-x-[2]',
            styles.blur && 'blur-sm'
          )}
          style={{
            opacity: styles.opacity,
            maskImage: position === 'bottom'
              ? 'linear-gradient(to bottom, transparent, black 50%)'
              : 'linear-gradient(to top, transparent, black 50%)',
            WebkitMaskImage: position === 'bottom'
              ? 'linear-gradient(to bottom, transparent, black 50%)'
              : 'linear-gradient(to top, transparent, black 50%)'
          }}
          quality={60}
        />
      </div>

      {/* Gradient overlay for smooth transition */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-b from-transparent to-white',
        position === 'top' && 'rotate-180'
      )} />
    </div>
  )
}