'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  ChevronRight, 
  Circle, 
  CheckCircle2,
  MessageSquare,
  Users,
  Clock,
  AlertCircle,
  Hash,
  MoreHorizontal
} from 'lucide-react'
import * as Avatar from '@radix-ui/react-avatar'

interface DemoState {
  phase: 'idle' | 'analyzing' | 'creating-subtasks' | 'calculating' | 'notifying' | 'complete'
  ticketCreated: boolean
  subtasksCreated: boolean
  slackNotified: boolean
  timeCalculated: boolean
}

const InteractiveDemo = ({ triggerDemo }: { triggerDemo?: boolean }) => {
  const [demoState, setDemoState] = useState<DemoState>({
    phase: 'idle',
    ticketCreated: false,
    subtasksCreated: false,
    slackNotified: false,
    timeCalculated: false,
  })

  const [showTyping, setShowTyping] = useState(false)
  const [completedSubtasks, setCompletedSubtasks] = useState<number[]>([])

  // Demo animation sequence
  useEffect(() => {
    if (triggerDemo && demoState.phase === 'idle') {
      startDemoSequence()
    }
  }, [triggerDemo, demoState.phase])

  const startDemoSequence = async () => {
    // Reset state
    setDemoState({
      phase: 'analyzing',
      ticketCreated: false,
      subtasksCreated: false,
      slackNotified: false,
      timeCalculated: false,
    })
    setCompletedSubtasks([])
    setShowTyping(false)

    // Phase 1: Create ticket (500ms)
    await new Promise(resolve => setTimeout(resolve, 500))
    setDemoState(prev => ({ ...prev, ticketCreated: true }))

    // Phase 2: Analyze requirements (1500ms)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDemoState(prev => ({ ...prev, phase: 'creating-subtasks' }))

    // Phase 3: Create subtasks (2500ms)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setDemoState(prev => ({ ...prev, subtasksCreated: true }))

    // Phase 4: Calculate time (3500ms)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setDemoState(prev => ({ ...prev, phase: 'calculating', timeCalculated: true }))

    // Phase 5: Slack notification (4500ms)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setShowTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setShowTyping(false)
    setDemoState(prev => ({ ...prev, phase: 'notifying', slackNotified: true }))

    // Phase 6: Complete (6000ms)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDemoState(prev => ({ ...prev, phase: 'complete' }))

    // Start completing subtasks
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setCompletedSubtasks(prev => [...prev, i])
    }
  }

  const subtasks = [
    { id: 0, title: 'Set up authentication context provider', assignee: 'ZA' },
    { id: 1, title: 'Create login and signup components', assignee: 'ZA' },
    { id: 2, title: 'Implement JWT token validation', assignee: 'ZA' },
    { id: 3, title: 'Add password reset flow', assignee: 'ZA' },
    { id: 4, title: 'Set up OAuth providers', assignee: 'ZA' },
    { id: 5, title: 'Create user session management', assignee: 'ZA' },
    { id: 6, title: 'Add remember me functionality', assignee: 'ZA' },
    { id: 7, title: 'Implement logout and cleanup', assignee: 'ZA' },
    { id: 8, title: 'Write authentication tests', assignee: 'ZA' },
  ]

  return (
    <section id="demo-section" className="min-h-screen bg-linear-bg-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Demo Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Watch AI Complete Real Work
          </h2>
          <p className="text-linear-text-secondary text-lg max-w-2xl mx-auto">
            See how Volition AI employees integrate with your existing tools to autonomously complete tasks
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Linear Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-linear-bg-secondary rounded-xl border border-linear-border-subtle overflow-hidden"
          >
            {/* Linear Header */}
            <div className="flex items-center justify-between p-4 border-b border-linear-border-subtle">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-linear-text-primary font-semibold">Linear</span>
              </div>
              <div className="flex items-center gap-2 text-linear-text-tertiary">
                <Clock className="h-4 w-4" />
                <span className="text-xs">Live</span>
              </div>
            </div>

            {/* Linear Content */}
            <div className="p-6">
              <AnimatePresence>
                {demoState.ticketCreated && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6"
                  >
                    {/* Issue Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-linear-text-secondary text-sm">VOL-123</span>
                        <div className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                          demoState.phase === 'analyzing' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                          demoState.phase === 'creating-subtasks' && "bg-blue-500/10 text-blue-500 border border-blue-500/20",
                          (demoState.phase === 'calculating' || demoState.phase === 'notifying' || demoState.phase === 'complete') && 
                          "bg-green-500/10 text-green-500 border border-green-500/20"
                        )}>
                          {demoState.phase === 'analyzing' && (
                            <>
                              <Circle className="h-3 w-3" />
                              Ready to draft
                            </>
                          )}
                          {demoState.phase === 'creating-subtasks' && (
                            <>
                              <AlertCircle className="h-3 w-3" />
                              In Progress
                            </>
                          )}
                          {(demoState.phase === 'calculating' || demoState.phase === 'notifying' || demoState.phase === 'complete') && (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              Done
                            </>
                          )}
                        </div>
                      </div>
                      <MoreHorizontal className="h-4 w-4 text-linear-text-tertiary" />
                    </div>

                    {/* Issue Title */}
                    <h3 className="text-linear-text-primary text-lg font-semibold mb-3">
                      Refactor authentication module
                    </h3>

                    {/* Progress Indicator */}
                    <div className="flex items-center gap-3 text-sm text-linear-text-secondary mb-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{completedSubtasks.length}/9</span>
                      </div>
                      <div className="flex-1 bg-linear-bg-tertiary rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="bg-green-500 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(completedSubtasks.length / 9) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="space-y-3">
                      {demoState.phase !== 'idle' && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-3"
                        >
                          <Avatar.Root className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Avatar.Fallback className="text-white text-[10px] font-bold">Z</Avatar.Fallback>
                          </Avatar.Root>
                          <div className="flex-1">
                            <p className="text-linear-text-primary text-sm">
                              <span className="font-medium">Zoe</span>
                              <span className="text-linear-text-secondary"> is analyzing requirements</span>
                            </p>
                            <span className="text-linear-text-tertiary text-xs">Just now</span>
                          </div>
                        </motion.div>
                      )}

                      {demoState.subtasksCreated && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-3"
                        >
                          <Avatar.Root className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Avatar.Fallback className="text-white text-[10px] font-bold">Z</Avatar.Fallback>
                          </Avatar.Root>
                          <div className="flex-1">
                            <p className="text-linear-text-primary text-sm">
                              <span className="font-medium">Zoe</span>
                              <span className="text-linear-text-secondary"> created 9 sub-issues</span>
                            </p>
                            <span className="text-linear-text-tertiary text-xs">2 seconds ago</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtasks */}
              <AnimatePresence>
                {demoState.subtasksCreated && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <ChevronRight className="h-4 w-4 text-linear-text-tertiary" />
                      <span className="text-linear-text-secondary text-sm font-medium">Sub-issues</span>
                    </div>
                    {subtasks.slice(0, 4).map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border transition-all",
                          completedSubtasks.includes(task.id)
                            ? "bg-green-500/5 border-green-500/20"
                            : "bg-linear-bg-primary border-linear-border-subtle hover:bg-linear-bg-tertiary"
                        )}
                      >
                        <div className="flex items-center justify-center w-4 h-4">
                          {completedSubtasks.includes(task.id) ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-linear-text-tertiary" />
                          )}
                        </div>
                        <span className={cn(
                          "flex-1 text-sm",
                          completedSubtasks.includes(task.id)
                            ? "text-linear-text-tertiary line-through"
                            : "text-linear-text-primary"
                        )}>
                          {task.title}
                        </span>
                        <Avatar.Root className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Avatar.Fallback className="text-white text-[8px] font-bold">{task.assignee}</Avatar.Fallback>
                        </Avatar.Root>
                      </motion.div>
                    ))}
                    {subtasks.length > 4 && (
                      <div className="text-center py-2">
                        <span className="text-linear-text-tertiary text-xs">
                          +{subtasks.length - 4} more sub-issues
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Slack Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl overflow-hidden"
          >
            {/* Slack Header */}
            <div className="bg-[#4A154B] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-white/70" />
                <span className="text-white font-semibold">development</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-white/70" />
                <span className="text-white/70 text-sm">12</span>
              </div>
            </div>

            {/* Slack Messages */}
            <div className="p-6 bg-white min-h-[400px]">
              <AnimatePresence>
                {demoState.slackNotified && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* AI Message */}
                    <div className="flex items-start gap-3">
                      <Avatar.Root className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center relative">
                        <Avatar.Fallback className="text-white text-sm font-bold">Z</Avatar.Fallback>
                        <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[8px] px-1 rounded">APP</span>
                      </Avatar.Root>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-gray-900">Zoe</span>
                          <span className="text-gray-500 text-xs">2:34 PM</span>
                        </div>
                        <div className="text-gray-800">
                          <p className="mb-2">I've started working on <span className="bg-blue-100 text-blue-700 px-1 rounded">VOL-123</span> - Refactor authentication module</p>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
                            <p className="text-sm font-medium text-gray-700">Breaking it down into 9 subtasks:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• Set up authentication context provider</li>
                              <li>• Create login and signup components</li>
                              <li>• Implement JWT token validation</li>
                            </ul>
                            <p className="text-sm text-gray-500 italic">Estimated completion: 45 minutes</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Human Response */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <Avatar.Root className="w-9 h-9 bg-gray-300 rounded-lg flex items-center justify-center">
                        <Avatar.Fallback className="text-gray-700 text-sm font-bold">JD</Avatar.Fallback>
                      </Avatar.Root>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-gray-900">John Doe</span>
                          <span className="text-gray-500 text-xs">2:35 PM</span>
                        </div>
                        <p className="text-gray-800">
                          Perfect! Let me know if you need any clarification on the OAuth requirements.
                        </p>
                      </div>
                    </motion.div>

                    {/* Typing Indicator */}
                    {showTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3"
                      >
                        <Avatar.Root className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center relative">
                          <Avatar.Fallback className="text-white text-sm font-bold">Z</Avatar.Fallback>
                          <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[8px] px-1 rounded">APP</span>
                        </Avatar.Root>
                        <div className="flex items-center gap-1 mt-2">
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Progress Update */}
                    {demoState.phase === 'complete' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-start gap-3"
                      >
                        <Avatar.Root className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center relative">
                          <Avatar.Fallback className="text-white text-sm font-bold">Z</Avatar.Fallback>
                          <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[8px] px-1 rounded">APP</span>
                        </Avatar.Root>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-gray-900">Zoe</span>
                            <span className="text-gray-500 text-xs">2:36 PM</span>
                          </div>
                          <p className="text-gray-800">
                            <span className="text-green-600">✅</span> Completed 3 subtasks. Currently working on password reset flow...
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty State */}
              {!demoState.slackNotified && (
                <div className="flex items-center justify-center h-[350px] text-gray-400">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Waiting for updates...</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* CTAs */}
        <AnimatePresence>
          {demoState.phase === 'complete' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Continue Watching
              </button>
              <button className="px-6 py-3 bg-linear-bg-secondary text-white rounded-lg font-semibold border border-linear-border-default hover:bg-linear-bg-tertiary transition-colors">
                Connect Your Linear
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default InteractiveDemo