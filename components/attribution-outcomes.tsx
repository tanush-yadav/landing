import { DashboardOverview } from '@/components/dashboard-overview'
import { animations } from '@/lib/design-system/patterns'
import { motion } from 'framer-motion'

export default function AttributionOutcomes() {
  return (
    <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 lg:pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...animations.slideInUp}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 font-display">
            Now, See what each{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              creator drives
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Live reach, clicks, orders, and revenue pulled into a single dashboard.
          </p>
        </motion.div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.35)] sm:p-6 lg:p-8">
          <DashboardOverview />
        </div>
      </div>
    </section>
  )
}
