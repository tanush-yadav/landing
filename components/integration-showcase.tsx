"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import { MessageSquare, Github, CheckSquare, Play, Pause } from 'lucide-react'
import SlackDemo from './integrations/slack-demo'
import LinearDemo from './integrations/linear-demo'

const features = [
  {
    icon: MessageSquare,
    title: 'Collaborate in Slack',
    description: 'Tag @codegen in any channel to start coding tasks instantly',
    color: 'text-purple-500'
  },
  {
    icon: Github,
    title: 'Collaborate in GitHub',
    description: 'Get automatic code reviews and suggestions on pull requests',
    color: 'text-gray-400'
  },
  {
    icon: CheckSquare,
    title: 'Assign tickets',
    description: 'Works seamlessly with Linear, Jira, and ClickUp',
    color: 'text-blue-500'
  }
]

export default function IntegrationShowcase() {
  const [activeDemo, setActiveDemo] = useState<'slack' | 'linear'>('slack')
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            <span className="text-blue-500">@codegen</span> Anywhere
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Kick off new requests from the tools you're already using
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Left Panel - Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-gray-800 ${feature.color}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Panel - Interactive Demos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Demo Controls */}
            <div className="flex items-center justify-between mb-6">
              <Tabs.Root value={activeDemo} onValueChange={(value: any) => setActiveDemo(value)}>
                <Tabs.List className="flex gap-2 bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg">
                  <Tabs.Trigger
                    value="slack"
                    className="px-4 py-2 text-sm font-medium rounded-md transition-all data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                  >
                    Slack Demo
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="linear"
                    className="px-4 py-2 text-sm font-medium rounded-md transition-all data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                  >
                    Linear Demo
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Play</span>
                  </>
                )}
              </button>
            </div>

            {/* Demo Content */}
            <AnimatePresence mode="wait">
              {activeDemo === 'slack' ? (
                <SlackDemo key="slack" isPlaying={isPlaying} />
              ) : (
                <LinearDemo key="linear" isPlaying={isPlaying} />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}