'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, FileText, Users, Brain, ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface DemoOption {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  preview: {
    type: 'text' | 'visual'
    content: string[]
  }
  duration: number
}

const demoOptions: DemoOption[] = [
  {
    id: 'blog',
    icon: <FileText className="w-5 h-5" />,
    title: 'Watch Blog Post Creation',
    description: 'See Sophia create a technical blog post in your voice',
    preview: {
      type: 'text',
      content: [
        'Analyzing your writing style...',
        'Understanding technical concepts...',
        'Matching your tone and voice...',
        'Generating authentic content...',
        'Optimizing for engagement...'
      ]
    },
    duration: 5000
  },
  {
    id: 'meeting',
    icon: <Users className="w-5 h-5" />,
    title: 'See Meeting Synthesis',
    description: 'Watch how Sophia turns meetings into actionable content',
    preview: {
      type: 'text',
      content: [
        'Processing meeting transcript...',
        'Identifying key decisions...',
        'Extracting action items...',
        'Creating summary document...',
        'Generating follow-up content...'
      ]
    },
    duration: 5000
  },
  {
    id: 'voice',
    icon: <Brain className="w-5 h-5" />,
    title: 'Watch Voice Matching',
    description: 'Experience how Sophia learns and matches your unique voice',
    preview: {
      type: 'visual',
      content: [
        'Analyzing vocabulary patterns',
        'Learning sentence structure',
        'Capturing tone nuances',
        'Matching writing rhythm',
        'Perfect voice replication'
      ]
    },
    duration: 5000
  }
]

export default function InteractiveDemo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const handlePlayDemo = (demoId: string) => {
    setActiveDemo(demoId)
    setCurrentStep(0)
    setIsPlaying(true)

    const demo = demoOptions.find(d => d.id === demoId)
    if (!demo) return

    const stepDuration = demo.duration / demo.preview.content.length
    let step = 0

    const interval = setInterval(() => {
      step++
      if (step >= demo.preview.content.length) {
        clearInterval(interval)
        setIsPlaying(false)
      } else {
        setCurrentStep(step)
      }
    }, stepDuration)
  }

  return (
    <section id="demo" className="py-24 bg-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Try Sophia Live
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the magic of AI-powered content creation in action
          </p>
        </motion.div>

        {/* Demo Container */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Demo Options */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Demo</h3>
            {demoOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => handlePlayDemo(option.id)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                  activeDemo === option.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeDemo === option.id
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                      {option.title}
                      {activeDemo === option.id && isPlaying && (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      )}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                  <Play className={`w-5 h-5 ${
                    activeDemo === option.id ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 min-h-[400px] relative overflow-hidden">
              {activeDemo ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDemo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Demo Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/sophia-agent.png"
                          alt="Sophia"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Sophia is working...</p>
                          <p className="text-xs text-gray-600">Real-time content creation</p>
                        </div>
                      </div>
                      {isPlaying && (
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100" />
                          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200" />
                        </div>
                      )}
                    </div>

                    {/* Demo Content */}
                    {demoOptions.find(d => d.id === activeDemo)?.preview.content.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: index <= currentStep ? 1 : 0.3,
                          x: 0
                        }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-center gap-3 ${
                          index <= currentStep ? 'opacity-100' : 'opacity-30'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index <= currentStep 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {index < currentStep ? '✓' : index + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </motion.div>
                    ))}

                    {/* Completion State */}
                    {!isPlaying && currentStep === demoOptions.find(d => d.id === activeDemo)!.preview.content.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200"
                      >
                        <p className="text-green-700 font-medium flex items-center gap-2">
                          ✨ Content created successfully!
                          <ArrowRight className="w-4 h-4" />
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Image
                    src="/images/sophia-agent.png"
                    alt="Sophia waiting"
                    width={100}
                    height={100}
                    className="object-contain mb-4 opacity-50"
                  />
                  <p className="text-gray-500">Select a demo to see Sophia in action</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600 mb-6">
            Ready to experience the full power of Sophia?
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}