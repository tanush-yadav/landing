"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  MessageSquare, 
  AlertCircle,
  User,
  Users,
  MoreHorizontal,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Hash,
  Calendar,
  Tag,
  Folder,
  Plus,
  Check
} from 'lucide-react'

type Status = 'todo' | 'ready-to-draft' | 'in-progress' | 'done'
type Priority = 'none' | 'low' | 'medium' | 'high' | 'urgent'

interface LinearDemoProps {
  isPlaying: boolean
}

interface ActivityItem {
  id: number
  user: string
  userInitials: string
  action: 'status_change' | 'assignment' | 'comment' | 'title_change' | 'priority_change'
  content: string
  timestamp: string
  metadata?: {
    from?: string
    to?: string
  }
}

interface SubIssue {
  id: string
  title: string
  completed: boolean
  assignee?: string
  assigneeInitials?: string
  dueDate?: string
  isOverdue?: boolean
}

const statusConfig = {
  'todo': {
    label: 'Todo',
    icon: Circle,
    color: 'text-gray-400',
    bgColor: 'bg-gray-800/50',
    borderColor: 'border-gray-700'
  },
  'ready-to-draft': {
    label: 'Ready to draft',
    icon: Circle,
    iconColor: 'text-yellow-500',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30'
  },
  'in-progress': {
    label: 'In Progress',
    icon: Clock,
    iconColor: 'text-blue-500',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  'done': {
    label: 'Done',
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30'
  }
}

const priorityConfig = {
  'none': { label: 'No priority', color: 'text-gray-400' },
  'low': { label: 'Low', color: 'text-gray-400' },
  'medium': { label: 'Medium', color: 'text-yellow-500' },
  'high': { label: 'High', color: 'text-orange-500' },
  'urgent': { label: 'Urgent', color: 'text-red-500' }
}

export default function LinearDemo({ isPlaying }: LinearDemoProps) {
  const [status, setStatus] = useState<Status>('ready-to-draft')
  const [priority, setPriority] = useState<Priority>('high')
  const [assignee, setAssignee] = useState<string | null>(null)
  const [showAssignAnimation, setShowAssignAnimation] = useState(false)
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [animationStep, setAnimationStep] = useState(0)
  const [showSubIssues, setShowSubIssues] = useState(true)
  const [subIssues, setSubIssues] = useState<SubIssue[]>([
    { id: 'VOL-13-1', title: 'Create logout endpoint', completed: false },
    { id: 'VOL-13-2', title: 'Clear session data', completed: false },
    { id: 'VOL-13-3', title: 'Invalidate JWT tokens', completed: false },
    { id: 'VOL-13-4', title: 'Clear browser localStorage', completed: false },
    { id: 'VOL-13-5', title: 'Redirect to login page', completed: false },
    { id: 'VOL-13-6', title: 'Log security event', completed: false },
    { id: 'VOL-13-7', title: 'Update user activity status', completed: false },
    { id: 'VOL-13-8', title: 'Write integration tests', completed: false, assignee: 'Sarah Chen', assigneeInitials: 'SC', dueDate: '08/21/2025', isOverdue: true },
    { id: 'VOL-13-9', title: 'Update API documentation', completed: false }
  ])
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const steps = [
      () => {
        // Step 1: AI assigns itself
        setShowAssignAnimation(true)
        setTimeout(() => {
          setAssignee('Volition AI')
          setShowAssignAnimation(false)
          setActivities([{
            id: 1,
            user: 'Volition AI',
            userInitials: 'AI',
            action: 'assignment',
            content: 'assigned this to themselves',
            timestamp: 'Just now'
          }])
        }, 800)
      },
      () => {
        // Step 2: Change status to in-progress
        setStatus('in-progress')
        setActivities(prev => [...prev, {
          id: 2,
          user: 'Volition AI',
          userInitials: 'AI',
          action: 'status_change',
          content: 'changed status',
          timestamp: 'Just now',
          metadata: { from: 'Ready to draft', to: 'In Progress' }
        }])
      },
      () => {
        // Step 3: Start completing sub-issues
        const updateSubIssue = (index: number) => {
          setSubIssues(prev => prev.map((issue, i) => 
            i === index ? { ...issue, completed: true } : issue
          ))
          setCompletedCount(prev => prev + 1)
        }
        
        // Complete sub-issues sequentially
        const subIssueTimers = [0, 1, 2, 3, 4].map((index, i) => 
          setTimeout(() => updateSubIssue(index), i * 200)
        )
      },
      () => {
        // Step 4: Add completion comment and mark as done
        setStatus('done')
        setActivities(prev => [...prev, {
          id: 3,
          user: 'Volition AI',
          userInitials: 'AI',
          action: 'comment',
          content: 'Logout route implemented with full session management. PR #487 ready for review.',
          timestamp: 'Just now'
        }])
        
        // Complete remaining sub-issues
        setSubIssues(prev => prev.map(issue => ({ ...issue, completed: true })))
        setCompletedCount(9)
      },
      () => {
        // Reset after delay
        setTimeout(() => {
          setStatus('ready-to-draft')
          setAssignee(null)
          setActivities([])
          setSubIssues(prev => prev.map(issue => ({ ...issue, completed: false })))
          setCompletedCount(0)
          setAnimationStep(0)
        }, 3000)
      }
    ]

    const timer = setTimeout(() => {
      if (animationStep < steps.length) {
        steps[animationStep]()
        setAnimationStep(prev => prev + 1)
      }
    }, animationStep === 0 ? 1000 : animationStep === 3 ? 3000 : 2500)

    return () => clearTimeout(timer)
  }, [animationStep, isPlaying])

  const StatusIcon = statusConfig[status].icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 font-sans"
    >
      {/* Main Container - Dark Linear Theme */}
      <div className="bg-[#1C1D1F] rounded-lg border border-[#363739] overflow-hidden">
        {/* Issue Detail View */}
        <div className="bg-[#2A2B2F]">
          <div className="px-5 py-4">
            {/* Issue Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-[#9CA3AF]">VOL-12</span>
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${statusConfig[status].bgColor} ${statusConfig[status].borderColor}`}>
                    <StatusIcon className={`w-3 h-3 ${statusConfig[status].iconColor || statusConfig[status].color}`} />
                    <span className={`text-xs font-medium ${statusConfig[status].color}`}>
                      {statusConfig[status].label}
                    </span>
                  </div>
                  {priority !== 'none' && (
                    <span className={`text-xs font-medium ${priorityConfig[priority].color}`}>
                      {priorityConfig[priority].label} priority
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  Implement /logout route
                </h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  Create a logout endpoint that properly clears user sessions, invalidates tokens, and redirects to the login page
                </p>
              </div>
              <button className="text-[#6B7280] hover:text-[#9CA3AF] transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Properties Bar */}
            <div className="flex items-center gap-4 pt-3 border-t border-[#363739]">
              {/* Assignee */}
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#6B7280]" />
                <AnimatePresence mode="wait">
                  {showAssignAnimation ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#363739] animate-pulse" />
                      <span className="text-xs text-[#6B7280]">Assigning...</span>
                    </motion.div>
                  ) : assignee ? (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-1.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#667EEA] to-[#764BA2] flex items-center justify-center">
                        <span className="text-white text-[10px] font-semibold">AI</span>
                      </div>
                      <span className="text-xs font-medium text-white">{assignee}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-[#363739] cursor-pointer transition-colors"
                    >
                      <Plus className="w-3 h-3 text-[#6B7280]" />
                      <span className="text-xs text-[#6B7280]">Assignee</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Priority */}
              <button className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-[#363739] transition-colors">
                <AlertCircle className={`w-3.5 h-3.5 ${priorityConfig[priority].color}`} />
                <span className={`text-xs font-medium ${priorityConfig[priority].color}`}>
                  {priorityConfig[priority].label}
                </span>
                <ChevronDown className="w-3 h-3 text-[#6B7280]" />
              </button>

              {/* Labels */}
              <button className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-[#363739] transition-colors">
                <Tag className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className="text-xs text-[#6B7280]">Labels</span>
              </button>

              {/* Project */}
              <button className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-[#363739] transition-colors">
                <Folder className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className="text-xs text-[#6B7280]">Project</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Issues Section */}
        <div className="border-t border-[#363739]">
          <button
            onClick={() => setShowSubIssues(!showSubIssues)}
            className="w-full px-5 py-3 flex items-center justify-between hover:bg-[#2A2B2F] transition-colors"
          >
            <div className="flex items-center gap-2">
              <ChevronRight className={`w-4 h-4 text-[#6B7280] transition-transform ${showSubIssues ? 'rotate-90' : ''}`} />
              <span className="text-sm font-medium text-white">Sub-issues</span>
              <span className="text-xs text-[#6B7280]">{completedCount}/{subIssues.length}</span>
            </div>
          </button>
          
          {showSubIssues && (
            <div className="px-5 pb-3 space-y-1">
              <AnimatePresence>
                {subIssues.map((subIssue, index) => (
                  <motion.div
                    key={subIssue.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-3 p-2 rounded hover:bg-[#363739] transition-colors group"
                  >
                    <button className="flex-shrink-0">
                      {subIssue.completed ? (
                        <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#464749] group-hover:border-[#6B7280] transition-colors" />
                      )}
                    </button>
                    <span className={`text-sm flex-1 ${subIssue.completed ? 'text-[#6B7280] line-through' : 'text-[#E5E7EB]'}`}>
                      {subIssue.title}
                    </span>
                    {subIssue.assignee && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#667EEA] to-[#764BA2] flex items-center justify-center">
                          <span className="text-white text-[10px] font-semibold">{subIssue.assigneeInitials}</span>
                        </div>
                      </div>
                    )}
                    {subIssue.dueDate && (
                      <span className={`text-xs ${subIssue.isOverdue ? 'text-red-500' : 'text-[#6B7280]'}`}>
                        {subIssue.dueDate}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div className="border-t border-[#363739]">
          <div className="px-5 py-3">
            <h4 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Activity</h4>
          </div>
          
          <div className="px-5 pb-4 space-y-3 max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#363739] scrollbar-track-transparent">
            <AnimatePresence>
              {activities.length === 0 ? (
                <div className="text-center py-6 text-[#6B7280] text-sm">
                  No activity yet
                </div>
              ) : (
                activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-3 items-start"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#667EEA] to-[#764BA2] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-[10px] font-semibold">{activity.userInitials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xs font-medium text-white">{activity.user}</span>
                        <span className="text-xs text-[#9CA3AF]">{activity.content}</span>
                        {activity.metadata && (
                          <span className="text-xs text-[#6B7280]">
                            {activity.metadata.from} → {activity.metadata.to}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#6B7280] mt-1">{activity.timestamp}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Status Progress Indicator */}
      <div className="bg-[#1C1D1F] rounded-lg border border-[#363739] p-3">
        <div className="flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 transition-opacity ${status === 'ready-to-draft' ? 'opacity-100' : 'opacity-30'}`}>
            <Circle className="w-4 h-4 text-yellow-500" />
            <span className="text-[#9CA3AF]">Ready</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#464749]" />
          <div className={`flex items-center gap-1.5 transition-opacity ${status === 'in-progress' ? 'opacity-100' : 'opacity-30'}`}>
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-[#9CA3AF]">In Progress</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#464749]" />
          <div className={`flex items-center gap-1.5 transition-opacity ${status === 'done' ? 'opacity-100' : 'opacity-30'}`}>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-[#9CA3AF]">Done</span>
          </div>
        </div>
        {completedCount > 0 && (
          <div className="mt-2">
            <div className="h-1 bg-[#2A2B2F] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / subIssues.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}