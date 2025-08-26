'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  Circle, 
  CheckCircle2, 
  Hash,
  GitBranch,
  GitPullRequest,
  Code,
  FileText,
  TrendingUp,
  Users as UsersIcon,
  Activity
} from 'lucide-react'
import * as Avatar from '@radix-ui/react-avatar'

interface CompanyActivity {
  id: string
  name: string
  logo: string
  linearActivity: {
    ticket: string
    status: 'todo' | 'in-progress' | 'done'
    title: string
    progress: number
    lastUpdate: string
  }
  slackActivity: {
    channel: string
    lastMessage: {
      author: string
      isAI: boolean
      content: string
      time: string
    }
  }
  aiEmployee: {
    name: string
    avatar: string
    status: 'working' | 'idle' | 'completed'
  }
}

const mockCompanies: CompanyActivity[] = [
  {
    id: '1',
    name: 'TechStart',
    logo: 'TS',
    linearActivity: {
      ticket: 'TS-456',
      status: 'in-progress',
      title: 'Implement payment gateway integration',
      progress: 67,
      lastUpdate: '2 mins ago'
    },
    slackActivity: {
      channel: 'engineering',
      lastMessage: {
        author: 'Alex',
        isAI: true,
        content: 'Successfully integrated Stripe webhooks. Running tests...',
        time: '2:45 PM'
      }
    },
    aiEmployee: {
      name: 'Alex',
      avatar: 'A',
      status: 'working'
    }
  },
  {
    id: '2',
    name: 'DataFlow',
    logo: 'DF',
    linearActivity: {
      ticket: 'DF-789',
      status: 'done',
      title: 'Create analytics dashboard',
      progress: 100,
      lastUpdate: 'Just now'
    },
    slackActivity: {
      channel: 'product',
      lastMessage: {
        author: 'Morgan',
        isAI: true,
        content: 'Dashboard completed! All charts rendering correctly with real-time data.',
        time: '2:48 PM'
      }
    },
    aiEmployee: {
      name: 'Morgan',
      avatar: 'M',
      status: 'completed'
    }
  },
  {
    id: '3',
    name: 'CloudBase',
    logo: 'CB',
    linearActivity: {
      ticket: 'CB-123',
      status: 'in-progress',
      title: 'Optimize database queries',
      progress: 45,
      lastUpdate: '5 mins ago'
    },
    slackActivity: {
      channel: 'backend',
      lastMessage: {
        author: 'Zoe',
        isAI: true,
        content: 'Analyzing query patterns. Found 3 N+1 queries to optimize.',
        time: '2:43 PM'
      }
    },
    aiEmployee: {
      name: 'Zoe',
      avatar: 'Z',
      status: 'working'
    }
  },
  {
    id: '4',
    name: 'MarketPro',
    logo: 'MP',
    linearActivity: {
      ticket: 'MP-567',
      status: 'todo',
      title: 'Write blog post on AI trends',
      progress: 0,
      lastUpdate: '1 min ago'
    },
    slackActivity: {
      channel: 'content',
      lastMessage: {
        author: 'Bella',
        isAI: true,
        content: 'Starting research on latest AI developments for the blog post.',
        time: '2:47 PM'
      }
    },
    aiEmployee: {
      name: 'Bella',
      avatar: 'B',
      status: 'working'
    }
  }
]

