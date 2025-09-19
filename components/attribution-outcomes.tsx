import { DashboardOverview } from '@/components/dashboard-overview'
import { animations } from '@/lib/design-system/patterns'
import { motion } from 'framer-motion'
import { WaveBackground } from '@/components/ui/wave-background'

export default function AttributionOutcomes() {
  return (
    <WaveBackground
      variant="section"
      opacity={0.06}
      rotate={5}
      mask="fadeBottom"
      overlayColor="gradient"
    >
      <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 lg:pb-12 overflow-hidden">

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
    </WaveBackground>
  )
}
