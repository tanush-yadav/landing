'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Link2, Brain, PenTool, Send, ArrowRight, CheckCircle } from 'lucide-react'

interface Step {
  number: string
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  color: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Connect',
    description: 'Link your knowledge sources and communication channels',
    icon: <Link2 className="w-6 h-6" />,
    features: ['One-click integrations', 'Secure OAuth', 'Privacy-first'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '02',
    title: 'Learn',
    description: 'Sophia analyzes your patterns and communication style',
    icon: <Brain className="w-6 h-6" />,
    features: ['Pattern recognition', 'Style analysis', 'Context mapping'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: '03',
    title: 'Create',
    description: 'Generate authentic content that sounds exactly like you',
    icon: <PenTool className="w-6 h-6" />,
    features: ['Voice matching', 'Tone preservation', 'Context awareness'],
    color: 'from-green-500 to-green-600'
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'Publish seamlessly across all your platforms',
    icon: <Send className="w-6 h-6" />,
    features: ['Multi-platform', 'Schedule posts', 'Auto-optimization'],
    color: 'from-orange-500 to-orange-600'
  }
]

export default function HowItWorksSection() {
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
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to amplify your voice with AI
          </p>
        </motion.div>

        {/* Steps Flow */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 hidden lg:block" />
          
          <div className="grid lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Arrow to Next Step */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-12 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Sophia Reaction */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="bg-white rounded-full shadow-md p-1">
                    <Image
                      src="/images/sophia-agent.png"
                      alt="Sophia"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Flow Diagram */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Content */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                See the Magic Happen
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Watch as Sophia learns from your content, understands your voice, and creates 
                authentic material that perfectly matches your style. It&apos;s like having a digital twin 
                that thinks and writes just like you.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-700">Live learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-700">Real-time creation</span>
                </div>
              </div>
            </div>

            {/* Right side - Animated Sophia */}
            <div className="relative h-64">
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/images/sophia-agent.png"
                  alt="Sophia in action"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </motion.div>

              {/* Floating elements around Sophia */}
              <motion.div
                className="absolute top-0 left-0"
                animate={{
                  x: [0, 20, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="bg-white rounded-lg shadow-md p-2 text-xs">
                  <span className="font-mono">Learning...</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-0"
                animate={{
                  x: [0, -20, 0],
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="bg-white rounded-lg shadow-md p-2 text-xs">
                  <span className="font-mono">Creating...</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}