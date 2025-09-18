'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { getAgentAvatar } from './agent-avatars'
// import { AgentCardSkeleton } from './agent-card-skeleton'
import {
  Code2,
  FileText,
  TrendingUp,
  Shield,
  Users,
  Calendar,
  Sparkles,
  CheckCircle2,
  Activity,
  Zap,
} from 'lucide-react'
import {
  cn,
  incrementDelegationClickCount,
  redirectToCalIfThresholdMet,
} from '@/lib/utils'

// AI Team Member Data with Avatar Images
const teamMembers = [
  {
    id: 'creator-discovery',
    name: 'Creator Discovery',
    role: 'Find niche creators by spoken content.',
    status: 'active',
    currentTask: 'Surfacing creators who mention “gym routines” this week...',
    icon: Code2,
    avatarUrl: '/images/alex-agent.png',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    avatarGradient: 'from-blue-400/20 via-cyan-400/20 to-blue-500/20',
    stats: {
      hoursSaved: '10+',
      matchesFound: 120,
      precision: 'high',
    },
    activities: [
      'Search by phrases in clips',
      'Filter by category and size',
      'Build targeted lists',
      'Export to outreach',
    ],
  },
  {
    id: 'outreach-agent',
    name: 'Outreach Agent',
    role: 'Personalized outreach at massive scale.',
    status: 'active',
    currentTask: 'Personalizing 1,000 DMs for fitness creators...',
    icon: FileText,
    avatarUrl: '/images/sophia-agent.png',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    avatarGradient: 'from-purple-400/20 via-pink-400/20 to-purple-500/20',
    stats: {
      hoursSaved: '40+',
      messagesSent: '10k',
      replies: '↑',
    },
    activities: [
      'Personalized DM/email copy',
      'Bulk sending with safeguards',
      'Follow-up sequencing',
      'CRM sync',
    ],
  },
  {
    id: 'community-campaigns',
    name: 'Campaigns',
    role: 'Automate retainers, challenges, and contests for your community.',
    status: 'active',
    currentTask: 'Launching “Back to School” creator challenge...',
    icon: TrendingUp,
    avatarUrl: '/images/maya-agent.png',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    avatarGradient: 'from-orange-400/20 via-red-400/20 to-orange-500/20',
    stats: {
      hoursSaved: '30+',
      participants: 500,
      campaigns: 12,
    },
    activities: [
      'Automated invites & rewards',
      'Challenge/contest workflows',
      'Brand-safe guardrails',
      'Performance tracking',
    ],
  },
  {
    id: 'creative-agent',
    name: 'Creative Agent',
    role: 'Analyze videos and auto‑generate briefs.',
    status: 'active',
    currentTask: 'Drafting hook variations from top 10 videos...',
    icon: Shield,
    avatarUrl: '/images/quinn-agent.png',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    avatarGradient: 'from-green-400/20 via-emerald-400/20 to-green-500/20',
    stats: {
      hoursSaved: '25+',
      briefs: 48,
      insights: 120,
    },
    activities: [
      'Pull best-performing clips',
      'Summarize creative insights',
      'Auto-generate briefs',
      'Share with team',
    ],
  },
  {
    id: 'crm-agent',
    name: 'Creator Relationship',
    role: 'Manage and Track creators from samples to GMV.',
    status: 'active',
    currentTask: 'Syncing samples, briefs, and payouts to CRM...',
    icon: Users,
    avatarUrl: '/images/jordan-agent.png',
    gradient: 'from-indigo-500 to-blue-500',
    bgGradient: 'from-indigo-50 to-blue-50',
    avatarGradient: 'from-indigo-400/20 via-blue-400/20 to-indigo-500/20',
    stats: {
      hoursSaved: '35+',
      creators: 1500,
      automations: 24,
    },
    activities: [
      'Unified creator profiles',
      'Sample and brief tracking',
      'Automated follow-ups',
      'GMV reporting',
    ],
  },
  {
    id: 'social-intelligence',
    name: 'Social Intelligence',
    role: 'Monitor brands, creators, and content trends.',
    status: 'active',
    currentTask: 'Monitoring competitors’ top creators and hooks...',
    icon: Calendar,
    avatarUrl: '/images/riley-agent.png',
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50',
    avatarGradient: 'from-violet-400/20 via-purple-400/20 to-violet-500/20',
    stats: {
      hoursSaved: '10+',
      brandsTracked: 80,
      updatesDaily: 'yes',
    },
    activities: [
      'Track winning creators',
      'Spot content trends',
      'Summarize competitor strategies',
      'Share daily nuggets',
    ],
  },
]

