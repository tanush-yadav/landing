'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { WaveBackground } from '@/components/ui/wave-background'

interface Company {
  name: string
  logo?: string
}

export interface MovingTestimonialsProps {
  className?: string
  title?: string
  speed?: 'slow' | 'normal' | 'fast'
}

// Company data for trusted by section
const COMPANIES: Company[] = [
  { name: 'Y Combinator', logo: '/images/logos/y-combinator.svg' },
  { name: 'Loreal', logo: '/images/logos/loreal.svg' },
  { name: 'Lakme', logo: '/images/logos/lakme.svg' },
]

// Duplicate the array to ensure seamless looping
const EXTENDED_COMPANIES = [...COMPANIES, ...COMPANIES]

const MovingTestimonials = ({
  className,
  title = "Trusted by top teams",
  speed = 'normal'
}: MovingTestimonialsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <WaveBackground
      variant="testimonial"
      opacity={0.04}
      rotate={3}
      blur={true}
      mask="none"
      overlayColor="white"
      overlayOpacity={0.85}
    >
      <section
        className={cn(
          "relative py-12 sm:py-16 overflow-hidden",
          className
        )}
        aria-label="Company testimonials"
      >

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xs sm:text-sm font-display font-semibold text-slate-600 tracking-wide uppercase">
            {title}
          </h2>
        </div>

        {/* Moving logos container */}
        <div className="relative">
          {/* Gradient fade overlays */}
          <div className="absolute left-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-l from-white to-transparent" />

          <div
            ref={scrollRef}
            className="overflow-hidden"
            onMouseEnter={() => {
              if (scrollRef.current) {
                scrollRef.current.style.animationPlayState = 'paused'
              }
            }}
            onMouseLeave={() => {
              if (scrollRef.current) {
                scrollRef.current.style.animationPlayState = 'running'
              }
            }}
          >
            <div
              className={cn(
                "flex space-x-6 sm:space-x-8",
                speed === 'slow' && "animate-scroll-left-slow",
                speed === 'normal' && "animate-scroll-left",
                speed === 'fast' && "animate-scroll-left-fast"
              )}
              style={{ width: 'max-content' }}
            >
              {EXTENDED_COMPANIES.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className={cn(
                    'flex-shrink-0 flex items-center justify-center h-10 sm:h-12',
                    company.logo
                      ? 'min-w-[180px] sm:min-w-[220px] px-4'
                      : 'min-w-[100px] sm:min-w-[120px]'
                  )}
                >
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={200}
                      height={60}
                      style={{ width: 'auto', height: '100%' }}
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-slate-500 hover:text-slate-700 transition-colors duration-300 font-heading font-semibold text-xs sm:text-sm tracking-wide">
                      {company.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      </section>
    </WaveBackground>
  )
}

MovingTestimonials.displayName = 'MovingTestimonials'

export default MovingTestimonials
