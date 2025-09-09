'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

interface Testimonial {
  quote: string
  author: string
  role?: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'We shipped customer-facing fixes in hours, not weeks. Delegating repetitive dev tasks to AI freed up our roadmap.',
    author: 'CTO, Series A SaaS',
  },
  {
    quote:
      'Marketing finally runs itself. Our sales calls turn into posts and emails automatically—conversion is up 18%.',
    author: 'VP Growth, B2B',
  },
  {
    quote:
      'Security and reliability mattered most. The workflows hit both without adding bloat.',
    author: 'Head of Engineering, Enterprise',
  },
]

export default function TestimonialsInline() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const prefersReduced = useReducedMotion()

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className={cn(
                'rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm p-5 sm:p-6 text-left shadow-sm',
                'hover:shadow-lg transition-shadow duration-200'
              )}
            >
              <p className="text-gray-900 text-base sm:text-[15px] leading-relaxed">
                “{t.quote}”
              </p>
              <footer className="mt-3 text-sm text-gray-500">{t.author}</footer>
            </blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