// Modern Avatar Component
const AgentAvatar = ({
  member,
  size = 'large',
}: {
  member: (typeof teamMembers)[0]
  size?: 'small' | 'medium' | 'large'
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  // Reset states when member changes
  React.useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [member.id])

  const Icon = member.icon
  const AvatarComponent = getAgentAvatar(member.name.toLowerCase())

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
  }

  const iconSizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
  }

  const avatarSizes = {
    small: 48,
    medium: 64,
    large: 80,
  }

  return (
    <div className="relative group">
      {/* Gradient Background Blur */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl blur-xl opacity-60',
          'bg-gradient-to-br',
          member.avatarGradient,
          'group-hover:opacity-80 transition-opacity duration-300'
        )}
      />

      {/* Avatar Container */}
      <div
        className={cn(
          'relative rounded-2xl overflow-hidden',
          sizeClasses[size],
          'bg-gradient-to-br',
          member.gradient,
          'shadow-xl'
        )}
      >
        {/* Use PNG Image first if available */}
        {!imageError && member.avatarUrl ? (
          <>
            {/* Loading State */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={cn(
                    'animate-pulse bg-gradient-to-br',
                    member.gradient,
                    'opacity-50'
                  )}
                >
                  <Icon
                    className={cn(iconSizeClasses[size], 'text-white/50')}
                  />
                </div>
              </div>
            )}

            {/* Avatar Image */}
            <Image
              src={member.avatarUrl}
              alt={`${member.name} - ${member.role}`}
              fill
              sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
              className={cn(
                'object-cover',
                'transition-all duration-500',
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              )}
              style={{
                objectPosition: '50% 1%',
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />

            {/* Overlay Gradient */}
            {imageLoaded && (
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-t from-black/20 to-transparent',
                  'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                )}
              />
            )}
          </>
        ) : AvatarComponent ? (
          // Fallback to SVG Avatar Component
          <div className="relative w-full h-full flex items-center justify-center bg-white/10">
            <AvatarComponent
              size={avatarSizes[size]}
              className="w-full h-full"
            />

            {/* Overlay Gradient for depth */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl',
                'opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
              )}
            />
          </div>
        ) : (
          // Final fallback to Icon
          <div className="relative w-full h-full flex items-center justify-center">
            <Icon className={cn(iconSizeClasses[size], 'text-white')} />
          </div>
        )}

        {/* Status Dot */}
        {member.status === 'active' && (
          <div className="absolute bottom-0 right-0 p-1">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg" />
              <motion.div
                className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Hover Ring Effect */}
      <motion.div
        className={cn(
          'absolute inset-0 rounded-2xl',
          'ring-2 ring-offset-2 ring-offset-white',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300 pointer-events-none'
        )}
        style={{
          background: `linear-gradient(135deg, transparent 30%, ${
            member.gradient.includes('blue')
              ? 'rgba(59, 130, 246, 0.1)'
              : member.gradient.includes('purple')
              ? 'rgba(147, 51, 234, 0.1)'
              : member.gradient.includes('orange')
              ? 'rgba(251, 146, 60, 0.1)'
              : member.gradient.includes('green')
              ? 'rgba(34, 197, 94, 0.1)'
              : member.gradient.includes('indigo')
              ? 'rgba(99, 102, 241, 0.1)'
              : 'rgba(139, 92, 246, 0.1)'
          } 70%)`,
        }}
      />
    </div>
  )
}

// Typing animation component
const TypingIndicator = () => (
  <div className="flex gap-1 items-center">
    <motion.div
      className="w-1.5 h-1.5 bg-neutral-400 rounded-full"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
    />
    <motion.div
      className="w-1.5 h-1.5 bg-neutral-400 rounded-full"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
    />
    <motion.div
      className="w-1.5 h-1.5 bg-neutral-400 rounded-full"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
    />
  </div>
)

