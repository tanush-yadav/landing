'use client'

import React from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { 
  Code2, 
  FileText, 
  TrendingUp, 
  Shield, 
  Users, 
  Calendar,
  Sparkles,
  Circle,
  CheckCircle2,
  Activity,
  GitBranch,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

// AI Team Member Data
const teamMembers = [
  {
    id: 'junior-engineer',
    name: 'Alex',
    role: 'Junior Engineer',
    status: 'active',
    currentTask: 'Fixing authentication bug in production...',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    stats: {
      tasksCompleted: 147,
      avgTime: '3.5 mins',
      efficiency: '98%'
    },
    activities: [
      'Reviewing pull requests',
      'Writing unit tests',
      'Fixing bugs',
      'Refactoring code'
    ]
  },
  {
    id: 'blog-writer',
    name: 'Sophia',
    role: 'Blog Writer',
    status: 'active',
    currentTask: 'Creating content for Q1 product launch...',
    icon: FileText,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    stats: {
      articlesWritten: 89,
      avgTime: '4 mins',
      engagement: '4.8★'
    },
    activities: [
      'Writing blog posts',
      'Creating documentation',
      'Email campaigns',
      'Social media content'
    ]
  },
  {
    id: 'marketer',
    name: 'Maya',
    role: 'Marketer',
    status: 'active',
    currentTask: 'Analyzing campaign performance metrics...',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    stats: {
      campaigns: 52,
      conversion: '+32%',
      reach: '2.4M'
    },
    activities: [
      'Campaign optimization',
      'A/B testing',
      'Audience segmentation',
      'Performance analytics'
    ]
  },
  {
    id: 'qa-engineer',
    name: 'Quinn',
    role: 'QA Engineer',
    status: 'active',
    currentTask: 'Running automated test suite...',
    icon: Shield,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    stats: {
      testsRun: 1842,
      coverage: '94%',
      bugsFound: 231
    },
    activities: [
      'Automated testing',
      'Bug tracking',
      'Performance testing',
      'Security audits'
    ]
  },
  {
    id: 'sales-rep',
    name: 'Jordan',
    role: 'Sales Rep',
    status: 'active',
    currentTask: 'Following up with qualified leads...',
    icon: Users,
    gradient: 'from-indigo-500 to-blue-500',
    bgGradient: 'from-indigo-50 to-blue-50',
    stats: {
      dealsClosed: 67,
      pipeline: '$1.2M',
      conversion: '28%'
    },
    activities: [
      'Lead qualification',
      'Demo scheduling',
      'Follow-ups',
      'CRM updates'
    ]
  },
  {
    id: 'executive-assistant',
    name: 'Riley',
    role: 'Executive Assistant',
    status: 'active',
    currentTask: 'Organizing tomorrow\'s meeting agenda...',
    icon: Calendar,
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50',
    stats: {
      meetings: 124,
      tasks: 892,
      saved: '40h/week'
    },
    activities: [
      'Calendar management',
      'Email triaging',
      'Task prioritization',
      'Meeting prep'
    ]
  }
]

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

// Status indicator component
const StatusIndicator = ({ status }: { status: string }) => (
  <div className="flex items-center gap-2">
    <div className="relative">
      <motion.div
        className={cn(
          "w-2 h-2 rounded-full",
          status === 'active' ? 'bg-green-500' : 'bg-neutral-300'
        )}
        animate={status === 'active' ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {status === 'active' && (
        <motion.div
          className="absolute inset-0 w-2 h-2 rounded-full bg-green-500"
          animate={{ scale: [1, 2], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
    <span className="text-xs text-neutral-500 font-medium">
      {status === 'active' ? 'Working' : 'Available'}
    </span>
  </div>
)

// Team member card component
const TeamMemberCard = ({ member, index }: { member: typeof teamMembers[0], index: number }) => {
  const Icon = member.icon
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
      <div className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/90 backdrop-blur-md",
        "border border-neutral-200/50",
        "shadow-lg shadow-neutral-100/30",
        "hover:shadow-xl hover:shadow-neutral-200/40",
        "transition-all duration-300"
      )}>
        
        {/* Gradient Background Accent */}
        <div className={cn(
          "absolute inset-0 opacity-[0.03] bg-gradient-to-br",
          member.bgGradient
        )} />

        {/* Card Content */}
        <div className="relative p-6 space-y-4">
          
          {/* Header Section */}
          <div className="flex items-start justify-between">
            {/* Avatar and Info */}
            <div className="flex items-start gap-3">
              {/* Avatar with Gradient */}
              <div className="relative">
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                  member.gradient,
                  "shadow-lg"
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {/* Sparkle Effect */}
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </div>

              {/* Name and Role */}
              <div>
                <h3 className="font-semibold text-neutral-900 text-lg">
                  {member.name}
                </h3>
                <p className="text-sm text-neutral-500">
                  {member.role}
                </p>
              </div>
            </div>

            {/* Status Indicator */}
            <StatusIndicator status={member.status} />
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
            {Object.entries(member.stats).map(([key, value], i) => (
              <div key={key} className="text-center">
                <p className="text-xs text-neutral-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full py-2.5 px-4 rounded-lg",
              "bg-gradient-to-r text-white font-medium text-sm",
              member.gradient,
              "shadow-md hover:shadow-lg",
              "transition-all duration-200",
              "flex items-center justify-center gap-2"
            )}
          >
            <Zap className="w-4 h-4" />
            Delegate Task
          </motion.button>
        </div>

        {/* Hover Effect Border Gradient */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100",
            "bg-gradient-to-br pointer-events-none",
            member.gradient
          )}
          style={{ 
            background: `linear-gradient(to bottom right, transparent 40%, transparent 60%)`,
            borderImage: `linear-gradient(to bottom right, ${member.gradient}) 1`,
            borderWidth: '2px',
            borderStyle: 'solid'
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default function TeamsSection() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              AI-Powered Team
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Meet Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Team Members
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
            Working 24/7 to help you ship faster. Each AI agent specializes in their domain,
            delivering professional-grade work in minutes, not hours.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-neutral-600 mb-6">
            Ready to scale your team with AI?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-200"
          >
            Start Building Your AI Team
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}