const LiveOperationsCenter = () => {
  const [companies, setCompanies] = useState(mockCompanies)
  const [stats, setStats] = useState({
    tasksCompleted: 1247,
    activeEmployees: 42,
    avgCompletionTime: '23 mins',
    successRate: '98.7%'
  })

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCompanies(prev => {
        const updated = [...prev]
        const randomIndex = Math.floor(Math.random() * updated.length)
        const company = updated[randomIndex]
        
        // Update progress
        if (company.linearActivity.progress < 100) {
          company.linearActivity.progress = Math.min(100, company.linearActivity.progress + Math.floor(Math.random() * 20))
          company.linearActivity.lastUpdate = 'Just now'
          
          if (company.linearActivity.progress === 100) {
            company.linearActivity.status = 'done'
            company.aiEmployee.status = 'completed'
          }
        }
        
        return updated
      })

      // Update stats
      setStats(prev => ({
        ...prev,
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 3),
        activeEmployees: 42 + Math.floor(Math.random() * 5) - 2
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'in-progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'done': return 'bg-green-500/10 text-green-500 border-green-500/20'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo': return <Circle className="h-3 w-3" />
      case 'in-progress': return <Activity className="h-3 w-3" />
      case 'done': return <CheckCircle2 className="h-3 w-3" />
      default: return <Circle className="h-3 w-3" />
    }
  }

  return (
    <section className="min-h-screen bg-linear-bg-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Live Operations Center
          </h2>
          <p className="text-linear-text-secondary text-lg max-w-2xl mx-auto">
            Real companies. Real AI employees. Real work happening right now.
          </p>
        </motion.div>

        {/* Company Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-linear-bg-secondary rounded-xl border border-linear-border-subtle overflow-hidden"
            >
              {/* Company Header */}
              <div className="flex items-center justify-between p-4 border-b border-linear-border-subtle">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{company.logo}</span>
                  </div>
                  <div>
                    <span className="text-linear-text-primary font-semibold">{company.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        company.aiEmployee.status === 'working' && "bg-green-500 animate-pulse",
                        company.aiEmployee.status === 'idle' && "bg-yellow-500",
                        company.aiEmployee.status === 'completed' && "bg-blue-500"
                      )} />
                      <span className="text-linear-text-tertiary text-xs">
                        {company.aiEmployee.name} • {company.aiEmployee.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 grid grid-cols-2 gap-4">
                {/* Linear Activity */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="h-4 w-4 text-linear-text-tertiary" />
                    <span className="text-linear-text-secondary text-xs font-medium">Linear</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-linear-text-tertiary text-xs">{company.linearActivity.ticket}</span>
                      <div className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 border",
                        getStatusColor(company.linearActivity.status)
                      )}>
                        {getStatusIcon(company.linearActivity.status)}
                        <span className="capitalize">{company.linearActivity.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <p className="text-linear-text-primary text-xs line-clamp-2">
                      {company.linearActivity.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-linear-bg-tertiary rounded-full h-1.5 overflow-hidden">
                        <motion.div 
                          className="bg-green-500 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${company.linearActivity.progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-linear-text-tertiary text-[10px]">
                        {company.linearActivity.progress}%
                      </span>
                    </div>
                    <span className="text-linear-text-quaternary text-[10px]">
                      Updated {company.linearActivity.lastUpdate}
                    </span>
                  </div>
                </div>

                {/* Slack Activity */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="h-4 w-4 text-linear-text-tertiary" />
                    <span className="text-linear-text-secondary text-xs font-medium">{company.slackActivity.channel}</span>
                  </div>
                  <div className="bg-linear-bg-primary rounded-lg p-2">
                    <div className="flex items-start gap-2">
                      <Avatar.Root className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center flex-shrink-0 relative">
                        <Avatar.Fallback className="text-white text-[8px] font-bold">
                          {company.slackActivity.lastMessage.author[0]}
                        </Avatar.Fallback>
                        {company.slackActivity.lastMessage.isAI && (
                          <span className="absolute -bottom-0.5 -right-0.5 bg-green-500 text-white text-[6px] px-0.5 rounded text-center leading-none">AI</span>
                        )}
                      </Avatar.Root>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1 mb-0.5">
                          <span className="text-linear-text-primary text-[10px] font-medium">
                            {company.slackActivity.lastMessage.author}
                          </span>
                          <span className="text-linear-text-quaternary text-[9px]">
                            {company.slackActivity.lastMessage.time}
                          </span>
                        </div>
                        <p className="text-linear-text-secondary text-[11px] line-clamp-2 break-words">
                          {company.slackActivity.lastMessage.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-bg-secondary rounded-xl border border-linear-border-subtle p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.tasksCompleted.toLocaleString()}
              </div>
              <div className="text-linear-text-tertiary text-sm">Tasks Completed Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.activeEmployees}
              </div>
              <div className="text-linear-text-tertiary text-sm">Active AI Employees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.avgCompletionTime}
              </div>
              <div className="text-linear-text-tertiary text-sm">Avg Completion Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.successRate}
              </div>
              <div className="text-linear-text-tertiary text-sm">Success Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LiveOperationsCenter