// Team member card component
const TeamMemberCard = ({
  member,
  index,
  onDelegate,
  isAutoDelegating,
}: {
  member: (typeof teamMembers)[0]
  index: number
  onDelegate: (memberId: string) => void
  isAutoDelegating: boolean
}) => {
  const [currentActivity, setCurrentActivity] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % member.activities.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [member.activities.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative group"
    >
      {/* Card Background with Glass Effect */}
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl',
          'bg-white/90 backdrop-blur-md',
          'border border-neutral-200/50',
          'shadow-lg shadow-neutral-100/30',
          'hover:shadow-xl hover:shadow-neutral-200/40',
          'transition-all duration-300'
        )}
      >
        {/* Gradient Background Accent */}
        <div
          className={cn(
            'absolute inset-0 opacity-[0.03] bg-gradient-to-br',
            member.bgGradient
          )}
        />

        {/* Card Content */}
        <div className="relative p-6 space-y-4">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            {/* Avatar and Info */}
            <div className="flex items-start gap-4">
              {/* Modern Avatar Component */}
              <AgentAvatar member={member} size="medium" />

              {/* Name and Role */}
              <div className="flex-1">
                <h3 className="font-semibold font-display text-neutral-900 text-lg flex items-center gap-2">
                  {member.name}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-2">{member.role}</p>
              </div>
            </div>

          </div>

          {/* Current Activity Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Activity className="w-3 h-3" />
              <span>Current Activity</span>
            </div>

            {/* Activity Display with Animation */}
            <div className="relative h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentActivity}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-neutral-700 absolute inset-0"
                >
                  {member.activities[currentActivity]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Typing Indicator */}
            <div className="flex items-center gap-2">
              <TypingIndicator />
              <span className="text-xs text-neutral-400">Processing...</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100">
            {Object.entries(member.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <p className="text-xs text-neutral-400 capitalize">
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .toLowerCase()
                    .replace(/^./, (str) => str.toUpperCase())}
                </p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <motion.button
            onClick={() => {
              const newCount = incrementDelegationClickCount()
              if (redirectToCalIfThresholdMet(newCount)) {
                return
              }
              onDelegate(member.id)
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isAutoDelegating}
            className={cn(
              'w-full py-2.5 px-4 rounded-lg',
              'bg-gradient-to-r text-white font-medium text-sm',
              member.gradient,
              'shadow-md hover:shadow-lg',
              'transition-all duration-200',
              'flex items-center justify-center gap-2',
              isAutoDelegating && 'opacity-75 cursor-not-allowed'
            )}
          >
            <Zap className="w-4 h-4" />
            {isAutoDelegating ? 'Auto-delegating...' : 'Delegate Task'}
          </motion.button>
        </div>

        {/* Hover Effect Border Gradient */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100',
            'bg-gradient-to-br pointer-events-none',
            member.gradient
          )}
          style={{
            background: `linear-gradient(to bottom right, transparent 40%, transparent 60%)`,
            borderImage: `linear-gradient(to bottom right, ${member.gradient}) 1`,
            borderWidth: '2px',
            borderStyle: 'solid',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

// Sample tasks that can be delegated
const availableTasks = [
  'Fix authentication bug in login flow',
  'Write blog post about new product features',
  'Analyze Q4 marketing campaign metrics',
  'Run automated test suite for release',
  'Qualify and follow up with new leads',
  "Organize tomorrow's stakeholder meeting",
]

interface TeamsSectionProps {
  onDelegation?: (task: string) => void
  isDemoRunning?: boolean
  onOpenModal?: () => void
}

export default function TeamsSection({
  onDelegation,
  isDemoRunning,
  onOpenModal,
}: TeamsSectionProps = {}) {
  const [selectedMember, setSelectedMember] = React.useState<string | null>(
    null
  )
  const [selectedTask, setSelectedTask] = React.useState<string | null>(null)
  const [isAutoDelegating, setIsAutoDelegating] = React.useState(false)
  const [countdown, setCountdown] = React.useState<number | null>(null)
  // Keep cards in normal state; disable auto-delegation/dimming by default
  const [hasUserInteracted, setHasUserInteracted] = React.useState(true)
  const [delegationInProgress, setDelegationInProgress] = React.useState(false)
  const countdownRef = React.useRef<number | null>(null)
  const autoDelegateRef = React.useRef<number[]>([])

  // Start countdown after component mounts
  React.useEffect(() => {
    if (!hasUserInteracted && !selectedMember) {
      // Start countdown after a brief delay to ensure component is fully loaded
      const startTimer = window.setTimeout(() => {
        setCountdown(7)
      }, 1000)

      return () => window.clearTimeout(startTimer)
    }
  }, [hasUserInteracted, selectedMember])

  // Handle countdown
  React.useEffect(() => {
    if (countdown !== null && countdown > 0 && !hasUserInteracted) {
      countdownRef.current = window.setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0 && !hasUserInteracted) {
      // Auto-delegate when countdown reaches 0
      handleAutoDelegate()
    }

    return () => {
      if (countdownRef.current) {
        window.clearTimeout(countdownRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, hasUserInteracted])

  // Clean up timers on unmount
  React.useEffect(() => {
    return () => {
      if (countdownRef.current) window.clearTimeout(countdownRef.current)
      autoDelegateRef.current.forEach((id) => window.clearTimeout(id))
      autoDelegateRef.current = []
    }
  }, [])

  const performDelegation = React.useCallback(
    (memberId: string, task: string) => {
      setDelegationInProgress(true)

      // Simulate delegation process
      // Delegating task to team member

      // Trigger the demo through the parent component
      if (onDelegation) {
        onDelegation(task)
      }

      // Reset states after animation; scroll is handled by InteractiveDemoWrapper
      const t3 = window.setTimeout(() => {
        setIsAutoDelegating(false)
        setDelegationInProgress(false)
      }, 2000)
      autoDelegateRef.current.push(t3)
    },
    [onDelegation]
  )

  const handleAutoDelegate = React.useCallback(() => {
    // Don't auto-delegate if demo is already running
    if (isDemoRunning) {
      setCountdown(null)
      return
    }

    setIsAutoDelegating(true)
    setCountdown(null)

    // Step 1: Select a random task
    const randomTask =
      availableTasks[Math.floor(Math.random() * availableTasks.length)]
    setSelectedTask(randomTask)

    // Step 2: After 1 second, select appropriate team member based on task
    const t1 = window.setTimeout(() => {
      // Choose member based on task type (simple matching logic)
      let selectedMemberId = 'junior-engineer' // default

      if (
        randomTask.toLowerCase().includes('blog') ||
        randomTask.toLowerCase().includes('write')
      ) {
        selectedMemberId = 'blog-writer'
      } else if (
        randomTask.toLowerCase().includes('marketing') ||
        randomTask.toLowerCase().includes('campaign')
      ) {
        selectedMemberId = 'marketer'
      } else if (
        randomTask.toLowerCase().includes('test') ||
        randomTask.toLowerCase().includes('automated')
      ) {
        selectedMemberId = 'qa-engineer'
      } else if (
        randomTask.toLowerCase().includes('lead') ||
        randomTask.toLowerCase().includes('sales')
      ) {
        selectedMemberId = 'sales-rep'
      } else if (
        randomTask.toLowerCase().includes('meeting') ||
        randomTask.toLowerCase().includes('organize')
      ) {
        selectedMemberId = 'executive-assistant'
      }

      setSelectedMember(selectedMemberId)

      // Step 3: After another second, trigger delegation
      const t2 = window.setTimeout(() => {
        performDelegation(selectedMemberId, randomTask)
      }, 1000)
      autoDelegateRef.current.push(t2)
    }, 1000)
    autoDelegateRef.current.push(t1)
  }, [isDemoRunning, performDelegation])

  const handleManualDelegate = (memberId: string) => {
    // Don't allow manual delegation if demo is already running
    if (isDemoRunning) {
      return
    }

    // Cancel auto-delegation if user manually selects
    setHasUserInteracted(true)
    setCountdown(null)
    if (countdownRef.current) clearTimeout(countdownRef.current)
    autoDelegateRef.current.forEach(clearTimeout)
    autoDelegateRef.current = []

    // Let user select a task or use a default one
    const task =
      availableTasks[Math.floor(Math.random() * availableTasks.length)]
    setSelectedTask(task)
    setSelectedMember(memberId)

    // Perform delegation
    performDelegation(memberId, task)
    onOpenModal?.()
  }

  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-14 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 via-white to-white pointer-events-none" />

      {/* Floating Orbs for Depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Team of AI agents
            </span>
          </motion.div> */}

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 font-display">
            Meet Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Marketing team
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
            Marketing stupid easy
          </p>

          {/* Auto-delegation countdown */}
          {countdown !== null && !hasUserInteracted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200"
            >
              <Activity className="w-4 h-4 text-orange-600 animate-pulse" />
              <span className="text-sm font-medium text-orange-900">
                Auto-delegating in {countdown} seconds...
              </span>
            </motion.div>
          )}

          {/* Task selection indicator */}
          {selectedTask && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Task: &quot;{selectedTask}&quot;
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Avatar Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-2 sm:gap-4 mb-12"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.05,
                type: 'spring',
                stiffness: 200,
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                zIndex: 10,
                transition: { duration: 0.2 },
              }}
              className="relative"
            >
              <div className="relative">
                <AgentAvatar member={member} size="small" />
                {/* Name tooltip on hover */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-neutral-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                    {member.name}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative"
            >
              {/* Highlight effect for selected member */}
              {selectedMember === member.id && delegationInProgress && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-xl opacity-40 z-0"
                />
              )}

              <div className="relative z-10">
                <TeamMemberCard
                  member={member}
                  index={index}
                  onDelegate={handleManualDelegate}
                  isAutoDelegating={
                    isAutoDelegating && selectedMember === member.id
                  }
                />
              </div>

              {/* Task assignment animation */}
              {selectedMember === member.id &&
                selectedTask &&
                delegationInProgress && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 z-20"
                  >
                    <div className="bg-white rounded-lg shadow-xl border border-blue-200 px-4 py-3 max-w-xs">
                      <div className="flex items-start gap-2">
                        <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-blue-900">
                            Task Assigned!
                          </p>
                          <p className="text-xs text-neutral-700 mt-1">
                            &quot;{selectedTask}&quot;
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Arrow pointing down */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                    </div>
                  </motion.div>
                )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
