import {
  Code2,
  FileText,
  TrendingUp,
  Shield,
  Users,
  Calendar,
} from 'lucide-react'

export interface AgentData {
  id: string
  name: string
  role: string
  status: 'active' | 'idle'
  currentTask: string
  icon: React.ComponentType<{ className?: string }>
  avatarUrl: string
  gradient: string
  bgGradient: string
  avatarGradient: string
  stats: {
    [key: string]: string | number
  }
  activities: string[]
  description: string
  capabilities: string[]
  technologies: string[]
  recentProjects: {
    title: string
    description: string
    impact: string
    date: string
  }[]
}

export const agentsData: AgentData[] = [
  {
    id: 'junior-engineer',
    name: 'Alex',
    role: 'Junior Engineer',
    status: 'active',
    currentTask: 'Fixing authentication bug in production...',
    icon: Code2,
    avatarUrl: '/images/alex-agent.png',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    avatarGradient: 'from-blue-400/20 via-cyan-400/20 to-blue-500/20',
    stats: {
      tasksCompleted: 147,
      avgTime: '3.5 mins',
      efficiency: '98%',
    },
    activities: [
      'Reviewing pull requests',
      'Writing unit tests',
      'Fixing bugs',
      'Refactoring code',
    ],
    description: 'Alex is our dedicated junior engineer, specializing in bug fixes, code reviews, and test writing. With a focus on code quality and reliability, Alex ensures your codebase stays clean and maintainable.',
    capabilities: [
      'Code review and pull request analysis',
      'Unit test creation and maintenance',
      'Bug identification and fixing',
      'Code refactoring and optimization',
      'Documentation updates',
      'API integration testing'
    ],
    technologies: [
      'JavaScript/TypeScript',
      'React/Next.js',
      'Node.js',
      'Jest/Testing Library',
      'Git/GitHub',
      'REST APIs'
    ],
    recentProjects: [
      {
        title: 'Authentication System Overhaul',
        description: 'Fixed critical security vulnerabilities in login flow',
        impact: 'Improved security for 10,000+ users',
        date: '2 days ago'
      },
      {
        title: 'Test Coverage Improvement',
        description: 'Increased unit test coverage from 65% to 94%',
        impact: 'Reduced bugs in production by 40%',
        date: '1 week ago'
      },
      {
        title: 'API Performance Optimization',
        description: 'Refactored database queries for 3x faster response times',
        impact: 'Reduced average load time by 2.5 seconds',
        date: '2 weeks ago'
      }
    ]
  },
  {
    id: 'blog-writer',
    name: 'Sophia',
    role: 'Blog Writer',
    status: 'active',
    currentTask: 'Creating content for Q1 product launch...',
    icon: FileText,
    avatarUrl: '/images/sophia-agent.png',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    avatarGradient: 'from-purple-400/20 via-pink-400/20 to-purple-500/20',
    stats: {
      articlesWritten: 89,
      avgTime: '4 mins',
      engagement: '4.8★',
    },
    activities: [
      'Writing blog posts',
      'Creating documentation',
      'Email campaigns',
      'Social media content',
    ],
    description: 'Sophia is our creative content specialist, crafting engaging blog posts, documentation, and marketing materials. With expertise in SEO and content strategy, Sophia helps your brand tell its story effectively.',
    capabilities: [
      'Blog post writing and editing',
      'Technical documentation creation',
      'Email newsletter campaigns',
      'Social media content strategy',
      'SEO optimization',
      'Content calendar management'
    ],
    technologies: [
      'Content Management Systems',
      'SEO Tools (Ahrefs, SEMrush)',
      'Markdown/HTML',
      'Google Analytics',
      'Email Marketing Platforms',
      'Social Media Management Tools'
    ],
    recentProjects: [
      {
        title: 'Q4 Content Strategy',
        description: 'Developed and executed content plan resulting in 150% traffic increase',
        impact: '50,000 new visitors in 30 days',
        date: '3 days ago'
      },
      {
        title: 'Product Documentation Overhaul',
        description: 'Rewrote entire documentation library for better clarity',
        impact: 'Reduced support tickets by 35%',
        date: '1 week ago'
      },
      {
        title: 'Viral Blog Series',
        description: 'Created 5-part series on AI automation that went viral',
        impact: '100,000+ reads, 500+ shares',
        date: '2 weeks ago'
      }
    ]
  },
  {
    id: 'marketer',
    name: 'Maya',
    role: 'Marketer',
    status: 'active',
    currentTask: 'Analyzing campaign performance metrics...',
    icon: TrendingUp,
    avatarUrl: '/images/maya-agent.png',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    avatarGradient: 'from-orange-400/20 via-red-400/20 to-orange-500/20',
    stats: {
      campaigns: 52,
      conversion: '+32%',
      reach: '2.4M',
    },
    activities: [
      'Campaign optimization',
      'A/B testing',
      'Audience segmentation',
      'Performance analytics',
    ],
    description: 'Maya is our data-driven marketing expert, specializing in campaign optimization and growth strategies. With advanced analytics capabilities, Maya maximizes your marketing ROI and drives customer acquisition.',
    capabilities: [
      'Campaign strategy and execution',
      'A/B testing and optimization',
      'Customer segmentation',
      'Performance analytics and reporting',
      'Growth hacking strategies',
      'Marketing automation'
    ],
    technologies: [
      'Google Ads/Facebook Ads',
      'Google Analytics 4',
      'HubSpot/Marketo',
      'Segment/Mixpanel',
      'Optimizely/VWO',
      'SQL/Data Studio'
    ],
    recentProjects: [
      {
        title: 'Holiday Campaign Launch',
        description: 'Orchestrated multi-channel campaign with record-breaking results',
        impact: '$500K in revenue generated',
        date: '1 day ago'
      },
      {
        title: 'Conversion Rate Optimization',
        description: 'Improved landing page conversion rate through systematic testing',
        impact: '45% increase in sign-ups',
        date: '5 days ago'
      },
      {
        title: 'Customer Retention Program',
        description: 'Designed automated email sequences for customer retention',
        impact: 'Reduced churn by 28%',
        date: '10 days ago'
      }
    ]
  },
  {
    id: 'qa-engineer',
    name: 'Quinn',
    role: 'QA Engineer',
    status: 'active',
    currentTask: 'Running automated test suite...',
    icon: Shield,
    avatarUrl: '/images/quinn-agent.png',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    avatarGradient: 'from-green-400/20 via-emerald-400/20 to-green-500/20',
    stats: {
      testsRun: 1842,
      coverage: '94%',
      bugsFound: 231,
    },
    activities: [
      'Automated testing',
      'Bug tracking',
      'Performance testing',
      'Security audits',
    ],
    description: 'Quinn is our quality assurance specialist, ensuring your software meets the highest standards. With expertise in automated testing and security audits, Quinn catches bugs before your users do.',
    capabilities: [
      'Automated test suite development',
      'Manual and exploratory testing',
      'Performance and load testing',
      'Security vulnerability scanning',
      'Bug tracking and reporting',
      'Test coverage analysis'
    ],
    technologies: [
      'Selenium/Playwright',
      'Jest/Mocha/Cypress',
      'JMeter/K6',
      'OWASP ZAP',
      'Postman/Newman',
      'Jenkins/GitHub Actions'
    ],
    recentProjects: [
      {
        title: 'E2E Test Automation',
        description: 'Built comprehensive E2E test suite covering all critical paths',
        impact: 'Deployment confidence increased 10x',
        date: '4 days ago'
      },
      {
        title: 'Security Audit',
        description: 'Conducted thorough security review and fixed vulnerabilities',
        impact: 'Achieved SOC 2 compliance',
        date: '1 week ago'
      },
      {
        title: 'Performance Optimization',
        description: 'Identified and resolved critical performance bottlenecks',
        impact: 'Page load time reduced by 60%',
        date: '2 weeks ago'
      }
    ]
  },
  {
    id: 'sales-rep',
    name: 'Jordan',
    role: 'Sales Rep',
    status: 'active',
    currentTask: 'Following up with qualified leads...',
    icon: Users,
    avatarUrl: '/images/jordan-agent.png',
    gradient: 'from-indigo-500 to-blue-500',
    bgGradient: 'from-indigo-50 to-blue-50',
    avatarGradient: 'from-indigo-400/20 via-blue-400/20 to-indigo-500/20',
    stats: {
      dealsClosed: 67,
      pipeline: '$1.2M',
      conversion: '28%',
    },
    activities: [
      'Lead qualification',
      'Demo scheduling',
      'Follow-ups',
      'CRM updates',
    ],
    description: 'Jordan is our sales acceleration expert, managing leads and closing deals with precision. With advanced CRM integration and follow-up automation, Jordan ensures no opportunity is missed.',
    capabilities: [
      'Lead qualification and scoring',
      'Demo scheduling and preparation',
      'Automated follow-up sequences',
      'CRM data management',
      'Pipeline forecasting',
      'Contract and proposal generation'
    ],
    technologies: [
      'Salesforce/HubSpot CRM',
      'Outreach.io/Salesloft',
      'Calendly/Chili Piper',
      'DocuSign/PandaDoc',
      'Gong/Chorus',
      'LinkedIn Sales Navigator'
    ],
    recentProjects: [
      {
        title: 'Enterprise Deal Closure',
        description: 'Successfully closed largest enterprise deal in company history',
        impact: '$250K ARR added',
        date: '2 days ago'
      },
      {
        title: 'Lead Qualification System',
        description: 'Implemented AI-powered lead scoring system',
        impact: '2x improvement in close rate',
        date: '6 days ago'
      },
      {
        title: 'Sales Process Optimization',
        description: 'Streamlined sales cycle from 45 to 21 days',
        impact: 'Revenue velocity increased 50%',
        date: '2 weeks ago'
      }
    ]
  },
  {
    id: 'executive-assistant',
    name: 'Riley',
    role: 'Executive Assistant',
    status: 'active',
    currentTask: "Organizing tomorrow's meeting agenda...",
    icon: Calendar,
    avatarUrl: '/images/riley-agent.png',
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50',
    avatarGradient: 'from-violet-400/20 via-purple-400/20 to-violet-500/20',
    stats: {
      meetings: 124,
      tasks: 892,
      saved: '40h/week',
    },
    activities: [
      'Calendar management',
      'Email triaging',
      'Task prioritization',
      'Meeting prep',
    ],
    description: 'Riley is your intelligent executive assistant, managing calendars, emails, and tasks with exceptional efficiency. With smart prioritization and proactive planning, Riley gives you back hours in your day.',
    capabilities: [
      'Calendar optimization and scheduling',
      'Email management and triaging',
      'Meeting preparation and notes',
      'Task prioritization and delegation',
      'Travel planning and coordination',
      'Document organization'
    ],
    technologies: [
      'Google Workspace/Office 365',
      'Slack/Microsoft Teams',
      'Notion/Asana',
      'Zoom/Google Meet',
      'Expensify/Concur',
      'AI Writing Tools'
    ],
    recentProjects: [
      {
        title: 'Executive Time Optimization',
        description: 'Restructured executive calendar for maximum productivity',
        impact: 'Freed up 15 hours per week',
        date: '1 day ago'
      },
      {
        title: 'Board Meeting Preparation',
        description: 'Compiled comprehensive board packet and presentations',
        impact: 'Most successful board meeting to date',
        date: '4 days ago'
      },
      {
        title: 'Email Automation System',
        description: 'Set up intelligent email filtering and response system',
        impact: 'Inbox zero achieved daily',
        date: '1 week ago'
      }
    ]
  },
]

export const getAgentById = (id: string): AgentData | undefined => {
  return agentsData.find(agent => agent.id === id)
}

export const getAgentByName = (name: string): AgentData | undefined => {
  return agentsData.find(agent => agent.name.toLowerCase() === name.toLowerCase())
}