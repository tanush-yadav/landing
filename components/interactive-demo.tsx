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
  AlertCircle,
  MoreHorizontal,
  Search,
  MessageCircle,
  Sparkles,
  Mail,
  Send,
  Clock3,
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

interface NegotiationMessage {
  id: string
  sender: 'agent' | 'creator'
  author: string
  avatar: string
  timestamp: string
  content: string
  highlights?: string[]
  delay: number
}

interface OutboundEmail {
  id: string
  status: 'sending' | 'scheduled' | 'sent'
  subject: string
  preview: string
  timestamp: string
  delay: number
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
  conversationStarted: boolean
  timeCalculated: boolean
  emailsQueued: boolean
}

interface InteractiveDemoProps {
  triggerDemo?: boolean
  selectedTask?: string
  incomingSearchQuery?: string
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
      <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
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
              isComplete ? 'text-emerald-600' : 'text-slate-500'
            )}
          />
          <span className="font-semibold">
            {completed}/{total}
          </span>
        </motion.div>

        <div className="flex-1 relative">
          <div className="bg-emerald-100/60 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
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
              color: isComplete ? '#047857' : '#64748b',
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
    incomingSearchQuery,
    onDemoComplete,
  }: InteractiveDemoProps) => {
    // Optimized state management
    const [demoState, setDemoState] = useState<DemoState>({
      phase: 'idle',
      ticketCreated: false,
      subtasksCreated: false,
      conversationStarted: false,
      timeCalculated: false,
      emailsQueued: false,
    })

    const [completedSubtasks, setCompletedSubtasks] = useState<number[]>([])
    const [visibleMessages, setVisibleMessages] = useState<string[]>([])
    const [visibleEmails, setVisibleEmails] = useState<string[]>([])
    const [showTyping, setShowTyping] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Refs for performance
    const animationTimeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(
      new Set()
    )
    const shouldReduceMotion = useReducedMotion()

    const baseSearchQueries = useMemo(
      () => [
        'Find fashion creators driving spring campaigns',
        'Discover lifestyle influencers with 100K+ engaged followers',
        'Surface TikTok beauty creators ready for brand partnerships',
      ],
      []
    )

    const [customSearchQuery, setCustomSearchQuery] = useState<string | null>(
      null
    )

    const searchQueries = useMemo(() => {
      if (customSearchQuery) {
        const remaining = baseSearchQueries.filter(
          (query) => query !== customSearchQuery
        )
        return [customSearchQuery, ...remaining]
      }
      return baseSearchQueries
    }, [baseSearchQueries, customSearchQuery])

    const defaultSearchQuery = useMemo(() => {
      const fallback = baseSearchQueries[0] ||
        'Discover fashion creators driving spring campaigns'
      return searchQueries[0] || fallback
    }, [baseSearchQueries, searchQueries])

    const searchMetrics = useMemo(
      () => [
        { label: 'Results', value: '143' },
        { label: 'Match Quality', value: '95%' },
        { label: 'Search Time', value: '0.8s' },
      ],
      []
    )

    const [searchQueryIndex, setSearchQueryIndex] = useState(0)
    const [displayedSearchQuery, setDisplayedSearchQuery] = useState(() =>
      shouldReduceMotion ? defaultSearchQuery : ''
    )
    const [searchTypingState, setSearchTypingState] =
      useState<'typing' | 'pausing' | 'deleting'>(
        shouldReduceMotion ? 'pausing' : 'typing'
      )

    const activeSearchQuery =
      searchQueries[searchQueryIndex] ?? defaultSearchQuery
    const isTypingActive = searchTypingState === 'typing' || searchTypingState === 'deleting' || displayedSearchQuery.length > 0

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

    const negotiationMessages = useMemo<NegotiationMessage[]>(() => {
      const agentName = currentTask?.agent.name || 'Jordan'
      const agentAvatar = currentTask?.agent.avatar || 'J'
      const creatorName = 'Ava Chen'
      const creatorAvatar = 'AC'
      const focusQuery = searchQueries[0]

      return [
        {
          id: 'negotiation-intro',
          sender: 'agent',
          author: agentName,
          avatar: agentAvatar,
          timestamp: '4:12 PM',
          content: `Hi ${creatorName}, loved your recent launch series. We have a campaign focused on “${focusQuery}” and think you’re a perfect fit. Available next week?`,
          highlights: ['Deliverables: 2 Reels + Story recap'],
          delay: 900,
        },
        {
          id: 'negotiation-response',
          sender: 'creator',
          author: creatorName,
          avatar: creatorAvatar,
          timestamp: '4:13 PM',
          content: `Thanks ${agentName}! I can fit this in. Standard package is 2 Reels, 1 Story sequence, usage for 30 days. Rate is $2.8k.`,
          highlights: ['Turnaround: 72 hours', 'Add-on: Product unboxing'],
          delay: 1200,
        },
        {
          id: 'negotiation-counter',
          sender: 'agent',
          author: agentName,
          avatar: agentAvatar,
          timestamp: '4:14 PM',
          content: `Love it. We’ll cover product + shipping, bonus $500 if swipe-up clicks > 3.5k. Also adding an affiliate code with 15% rev share. Sound good?`,
          highlights: ['Bonus: $500 performance kicker', 'Affiliate rev share: 15%'],
          delay: 1100,
        },
        {
          id: 'negotiation-agree',
          sender: 'creator',
          author: creatorName,
          avatar: creatorAvatar,
          timestamp: '4:15 PM',
          content: `Deal! Lock me in for shoot on Tuesday. Send the brief + contract and I’ll confirm timelines tonight.`,
          delay: 1000,
        },
        {
          id: 'negotiation-wrap',
          sender: 'agent',
          author: agentName,
          avatar: agentAvatar,
          timestamp: '4:15 PM',
          content: `Amazing — consider it booked. I’ll send the brief right after this sequence finishes and loop in our creative ops.`,
          delay: 900,
        },
      ]
    }, [currentTask, searchQueries])

    const emailSequence = useMemo<OutboundEmail[]>(() => {
      const today = new Date()
      const formatTime = (minsFromNow: number) => {
        const future = new Date(today.getTime() + minsFromNow * 60000)
        return future.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      return [
        {
          id: 'email-hot',
          status: 'sent',
          subject: '🔥 Hot leads — Schedule intro calls',
          preview: '8 buyers received the calendar link + tailored ROI snippet.',
          timestamp: formatTime(0),
          delay: 600,
        },
        {
          id: 'email-warm',
          status: 'sending',
          subject: 'Warm list — Campaign bundle follow up',
          preview: '21 leads queued with dynamic product highlights and case study.',
          timestamp: formatTime(2),
          delay: 700,
        },
        {
          id: 'email-nurture',
          status: 'scheduled',
          subject: 'Nurture drip — Webinar recap sequence',
          preview: '14 prospects added to nurture flow with personalized CTA.',
          timestamp: 'Tomorrow 9:00 AM',
          delay: 900,
        },
      ]
    }, [])

    useEffect(() => {
      if (incomingSearchQuery && incomingSearchQuery.trim()) {
        setCustomSearchQuery(incomingSearchQuery.trim())

        // Trigger typing animation for the new search query
        if (!shouldReduceMotion) {
          setDisplayedSearchQuery('')
          setSearchTypingState('typing')
          setSearchQueryIndex(0)
        }
      } else {
        setCustomSearchQuery(null)
      }
    }, [incomingSearchQuery, shouldReduceMotion])

    useEffect(() => {
      if (!triggerDemo) return

      if (shouldReduceMotion) {
        setDisplayedSearchQuery(defaultSearchQuery)
        setSearchTypingState('pausing')
        setSearchQueryIndex(0)
        return
      }

      setDisplayedSearchQuery('')
      setSearchTypingState('typing')
      setSearchQueryIndex(0)
    }, [triggerDemo, defaultSearchQuery, shouldReduceMotion])

    useEffect(() => {
      if (!shouldReduceMotion) return
      if (triggerDemo) return

      setDisplayedSearchQuery(defaultSearchQuery)
      setSearchTypingState('pausing')
      setSearchQueryIndex(0)
    }, [defaultSearchQuery, shouldReduceMotion, triggerDemo])

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

    useEffect(() => {
      if (shouldReduceMotion) return

      const currentQuery =
        searchQueries[searchQueryIndex] ?? defaultSearchQuery

      if (!currentQuery) return

      if (searchTypingState === 'typing') {
        if (displayedSearchQuery.length < currentQuery.length) {
          safeSetTimeout(() => {
            setDisplayedSearchQuery(
              currentQuery.slice(0, displayedSearchQuery.length + 1)
            )
          }, 70)
        } else {
          setSearchTypingState('pausing')
          safeSetTimeout(() => {
            setSearchTypingState('deleting')
          }, 1500)
        }
      } else if (searchTypingState === 'deleting') {
        if (displayedSearchQuery.length > 0) {
          safeSetTimeout(() => {
            setDisplayedSearchQuery(
              currentQuery.slice(0, displayedSearchQuery.length - 1)
            )
          }, 45)
        } else {
          safeSetTimeout(() => {
            setSearchTypingState('typing')
            setSearchQueryIndex((prev) =>
              searchQueries.length > 0 ? (prev + 1) % searchQueries.length : 0
            )
          }, 250)
        }
      }
    }, [
      defaultSearchQuery,
      displayedSearchQuery,
      safeSetTimeout,
      searchQueries,
      searchQueryIndex,
      searchTypingState,
      shouldReduceMotion,
    ])

    // Reset demo state
    const resetDemo = useCallback(() => {
      clearAllTimeouts()
      setIsLoading(false) // Ensure loading state is cleared
      setDemoState({
        phase: 'idle',
        ticketCreated: false,
        subtasksCreated: false,
        conversationStarted: false,
        timeCalculated: false,
        emailsQueued: false,
      })
      setCompletedSubtasks([])
      setVisibleMessages([])
      setVisibleEmails([])
      setShowTyping(false)
      setError(null)
      setSearchQueryIndex(0)
      setDisplayedSearchQuery(shouldReduceMotion ? defaultSearchQuery : '')
      setSearchTypingState(shouldReduceMotion ? 'pausing' : 'typing')
    }, [
      clearAllTimeouts,
      defaultSearchQuery,
      shouldReduceMotion,
    ])

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
            conversationStarted: true,
            timeCalculated: true,
            emailsQueued: true,
          })
          // Complete ALL subtasks in reduced motion mode
          setCompletedSubtasks(
            currentTask?.subtasks.map((st) => st.id) || [0, 1, 2, 3, 4]
          )
          setVisibleMessages(negotiationMessages.map((msg) => msg.id))
          setVisibleEmails(emailSequence.map((email) => email.id))
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

        // Surface outbound emails first (earlier timing)
        safeSetTimeout(() => {
          setDemoState((prev) => ({ ...prev, emailsQueued: true }))
        }, 1800)

        let cumulativeEmailDelay = 2000
        emailSequence.forEach((email) => {
          safeSetTimeout(() => {
            setVisibleEmails((prev) => [...prev, email.id])
          }, cumulativeEmailDelay)
          cumulativeEmailDelay += email.delay
        })

        // Start creator negotiation thread after emails (later timing)
        const messageStartDelay = cumulativeEmailDelay + 300
        safeSetTimeout(() => {
          console.log('Starting creator negotiation thread')
          setDemoState((prev) => {
            const newState: DemoState = {
              ...prev,
              phase: 'reviewing' as const,
              conversationStarted: true,
            }
            console.log('New state with conversationStarted:', newState)
            return newState
          })
        }, messageStartDelay)

        // Show negotiation messages progressively
        let messageDelay = messageStartDelay + 400
        negotiationMessages.forEach((message, index) => {
          safeSetTimeout(() => {
            if (index < negotiationMessages.length - 1) {
              setShowTyping(true)
              safeSetTimeout(() => setShowTyping(false), 700)
            }
            setVisibleMessages((prev) => [...prev, message.id])
          }, messageDelay)
          messageDelay += message.delay
        })

        const completionAnchor = messageDelay + 300

        // Complete subtasks first
        if (currentTask?.subtasks && currentTask.subtasks.length > 0) {
          const subtasksToComplete = currentTask.subtasks.length // Complete ALL subtasks
          for (let i = 0; i < subtasksToComplete; i++) {
            safeSetTimeout(() => {
              setCompletedSubtasks((prev) => [
                ...prev,
                currentTask.subtasks[i].id,
              ])
              if (i === subtasksToComplete - 1) {
                // Set complete phase AFTER all subtasks and communications finish
                safeSetTimeout(() => {
                  console.log(
                    'Setting demo to complete phase after all subtasks and outreach'
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
            }, completionAnchor + i * 320)
          }
        } else {
          // If no subtasks or empty subtasks array, complete after outreach
          console.log('No subtasks found, completing demo after outreach')
          safeSetTimeout(() => {
            setDemoState((prev) => ({ ...prev, phase: 'complete' as const }))
            if (onDemoComplete) {
              onDemoComplete()
            }
          }, completionAnchor + 600)
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
      negotiationMessages,
      emailSequence,
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
          <div className="relative">
            <motion.div
              className="relative z-20 mx-auto w-full max-w-4xl lg:max-w-5xl -mb-12 sm:-mb-14 lg:-mb-20"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white/90 shadow-2xl shadow-blue-100/50 backdrop-blur-md">
                <div className="absolute inset-x-8 top-6 h-44 rounded-[2.5rem] bg-gradient-to-b from-blue-400/10 via-blue-400/5 to-transparent blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="ml-auto text-xs font-semibold uppercase tracking-[0.32em] text-gray-400">
                      Live Search
                    </span>
                  </div>
                  <div className="px-6 py-6 sm:p-8">
                    <div className="rounded-2xl border border-gray-100 bg-white shadow-inner shadow-gray-100/60">
                      <div className="flex items-center gap-3 px-5 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                          <Search className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
                            Searching
                          </p>
                          <div
                            className="flex items-center min-h-[1.75rem] text-base font-medium text-gray-700 transition-colors duration-300 sm:text-lg"
                            aria-live="polite"
                            aria-atomic="true"
                          >
                            <span
                              className={cn(
                                'whitespace-pre-line',
                                !isTypingActive && 'text-gray-300'
                              )}
                            >
                              {isTypingActive
                                ? displayedSearchQuery
                                : activeSearchQuery}
                            </span>
                            {!shouldReduceMotion && (searchTypingState === 'typing' || searchTypingState === 'deleting' || isTypingActive) && (
                              <motion.span
                                className="ml-1 h-5 w-[2px] bg-blue-500"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.9, repeat: Infinity }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {searchMetrics.map((metric, index) => (
                        <motion.div
                          key={metric.label}
                          className="rounded-2xl border border-gray-100 bg-white/95 px-5 py-4 text-left shadow-sm shadow-blue-100/30"
                          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.2 + index * 0.1,
                            ease: 'easeOut',
                          }}
                        >
                          <div className="text-2xl font-semibold text-gray-900">
                            {metric.value}
                          </div>
                          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                            {metric.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 pt-20 sm:gap-6 sm:pt-24 lg:grid-cols-3 lg:pt-32">
            {/* Linear Demo */}
            <motion.div
              className={cn(
                'bg-white rounded-[28px] shadow-lg shadow-emerald-100/40 border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl will-change-transform',
                demoState.phase === 'complete'
                  ? 'border-emerald-200 shadow-emerald-100/70'
                  : 'border-slate-100'
              )}
              animate={
                demoState.phase === 'complete'
                  ? {
                      borderColor: ['#bbf7d0', '#a7f3d0', '#bbf7d0'],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: demoState.phase === 'complete' ? Infinity : 0,
              }}
            >
              {/* Linear Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-50 bg-emerald-50/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">Lr</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Linear</p>
                    <p className="text-xs uppercase tracking-[0.28em] text-emerald-600/80">
                      Lead Ops
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-emerald-600">Live</span>
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
                          <span className="text-sm text-emerald-600 font-semibold">
                            {currentTask?.ticketId || 'VOL-301'}
                          </span>
                          <motion.span
                            className={cn(
                              'inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.22em]',
                              demoState.phase === 'complete'
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                : 'bg-amber-50 text-amber-600 border border-amber-200'
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
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                            )}
                            {demoState.phase === 'complete'
                              ? 'Done'
                              : 'In Progress'}
                          </motion.span>
                        </div>
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </div>

                      {/* Issue Title */}
                      <h3 className="text-slate-900 text-lg font-semibold mb-4">
                        {currentTask?.title ||
                          "Qualify leads from yesterday's webinar"}
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
                              <p className="text-sm text-slate-700">
                                <span className="font-medium text-slate-900">
                                  {currentTask?.agent.name || 'Jordan'}
                                </span>
                                <span className="text-slate-600">
                                  {' '}
                                  is qualifying leads from{' '}
                                  {currentTask?.description ||
                                    'the webinar audience'}
                                </span>
                              </p>
                              <span className="text-xs text-slate-400">
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
                              <p className="text-sm text-slate-700">
                                <span className="font-medium text-slate-900">
                                  {currentTask?.agent.name || 'Jordan'}
                                </span>
                                <span className="text-slate-600">
                                  {' '}
                                  created{' '}
                                  {currentTask?.subtasks.length || 5}{' '}
                                  targeted workflows
                                </span>
                              </p>
                              <span className="text-xs text-slate-400">
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
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.32em] mb-3">
                          Workflow Steps
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
                                  isCompleted && 'bg-emerald-50/60'
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
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                  ) : (
                                    <Circle className="h-4 w-4 text-slate-300" />
                                  )}
                                </motion.div>
                                <span
                                  className={cn(
                                    'text-sm flex-1',
                                    isCompleted
                                      ? 'text-slate-400 line-through'
                                      : 'text-slate-700'
                                  )}
                                >
                                  {task.title}
                                </span>
                                {isCompleted && (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xs text-emerald-600 font-bold"
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

            {/* Outreach Emails */}
            <div className="bg-white rounded-[28px] shadow-lg shadow-blue-100/40 border border-blue-100 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl will-change-transform">
              <div className="flex items-center justify-between px-6 py-5 border-b border-blue-50 bg-blue-50/40">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Creator Outreach</p>
                    <p className="text-xs uppercase tracking-[0.32em] text-blue-500/70">Sequences</p>
                  </div>
                </div>
                <div className="text-xs font-semibold text-blue-500/70">Automated</div>
              </div>
              <div className="px-6 py-6 bg-white min-h-[420px] flex flex-col" role="log" aria-live="polite">
                {demoState.emailsQueued ? (
                  <AnimatePresence initial={false}>
                    {emailSequence.map((email, index) => {
                      const isVisible =
                        demoState.phase === 'complete' ||
                        visibleEmails.includes(email.id)
                      if (!isVisible) {
                        return null
                      }

                      const statusConfig = {
                        sent: {
                          label: 'Sent',
                          className: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
                          icon: CheckCircle2,
                        },
                        sending: {
                          label: 'Sending',
                          className: 'bg-blue-50 text-blue-600 border border-blue-200',
                          icon: Send,
                        },
                        scheduled: {
                          label: 'Scheduled',
                          className: 'bg-amber-50 text-amber-600 border border-amber-200',
                          icon: Clock3,
                        },
                      } as const

                      const config = statusConfig[email.status]
                      const StatusIcon = config.icon

                      return (
                        <motion.div
                          key={email.id}
                          initial={{ opacity: 0, y: 16, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -16, scale: 0.95 }}
                          transition={{ duration: 0.35, delay: index * 0.05 }}
                          className="rounded-2xl border border-slate-100/80 bg-white/90 px-5 py-4 shadow-sm shadow-blue-100/30"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {email.subject}
                              </p>
                              <p className="mt-1 text-xs text-slate-500 leading-5">
                                {email.preview}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="text-xs text-slate-400">{email.timestamp}</span>
                              <span
                                className={cn(
                                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]',
                                  config.className
                                )}
                              >
                                <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                                {config.label}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center text-sm text-blue-400/80 border border-dashed border-blue-100 rounded-2xl bg-blue-50/20">
                    <p>Drafting personalized outreach sequences…</p>
                  </div>
                )}
              </div>
            </div>

            {/* Messenger Demo */}
            <div className="bg-white rounded-[28px] shadow-lg shadow-purple-100/40 border border-purple-100 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl will-change-transform">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-wide uppercase text-white/90">
                      Creator Messenger
                    </p>
                    <p className="text-xs text-white/70">
                      Negotiating deliverables in real time
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>Auto-Pilot</span>
                </div>
              </div>
              <div
                className="px-6 py-6 bg-white min-h-[420px] flex flex-col"
                role="log"
                aria-live="polite"
              >
                {demoState.conversationStarted ? (
                  <>
                    <AnimatePresence initial={false}>
                      {negotiationMessages.map((message, index) => {
                        const isVisible =
                          demoState.phase === 'complete' ||
                          visibleMessages.includes(message.id)
                        if (!isVisible) {
                          return null
                        }
                        const isAgent = message.sender === 'agent'

                        return (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 16, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3, delay: index * 0.04 }}
                            className={cn('flex w-full', isAgent ? 'justify-start' : 'justify-end')}
                          >
                            <div
                              className={cn(
                                'max-w-[280px] rounded-3xl px-4 py-3 shadow-md border transition-colors',
                                isAgent
                                  ? 'bg-purple-50 text-purple-900 border-purple-100'
                                  : 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-200/60'
                              )}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span
                                  className={cn(
                                    'text-xs font-semibold tracking-wide uppercase',
                                    isAgent ? 'text-purple-600' : 'text-white/85'
                                  )}
                                >
                                  {message.author}
                                </span>
                                <span className={cn('text-[11px]', isAgent ? 'text-purple-400' : 'text-white/60')}>
                                  {message.timestamp}
                                </span>
                              </div>
                              <p className="text-sm leading-5">{message.content}</p>
                              {message.highlights && (
                                <ul
                                  className={cn(
                                    'mt-3 text-xs space-y-1.5 border-t pt-3',
                                    isAgent
                                      ? 'border-purple-100 text-purple-600'
                                      : 'border-white/30 text-white/85'
                                  )}
                                >
                                  {message.highlights.map((highlight, hi) => (
                                    <li key={hi} className="flex items-center gap-1.5">
                                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                    {showTyping && (
                      <motion.div
                        key="messenger-typing"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mt-4 flex justify-start"
                      >
                        <div className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-purple-600">
                          <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                            {currentTask?.agent.name || 'Jordan'}
                          </span>
                          <div className="flex items-center gap-1">
                            {[0, 0.2, 0.4].map((delay) => (
                              <motion.span
                                key={delay}
                                className="h-1.5 w-1.5 rounded-full bg-purple-400"
                                animate={{
                                  y: [0, -3, 0],
                                  opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay,
                                  ease: 'easeInOut',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center text-sm text-purple-400/80 border border-dashed border-purple-100 rounded-2xl bg-purple-50/20">
                    <p>Negotiating deliverables with the creator…</p>
                  </div>
                )}
              </div>
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
