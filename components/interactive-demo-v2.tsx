'use client'

import { useState, useEffect, useCallback } from 'react'
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
  Play,
  RefreshCw,
  Pause,
  SkipForward,
  Sparkles,
  Code,
  FileText,
  DollarSign,
  Settings
} from 'lucide-react'
import * as Avatar from '@radix-ui/react-avatar'
import * as Tabs from '@radix-ui/react-tabs'
import { 
  GamificationUI,
  PointsAnimation,
  Leaderboard,
  AchievementBadge,
  StreakIndicator
} from './gamification'
import {
  getWorkflowById,
  LEADERBOARD,
  type TaskWorkflow,
  type WorkflowStep,
  type LinearSubtask,
  type SlackMessage,
  type Achievement,
  ENGINEERING_WORKFLOWS,
  CONTENT_WORKFLOWS,
  SALES_WORKFLOWS,
  OPERATIONS_WORKFLOWS
} from '@/lib/demo-workflows'

interface DemoState {
  isPlaying: boolean
  isPaused: boolean
  currentWorkflow: TaskWorkflow | null
  currentStepIndex: number
  currentStep: WorkflowStep | null
  completedSteps: string[]
  completedSubtasks: string[]
  points: number
  xp: number
  streak: number
  achievements: Achievement[]
  timeSaved: number // in minutes
  slackMessages: SlackMessage[]
}

const INITIAL_STATE: DemoState = {
  isPlaying: false,
  isPaused: false,
  currentWorkflow: null,
  currentStepIndex: -1,
  currentStep: null,
  completedSteps: [],
  completedSubtasks: [],
  points: 0,
  xp: 0,
  streak: 0,
  achievements: [],
  timeSaved: 0,
  slackMessages: [],
}

