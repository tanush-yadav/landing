'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, TrendingUp } from 'lucide-react'
import Image from 'next/image'

interface UseCase {
  id: number
  persona: string
  role: string
  quote: string
  challenge: string
  solution: string
  result: {
    metric: string
    improvement: string
  }
  color: string
}

const useCases: UseCase[] = [
  {
    id: 1,
    persona: 'Sarah Chen',
    role: 'SaaS Founder',
    quote: "I spend 10 hours a week on content but barely scratch the surface of what I want to share",
    challenge: "Needed to maintain thought leadership while building product",
    solution: "Sophia learned from 200+ internal docs and meeting recordings",
    result: {
      metric: "5x",
      improvement: "increase in content output"
    },
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    persona: 'Marcus Rodriguez',
    role: 'Technical CEO',
    quote: "My technical insights get lost in translation when I try to write for broader audiences",
    challenge: "Complex ideas needed simplification without losing depth",
    solution: "Sophia adapted technical concepts to multiple audience levels",
    result: {
      metric: "300%",
      improvement: "boost in engagement"
    },
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 3,
    persona: 'Emily Watson',
    role: 'Marketing Consultant',
    quote: "Client work leaves no time for my own brand building",
    challenge: "Personal brand suffered while focusing on client deliverables",
    solution: "Sophia automated LinkedIn and blog content creation",
    result: {
      metric: "8hrs",
      improvement: "saved per week"
    },
    color: 'from-green-500 to-green-600'
  },
  {
    id: 4,
    persona: 'David Park',
    role: 'Startup Advisor',
    quote: "My expertise is trapped in hundreds of conversations and emails",
    challenge: "Valuable insights scattered across various channels",
    solution: "Sophia synthesized knowledge into structured content",
    result: {
      metric: "15+",
      improvement: "articles from past insights"
    },
    color: 'from-orange-500 to-orange-600'
  }
]

export default function UseCasesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % useCases.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + useCases.length) % useCases.length)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for Busy Founders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how leaders like you are amplifying their voice with Sophia
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 hover:shadow-xl transition-all duration-200"
            aria-label="Previous use case"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 hover:shadow-xl transition-all duration-200"
            aria-label="Next use case"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Carousel Cards */}
          <div className="overflow-hidden px-12">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {useCases.map((useCase) => (
                <div key={useCase.id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left Column - Quote and Person */}
                      <div className="space-y-6">
                        {/* Quote */}
                        <div className="relative">
                          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-200" />
                          <p className="text-xl text-gray-700 italic leading-relaxed pl-8">
                            {useCase.quote}
                          </p>
                        </div>

                        {/* Person Info */}
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${useCase.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                            {useCase.persona.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{useCase.persona}</p>
                            <p className="text-sm text-gray-600">{useCase.role}</p>
                          </div>
                        </div>

                        {/* Challenge */}
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-sm font-medium text-gray-500 mb-1">Challenge</p>
                          <p className="text-gray-700">{useCase.challenge}</p>
                        </div>
                      </div>

                      {/* Right Column - Solution and Results */}
                      <div className="space-y-6">
                        {/* Solution */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
                              <Image
                                src="/images/sophia-agent.png"
                                alt="Sophia"
                                width={24}
                                height={24}
                                className="object-contain"
                              />
                            </div>
                            <p className="text-sm font-medium text-gray-700">Sophia's Solution</p>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {useCase.solution}
                          </p>
                        </div>

                        {/* Result Metric */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {useCase.result.metric}
                              </p>
                              <p className="text-gray-700 mt-1">
                                {useCase.result.improvement}
                              </p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-500" />
                          </div>
                        </div>

                        {/* Sophia Reaction */}
                        <motion.div
                          className="flex items-center gap-2 text-sm text-gray-600"
                          animate={{
                            x: [0, 5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Image
                            src="/images/sophia-agent.png"
                            alt="Sophia"
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                          <span className="italic">Ready to create your success story</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {useCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-gradient-to-r from-blue-600 to-purple-600' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to use case ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}