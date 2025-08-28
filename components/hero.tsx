'use client'

import { useEffect, useRef, useState } from 'react'
// import Link from 'next/link'
import {
  ArrowRight,
  Users,
  FileText,
  TrendingUp,
  Settings,
} from 'lucide-react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

// Team data with AI names and tasks
const teams = [
  {
    id: 'engineering',
    name: 'Engineering',
    icon: <Settings className="h-4 w-4" />,
    aiName: 'Alex',
    tasks: [
      {
        id: 'auth-bug-fix',
        label: 'Fix authentication bug in production',
        time: '3.5 mins',
      },
      { id: 'payment-api-error', label: 'Add error handling to payment API', time: '3 mins' },
      {
        id: 'user-service-tests',
        label: 'Write unit tests for user service',
        time: '3 mins',
      },
    ],
  },
  {
    id: 'content',
    name: 'Content',
    icon: <FileText className="h-4 w-4" />,
    aiName: 'Sophia',
    tasks: [
      { id: 'blog-post', label: 'Write blog post about Q4 product updates', time: '4 mins' },
      { id: 'email-campaign', label: 'Create email campaign for new feature launch', time: '3 mins' },
      { id: 'api-docs', label: 'Update help documentation for API changes', time: '3 mins' },
    ],
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: <TrendingUp className="h-4 w-4" />,
    aiName: 'Jordan',
    tasks: [
      { id: 'qualify-leads', label: 'Qualify leads from yesterday\'s webinar', time: '2.5 mins' },
      {
        id: 'competitor-research',
        label: 'Research competitor pricing for Enterprise deals',
        time: '3 mins',
      },
      {
        id: 'crm-update',
        label: 'Update CRM with meeting notes from demos',
        time: '3 mins',
      },
    ],
  },
  {
    id: 'operations',
    name: 'Operations',
    icon: <Users className="h-4 w-4" />,
    aiName: 'Quinn',
    tasks: [
      { id: 'aws-audit', label: 'Audit AWS costs and identify savings', time: '3 mins' },
      { id: 'monitoring-setup', label: 'Set up monitoring alerts for the API', time: '3 mins' },
      { id: 'deployment-docs', label: 'Document the deployment process', time: '3 mins' },
    ],
  },
]

interface HeroProps {
  onDemoTrigger?: (taskId?: string) => void
  isDemoRunning?: boolean
}

