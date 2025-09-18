'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Trophy } from 'lucide-react'
// import { Button } from '@/components/ui/button'

interface CTASectionProps {
  onOpenModal?: () => void
}

export function CTASection({ onOpenModal }: CTASectionProps) {
  return (
    <section className="relative w-full pt-8 pb-12 md:pt-10 md:pb-14 overflow-x-clip md:overflow-visible bg-gradient-to-b from-white via-purple-50/20 to-white">
      {/* Very subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Clean CTA Card */}
          <div className="relative isolate rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 p-8 md:p-10 shadow-lg">
            {/* Subtle trophy decoration on the right */}
            <div className="absolute top-1/2 -translate-y-1/2 right-8 md:right-10 opacity-5 z-0 pointer-events-none select-none">
              <Trophy className="w-24 h-24 md:w-32 md:h-32 text-purple-600" />
            </div>

            <div className="relative z-10 text-center space-y-4">
              {/* Clean label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="relative z-0 inline-flex pointer-events-none select-none"
              >
                <div className="px-2.5 py-1 bg-purple-50 rounded-full border border-purple-100">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700">
                      Hire your AI agent
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Main heading - cleaner and more readable */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-bold font-display leading-[1.25] md:leading-[1.2] lg:leading-[1.15] tracking-tight"
              >
                <span className="text-gray-900 block pb-[2px] -mb-[2px]">
                More reach.
                </span>
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block mt-2 pb-[2px] -mb-[2px]">
                Less guesswork.

                </span>
              </motion.h2>

              {/* Cleaner subtext */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed"
              >
                Get a list with price ranges, contact info, and a first message template.
              </motion.p>

              {/* Leaner CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="pt-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    onOpenModal?.()
                  }}
                  className="inline-flex items-center justify-center relative group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-5 py-3 min-h-[40px] text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-600"
                >
                  <span className="flex items-center gap-2">
                  Get my creator list
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </button>
              </motion.div>

              {/* Simple trust indicators */}
              {/* <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-6"
              >
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  15-minute setup
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cancel anytime
                </span>
              </motion.div> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
