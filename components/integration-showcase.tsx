"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import { 
  MessageSquare, 
  Github, 
  CheckSquare, 
  Play, 
  Pause, 
  FileText,
  Users,
  Calendar,
  Mail,
  Trello,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import SlackDemo from './integrations/slack-demo'
import LinearDemo from './integrations/linear-demo'

const agentNames = ['@codegen', '@bella', '@alex', '@morgan', '@zoe']

const integrations = [
  {
    id: 'slack',
    icon: MessageSquare,
    name: 'Slack',
    description: 'Tag agents in any channel',
    color: 'from-purple-600 to-purple-500',
    borderColor: 'border-purple-500/20',
    bgHover: 'hover:bg-purple-500/5',
    hasDemo: true,
    status: 'active'
  },
  {
    id: 'linear',
    icon: CheckSquare,
    name: 'Linear',
    description: 'Auto-assign and complete tickets',
    color: 'from-blue-600 to-blue-500',
    borderColor: 'border-blue-500/20',
    bgHover: 'hover:bg-blue-500/5',
    hasDemo: true,
    status: 'active'
  },
  {
    id: 'github',
    icon: Github,
    name: 'GitHub',
    description: 'Code reviews & PR automation',
    color: 'from-gray-600 to-gray-500',
    borderColor: 'border-gray-500/20',
    bgHover: 'hover:bg-gray-500/5',
    hasDemo: false,
    status: 'coming-soon'
  },
  {
    id: 'notion',
    icon: FileText,
    name: 'Notion',
    description: 'Docs & knowledge management',
    color: 'from-gray-700 to-gray-600',
    borderColor: 'border-gray-600/20',
    bgHover: 'hover:bg-gray-600/5',
    hasDemo: false,
    status: 'coming-soon'
  },
  {
    id: 'jira',
    icon: Trello,
    name: 'Jira',
    description: 'Sprint planning & tracking',
    color: 'from-indigo-600 to-indigo-500',
    borderColor: 'border-indigo-500/20',
    bgHover: 'hover:bg-indigo-500/5',
    hasDemo: false,
    status: 'coming-soon'
  },
  {
    id: 'teams',
    icon: Users,
    name: 'Teams',
    description: 'Microsoft Teams integration',
    color: 'from-cyan-600 to-cyan-500',
    borderColor: 'border-cyan-500/20',
    bgHover: 'hover:bg-cyan-500/5',
    hasDemo: false,
    status: 'coming-soon'
  }
]

interface IntegrationShowcaseProps {
  onDemoTrigger?: (demoType: 'slack' | 'linear') => void
}

export default function IntegrationShowcase({ onDemoTrigger }: IntegrationShowcaseProps) {
  const [activeDemo, setActiveDemo] = useState<'slack' | 'linear'>('slack')
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const demoSectionRef = useRef<HTMLDivElement>(null)

  // Rotate agent names
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAgentIndex((prev) => (prev + 1) % agentNames.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleIntegrationClick = (integration: typeof integrations[0]) => {
    if (!integration.hasDemo) return
    
    setActiveCard(integration.id)
    
    // Trigger the appropriate demo
    if (integration.id === 'slack' || integration.id === 'linear') {
      setActiveDemo(integration.id)
      setIsPlaying(true)
      
      // Smooth scroll to demo section
      setTimeout(() => {
        demoSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        })
      }, 100)
      
      // Call parent trigger if provided
      if (onDemoTrigger) {
        onDemoTrigger(integration.id)
      }
    }
    
    // Reset active state after animation
    setTimeout(() => setActiveCard(null), 3000)
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with rotating agent names */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            <div className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentAgentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  {agentNames[currentAgentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="ml-3">Anywhere</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Kick off new requests from the tools you're already using
          </p>
        </motion.div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {integrations.map((integration, index) => {
            const Icon = integration.icon
            const isActive = activeCard === integration.id
            const isClickable = integration.hasDemo
            
            return (
              <motion.button
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleIntegrationClick(integration)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleIntegrationClick(integration)
                  }
                }}
                disabled={!isClickable}
                className={`
                  relative group
                  bg-gray-800/30 backdrop-blur-sm 
                  rounded-xl p-4 
                  border transition-all duration-300
                  ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
                  ${isActive ? `${integration.borderColor} border-opacity-100 shadow-lg shadow-${integration.color}/20` : 'border-gray-700/50'}
                  ${isClickable ? `${integration.bgHover} hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500` : ''}
                `}
                whileHover={isClickable ? { scale: 1.05 } : {}}
                whileTap={isClickable ? { scale: 0.98 } : {}}
                aria-label={`${integration.name} integration ${integration.status === 'coming-soon' ? '(Coming Soon)' : ''}`}
                role="button"
                tabIndex={isClickable ? 0 : -1}
              >
                {/* Coming Soon Badge */}
                {integration.status === 'coming-soon' && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="absolute -top-2 -right-2 px-2 py-0.5 bg-gray-700/80 backdrop-blur-sm rounded-full border border-gray-600/50"
                  >
                    <span className="text-[10px] text-gray-400 font-medium">Soon</span>
                  </motion.div>
                )}
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-10"
                    style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                  />
                )}
                
                {/* Icon */}
                <div className="relative mb-3">
                  <div className={`
                    w-12 h-12 mx-auto rounded-lg 
                    bg-gradient-to-br ${integration.color}
                    flex items-center justify-center
                    transition-all duration-300
                    ${isActive ? 'scale-110 shadow-lg' : ''}
                    ${isClickable ? 'group-hover:scale-105' : ''}
                  `}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{ 
                        background: integration.id === 'slack' 
                          ? 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)' 
                          : integration.id === 'linear'
                          ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
                          : 'radial-gradient(circle, rgba(156, 163, 175, 0.3) 0%, transparent 70%)'
                      }}
                    />
                  )}
                </div>
                
                {/* Name and Description */}
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">
                    {integration.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {integration.description}
                  </p>
                </div>
                
                {/* Hover Arrow for clickable items */}
                {isClickable && (
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-3 h-3 text-gray-500" />
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8" ref={demoSectionRef}>
          {/* Left Panel - Feature Highlights */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">How it works</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-400 font-semibold">1</span>
                  </div>
                  <p className="text-sm text-gray-300">Tag any agent in your favorite tools</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-purple-400 font-semibold">2</span>
                  </div>
                  <p className="text-sm text-gray-300">Agent understands context and requirements</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-green-400 font-semibold">3</span>
                  </div>
                  <p className="text-sm text-gray-300">Creates pull requests and updates tickets automatically</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
              <h4 className="text-sm font-semibold text-white mb-3">Active Demo</h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setActiveDemo('slack')
                    setIsPlaying(true)
                  }}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                    ${activeDemo === 'slack' ? 'bg-purple-500/20 border border-purple-500/30' : 'hover:bg-gray-700/50'}
                  `}
                >
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-200">Slack Demo</span>
                  {activeDemo === 'slack' && isPlaying && (
                    <div className="ml-auto flex gap-0.5">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-75" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-150" />
                    </div>
                  )}
                </button>
                <button
                  onClick={() => {
                    setActiveDemo('linear')
                    setIsPlaying(true)
                  }}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                    ${activeDemo === 'linear' ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-gray-700/50'}
                  `}
                >
                  <CheckSquare className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-200">Linear Demo</span>
                  {activeDemo === 'linear' && isPlaying && (
                    <div className="ml-auto flex gap-0.5">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-75" />
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-150" />
                    </div>
                  )}
                </button>
              </div>
            </div>
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