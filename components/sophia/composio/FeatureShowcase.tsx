'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const problems = [
  {
    problem: "Writer's block kills your momentum",
    solution: "Sophia captures your thoughts instantly through voice",
  },
  {
    problem: "Content doesn't sound like you",
    solution: "AI trained on your unique voice and expertise",
  },
  {
    problem: "Switching between 10 different tools",
    solution: "One AI that connects to all your platforms",
  },
  {
    problem: "Hours spent on repetitive content",
    solution: "Generate weeks of content in minutes",
  },
]

const demos = [
  {
    id: 'blog',
    title: 'Blog Posts',
    before: 'Staring at blank page for 2 hours',
    after: 'Speak for 5 minutes, get a complete article',
  },
  {
    id: 'social',
    title: 'Social Media',
    before: 'Generic AI-sounding tweets',
    after: 'Authentic posts in your voice',
  },
  {
    id: 'email',
    title: 'Email Newsletters',
    before: 'Weekly scramble for content',
    after: 'Month of newsletters ready to go',
  },
]

export default function FeatureShowcase() {
  const [activeDemo, setActiveDemo] = useState('blog')

  return (
    <section className="relative py-24 bg-white">
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
            Building content that takes action{' '}
            <em className="font-serif italic text-gray-400">is hard</em>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You're a founder, not a content machine. Let Sophia handle the heavy lifting.
          </p>
        </motion.div>

        {/* Problems & Solutions Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#FAF9F7] rounded-2xl p-8 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="text-lg text-gray-700 line-through opacity-70">
                    {item.problem}
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {item.solution}
                  </p>
                </div>
              </div>
              
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-blue-100/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black rounded-3xl p-8 lg:p-12 text-white"
          id="demo"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            See the Difference
          </h3>

          {/* Demo Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeDemo === demo.id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {demo.title}
              </button>
            ))}
          </div>

          {/* Before/After Comparison */}
          <div className="grid lg:grid-cols-2 gap-8">
            {demos
              .filter((demo) => demo.id === activeDemo)
              .map((demo) => (
                <motion.div
                  key={demo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="contents"
                >
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">
                      Before Sophia
                    </h4>
                    <p className="text-lg text-white/70">
                      {demo.before}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-purple-500/30">
                    <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">
                      With Sophia
                    </h4>
                    <p className="text-lg text-white">
                      {demo.after}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="group px-8 py-6 text-lg font-semibold bg-white hover:bg-gray-100 text-black rounded-xl transition-all duration-200 hover:scale-[1.02]"
              onClick={() => window.location.href = '/sophia/onboarding'}
            >
              Try Sophia Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}