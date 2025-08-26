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
  MoreHorizontal,
  GitPullRequest,
  Link2
} from 'lucide-react'
import * as Avatar from '@radix-ui/react-avatar'

interface DemoState {
  phase: 'idle' | 'analyzing' | 'creating-subtasks' | 'working' | 'reviewing' | 'complete'
  ticketCreated: boolean
  subtasksCreated: boolean
  slackNotified: boolean
  timeCalculated: boolean
}

interface TaskConfig {
  id: string
  title: string
  ticketId: string
  description: string
  agent: {
    name: string
    avatar: string
    role: string
  }
  subtasks: Array<{
    id: number
    title: string
    assignee: string
  }>
  slackMessages: Array<{
    id: string
    type: 'ai' | 'human'
    author: string
    avatar: string
    content: string | { text: string; details?: string[] }
    timestamp: string
    delay?: number
  }>
  completionMessage: {
    type: string
    content: string
    link?: string
  }
}

const taskConfigs: Record<string, TaskConfig> = {
  'fix-auth-bug': {
    id: 'fix-auth-bug',
    title: 'Fix authentication bug in production',
    ticketId: 'VOL-101',
    description: 'Customer screenshot showing login failure after 2FA',
    agent: {
      name: 'Zoe',
      avatar: 'Z',
      role: 'AI Engineer'
    },
    subtasks: [
      { id: 0, title: 'Fix timezone calculation in JWT handler', assignee: 'Z' },
      { id: 1, title: 'Add unit tests for token expiry edge cases', assignee: 'Z' },
      { id: 2, title: 'Update error messages for better debugging', assignee: 'Z' },
      { id: 3, title: 'Add monitoring for auth failures', assignee: 'Z' },
      { id: 4, title: 'Create migration script for existing sessions', assignee: 'Z' }
    ],
    slackMessages: [
      {
        id: 'msg-1',
        type: 'ai',
        author: 'Zoe',
        avatar: 'Z',
        content: {
          text: `Found it! JWT refresh token expires 2 hours early due to timezone mismatch in auth/jwt-handler.ts:142`,
          details: [
            'Fix timezone calculation in JWT handler',
            'Add unit tests for token expiry edge cases',
            'Update error messages for better debugging',
            'Add monitoring for auth failures'
          ]
        },
        timestamp: '2:34 PM',
        delay: 0
      },
      {
        id: 'msg-2',
        type: 'human',
        author: 'Sarah Chen',
        avatar: 'SC',
        content: 'What about backward compatibility with existing sessions?',
        timestamp: '2:35 PM',
        delay: 500
      },
      {
        id: 'msg-3',
        type: 'ai',
        author: 'Zoe',
        avatar: 'Z',
        content: 'Good catch! I\'ll add a migration script for existing sessions to handle the transition smoothly.',
        timestamp: '2:36 PM',
        delay: 1000
      }
    ],
    completionMessage: {
      type: 'pr',
      content: 'Created PR #1247: Fix JWT timezone bug affecting 2FA users',
      link: '#'
    }
  },
  'refactor': {
    id: 'refactor',
    title: 'Refactor authentication module',
    ticketId: 'VOL-102',
    description: 'Legacy auth code needs modernization',
    agent: {
      name: 'Zoe',
      avatar: 'Z',
      role: 'AI Engineer'
    },
    subtasks: [
      { id: 0, title: 'Extract auth logic into separate service', assignee: 'Z' },
      { id: 1, title: 'Implement OAuth 2.0 flow', assignee: 'Z' },
      { id: 2, title: 'Add refresh token rotation', assignee: 'Z' },
      { id: 3, title: 'Update all API endpoints', assignee: 'Z' }
    ],
    slackMessages: [
      {
        id: 'msg-1',
        type: 'ai',
        author: 'Zoe',
        avatar: 'Z',
        content: {
          text: 'Analyzing authentication module... Found 23 endpoints using legacy auth',
          details: [
            'Extracting auth logic into service layer',
            'Implementing OAuth 2.0 with PKCE',
            'Adding automatic token rotation',
            'Migrating all endpoints to new auth'
          ]
        },
        timestamp: '10:15 AM',
        delay: 0
      },
      {
        id: 'msg-2',
        type: 'human',
        author: 'Mike Thompson',
        avatar: 'MT',
        content: 'Make sure we maintain backward compatibility for mobile apps',
        timestamp: '10:17 AM',
        delay: 800
      },
      {
        id: 'msg-3',
        type: 'ai',
        author: 'Zoe',
        avatar: 'Z',
        content: 'Absolutely! I\'m implementing versioned endpoints - v1 will continue working with deprecation warnings',
        timestamp: '10:18 AM',
        delay: 1200
      }
    ],
    completionMessage: {
      type: 'pr',
      content: 'Created PR #1248: Modernize authentication module with OAuth 2.0',
      link: '#'
    }
  },
  'blog': {
    id: 'blog',
    title: 'Write technical blog post',
    ticketId: 'CONT-201',
    description: 'Q4 product updates announcement',
    agent: {
      name: 'Bella',
      avatar: 'B',
      role: 'AI Content Creator'
    },
    subtasks: [
      { id: 0, title: 'Research Q4 features and user feedback', assignee: 'B' },
      { id: 1, title: 'Create blog outline with key points', assignee: 'B' },
      { id: 2, title: 'Write 1,800 word draft', assignee: 'B' },
      { id: 3, title: 'Add code examples and visuals', assignee: 'B' },
      { id: 4, title: 'SEO optimization for "API automation"', assignee: 'B' }
    ],
    slackMessages: [
      {
        id: 'msg-1',
        type: 'ai',
        author: 'Bella',
        avatar: 'B',
        content: {
          text: 'I\'ve analyzed our Q4 features. Which angle resonates most: technical deep-dive or business value?',
          details: [
            'API performance improvements (60% faster)',
            'New AI code review capabilities',
            'Enterprise SSO integration',
            'Advanced monitoring dashboard',
            'Custom workflow automation'
          ]
        },
        timestamp: '9:30 AM',
        delay: 0
      },
      {
        id: 'msg-2',
        type: 'human',
        author: 'Jessica Liu',
        avatar: 'JL',
        content: 'Business value with technical snippets - targeting CTOs and engineering leads',
        timestamp: '9:32 AM',
        delay: 700
      },
      {
        id: 'msg-3',
        type: 'ai',
        author: 'Bella',
        avatar: 'B',
        content: 'Perfect! Draft ready with ROI calculator section. Flesch reading score: 62 (target range)',
        timestamp: '9:45 AM',
        delay: 1500
      }
    ],
    completionMessage: {
      type: 'published',
      content: 'Published: "5 Ways Our Q4 Updates Slash Development Time by 60%"',
      link: 'blog.volition.ai/q4-updates'
    }
  },
  'prospect': {
    id: 'prospect',
    title: 'Research and qualify leads',
    ticketId: 'SALES-301',
    description: '247 webinar attendees need qualification',
    agent: {
      name: 'Alex',
      avatar: 'A',
      role: 'AI Sales Assistant'
    },
    subtasks: [
      { id: 0, title: 'Import attendee list to HubSpot', assignee: 'A' },
      { id: 1, title: 'Enrich data with Clearbit', assignee: 'A' },
      { id: 2, title: 'Apply BANT scoring criteria', assignee: 'A' },
      { id: 3, title: 'Segment into Hot/Warm/Nurture', assignee: 'A' },
      { id: 4, title: 'Draft personalized outreach', assignee: 'A' }
    ],
    slackMessages: [
      {
        id: 'msg-1',
        type: 'ai',
        author: 'Alex',
        avatar: 'A',
        content: {
          text: 'Found 43 MQLs from webinar: 12 Enterprise, 19 Mid-market, 12 SMB',
          details: [
            'Hot leads (ready to buy): 8',
            'Warm leads (evaluating): 21',
            'Nurture (future potential): 14',
            'Personalized emails drafted for hot leads',
            'Follow-up sequences scheduled'
          ]
        },
        timestamp: '2:15 PM',
        delay: 0
      },
      {
        id: 'msg-2',
        type: 'human',
        author: 'David Park',
        avatar: 'DP',
        content: 'Can you prioritize the Enterprise leads for immediate outreach?',
        timestamp: '2:17 PM',
        delay: 600
      },
      {
        id: 'msg-3',
        type: 'ai',
        author: 'Alex',
        avatar: 'A',
        content: 'Done! Enterprise leads moved to top of queue. First calls scheduled for tomorrow 9 AM',
        timestamp: '2:18 PM',
        delay: 1000
      }
    ],
    completionMessage: {
      type: 'crm',
      content: 'Updated CRM: 43 qualified leads, 8 meetings scheduled',
      link: '#'
    }
  },
  'process': {
    id: 'process',
    title: 'Optimize workflow processes',
    ticketId: 'OPS-401',
    description: 'CI/CD pipeline taking too long',
    agent: {
      name: 'Morgan',
      avatar: 'M',
      role: 'AI Operations Specialist'
    },
    subtasks: [
      { id: 0, title: 'Analyze current build times', assignee: 'M' },
      { id: 1, title: 'Identify bottlenecks in pipeline', assignee: 'M' },
      { id: 2, title: 'Implement parallel test execution', assignee: 'M' },
      { id: 3, title: 'Add caching for dependencies', assignee: 'M' },
      { id: 4, title: 'Set up build time monitoring', assignee: 'M' }
    ],
    slackMessages: [
      {
        id: 'msg-1',
        type: 'ai',
        author: 'Morgan',
        avatar: 'M',
        content: {
          text: 'Found it! Tests running sequentially causing 67% of delay. Can cut build time from 45min to 12min',
          details: [
            'Current average: 45 minutes',
            'After parallelization: 12 minutes',
            'Docker layer caching: -8 minutes',
            'Dependency caching: -5 minutes',
            'Test splitting: -20 minutes'
          ]
        },
        timestamp: '11:20 AM',
        delay: 0
      },
      {
        id: 'msg-2',
        type: 'human',
        author: 'Tom Rodriguez',
        avatar: 'TR',
        content: 'Will this affect our test coverage reporting?',
        timestamp: '11:22 AM',
        delay: 700
      },
      {
        id: 'msg-3',
        type: 'ai',
        author: 'Morgan',
        avatar: 'M',
        content: 'No impact on coverage! I\'m aggregating results from all parallel runs before reporting',
        timestamp: '11:23 AM',
        delay: 1100
      }
    ],
    completionMessage: {
      type: 'deployment',
      content: 'Deployed: CI/CD optimizations live, build time reduced by 73%',
      link: '#'
    }
  }
}

