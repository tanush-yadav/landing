'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Zap, PenTool, TrendingUp } from 'lucide-react'
import SophiaCharacter, { SophiaEmotion } from './SophiaCharacter'
// import { useStaggeredAnimation } from '@/hooks/useScrollAnimation' // Reserved for future use

interface Capability {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  stats: {
    value: number
    suffix: string
    label: string
  }
  emotion: SophiaEmotion
}

const capabilities: Capability[] = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "I Learn Your Brain",
    subtitle: "Connect to knowledge sources",
    description: "I analyze your writing patterns, communication style, and thought processes to create a comprehensive understanding of how you think.",
    stats: {
      value: 10000,
      suffix: "+",
      label: "Knowledge points analyzed"
    },
    emotion: 'thinking'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "I Think Like You",
    subtitle: "Understand unique perspective",
    description: "Using advanced AI, I mirror your cognitive patterns and decision-making processes to maintain your authentic voice.",
    stats: {
      value: 95,
      suffix: "%",
      label: "Voice accuracy"
    },
    emotion: 'default'
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "I Create Authentically",
    subtitle: "Produce content in your voice",
    description: "Generate blog posts, social content, and communications that sound exactly like you wrote them yourself.",
    stats: {
      value: 10,
      suffix: "x",
      label: "Content velocity increase"
    },
    emotion: 'writing'
  }
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  )
}

export default function WhatSophiaDoesSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Sophia Does
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three core capabilities that transform how you create content
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative group">
                {/* Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 h-full">
                  {/* Icon with animation */}
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {capability.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-sm font-medium text-blue-600 mb-4">
                    {capability.subtitle}
                  </p>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {capability.description}
                  </p>

                  {/* Stats Counter */}
                  <div className="border-t pt-6">
                    <AnimatedCounter value={capability.stats.value} suffix={capability.stats.suffix} />
                    <p className="text-sm text-gray-500 mt-1">
                      {capability.stats.label}
                    </p>
                  </div>
                </div>

                {/* Sophia reaction on hover */}
                <motion.div
                  className="absolute -top-6 -right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <SophiaCharacter
                    emotion={capability.emotion}
                    size="small"
                    floatingAnimation={false}
                    showSparkles={false}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 text-gray-500">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">
              Improving with every interaction
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}