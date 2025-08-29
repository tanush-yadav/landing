'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useMemo,
} from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Circle,
  CheckCircle2,
  MessageSquare,
  Users,
  AlertCircle,
  Hash,
  MoreHorizontal,
  GitPullRequest,
} from 'lucide-react'
import { getWorkflowById, type TaskWorkflow } from '@/lib/demo-workflows'

// Type definitions
interface Agent {
  name: string
  avatar: string
  role: string
}

interface Subtask {
  id: number
  title: string
  assignee: string
}

interface SlackMessage {
  id: string
  type: 'ai' | 'human'
  author: string
  avatar: string
  content: string | { text: string; details?: string[] }
  timestamp: string
  delay: number
}

interface CompletionMessage {
  type: 'complete' | 'pr'
  content: string
  link: string
}

interface DemoConfig {
  id: string
  title: string
  ticketId: string
  description: string
  agent: Agent
  subtasks: Subtask[]
  slackMessages: SlackMessage[]
  completionMessage: CompletionMessage | null
}

// Helper function to convert workflow to demo config
function workflowToConfig(workflow: TaskWorkflow): DemoConfig | null {
  if (!workflow) return null

  const agent: Agent = {
    name: workflow.employee,
    avatar: workflow.employee[0].toUpperCase(),
    role: `AI ${
      workflow.category.charAt(0).toUpperCase() + workflow.category.slice(1)
    } Specialist`,
  }

  // Convert workflow steps to subtasks and messages
  const subtasks: Subtask[] = []
  const slackMessages: SlackMessage[] = []
  let msgIndex = 0

  // Extract subtasks from linear updates
  workflow.steps.forEach((step) => {
    if (step.linearUpdate?.subtasks) {
      step.linearUpdate.subtasks.forEach((task, idx) => {
        if (!subtasks.find((st) => st.id === idx)) {
          subtasks.push({
            id: idx,
            title: task.title,
            assignee: agent.avatar,
          })
        }
      })
    }

    // Convert slack messages
    if (step.slackMessage) {
      slackMessages.push({
        id: `msg-${msgIndex++}`,
        type: step.slackMessage.author === workflow.employee ? 'ai' : 'human',
        author:
          step.slackMessage.author === workflow.employee
            ? workflow.employee
            : step.slackMessage.author,
        avatar:
          step.slackMessage.author === workflow.employee ? agent.avatar : 'U',
        content: step.slackMessage.attachments
          ? {
              text: step.slackMessage.content,
              details: step.slackMessage.attachments.content.slice(0, 4),
            }
          : step.slackMessage.content,
        timestamp: new Date(
          step.slackMessage.timestamp || Date.now()
        ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        delay: msgIndex * 500,
      })
    }
  })

  // If no subtasks were found from linear updates, create them from workflow steps
  if (subtasks.length === 0 && workflow.steps.length > 0) {
    workflow.steps.slice(0, 5).forEach((step, idx) => {
      subtasks.push({
        id: idx,
        title: step.phase || step.description,
        assignee: agent.avatar,
      })
    })
  }

  // Get the final step for completion message
  const finalStep = workflow.steps[workflow.steps.length - 1]
  const completionMessage = finalStep?.slackMessage
    ? {
        type: 'complete' as const,
        content:
          finalStep.slackMessage.content || `${workflow.title} task completed`,
        link: '#',
      }
    : null

  return {
    id: workflow.id,
    title: workflow.title,
    ticketId: finalStep?.linearUpdate?.ticketId || 'VOL-XXX',
    description: workflow.description,
    agent,
    subtasks: subtasks.slice(0, 5), // Limit to 5 for UI
    slackMessages,
    completionMessage,
  }
}

// Optimized interfaces
interface DemoState {
  phase:
    | 'idle'
    | 'analyzing'
    | 'creating-subtasks'
    | 'working'
    | 'reviewing'
    | 'complete'
  ticketCreated: boolean
  subtasksCreated: boolean
  slackNotified: boolean
  timeCalculated: boolean
}

interface InteractiveDemoProps {
  triggerDemo?: boolean
  selectedTask?: string
  onDemoComplete?: () => void
}

// Memoized components for performance
const StatusBadge = memo(
  ({ phase, className }: { phase: DemoState['phase']; className?: string }) => {
    const badgeConfig = useMemo(() => {
      switch (phase) {
        case 'analyzing':
          return {
            color: 'bg-amber-50 text-amber-700 border-amber-200',
            icon: Circle,
            text: 'Analyzing',
            pulse: true,
          }
        case 'creating-subtasks':
        case 'working':
          return {
            color: 'bg-blue-50 text-blue-700 border-blue-200',
            icon: AlertCircle,
            text: 'In Progress',
            spin: true,
          }
        case 'reviewing':
        case 'complete':
          return {
            color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            icon: CheckCircle2,
            text: 'Done',
            bounce: true,
          }
        default:
          return {
            color: 'bg-gray-100 text-gray-600 border-gray-200',
            icon: Circle,
            text: 'Todo',
            pulse: false,
          }
      }
    }, [phase])

    return (
      <motion.div
        className={cn(
          'px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border backdrop-blur-sm',
          badgeConfig.color,
          className
        )}
        animate={
          badgeConfig.pulse
            ? { scale: [1, 1.05, 1] }
            : badgeConfig.bounce
            ? { y: [0, -2, 0] }
            : {}
        }
        transition={{
          duration: badgeConfig.pulse ? 1.5 : 0.5,
          repeat: badgeConfig.pulse ? Infinity : 0,
        }}
      >
        <motion.span
          animate={badgeConfig.spin ? { rotate: 360 } : {}}
          transition={{
            duration: 2,
            repeat: badgeConfig.spin ? Infinity : 0,
            ease: 'linear',
          }}
        >
          {(() => {
            const Icon = badgeConfig.icon
            return <Icon className="h-3 w-3" />
          })()}
        </motion.span>
        <span className="font-semibold tracking-wide uppercase">
          {badgeConfig.text}
        </span>
      </motion.div>
    )
  }
)

const ProgressBar = memo(
  ({ completed, total }: { completed: number; total: number }) => {
    const percentage = (completed / total) * 100
    const isComplete = completed === total

    return (
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
        <motion.div
          className="flex items-center gap-1.5"
          animate={{
            scale: isComplete ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle2
            className={cn(
              'h-4 w-4 transition-colors',
              isComplete ? 'text-emerald-600' : 'text-gray-600'
            )}
          />
          <span className="font-semibold">
            {completed}/{total}
          </span>
        </motion.div>

        <div className="flex-1 relative">
          <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </motion.div>
          </div>

          <motion.span
            className="absolute -right-12 top-1/2 -translate-y-1/2 text-xs font-bold"
            animate={{
              opacity: completed > 0 ? 1 : 0,
              color: isComplete ? '#059669' : '#6b7280',
            }}
          >
            {Math.round(percentage)}%
          </motion.span>
        </div>
      </div>
    )
  }
)

// Loading skeleton component
const DemoSkeleton = memo(() => (
  <div className="bg-gray-50/50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden max-w-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xl will-change-transform"
          >
            <div className="h-14 bg-gray-100 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className="h-10 bg-gray-100 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
))

// Error boundary component
const ErrorFallback = memo(({ onRetry }: { onRetry: () => void }) => (
  <div className="bg-gray-50/50 py-16 flex items-center justify-center">
    <div className="text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo Error</h3>
      <p className="text-gray-600 mb-4">Something went wrong with the demo.</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
))

const InteractiveDemo = memo(
  ({
    triggerDemo = false,
    selectedTask = 'fix-auth-bug',
    onDemoComplete,
  }: InteractiveDemoProps) => {
    // Optimized state management
    const [demoState, setDemoState] = useState<DemoState>({
      phase: 'idle',
      ticketCreated: false,
      subtasksCreated: false,
      slackNotified: false,
      timeCalculated: false,
    })

    const [completedSubtasks, setCompletedSubtasks] = useState<number[]>([])
    const [visibleMessages, setVisibleMessages] = useState<string[]>([])
    const [showTyping, setShowTyping] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Refs for performance
    const animationTimeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(
      new Set()
    )
    const shouldReduceMotion = useReducedMotion()

    // Memoized current task from workflow
    const currentTask = useMemo(() => {
      console.log('Selected task ID:', selectedTask)
      const workflow = getWorkflowById(selectedTask)
      console.log('Found workflow:', workflow)
      if (workflow) {
        const config = workflowToConfig(workflow)
        console.log('Generated config:', config)
        if (config) return config
      }
      // Fallback to first engineering workflow
      const fallbackWorkflow = getWorkflowById('fix-auth-bug')
      console.log('Fallback workflow:', fallbackWorkflow)
      return fallbackWorkflow ? workflowToConfig(fallbackWorkflow) : null
    }, [selectedTask])

    // Cleanup function for timeouts
    const clearAllTimeouts = useCallback(() => {
      animationTimeoutRefs.current.forEach(clearTimeout)
      animationTimeoutRefs.current.clear()
    }, [])

    // Safe timeout wrapper
    const safeSetTimeout = useCallback(
      (callback: () => void, delay: number) => {
        const timeoutId = setTimeout(() => {
          animationTimeoutRefs.current.delete(timeoutId)
          callback()
        }, delay)
        animationTimeoutRefs.current.add(timeoutId)
        return timeoutId
      },
      []
    )

    // Reset demo state
    const resetDemo = useCallback(() => {
      clearAllTimeouts()
      setIsLoading(false) // Ensure loading state is cleared
      setDemoState({
        phase: 'idle',
        ticketCreated: false,
        subtasksCreated: false,
        slackNotified: false,
        timeCalculated: false,
      })
      setCompletedSubtasks([])
      setVisibleMessages([])
      setShowTyping(false)
      setError(null)
    }, [clearAllTimeouts])

    // Optimized animation sequence with error handling
    const startDemoSequence = useCallback(async () => {
      if (isLoading) return // Prevent duplicate runs

      console.log('startDemoSequence called - currentTask:', currentTask)
      setIsLoading(true)
      setError(null)

      try {
        // Clear timeouts but don't reset to idle to avoid race condition
        clearAllTimeouts()

        // Reduced motion mode - skip animations
        if (shouldReduceMotion) {
          console.log('Reduced motion mode - setting complete state')
          setDemoState({
            phase: 'complete',
            ticketCreated: true,
            subtasksCreated: true,
            slackNotified: true,
            timeCalculated: true,
          })
          // Complete ALL subtasks in reduced motion mode
          setCompletedSubtasks(
            currentTask?.subtasks.map((st) => st.id) || [0, 1, 2, 3, 4]
          )
          setVisibleMessages(
            currentTask?.slackMessages.map((msg) => msg.id) || []
          )
          setIsLoading(false)
          // Call the onDemoComplete callback if provided
          if (onDemoComplete) {
            onDemoComplete()
          }
          return
        }

        // Start the sequence without resetting to idle
        console.log('Setting initial demo state - ticketCreated: true')
        setDemoState((prev) => {
          const newState: DemoState = {
            ...prev,
            phase: 'analyzing' as const,
            ticketCreated: true,
          }
          console.log('New demo state:', newState)
          return newState
        })
        setIsLoading(false) // Clear loading state once demo starts

        // Execute sequence with direct timeouts instead of promises
        safeSetTimeout(() => {
          setDemoState((prev) => ({
            ...prev,
            phase: 'creating-subtasks' as const,
          }))
        }, 800)

        safeSetTimeout(() => {
          setDemoState((prev) => ({ ...prev, subtasksCreated: true }))
        }, 1200)

        safeSetTimeout(() => {
          setDemoState((prev) => ({
            ...prev,
            phase: 'working' as const,
            timeCalculated: true,
          }))
        }, 1600)

        safeSetTimeout(() => {
          console.log('Setting slackNotified to true')
          setDemoState((prev) => {
            const newState: DemoState = {
              ...prev,
              phase: 'reviewing' as const,
              slackNotified: true,
            }
            console.log('New state with slackNotified:', newState)
            return newState
          })
        }, 2000)

        // Show Slack messages progressively
        let messageDelay = 2400
        if (currentTask?.slackMessages) {
          for (let i = 0; i < currentTask.slackMessages.length; i++) {
            const message = currentTask.slackMessages[i]
            safeSetTimeout(() => {
              if (i < currentTask.slackMessages.length - 1) {
                setShowTyping(true)
                safeSetTimeout(() => setShowTyping(false), 800)
              }
              setVisibleMessages((prev) => [...prev, message.id])
            }, messageDelay)
            messageDelay += (message.delay || 400) + 400
          }
        }

        // Complete subtasks first
        if (currentTask?.subtasks && currentTask.subtasks.length > 0) {
          const subtasksToComplete = currentTask.subtasks.length // Complete ALL subtasks
          const subtaskDelay = messageDelay + 400 // Start subtasks sooner
          for (let i = 0; i < subtasksToComplete; i++) {
            safeSetTimeout(() => {
              setCompletedSubtasks((prev) => [
                ...prev,
                currentTask.subtasks[i].id,
              ])
              if (i === subtasksToComplete - 1) {

                // Set complete phase AFTER all subtasks are done
                safeSetTimeout(() => {
                  console.log(
                    'Setting demo to complete phase after all subtasks'
                  )
                  setDemoState((prev) => ({
                    ...prev,
                    phase: 'complete' as const,
                  }))
                          // Call the onDemoComplete callback if provided
                  if (onDemoComplete) {
                    onDemoComplete()
                  }
                }, 500)
              }
            }, subtaskDelay + i * 300) // Faster subtask completion
          }
        } else {
          // If no subtasks or empty subtasks array, complete after messages
          console.log('No subtasks found, completing demo after messages')
          safeSetTimeout(() => {
            setDemoState((prev) => ({ ...prev, phase: 'complete' as const }))
              if (onDemoComplete) {
              onDemoComplete()
            }
          }, messageDelay + 800)
        }
      } catch (err) {
        console.error('Demo sequence error:', err)
        setError('Demo failed to load. Please try again.')
        setIsLoading(false)
      }
    }, [
      currentTask,
      clearAllTimeouts,
      safeSetTimeout,
      shouldReduceMotion,
      isLoading,
      onDemoComplete,
    ])

    // Track previous trigger state to detect changes
    const prevTriggerRef = useRef(triggerDemo)

    // Effect for demo trigger - simplified to avoid race conditions
    useEffect(() => {
      console.log('Demo trigger effect:', {
        triggerDemo,
        prevTrigger: prevTriggerRef.current,
        isLoading,
        phase: demoState.phase,
        ticketCreated: demoState.ticketCreated,
      })

      // Only process if trigger changed from false to true
      const triggerChanged = triggerDemo && !prevTriggerRef.current

      if (triggerChanged && !isLoading) {
        // Start if we're in idle state OR if we need to restart from complete state
        if (demoState.phase === 'idle' && !demoState.ticketCreated) {
          console.log('Starting demo sequence from idle...')
          startDemoSequence()
        } else if (demoState.phase === 'complete') {
          console.log('Restarting demo sequence from complete...')
          // Reset and restart for a fresh demo
          resetDemo()
          // Start after a brief delay to ensure state is cleared
          setTimeout(() => {
            startDemoSequence()
          }, 100)
        }
      }

      // Update the previous trigger ref
      prevTriggerRef.current = triggerDemo
    }, [
      triggerDemo,
      startDemoSequence,
      isLoading,
      demoState.phase,
      demoState.ticketCreated,
      resetDemo,
    ])

    // Reset when task changes
    useEffect(() => {
      resetDemo()
    }, [selectedTask, resetDemo])

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        clearAllTimeouts()
      }
    }, [clearAllTimeouts])

    // Error fallback
    if (error) {
      return (
        <ErrorFallback
          onRetry={() => {
            setError(null)
            resetDemo()
            if (triggerDemo) {
              safeSetTimeout(() => startDemoSequence(), 100)
            }
          }}
        />
      )
    }

    // Loading state - show skeleton only while explicitly loading
    if (isLoading) {
      return <DemoSkeleton />
    }

    // Handle null task gracefully
    if (!currentTask) {
      return (
        <section className="bg-gray-50/50 py-16 relative">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
            <p>Demo content loading...</p>
          </div>
        </section>
      )
    }

    console.log(
      'Rendering InteractiveDemo - demoState:',
      demoState,
      'currentTask:',
      currentTask
    )

    return (
      <section
        id="demo-section"
        className="bg-gray-50/50 py-16 relative"
        role="region"
        aria-label="Interactive demonstration of AI automation workflow"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Linear Demo */}
            <motion.div
              className={cn(
                'bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl will-change-transform',
                demoState.phase === 'complete'
                  ? 'border-green-200 shadow-green-100/50'
                  : 'border-gray-100'
              )}
              animate={
                demoState.phase === 'complete'
                  ? {
                      borderColor: ['#d1fae5', '#a7f3d0', '#d1fae5'],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: demoState.phase === 'complete' ? Infinity : 0,
              }}
            >
              {/* Linear Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">L</span>
                  </div>
                  <span className="text-gray-800 font-medium text-sm">
                    Linear
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Live</span>
                </div>
              </div>

              {/* Linear Content */}
              <div className="px-6 py-5">
                <AnimatePresence>
                  {demoState.ticketCreated && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Issue Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm text-gray-500 font-medium">
                            {currentTask?.ticketId || 'VOL-101'}
                          </span>
                          <motion.span
                            className={cn(
                              'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide',
                              demoState.phase === 'complete'
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            )}
                            animate={
                              demoState.phase === 'complete'
                                ? {
                                    scale: [1, 1.05, 1],
                                  }
                                : {}
                            }
                            transition={{ duration: 0.5 }}
                          >
                            {demoState.phase === 'complete' && (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            )}
                            {demoState.phase === 'complete'
                              ? 'Done'
                              : 'In Progress'}
                          </motion.span>
                        </div>
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </div>

                      {/* Issue Title */}
                      <h3 className="text-gray-900 text-base font-medium mb-4">
                        {currentTask?.title ||
                          'Fix authentication bug in production'}
                      </h3>

                      {/* Progress Bar */}
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-gray-500 font-medium">
                            Progress
                          </span>
                          <span
                            className={cn(
                              'text-xs font-medium',
                              demoState.phase === 'complete'
                                ? 'text-green-600'
                                : 'text-gray-600'
                            )}
                          >
                            {demoState.phase === 'complete'
                              ? `${currentTask?.subtasks.length || 5}/${
                                  currentTask?.subtasks.length || 5
                                }`
                              : `${completedSubtasks.length}/${
                                  currentTask?.subtasks.length || 5
                                }`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className={cn(
                              'h-full',
                              demoState.phase === 'complete'
                                ? 'bg-green-500'
                                : 'bg-blue-500'
                            )}
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                demoState.phase === 'complete'
                                  ? '100%'
                                  : `${
                                      (completedSubtasks.length /
                                        (currentTask?.subtasks.length || 5)) *
                                      100
                                    }%`,
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        </div>
                      </div>

                      {/* Activity Feed */}
                      <div className="space-y-3 mb-5">
                        {demoState.phase !== 'idle' && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-2.5"
                          >
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-[10px] font-semibold">
                                {currentTask?.agent.avatar || 'Z'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium text-gray-900">
                                  {currentTask?.agent.name || 'Zoe'}
                                </span>
                                <span className="text-gray-600">
                                  {' '}
                                  is analyzing{' '}
                                  {currentTask?.description ||
                                    'the requirements'}
                                </span>
                              </p>
                              <span className="text-xs text-gray-400">
                                Just now
                              </span>
                            </div>
                          </motion.div>
                        )}

                        {demoState.subtasksCreated && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-2.5"
                          >
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-[10px] font-semibold">
                                {currentTask?.agent.avatar || 'Z'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium text-gray-900">
                                  {currentTask?.agent.name || 'Zoe'}
                                </span>
                                <span className="text-gray-600">
                                  {' '}
                                  created {currentTask?.subtasks.length ||
                                    5}{' '}
                                  sub-issues
                                </span>
                              </p>
                              <span className="text-xs text-gray-400">
                                2 seconds ago
                              </span>
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                          Sub-issues
                        </h4>
                        <div className="space-y-2">
                          {(currentTask?.subtasks || []).map((task, index) => {
                            const isCompleted =
                              completedSubtasks.includes(task.id) ||
                              demoState.phase === 'complete'
                            return (
                              <motion.div
                                key={task.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={cn(
                                  'flex items-center gap-3 py-2 rounded-md px-2 transition-all',
                                  isCompleted && 'bg-green-50/50'
                                )}
                              >
                                <motion.div
                                  className="flex items-center justify-center w-4 h-4"
                                  animate={
                                    isCompleted ? { scale: [1, 1.2, 1] } : {}
                                  }
                                  transition={{ duration: 0.3 }}
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Circle className="h-4 w-4 text-gray-300" />
                                  )}
                                </motion.div>
                                <span
                                  className={cn(
                                    'text-sm flex-1',
                                    isCompleted
                                      ? 'text-gray-500 line-through'
                                      : 'text-gray-700'
                                  )}
                                >
                                  {task.title}
                                </span>
                                {isCompleted && (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xs text-green-600 font-bold"
                                  >
                                    DONE
                                  </motion.span>
                                )}
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Slack Demo */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl will-change-transform">
              {/* Slack Header */}
              <div className="bg-[#4A154B] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-white/80" />
                  <span className="text-white font-medium text-sm">
                    #development
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-white/60" />
                  <span className="text-white/60 text-xs">12 members</span>
                </div>
              </div>

              {/* Slack Messages */}
              <div
                className="px-6 py-5 bg-white min-h-[420px]"
                role="log"
                aria-live="polite"
              >
                <AnimatePresence>
                  {demoState.slackNotified ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Dynamic Messages from Current Task */}
                      {currentTask?.slackMessages &&
                      currentTask.slackMessages.length > 0 ? (
                        <>
                          {currentTask.slackMessages.map(
                            (message, index) =>
                              visibleMessages.includes(message.id) && (
                                <motion.div
                                  key={message.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.2 }}
                                  className="flex items-start gap-3"
                                >
                                  <div
                                    className={cn(
                                      'w-9 h-9 rounded flex items-center justify-center flex-shrink-0',
                                      message.type === 'ai'
                                        ? 'bg-purple-500'
                                        : 'bg-gray-500'
                                    )}
                                  >
                                    <span className="text-white text-sm font-semibold">
                                      {message.avatar}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-baseline gap-2 mb-1">
                                      <span className="font-semibold text-gray-900 text-sm">
                                        {message.author}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {message.timestamp}
                                      </span>
                                    </div>
                                    <div className="text-gray-700 text-sm">
                                      {typeof message.content === 'string' ? (
                                        <p>{message.content}</p>
                                      ) : (
                                        <>
                                          <p>{message.content.text}</p>
                                          {message.content.details && (
                                            <div className="mt-2 bg-gray-50 border border-gray-200 rounded-md p-3">
                                              <p className="text-xs font-medium text-gray-600 mb-2">
                                                Details:
                                              </p>
                                              <ul className="text-xs text-gray-600 space-y-1">
                                                {message.content.details.map(
                                                  (detail, idx) => (
                                                    <li key={idx}>{detail}</li>
                                                  )
                                                )}
                                              </ul>
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )
                          )}
                        </>
                      ) : (
                        // Fallback for tasks without Slack messages
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-9 h-9 bg-purple-500 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-semibold">
                              {currentTask?.agent.avatar || 'Z'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="font-semibold text-gray-900 text-sm">
                                {currentTask?.agent.name || 'Zoe'}
                              </span>
                              <span className="text-xs text-gray-500">
                                2:34 PM
                              </span>
                            </div>
                            <div className="text-gray-700 text-sm">
                              <p>
                                I&apos;m analyzing{' '}
                                {currentTask?.description || 'the requirements'}
                                ...
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Completion Message */}
                      {demoState.phase === 'complete' &&
                        currentTask?.completionMessage && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-9 h-9 bg-purple-500 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                {currentTask.agent.avatar}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2 mb-1">
                                <span className="font-semibold text-gray-900 text-sm">
                                  {currentTask.agent.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  2:36 PM
                                </span>
                              </div>
                              <div className="text-gray-700 text-sm">
                                <p className="mb-2">
                                  <span className="text-green-600">✅</span>{' '}
                                  {currentTask.completionMessage.content}
                                </p>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-md text-xs font-medium">
                                  <GitPullRequest className="h-3.5 w-3.5" />
                                  <span>Task Complete</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                      {/* Typing Indicator */}
                      {showTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-9 h-9 bg-purple-500 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-semibold">
                              {currentTask?.agent.avatar || 'Z'}
                            </span>
                          </div>
                          <div className="bg-gray-100 rounded-md px-3 py-2 flex items-center gap-1.5">
                            {[0, 0.2, 0.4].map((delay, i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  y: [0, -3, 0],
                                  opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  delay,
                                  ease: 'easeInOut',
                                }}
                                className="w-1.5 h-1.5 bg-gray-500 rounded-full"
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex items-center justify-center h-[380px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center">
                        <MessageSquare className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm text-gray-500">
                          Waiting for updates...
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
)

// Add display names
StatusBadge.displayName = 'StatusBadge'
ProgressBar.displayName = 'ProgressBar'
DemoSkeleton.displayName = 'DemoSkeleton'
ErrorFallback.displayName = 'ErrorFallback'
InteractiveDemo.displayName = 'InteractiveDemo'

export default InteractiveDemo