interface InteractiveDemoProps {
  triggerDemo?: boolean
  selectedTask?: string
}

const InteractiveDemo = ({ triggerDemo, selectedTask = 'fix-auth-bug' }: InteractiveDemoProps) => {
  const [demoState, setDemoState] = useState<DemoState>({
    phase: 'idle',
    ticketCreated: false,
    subtasksCreated: false,
    slackNotified: false,
    timeCalculated: false,
  })

  const [showTyping, setShowTyping] = useState(false)
  const [completedSubtasks, setCompletedSubtasks] = useState<number[]>([])
  const [visibleMessages, setVisibleMessages] = useState<string[]>([])
  
  const currentTask = taskConfigs[selectedTask] || taskConfigs['fix-auth-bug']

  // Reset when task changes
  useEffect(() => {
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
  }, [selectedTask])
  
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
    setVisibleMessages([])
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

    // Phase 4: Working phase
    await new Promise(resolve => setTimeout(resolve, 1000))
    setDemoState(prev => ({ ...prev, phase: 'working', timeCalculated: true }))

    // Phase 5: Slack notification (4500ms)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setDemoState(prev => ({ ...prev, phase: 'reviewing', slackNotified: true }))
    
    // Show Slack messages progressively
    for (let i = 0; i < currentTask.slackMessages.length; i++) {
      const message = currentTask.slackMessages[i]
      await new Promise(resolve => setTimeout(resolve, message.delay || 500))
      
      if (i < currentTask.slackMessages.length - 1) {
        setShowTyping(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setShowTyping(false)
      }
      
      setVisibleMessages(prev => [...prev, message.id])
    }

    // Phase 6: Complete (6000ms)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDemoState(prev => ({ ...prev, phase: 'complete' }))

    // Start completing subtasks
    const subtasksToComplete = Math.min(3, currentTask.subtasks.length)
    for (let i = 0; i < subtasksToComplete; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setCompletedSubtasks(prev => [...prev, i])
    }
  }

  const getStatusBadge = () => {
    const { phase } = demoState
    if (phase === 'analyzing') {
      return {
        color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        icon: Circle,
        text: 'Analyzing'
      }
    } else if (phase === 'creating-subtasks' || phase === 'working') {
      return {
        color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        icon: AlertCircle,
        text: 'In Progress'
      }
    } else if (phase === 'reviewing' || phase === 'complete') {
      return {
        color: 'bg-green-500/10 text-green-500 border-green-500/20',
        icon: CheckCircle2,
        text: 'Done'
      }
    }
    return {
      color: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
      icon: Circle,
      text: 'Todo'
    }
  }

  return (
    <section id="demo-section" className="min-h-screen bg-linear-bg-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        <span className="font-mono text-linear-text-secondary text-sm">{currentTask.ticketId}</span>
                        <div className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border",
                          getStatusBadge().color
                        )}>
                          {React.createElement(getStatusBadge().icon, { className: "h-3 w-3" })}
                          {getStatusBadge().text}
                        </div>
                      </div>
                      <MoreHorizontal className="h-4 w-4 text-linear-text-tertiary" />
                    </div>

                    {/* Issue Title */}
                    <h3 className="text-linear-text-primary text-lg font-semibold mb-3">
                      {currentTask.title}
                    </h3>

                    {/* Progress Indicator */}
                    <div className="flex items-center gap-3 text-sm text-linear-text-secondary mb-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{completedSubtasks.length}/{currentTask.subtasks.length}</span>
                      </div>
                      <div className="flex-1 bg-linear-bg-tertiary rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="bg-green-500 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(completedSubtasks.length / currentTask.subtasks.length) * 100}%` }}
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
                            <Avatar.Fallback className="text-white text-[10px] font-bold">{currentTask.agent.avatar}</Avatar.Fallback>
                          </Avatar.Root>
                          <div className="flex-1">
                            <p className="text-linear-text-primary text-sm">
                              <span className="font-medium">{currentTask.agent.name}</span>
                              <span className="text-linear-text-secondary"> is analyzing {currentTask.description}</span>
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
                            <Avatar.Fallback className="text-white text-[10px] font-bold">{currentTask.agent.avatar}</Avatar.Fallback>
                          </Avatar.Root>
                          <div className="flex-1">
                            <p className="text-linear-text-primary text-sm">
                              <span className="font-medium">{currentTask.agent.name}</span>
                              <span className="text-linear-text-secondary"> created {currentTask.subtasks.length} sub-issues</span>
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
                    {currentTask.subtasks.slice(0, 4).map((task, index) => (
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
                    {currentTask.subtasks.length > 4 && (
                      <div className="text-center py-2">
                        <span className="text-linear-text-tertiary text-xs">
                          +{currentTask.subtasks.length - 4} more sub-issues
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
                    {/* Render messages based on visibility */}
                    {currentTask.slackMessages.map((message) => (
                      visibleMessages.includes(message.id) && (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-3"
                        >
                          <Avatar.Root className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center relative",
                            message.type === 'ai' ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-gray-300"
                          )}>
                            <Avatar.Fallback className={cn(
                              "text-sm font-bold",
                              message.type === 'ai' ? "text-white" : "text-gray-700"
                            )}>
                              {message.avatar}
                            </Avatar.Fallback>
                            {message.type === 'ai' && (
                              <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[8px] px-1 rounded">APP</span>
                            )}
                          </Avatar.Root>
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="font-semibold text-gray-900">{message.author}</span>
                              <span className="text-gray-500 text-xs">{message.timestamp}</span>
                            </div>
                            <div className="text-gray-800">
                              {typeof message.content === 'string' ? (
                                <p>{message.content}</p>
                              ) : (
                                <>
                                  <p className="mb-2">
                                    {message.content.text}
                                  </p>
                                  {message.content.details && (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
                                      <p className="text-sm font-medium text-gray-700">Details:</p>
                                      <ul className="text-sm text-gray-600 space-y-1">
                                        {message.content.details.slice(0, 3).map((detail, i) => (
                                          <li key={i}>• {detail}</li>
                                        ))}
                                      </ul>
                                      {message.content.details.length > 3 && (
                                        <p className="text-sm text-gray-500 italic">+{message.content.details.length - 3} more...</p>
                                      )}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )
                    ))}

                    {/* Typing Indicator */}
                    {showTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3"
                      >
                        <Avatar.Root className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center relative">
                          <Avatar.Fallback className="text-white text-sm font-bold">{currentTask.agent.avatar}</Avatar.Fallback>
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

                    {/* Completion Message */}
                    {demoState.phase === 'complete' && currentTask.completionMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-start gap-3"
                      >
                        <Avatar.Root className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center relative">
                          <Avatar.Fallback className="text-white text-sm font-bold">{currentTask.agent.avatar}</Avatar.Fallback>
                          <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[8px] px-1 rounded">APP</span>
                        </Avatar.Root>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{currentTask.agent.name}</span>
                            <span className="text-gray-500 text-xs">Now</span>
                          </div>
                          <div className="text-gray-800">
                            <p className="mb-2">
                              <span className="text-green-600">✅</span> {currentTask.completionMessage.content}
                            </p>
                            {currentTask.completionMessage.type === 'pr' && (
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-md text-sm">
                                <GitPullRequest className="h-4 w-4" />
                                <span>Pull Request Ready</span>
                              </div>
                            )}
                          </div>
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
      </div>
    </section>
  )
}

export default InteractiveDemo