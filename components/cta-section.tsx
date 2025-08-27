'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-white via-purple-50/20 to-white">
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
          <div className="relative rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 p-12 md:p-16 shadow-lg">
            {/* Subtle trophy decoration on the right */}
            <div className="absolute top-1/2 -translate-y-1/2 right-12 md:right-16 opacity-5">
              <Trophy className="w-32 h-32 md:w-40 md:h-40 text-purple-600" />
            </div>

            <div className="relative text-center space-y-6">
              {/* Clean label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="inline-flex"
              >
                <div className="px-3 py-1.5 bg-purple-50 rounded-full border border-purple-100">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700">
                      Hire your AI agents
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
                className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-relaxed"
              >
                <span className="text-gray-900 block">
                  Each agent we train becomes
                </span>
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block mt-1">
                  employee of the month.
                </span>
              </motion.h2>

              {/* Cleaner subtext */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed"
              >
                Ready to hire and train your next employee of the month with
                your own hands? AI that only thinks about your data and its
                work. No mixed feelings!
              </motion.p>

              {/* Leaner CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="pt-4"
              >
                <a
                  href="https://cal.com/tanushyadav/quick-chat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="relative group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-3 text-base rounded-xl shadow-md transition-all duration-200 hover:shadow-lg"
                  >
                    <span className="flex items-center gap-2">
                      Book an Appointment
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </a>
              </motion.div>

              {/* Simple trust indicators */}
              <motion.div
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
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