export default function InteractiveDemoV2() {
  const [selectedCategory, setSelectedCategory] = useState<'engineering' | 'content' | 'sales' | 'operations'>('engineering')
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [demoState, setDemoState] = useState<DemoState>(INITIAL_STATE)
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null)
  const [showPoints, setShowPoints] = useState<{ points: number; id: string } | null>(null)
  const [showTyping, setShowTyping] = useState(false)

  // Get workflows for selected category
  const workflows = {
    engineering: ENGINEERING_WORKFLOWS,
    content: CONTENT_WORKFLOWS,
    sales: SALES_WORKFLOWS,
    operations: OPERATIONS_WORKFLOWS,
  }[selectedCategory]

  // Category icons and colors
  const categoryConfig = {
    engineering: {
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      employee: 'Zoe',
      avatar: 'Z',
    },
    content: {
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      employee: 'Bella',
      avatar: 'B',
    },
    sales: {
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      employee: 'Alex',
      avatar: 'A',
    },
    operations: {
      icon: Settings,
      color: 'from-orange-500 to-red-500',
      employee: 'Morgan',
      avatar: 'M',
    },
  }

  // Start demo for selected task
  const startDemo = useCallback((workflowId: string) => {
    const workflow = getWorkflowById(workflowId)
    if (!workflow) return

    setDemoState({
      ...INITIAL_STATE,
      isPlaying: true,
      currentWorkflow: workflow,
      currentStepIndex: 0,
      currentStep: workflow.steps[0],
    })
  }, [])

  // Process current step
  useEffect(() => {
    if (!demoState.isPlaying || demoState.isPaused || !demoState.currentStep) return

    const step = demoState.currentStep
    const timeout = setTimeout(async () => {
      // Add points
      setDemoState(prev => ({
        ...prev,
        points: prev.points + step.points,
        xp: prev.xp + Math.floor(step.points * 0.7),
      }))

      // Show points animation
      setShowPoints({ points: step.points, id: step.id })
      setTimeout(() => setShowPoints(null), 1500)

      // Show achievement if any
      if (step.achievement) {
        setShowAchievement(step.achievement)
        setDemoState(prev => ({
          ...prev,
          achievements: [...prev.achievements, step.achievement!],
        }))
        setTimeout(() => setShowAchievement(null), 3000)
      }

      // Add Slack message if any
      if (step.slackMessage) {
        setShowTyping(true)
        setTimeout(() => {
          setShowTyping(false)
          setDemoState(prev => ({
            ...prev,
            slackMessages: [...prev.slackMessages, step.slackMessage!],
          }))
        }, 1500)
      }

      // Mark step as completed
      setDemoState(prev => ({
        ...prev,
        completedSteps: [...prev.completedSteps, step.id],
      }))

      // Move to next step
      if (demoState.currentWorkflow && demoState.currentStepIndex < demoState.currentWorkflow.steps.length - 1) {
        const nextIndex = demoState.currentStepIndex + 1
        setDemoState(prev => ({
          ...prev,
          currentStepIndex: nextIndex,
          currentStep: prev.currentWorkflow!.steps[nextIndex],
        }))

        // Update streak
        if (nextIndex % 3 === 0) {
          setDemoState(prev => ({
            ...prev,
            streak: prev.streak + 1,
          }))
        }
      } else {
        // Demo complete
        completeDemo()
      }
    }, step.duration)

    return () => clearTimeout(timeout)
  }, [demoState.isPlaying, demoState.isPaused, demoState.currentStep, demoState.currentStepIndex])

  // Complete demo
  const completeDemo = () => {
    if (!demoState.currentWorkflow) return

    const finalScore = demoState.currentWorkflow.finalScore
    setDemoState(prev => ({
      ...prev,
      isPlaying: false,
      points: prev.points + finalScore.points,
      timeSaved: prev.timeSaved + parseInt(finalScore.timeSaved),
    }))

    // Show completion message
    const completionMessage: SlackMessage = {
      author: demoState.currentWorkflow.employee,
      content: `Task complete! ${finalScore.timeSaved} saved, ${finalScore.points} points earned! 🎉`,
    }
    setDemoState(prev => ({
      ...prev,
      slackMessages: [...prev.slackMessages, completionMessage],
    }))
  }

  // Control functions
  const pauseDemo = () => {
    setDemoState(prev => ({ ...prev, isPaused: !prev.isPaused }))
  }

  const resetDemo = () => {
    setDemoState(INITIAL_STATE)
    setSelectedTask(null)
  }

  const skipStep = () => {
    if (!demoState.currentWorkflow || demoState.currentStepIndex >= demoState.currentWorkflow.steps.length - 1) {
      return
    }

    const nextIndex = demoState.currentStepIndex + 1
    setDemoState(prev => ({
      ...prev,
      currentStepIndex: nextIndex,
      currentStep: prev.currentWorkflow!.steps[nextIndex],
    }))
  }

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
            Watch AI Employees Complete Real Work
          </h2>
          <p className="text-linear-text-secondary text-lg max-w-2xl mx-auto">
            Choose a task and watch our AI employees autonomously complete it with gamified progress tracking
          </p>
        </motion.div>

        {/* Task Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Tabs.Root value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
            <Tabs.List className="flex items-center justify-center gap-2 mb-6">
              {Object.entries(categoryConfig).map(([key, config]) => {
                const Icon = config.icon
                return (
                  <Tabs.Trigger
                    key={key}
                    value={key}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                      "hover:bg-linear-bg-secondary",
                      selectedCategory === key 
                        ? "bg-linear-bg-secondary border border-linear-border-default text-white"
                        : "text-linear-text-secondary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="capitalize">{key}</span>
                    <div className={cn(
                      "w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold",
                      config.color
                    )}>
                      {config.avatar}
                    </div>
                  </Tabs.Trigger>
                )
              })}
            </Tabs.List>

            {/* Task Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {workflows.map((workflow) => (
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedTask(workflow.id)}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all",
                    "hover:bg-linear-bg-secondary",
                    selectedTask === workflow.id
                      ? "bg-linear-bg-secondary border-purple-500/50"
                      : "bg-linear-bg-primary/50 border-linear-border-subtle"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-linear-text-primary line-clamp-2">
                      {workflow.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-linear-text-tertiary">
                      <Clock className="h-3 w-3" />
                      {workflow.estimatedTime}
                    </div>
                  </div>
                  <p className="text-xs text-linear-text-secondary mb-3 line-clamp-2">
                    {workflow.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-linear-text-secondary">
                        {workflow.totalPoints} pts
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        startDemo(workflow.id)
                      }}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-md transition-colors flex items-center gap-1"
                    >
                      <Play className="h-3 w-3" />
                      Start
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Tabs.Root>
        </motion.div>

        {/* Demo Controls */}
        {demoState.isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <button
              onClick={pauseDemo}
              className="p-2 bg-linear-bg-secondary border border-linear-border-subtle rounded-lg hover:bg-linear-bg-tertiary transition-colors"
            >
              {demoState.isPaused ? <Play className="h-4 w-4 text-white" /> : <Pause className="h-4 w-4 text-white" />}
            </button>
            <button
              onClick={skipStep}
              className="p-2 bg-linear-bg-secondary border border-linear-border-subtle rounded-lg hover:bg-linear-bg-tertiary transition-colors"
            >
              <SkipForward className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={resetDemo}
              className="p-2 bg-linear-bg-secondary border border-linear-border-subtle rounded-lg hover:bg-linear-bg-tertiary transition-colors"
            >
              <RefreshCw className="h-4 w-4 text-white" />
            </button>
          </motion.div>
        )}

        {/* Gamification UI */}
        {demoState.currentWorkflow && (
          <GamificationUI
            points={demoState.points}
            xp={demoState.xp}
            maxXp={1000}
            streak={demoState.streak}
            achievements={demoState.achievements}
            timeSaved={`${demoState.timeSaved}h`}
            showAchievement={showAchievement}
          />
        )}

        {/* Main Demo Area */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Linear Demo */}
          <div className="lg:col-span-2 space-y-6">
            <LinearDemo 
              workflow={demoState.currentWorkflow}
              currentStep={demoState.currentStep}
              completedSteps={demoState.completedSteps}
              completedSubtasks={demoState.completedSubtasks}
            />
            
            {/* Slack Demo */}
            <SlackDemo
              messages={demoState.slackMessages}
              showTyping={showTyping}
              currentEmployee={demoState.currentWorkflow?.employee}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Steps */}
            {demoState.currentWorkflow && (
              <ProgressSteps
                steps={demoState.currentWorkflow.steps}
                currentStepIndex={demoState.currentStepIndex}
                completedSteps={demoState.completedSteps}
              />
            )}

            {/* Leaderboard */}
            <Leaderboard
              entries={LEADERBOARD}
              currentEmployee={demoState.currentWorkflow?.employee}
              compact
            />

            {/* Achievements */}
            {demoState.achievements.length > 0 && (
              <div className="bg-linear-bg-secondary border border-linear-border-subtle rounded-lg p-4">
                <h3 className="text-sm font-semibold text-linear-text-primary mb-3">
                  Achievements Earned
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {demoState.achievements.map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                      compact
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Points Animation Overlay */}
        <AnimatePresence>
          {showPoints && (
            <PointsAnimation
              points={showPoints.points}
              x={window.innerWidth / 2}
              y={window.innerHeight / 2}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Linear Demo Component
function LinearDemo({ 
  workflow, 
  currentStep, 
  completedSteps, 
  completedSubtasks 
}: {
  workflow: TaskWorkflow | null
  currentStep: WorkflowStep | null
  completedSteps: string[]
  completedSubtasks: string[]
}) {
  if (!workflow) {
    return (
      <div className="bg-linear-bg-secondary rounded-xl border border-linear-border-subtle p-12">
        <div className="text-center text-linear-text-secondary">
          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Select a task to see the demo</p>
        </div>
      </div>
    )
  }

  const linearUpdate = currentStep?.linearUpdate
  const isComplete = completedSteps.includes(workflow.steps[workflow.steps.length - 1].id)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
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
        {linearUpdate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            {/* Issue Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-linear-text-secondary text-sm">
                  {linearUpdate.ticketId}
                </span>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                  linearUpdate.status === 'ready' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                  linearUpdate.status === 'in-progress' && "bg-blue-500/10 text-blue-500 border border-blue-500/20",
                  linearUpdate.status === 'done' && "bg-green-500/10 text-green-500 border border-green-500/20"
                )}>
                  {linearUpdate.status === 'ready' && (
                    <>
                      <Circle className="h-3 w-3" />
                      Ready to draft
                    </>
                  )}
                  {linearUpdate.status === 'in-progress' && (
                    <>
                      <AlertCircle className="h-3 w-3" />
                      In Progress
                    </>
                  )}
                  {linearUpdate.status === 'done' && (
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
              {linearUpdate.title}
            </h3>

            {/* Progress Indicator */}
            {linearUpdate.progress !== undefined && (
              <div className="flex items-center gap-3 text-sm text-linear-text-secondary mb-4">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{linearUpdate.progress}%</span>
                </div>
                <div className="flex-1 bg-linear-bg-tertiary rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${linearUpdate.progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Subtasks */}
            {linearUpdate.subtasks && linearUpdate.subtasks.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <ChevronRight className="h-4 w-4 text-linear-text-tertiary" />
                  <span className="text-linear-text-secondary text-sm font-medium">Sub-issues</span>
                </div>
                {linearUpdate.subtasks.slice(0, 4).map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border transition-all",
                      task.completed
                        ? "bg-green-500/5 border-green-500/20"
                        : "bg-linear-bg-primary border-linear-border-subtle hover:bg-linear-bg-tertiary"
                    )}
                  >
                    <div className="flex items-center justify-center w-4 h-4">
                      {task.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-linear-text-tertiary" />
                      )}
                    </div>
                    <span className={cn(
                      "flex-1 text-sm",
                      task.completed
                        ? "text-linear-text-tertiary line-through"
                        : "text-linear-text-primary"
                    )}>
                      {task.title}
                    </span>
                    {task.points && (
                      <span className="text-xs text-linear-text-tertiary">
                        +{task.points} pts
                      </span>
                    )}
                  </motion.div>
                ))}
                {linearUpdate.subtasks.length > 4 && (
                  <div className="text-center py-2">
                    <span className="text-linear-text-tertiary text-xs">
                      +{linearUpdate.subtasks.length - 4} more sub-issues
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Activity Feed */}
            {currentStep && (
              <div className="mt-4 pt-4 border-t border-linear-border-subtle">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3"
                >
                  <Avatar.Root className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Avatar.Fallback className="text-white text-[10px] font-bold">
                      {linearUpdate.assignee}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <div className="flex-1">
                    <p className="text-linear-text-primary text-sm">
                      <span className="font-medium">{workflow.employee}</span>
                      <span className="text-linear-text-secondary"> {currentStep.description}</span>
                    </p>
                    <span className="text-linear-text-tertiary text-xs">Just now</span>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Slack Demo Component
function SlackDemo({ 
  messages, 
  showTyping, 
  currentEmployee 
}: {
  messages: SlackMessage[]
  showTyping: boolean
  currentEmployee?: string
}) {
  const getAvatarColor = (author: string) => {
    switch (author) {
      case 'Zoe': return 'from-purple-500 to-pink-500'
      case 'Bella': return 'from-blue-500 to-cyan-500'
      case 'Alex': return 'from-green-500 to-emerald-500'
      case 'Morgan': return 'from-orange-500 to-red-500'
      default: return ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
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
      <div className="p-6 bg-white min-h-[300px] max-h-[400px] overflow-y-auto">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <div className="flex items-start gap-3">
                {message.author === 'user' ? (
                  <Avatar.Root className="w-9 h-9 bg-gray-300 rounded-lg flex items-center justify-center">
                    <Avatar.Fallback className="text-gray-700 text-sm font-bold">JD</Avatar.Fallback>
                  </Avatar.Root>
                ) : (
                  <Avatar.Root className={cn(
                    "w-9 h-9 bg-gradient-to-br rounded-lg flex items-center justify-center relative",
                    getAvatarColor(message.author)
                  )}>
                    <Avatar.Fallback className="text-white text-sm font-bold">
                      {message.author[0]}
                    </Avatar.Fallback>
                    <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[8px] px-1 rounded">APP</span>
                  </Avatar.Root>
                )}
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {message.author === 'user' ? 'John Doe' : message.author}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {message.timestamp || '2:34 PM'}
                    </span>
                  </div>
                  <div className="text-gray-800">
                    <p>{message.content}</p>
                    {message.attachments && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2 space-y-1">
                        {message.attachments.content.map((line, i) => (
                          <p key={i} className={cn(
                            "text-sm",
                            message.attachments?.type === 'code' 
                              ? "font-mono text-xs" 
                              : "text-gray-600"
                          )}>
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {showTyping && currentEmployee && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3"
            >
              <Avatar.Root className={cn(
                "w-9 h-9 bg-gradient-to-br rounded-lg flex items-center justify-center relative",
                getAvatarColor(currentEmployee)
              )}>
                <Avatar.Fallback className="text-white text-sm font-bold">
                  {currentEmployee[0]}
                </Avatar.Fallback>
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
        </AnimatePresence>

        {/* Empty State */}
        {messages.length === 0 && !showTyping && (
          <div className="flex items-center justify-center h-[250px] text-gray-400">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Waiting for updates...</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Progress Steps Component
function ProgressSteps({ 
  steps, 
  currentStepIndex, 
  completedSteps 
}: {
  steps: WorkflowStep[]
  currentStepIndex: number
  completedSteps: string[]
}) {
  return (
    <div className="bg-linear-bg-secondary border border-linear-border-subtle rounded-lg p-4">
      <h3 className="text-sm font-semibold text-linear-text-primary mb-3">
        Workflow Progress
      </h3>
      <div className="space-y-2">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = index === currentStepIndex
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-all",
                isCurrent && "bg-purple-500/10 border border-purple-500/20",
                isCompleted && !isCurrent && "opacity-60"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                isCompleted ? "bg-green-500 text-white" : 
                isCurrent ? "bg-purple-500 text-white" :
                "bg-linear-bg-tertiary text-linear-text-tertiary"
              )}>
                {isCompleted ? '✓' : index + 1}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-linear-text-primary">
                  {step.phase}
                </p>
                <p className="text-xs text-linear-text-secondary">
                  +{step.points} pts
                </p>
              </div>
              {isCurrent && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-purple-500 rounded-full"
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Import necessary icons at the top
import { Trophy } from 'lucide-react'