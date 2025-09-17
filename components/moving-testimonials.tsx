'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { CompanyLogos, type CompanyLogoKey } from '@/components/ui/company-logos'

export interface MovingTestimonialsProps {
  className?: string
  title?: string
  speed?: 'slow' | 'normal' | 'fast'
}

// Extended company data with more realistic companies
const COMPANIES: Array<{ key: CompanyLogoKey; name: string } | { name: string; displayName?: string }> = [
  { key: 'YCombinator', name: 'Y Combinator' },
  { key: 'Soma Capital', name: 'Soma Capital' },
  { key: 'LangChain', name: 'LangChain' },
  { name: 'OpenAI', displayName: 'OpenAI' },
  { name: 'Anthropic', displayName: 'Anthropic' },
  { name: 'Stripe', displayName: 'Stripe' },
  { name: 'Linear', displayName: 'Linear' },
  { name: 'Vercel', displayName: 'Vercel' },
  { name: 'Notion', displayName: 'Notion' },
  { name: 'Figma', displayName: 'Figma' },
  { name: 'Discord', displayName: 'Discord' },
  { name: 'GitHub', displayName: 'GitHub' },
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
    <section
      className={cn(
        "relative py-12 sm:py-16 overflow-hidden bg-white/50 backdrop-blur-sm",
        className
      )}
      aria-label="Company testimonials"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/50 via-transparent to-slate-50/50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-sm sm:text-base font-display font-semibold text-slate-600 tracking-wide uppercase">
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
                "flex space-x-8 sm:space-x-12",
                speed === 'slow' && "animate-scroll-left-slow",
                speed === 'normal' && "animate-scroll-left",
                speed === 'fast' && "animate-scroll-left-fast"
              )}
              style={{ width: 'max-content' }}
            >
              {EXTENDED_COMPANIES.map((company, index) => {
                // Check if company has a logo component
                const hasLogo = 'key' in company && company.key in CompanyLogos
                const LogoComponent = hasLogo ? CompanyLogos[company.key as CompanyLogoKey] : null
                const displayName = 'displayName' in company ? company.displayName : company.name

                return (
                  <div
                    key={`${company.name}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center min-w-[120px] sm:min-w-[140px] h-12 sm:h-14"
                  >
                    {LogoComponent ? (
                      <div className="w-full h-full opacity-60 hover:opacity-80 transition-opacity duration-300 grayscale hover:grayscale-0">
                        <LogoComponent className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="text-slate-500 hover:text-slate-700 transition-colors duration-300 font-heading font-semibold text-sm sm:text-base tracking-wide">
                        {displayName || company.name}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

MovingTestimonials.displayName = 'MovingTestimonials'

export default MovingTestimonials