const Hero = ({ onDemoTrigger, isDemoRunning = false }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState('engineering')
  const [selectedTask, setSelectedTask] = useState('auth-bug-fix') // Auto-select first task
  const [isDelegating, setIsDelegating] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const currentTeam = teams.find((t) => t.id === selectedTeam) || teams[0]
  const currentTask = currentTeam.tasks.find((t) => t.id === selectedTask)
  const delegatingTimerRef = useRef<number | null>(null)

  const handleDelegate = () => {
    if (selectedTask && !isDemoRunning) {
      setIsDelegating(true)
      // Trigger the demo animation and scroll with the selected task
      if (onDemoTrigger) {
        onDemoTrigger(selectedTask)
      }
      // Reset delegating state after animation
      delegatingTimerRef.current = window.setTimeout(() => {
        setIsDelegating(false)
      }, 2000)
    }
  }

  useEffect(() => {
    return () => {
      if (delegatingTimerRef.current) {
        clearTimeout(delegatingTimerRef.current)
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 sm:py-20">
      {/* Enhanced Gradient Mesh Background with Glass Effect */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />

        {/* Glass texture layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/20" />

        {/* Subtle geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='black' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Enhanced Floating orbs with glass effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glass orb elements with subtle floating animation */}
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-purple-200/20 via-pink-100/15 to-transparent backdrop-blur-3xl border border-white/10 animate-float" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-200/20 via-cyan-100/15 to-transparent backdrop-blur-3xl border border-white/10 animate-float-delayed" />
        <div className="absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-gradient-to-bl from-indigo-100/25 via-purple-50/20 to-transparent backdrop-blur-2xl border border-white/5 animate-float" />
        <div className="absolute bottom-1/3 left-1/3 h-36 w-36 rounded-full bg-gradient-to-tr from-teal-100/20 via-emerald-50/15 to-transparent backdrop-blur-xl border border-white/5 animate-float-delayed" />

        {/* Additional depth layers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-radial from-white/5 to-transparent blur-3xl" />
      </div>

      {/* Frosted glass overlay for main content area */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent backdrop-blur-[0.5px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div
            className={cn(
              'inline-flex items-center justify-center mb-8 opacity-0',
              isVisible && 'animate-fade-in-down'
            )}
            role="status"
            aria-live="polite"
          >
            <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-gray-700 border border-white/40 shadow-lg ring-1 ring-gray-200/10">
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
              'text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6 opacity-0 leading-tight',
              isVisible && 'animate-fade-in-up'
            )}
            style={{ letterSpacing: '-0.02em' }}
          >
            AI Employees That
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
              Join Your Team
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              'text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto opacity-0 px-4',
              isVisible && 'animate-fade-in-up animation-delay-200'
            )}
          >
            And Get Shit Done (actually)
          </p>

          {/* Team Selector and Task Selection */}
          <div
            className={cn(
              'w-full max-w-3xl mx-auto opacity-0',
              isVisible && 'animate-fade-in-up animation-delay-400'
            )}
          >
            {/* Team Tabs - Enhanced for mobile touch targets */}
            <div className="flex flex-wrap justify-center gap-2 mb-6 px-2" role="tablist" aria-label="Teams">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => {
                    setSelectedTeam(team.id)
                    setSelectedTask(team.tasks?.[0]?.id ?? '')
                  }}
                  aria-label={`Select ${team.name} team`}
                  role="tab"
                  aria-selected={selectedTeam === team.id}
                  aria-controls={`panel-${team.id}`} 
                  id={`tab-${team.id}`}
                  tabIndex={selectedTeam === team.id ? 0 : -1}
                  className={cn(
                    'inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-3 sm:py-2 min-w-[80px] rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600',
                    selectedTeam === team.id
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg transform scale-105'
                      : 'bg-white/60 backdrop-blur-sm text-gray-700 border border-gray-600 hover:bg-white/80 hover:border-gray-700 shadow-md ring-1 ring-gray-200/10'
                  )}
                >
                  {team.icon}
                  <span>{team.name}</span>
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
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl ring-1 ring-gray-200/20"
                role="tabpanel"
                id={`panel-${selectedTeam}`}
                aria-labelledby={`tab-${selectedTeam}`}
              >
                <h3 id={`task-heading-${currentTeam.id}`} className="text-gray-900 text-lg font-heading font-semibold mb-4">
                  Select a task for {currentTeam.aiName} to complete:
                </h3>

                <RadioGroup.Root
                  value={selectedTask}
                  onValueChange={(value) => !isDemoRunning && setSelectedTask(value)}
                  className="space-y-3"
                  aria-labelledby={`task-heading-${currentTeam.id}`}
                >
                  {currentTeam.tasks.map((task) => (
                    <label
                      key={task.id}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-lg transition-all duration-200',
                        isDemoRunning && 'cursor-not-allowed opacity-60',
                        !isDemoRunning && 'cursor-pointer',
                        selectedTask === task.id
                          ? 'bg-gray-100 border border-gray-600'
                          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroup.Item
                          value={task.id}
                          disabled={isDemoRunning}
                          className={cn(
                            "w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center",
                            "data-[state=checked]:border-gray-900 data-[state=checked]:bg-gray-900",
                            isDemoRunning 
                              ? "cursor-not-allowed opacity-50"
                              : "border-gray-600"
                          )}
                        >
                          <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-white" />
                        </RadioGroup.Item>
                        <span className="text-gray-900 text-base">
                          {task.label}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">{task.time}</span>
                    </label>
                  ))}
                </RadioGroup.Root>

                {/* Delegate Button - Enhanced with gradient background */}
                <button
                  onClick={handleDelegate}
                  disabled={!selectedTask || isDelegating || isDemoRunning}
                  aria-label={`Delegate task to ${currentTeam.aiName}`}
                  aria-busy={isDelegating}
                  className={cn(
                    'w-full mt-6 py-4 px-6 rounded-full font-semibold text-base transition-all duration-200 transform',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600',
                    selectedTask && !isDelegating && !isDemoRunning
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                  )}
                >
                  {isDemoRunning ? (
                    <span className="inline-flex items-center">
                      Demo in Progress...
                    </span>
                  ) : isDelegating ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
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
              'mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm opacity-0',
              isVisible && 'animate-fade-in animation-delay-600'
            )}
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>Trusted by leading companies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div
          className={cn(
            'flex flex-col items-center text-gray-400 transition-all duration-300 hover:text-gray-600 cursor-pointer opacity-0',
            isVisible && 'animate-fade-in animation-delay-800'
          )}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            })
          }}
        >
          <span className="text-sm font-medium mb-3">Scroll to explore</span>
          <div className="animate-bounce">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
