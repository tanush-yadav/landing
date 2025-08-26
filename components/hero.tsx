'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Users, FileText, TrendingUp, Settings } from 'lucide-react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

// Team data with AI names and tasks
const teams = [
  {
    id: 'engineering',
    name: 'Engineering',
    icon: <Settings className="h-4 w-4" />,
    aiName: 'Zoe',
    tasks: [
      { id: 'refactor', label: 'Refactor authentication module', time: '45 mins' },
      { id: 'api', label: 'Build REST API endpoints', time: '2 hours' },
      { id: 'tests', label: 'Write unit tests for payment flow', time: '30 mins' },
    ]
  },
  {
    id: 'content',
    name: 'Content',
    icon: <FileText className="h-4 w-4" />,
    aiName: 'Bella',
    tasks: [
      { id: 'blog', label: 'Write technical blog post', time: '35 mins' },
      { id: 'docs', label: 'Update API documentation', time: '25 mins' },
      { id: 'copy', label: 'Create landing page copy', time: '20 mins' },
    ]
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: <TrendingUp className="h-4 w-4" />,
    aiName: 'Alex',
    tasks: [
      { id: 'prospect', label: 'Research and qualify leads', time: '1 hour' },
      { id: 'email', label: 'Draft personalized outreach emails', time: '30 mins' },
      { id: 'report', label: 'Generate sales pipeline report', time: '15 mins' },
    ]
  },
  {
    id: 'operations',
    name: 'Operations',
    icon: <Users className="h-4 w-4" />,
    aiName: 'Morgan',
    tasks: [
      { id: 'process', label: 'Optimize workflow processes', time: '45 mins' },
      { id: 'audit', label: 'Conduct security audit', time: '1.5 hours' },
      { id: 'report', label: 'Create monthly metrics report', time: '25 mins' },
    ]
  },
]

interface HeroProps {
  onDemoTrigger?: (taskId?: string) => void
}

const Hero = ({ onDemoTrigger }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState('engineering')
  const [selectedTask, setSelectedTask] = useState('')
  const [isDelegating, setIsDelegating] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const currentTeam = teams.find(t => t.id === selectedTeam) || teams[0]
  const currentTask = currentTeam.tasks.find(t => t.id === selectedTask)

  const handleDelegate = () => {
    if (selectedTask) {
      setIsDelegating(true)
      // Trigger the demo animation and scroll with the selected task
      if (onDemoTrigger) {
        onDemoTrigger(selectedTask)
      }
      // Reset delegating state after animation
      setTimeout(() => {
        setIsDelegating(false)
      }, 2000)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
          }}
        />
        <div className="gradient-mesh absolute inset-0 opacity-30" />
      </div>

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-400 opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-300 opacity-20 blur-3xl animate-pulse animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white opacity-10 blur-3xl animate-pulse animation-delay-200" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div
            className={cn(
              'inline-flex items-center justify-center mb-8 opacity-0',
              isVisible && 'animate-fade-in-down'
            )}
          >
            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-white border border-white/20">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Now: Watch AI Complete Real Tasks
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={cn(
              'text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 opacity-0',
              isVisible && 'animate-fade-in-up'
            )}
          >
            AI Employees That
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-primary-100">
              Join Your Team
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              'text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto opacity-0',
              isVisible && 'animate-fade-in-up animation-delay-200'
            )}
          >
            Watch them complete real work autonomously. Right now.
          </p>

          {/* Team Selector and Task Selection */}
          <div
            className={cn(
              'w-full max-w-3xl mx-auto opacity-0',
              isVisible && 'animate-fade-in-up animation-delay-400'
            )}
          >
            {/* Team Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => {
                    setSelectedTeam(team.id)
                    setSelectedTask('')
                  }}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    selectedTeam === team.id
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
                  )}
                >
                  {team.icon}
                  {team.name}
                </button>
              ))}
            </div>

            {/* Task Selection */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTeam}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-white text-lg font-semibold mb-4">
                  Select a task for {currentTeam.aiName} to complete:
                </h3>
                
                <RadioGroup.Root
                  value={selectedTask}
                  onValueChange={setSelectedTask}
                  className="space-y-3"
                >
                  {currentTeam.tasks.map((task) => (
                    <label
                      key={task.id}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200',
                        selectedTask === task.id
                          ? 'bg-white/20 border border-white/30'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroup.Item
                          value={task.id}
                          className="w-5 h-5 rounded-full border-2 border-white/40 bg-white/10 data-[state=checked]:border-white data-[state=checked]:bg-white flex items-center justify-center"
                        >
                          <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-gray-900" />
                        </RadioGroup.Item>
                        <span className="text-white text-base">{task.label}</span>
                      </div>
                      <span className="text-white/60 text-sm">{task.time}</span>
                    </label>
                  ))}
                </RadioGroup.Root>

                {/* Delegate Button */}
                <button
                  onClick={handleDelegate}
                  disabled={!selectedTask || isDelegating}
                  className={cn(
                    'w-full mt-6 py-3 px-6 rounded-lg font-semibold text-base transition-all duration-200',
                    selectedTask && !isDelegating
                      ? 'bg-white text-gray-900 hover:bg-gray-50 hover:scale-[1.02] shadow-xl'
                      : 'bg-white/20 text-white/50 cursor-not-allowed'
                  )}
                >
                  {isDelegating ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Delegating to {currentTeam.aiName}...
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center">
                      Delegate to {currentTeam.aiName}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Trust Indicators */}
          <div
            className={cn(
              'mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm opacity-0',
              isVisible && 'animate-fade-in animation-delay-600'
            )}
          >
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>Trusted by leading companies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs mb-2">Scroll to explore</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero