'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface MetricCounterProps {
  endValue: number
  suffix?: string
  prefix?: string
  duration?: number
}

function MetricCounter({ endValue, suffix = '', prefix = '', duration = 2 }: MetricCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * endValue)
      
      setCount(currentCount)
      
      if (progress >= 1) {
        clearInterval(timer)
        setCount(endValue)
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [isInView, endValue, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const metrics = [
  {
    value: 1400,
    suffix: '+',
    label: 'Hours of Insights',
    description: 'Captured from founders',
  },
  {
    value: 97,
    suffix: '%',
    label: 'Voice Accuracy',
    description: 'Match your unique tone',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Integrations',
    description: 'Connect your tools',
  },
  {
    value: 3,
    suffix: 'min',
    label: 'Content Creation',
    description: 'From thought to publish',
  },
]

export default function MetricsSection() {
  return (
    <section className="relative py-24 bg-[#FAF9F7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            Muscle Memory for{' '}
            <em className="font-serif italic bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Intelligence
            </em>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every conversation trains Sophia to think, write, and create like you
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="mb-4">
                <span 
                  className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                >
                  <MetricCounter 
                    endValue={metric.value} 
                    suffix={metric.suffix}
                    duration={2.5}
                  />
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {metric.label}
              </h3>
              <p className="text-sm text-gray-500">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-1/2 left-10 w-20 h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/3 right-10 w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  )
}