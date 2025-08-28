// Dynamic workflow configurations for each AI employee and task
export type TaskCategory = 'engineering' | 'content' | 'sales' | 'operations'
export type EmployeeName = 'Alex' | 'Sophia' | 'Jordan' | 'Quinn'

export interface WorkflowStep {
  id: string
  phase: string
  description: string
  duration: number // in milliseconds
  actions: WorkflowAction[]
  slackMessage?: SlackMessage
  linearUpdate?: LinearUpdate
}

export interface WorkflowAction {
  type: 'analyze' | 'create' | 'update' | 'notify' | 'complete'
  target: 'linear' | 'slack' | 'code' | 'docs' | 'aws' | 'hubspot' | 'datadog'
  content: string
  delay?: number
}

export interface SlackMessage {
  author: EmployeeName | 'user'
  content: string
  timestamp?: string
  attachments?: {
    type: 'code' | 'list' | 'metrics' | 'status'
    content: string[]
  }
  isTyping?: boolean
}

export interface LinearUpdate {
  ticketId: string
  title: string
  status: 'ready' | 'in-progress' | 'done'
  subtasks?: LinearSubtask[]
  progress?: number
  assignee: string
}

export interface LinearSubtask {
  id: string
  title: string
  completed: boolean
}

export interface TaskWorkflow {
  id: string
  category: TaskCategory
  employee: EmployeeName
  title: string
  description: string
  estimatedTime: string
  steps: WorkflowStep[]
}

// Engineering workflows
export const ENGINEERING_WORKFLOWS: TaskWorkflow[] = [
  {
    id: 'fix-auth-bug',
    category: 'engineering',
    employee: 'Alex',
    title: 'Fix the authentication bug in production',
    description: 'Customer screenshot showing login failure after 2FA',
    estimatedTime: '45 minutes',
    steps: [
      {
        id: 'investigation',
        phase: 'Investigation',
        description: 'Analyzing customer screenshot and error patterns',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'linear',
            content: 'Analyzing customer screenshot: "Login failed after 2FA"',
          },
          {
            type: 'analyze',
            target: 'code',
            content: 'Scanning /auth/middleware.ts, /auth/jwt-handler.ts',
            delay: 1000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-101',
          title: 'Fix authentication bug in production',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 10,
        },
      },
      {
        id: 'root-cause',
        phase: 'Root Cause Analysis',
        description: 'Found JWT token refresh logic issue',
        duration: 3000,
        actions: [
          {
            type: 'notify',
            target: 'slack',
            content:
              'Found it! JWT refresh token expires 2 hours early due to timezone mismatch in auth/jwt-handler.ts:142',
          },
        ],
        slackMessage: {
          author: 'Alex',
          content:
            'Found it! JWT refresh token expires 2 hours early due to timezone mismatch in `auth/jwt-handler.ts:142`',
          attachments: {
            type: 'code',
            content: [
              '// Current (buggy) implementation:',
              'const expiryTime = Date.now() + (2 * 60 * 60 * 1000) // 2 hours',
              'const serverTime = new Date().getTime() // Uses local time!',
              '',
              '// Fixed implementation:',
              'const expiryTime = Date.now() + (2 * 60 * 60 * 1000)',
              'const serverTime = Date.now() // Consistent UTC time',
            ],
          },
        },
      },
      {
        id: 'planning',
        phase: 'Planning',
        description: 'Creating subtasks and implementation plan',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'linear',
            content: 'Creating subtasks for comprehensive fix',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-101',
          title: 'Fix authentication bug in production',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 30,
          subtasks: [
            {
              id: 's1',
              title: 'Fix timezone calculation in JWT handler',
              completed: false,
            },
            {
              id: 's2',
              title: 'Add unit tests for token expiry edge cases',
              completed: false,
            },
            {
              id: 's3',
              title: 'Update error messages for better debugging',
              completed: false,
            },
            {
              id: 's4',
              title: 'Add monitoring for auth failures',
              completed: false,
            },
            {
              id: 's5',
              title: 'Migration script for existing sessions',
              completed: false,
            },
          ],
        },
      },
      {
        id: 'review',
        phase: 'Review & Refinement',
        description: 'Incorporating feedback on backward compatibility',
        duration: 3000,
        actions: [
          {
            type: 'update',
            target: 'linear',
            content: 'Adding migration strategy for existing sessions',
          },
        ],
        slackMessage: {
          author: 'user',
          content: 'What about backward compatibility?',
        },
      },
      {
        id: 'implementation',
        phase: 'Implementation',
        description: 'Working through subtasks',
        duration: 6000,
        actions: [
          {
            type: 'update',
            target: 'code',
            content: 'Implementing fixes and tests',
          },
          {
            type: 'create',
            target: 'linear',
            content: 'Creating PR #1247',
            delay: 4000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-101',
          title: 'Fix authentication bug in production',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 80,
          subtasks: [
            {
              id: 's1',
              title: 'Fix timezone calculation in JWT handler',
              completed: true,
            },
            {
              id: 's2',
              title: 'Add unit tests for token expiry edge cases',
              completed: true,
            },
            {
              id: 's3',
              title: 'Update error messages for better debugging',
              completed: true,
            },
            {
              id: 's4',
              title: 'Add monitoring for auth failures',
              completed: false,
            },
            {
              id: 's5',
              title: 'Migration script for existing sessions',
              completed: false,
            },
          ],
        },
      },
      {
        id: 'code-review',
        phase: 'Code Review',
        description: 'PR ready for review',
        duration: 3000,
        actions: [
          {
            type: 'notify',
            target: 'slack',
            content: '@sarah PR #1247 ready for review',
          },
          {
            type: 'complete',
            target: 'linear',
            content: 'Marking as done',
            delay: 2000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-101',
          title: 'Fix authentication bug in production',
          status: 'done',
          assignee: 'ZA',
          progress: 100,
          subtasks: [
            {
              id: 's1',
              title: 'Fix timezone calculation in JWT handler',
              completed: true,
            },
            {
              id: 's2',
              title: 'Add unit tests for token expiry edge cases',
              completed: true,
            },
            {
              id: 's3',
              title: 'Update error messages for better debugging',
              completed: true,
            },
            {
              id: 's4',
              title: 'Add monitoring for auth failures',
              completed: true,
            },
            {
              id: 's5',
              title: 'Migration script for existing sessions',
              completed: true,
            },
          ],
        },
        slackMessage: {
          author: 'Alex',
          content:
            '✅ PR #1247 ready for review - Fix JWT timezone bug affecting 2FA users',
          attachments: {
            type: 'status',
            content: [
              '• Fixed timezone calculation issue',
              '• Added comprehensive tests (100% coverage)',
              '• Included migration script',
              '• Updated monitoring alerts',
              'Time saved: 4 hours',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'payment-api-error',
    category: 'engineering',
    employee: 'Alex',
    title: 'Add error handling to the payment API',
    description:
      'Stripe webhooks are failing silently, causing missed payments',
    estimatedTime: '30 minutes',
    steps: [
      {
        id: 'analysis',
        phase: 'Analysis',
        description: 'Reviewing payment webhook code',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'code',
            content: 'Reviews /api/payments/stripe-webhook.ts',
          },
          {
            type: 'analyze',
            target: 'datadog',
            content: 'Checking error logs in DataDog',
            delay: 1500,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-102',
          title: 'Add error handling to payment API',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 15,
        },
      },
      {
        id: 'strategy',
        phase: 'Strategy Planning',
        description: 'Creating comprehensive error handling plan',
        duration: 3000,
        actions: [
          {
            type: 'notify',
            target: 'slack',
            content:
              'Found 7 unhandled webhook scenarios. Creating comprehensive error handling',
          },
          {
            type: 'create',
            target: 'linear',
            content: 'Creating subtasks for error handling',
            delay: 1000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-102',
          title: 'Add error handling to payment API',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 30,
          subtasks: [
            {
              id: 'p1',
              title: 'Add retry logic with exponential backoff',
              completed: false,
            },
            {
              id: 'p2',
              title: 'Implement webhook signature validation',
              completed: false,
            },
            {
              id: 'p3',
              title: 'Add error queue for failed payments',
              completed: false,
            },
            {
              id: 'p4',
              title: 'Create alerting for payment failures',
              completed: false,
            },
            {
              id: 'p5',
              title: 'Add detailed logging',
              completed: false,
            },
          ],
        },
        slackMessage: {
          author: 'Alex',
          content:
            'Found 7 unhandled webhook scenarios. Creating comprehensive error handling:',
          attachments: {
            type: 'list',
            content: [
              '• Payment intent failed',
              '• Customer card declined',
              '• Subscription canceled',
              '• Invoice payment failed',
              '• Duplicate webhook delivery',
              '• Invalid signature',
              '• Timeout scenarios',
            ],
          },
        },
      },
      {
        id: 'implementation',
        phase: 'Implementation',
        description: 'Implementing error handling logic',
        duration: 6000,
        actions: [
          {
            type: 'update',
            target: 'code',
            content: 'Implementing custom error classes',
          },
          {
            type: 'update',
            target: 'code',
            content: 'Adding retry mechanism: 3 attempts with backoff',
            delay: 2000,
          },
          {
            type: 'create',
            target: 'code',
            content: 'Creating error recovery queue',
            delay: 4000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-102',
          title: 'Add error handling to payment API',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 70,
          subtasks: [
            {
              id: 'p1',
              title: 'Add retry logic with exponential backoff',
              completed: true,
            },
            {
              id: 'p2',
              title: 'Implement webhook signature validation',
              completed: true,
            },
            {
              id: 'p3',
              title: 'Add error queue for failed payments',
              completed: true,
            },
            {
              id: 'p4',
              title: 'Create alerting for payment failures',
              completed: false,
            },
            {
              id: 'p5',
              title: 'Add detailed logging',
              completed: false,
            },
          ],
        },
      },
      {
        id: 'testing',
        phase: 'Testing & Validation',
        description: 'Testing error scenarios',
        duration: 3000,
        actions: [
          {
            type: 'update',
            target: 'code',
            content: 'Writing test cases for each error scenario',
          },
          {
            type: 'update',
            target: 'code',
            content: 'Simulating webhook failures',
            delay: 1500,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-102',
          title: 'Add error handling to payment API',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 90,
          subtasks: [
            {
              id: 'p1',
              title: 'Add retry logic with exponential backoff',
              completed: true,
            },
            {
              id: 'p2',
              title: 'Implement webhook signature validation',
              completed: true,
            },
            {
              id: 'p3',
              title: 'Add error queue for failed payments',
              completed: true,
            },
            {
              id: 'p4',
              title: 'Create alerting for payment failures',
              completed: true,
            },
            {
              id: 'p5',
              title: 'Add detailed logging',
              completed: true,
            },
          ],
        },
      },
      {
        id: 'deployment',
        phase: 'Deployment',
        description: 'Deploying to production',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'linear',
            content: 'Creating PR with comprehensive error handling',
          },
          {
            type: 'create',
            target: 'datadog',
            content: 'Adding monitoring dashboard',
            delay: 1500,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-102',
          title: 'Add error handling to payment API',
          status: 'done',
          assignee: 'ZA',
          progress: 100,
        },
        slackMessage: {
          author: 'Alex',
          content: '✅ Payment API error handling deployed!',
          attachments: {
            type: 'metrics',
            content: [
              'Retry success rate: 94%',
              'Error recovery rate: 100%',
              'Alert response time: <30s',
              'Zero payment data loss',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'unit-tests',
    category: 'engineering',
    employee: 'Alex',
    title: 'Write unit tests for the user service',
    description: 'User service has 0% test coverage, causing production bugs',
    estimatedTime: '40 minutes',
    steps: [
      {
        id: 'coverage-analysis',
        phase: 'Coverage Analysis',
        description: 'Scanning user service for untested methods',
        duration: 2000,
        actions: [
          {
            type: 'analyze',
            target: 'code',
            content: 'Scanning /services/user-service.ts',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-103',
          title: 'Write unit tests for user service',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 10,
        },
      },
      {
        id: 'test-planning',
        phase: 'Test Planning',
        description: 'Creating comprehensive test suite plan',
        duration: 3000,
        actions: [
          {
            type: 'notify',
            target: 'slack',
            content: 'Creating comprehensive test suite. Target: 95% coverage',
          },
          {
            type: 'create',
            target: 'linear',
            content: 'Grouping tests by functionality',
            delay: 1500,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-103',
          title: 'Write unit tests for user service',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 25,
          subtasks: [
            {
              id: 't1',
              title: 'CRUD operations (8 tests)',
              completed: false,
            },
            {
              id: 't2',
              title: 'Authentication (6 tests)',
              completed: false,
            },
            {
              id: 't3',
              title: 'Permissions (5 tests)',
              completed: false,
            },
            {
              id: 't4',
              title: 'Data validation (4 tests)',
              completed: false,
            },
          ],
        },
        slackMessage: {
          author: 'Alex',
          content: 'Creating comprehensive test suite. Target: 95% coverage',
          attachments: {
            type: 'list',
            content: [
              'Identified 23 untested methods',
              'Grouping by functionality:',
              '• CRUD operations (8 tests)',
              '• Authentication (6 tests)',
              '• Permissions (5 tests)',
              '• Data validation (4 tests)',
            ],
          },
        },
      },
      {
        id: 'implementation',
        phase: 'Test Implementation',
        description: 'Writing tests with proper mocking',
        duration: 7000,
        actions: [
          {
            type: 'update',
            target: 'code',
            content: 'Using Jest framework',
          },
          {
            type: 'update',
            target: 'code',
            content: 'Writing tests with proper mocking',
            delay: 2000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-103',
          title: 'Write unit tests for user service',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 60,
          subtasks: [
            {
              id: 't1',
              title: 'CRUD operations (8 tests)',
              completed: true,
            },
            {
              id: 't2',
              title: 'Authentication (6 tests)',
              completed: true,
            },
            {
              id: 't3',
              title: 'Permissions (5 tests)',
              completed: false,
            },
            {
              id: 't4',
              title: 'Data validation (4 tests)',
              completed: false,
            },
          ],
        },
      },
      {
        id: 'edge-cases',
        phase: 'Edge Cases',
        description: 'Adding edge case tests',
        duration: 3000,
        actions: [
          {
            type: 'update',
            target: 'code',
            content: 'Testing error scenarios',
          },
          {
            type: 'update',
            target: 'code',
            content: 'Validating async operations',
            delay: 1500,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-103',
          title: 'Write unit tests for user service',
          status: 'in-progress',
          assignee: 'ZA',
          progress: 85,
          subtasks: [
            {
              id: 't1',
              title: 'CRUD operations (8 tests)',
              completed: true,
            },
            {
              id: 't2',
              title: 'Authentication (6 tests)',
              completed: true,
            },
            {
              id: 't3',
              title: 'Permissions (5 tests)',
              completed: true,
            },
            {
              id: 't4',
              title: 'Data validation (4 tests)',
              completed: true,
            },
          ],
        },
      },
      {
        id: 'review',
        phase: 'Review',
        description: 'Running full test suite',
        duration: 3000,
        actions: [
          {
            type: 'update',
            target: 'code',
            content: 'Running full test suite: All green ✅',
          },
          {
            type: 'complete',
            target: 'linear',
            content: 'Creating PR with 96% coverage',
            delay: 1500,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-103',
          title: 'Write unit tests for user service',
          status: 'done',
          assignee: 'ZA',
          progress: 100,
        },
        slackMessage: {
          author: 'Alex',
          content: '✅ Test suite complete! 23 tests added',
          attachments: {
            type: 'metrics',
            content: [
              'Coverage: 96%',
              'Tests: 23',
              'Assertions: 142',
              'Execution time: 1.2s',
              'All tests passing ✅',
            ],
          },
        },
      },
    ],
  },
]

// Content workflows
export const CONTENT_WORKFLOWS: TaskWorkflow[] = [
  {
    id: 'blog-post',
    category: 'content',
    employee: 'Sophia',
    title: 'Write blog post about Q4 product updates',
    description: 'Q4 launches need announcement blog for 5 new features',
    estimatedTime: '25 minutes',
    steps: [
      {
        id: 'research',
        phase: 'Research',
        description: 'Analyzing product knowledge base',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'docs',
            content: 'Analyzing product knowledge base and user feedback',
          },
          {
            type: 'notify',
            target: 'slack',
            content:
              "I've identified 5 key features. Which angle resonates most: technical deep-dive or business value?",
            delay: 2000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-201',
          title: 'Write blog post about Q4 product updates',
          status: 'in-progress',
          assignee: 'BA',
          progress: 15,
        },
        slackMessage: {
          author: 'Sophia',
          content:
            "I've identified 5 key features. Which angle resonates most: technical deep-dive or business value?",
        },
      },
      {
        id: 'brief',
        phase: 'Brief Creation',
        description: 'Creating content brief',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'docs',
            content: 'Creating brief with target audience and SEO focus',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-201',
          title: 'Write blog post about Q4 product updates',
          status: 'in-progress',
          assignee: 'BA',
          progress: 30,
        },
        slackMessage: {
          author: 'user',
          content: 'Business value with technical snippets',
        },
      },
      {
        id: 'validation',
        phase: 'Reference Validation',
        description: 'Verifying statistics and benchmarks',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'docs',
            content: 'Verifying 12 statistics and benchmarks',
          },
          {
            type: 'update',
            target: 'docs',
            content: 'Correcting 2 outdated references',
            delay: 1500,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-201',
          title: 'Write blog post about Q4 product updates',
          status: 'in-progress',
          assignee: 'BA',
          progress: 45,
        },
      },
      {
        id: 'review',
        phase: 'Review & Refinement',
        description: 'Incorporating feedback',
        duration: 3000,
        actions: [
          {
            type: 'update',
            target: 'docs',
            content: 'Adding ROI calculator section',
          },
        ],
        slackMessage: {
          author: 'user',
          content: 'Add ROI calculator section',
        },
      },
      {
        id: 'generation',
        phase: 'Content Generation',
        description: 'Writing full post',
        duration: 6000,
        actions: [
          {
            type: 'create',
            target: 'docs',
            content: 'Writing post matching brand voice',
          },
          {
            type: 'update',
            target: 'docs',
            content: 'Adding code examples and visuals',
            delay: 3000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-201',
          title: 'Write blog post about Q4 product updates',
          status: 'in-progress',
          assignee: 'BA',
          progress: 75,
        },
      },
      {
        id: 'style-review',
        phase: 'Style Review',
        description: 'Checking brand consistency',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'docs',
            content: 'Checking brand voice consistency',
          },
          {
            type: 'update',
            target: 'docs',
            content: 'Optimizing for SEO',
            delay: 1500,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-201',
          title: 'Write blog post about Q4 product updates',
          status: 'in-progress',
          assignee: 'BA',
          progress: 90,
        },
        slackMessage: {
          author: 'Sophia',
          content: 'Draft complete. Flesch reading score: 62 (target range)',
          attachments: {
            type: 'metrics',
            content: [
              'Word count: 1,800',
              'Reading time: 7 minutes',
              'SEO score: 92/100',
              'Keywords optimized: ✅',
            ],
          },
        },
      },
      {
        id: 'publishing',
        phase: 'Publishing',
        description: 'Publishing to blog',
        duration: 2000,
        actions: [
          {
            type: 'complete',
            target: 'docs',
            content: 'Publishing to blog.volition.ai/q4-updates',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-201',
          title: 'Write blog post about Q4 product updates',
          status: 'done',
          assignee: 'BA',
          progress: 100,
        },
        slackMessage: {
          author: 'Sophia',
          content: '✅ Published: blog.volition.ai/q4-updates',
          attachments: {
            type: 'status',
            content: [
              '3 team approvals received',
              'Final word count: 1,823',
              'Estimated reach: 5,000+ readers',
              'Time saved: 6 hours',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'email-campaign',
    category: 'content',
    employee: 'Sophia',
    title: 'Create email campaign for new feature launch',
    description: 'AI Code Review feature launching next week',
    estimatedTime: '20 minutes',
    steps: [
      {
        id: 'segmentation',
        phase: 'Audience Segmentation',
        description: 'Analyzing customer database',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'hubspot',
            content: 'Analyzing customer database',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-202',
          title: 'Create email campaign for feature launch',
          status: 'in-progress',
          assignee: 'BA',
          progress: 20,
        },
      },
      {
        id: 'strategy',
        phase: 'Campaign Strategy',
        description: 'Creating multi-touch sequence',
        duration: 3000,
        actions: [
          {
            type: 'notify',
            target: 'slack',
            content: 'Creating 3-email sequence for each segment',
          },
          {
            type: 'create',
            target: 'hubspot',
            content: 'Setting up campaign timeline',
            delay: 1500,
          },
        ],
        slackMessage: {
          author: 'Sophia',
          content: 'Creating 3-email sequence for each segment',
          attachments: {
            type: 'list',
            content: [
              'Enterprise: 247 contacts',
              'Startup: 892 contacts',
              'Individual: 1,456 contacts',
              '',
              'Timeline:',
              'Day 1: Announcement',
              'Day 3: Use cases',
              'Day 7: Limited offer',
            ],
          },
        },
        linearUpdate: {
          ticketId: 'VOL-202',
          title: 'Create email campaign for feature launch',
          status: 'in-progress',
          assignee: 'BA',
          progress: 40,
        },
      },
      {
        id: 'creation',
        phase: 'Content Creation',
        description: 'Writing personalized content',
        duration: 6000,
        actions: [
          {
            type: 'create',
            target: 'hubspot',
            content: 'Writing personalized subject lines',
          },
          {
            type: 'create',
            target: 'hubspot',
            content: 'Creating segment-specific content',
            delay: 2000,
          },
          {
            type: 'update',
            target: 'hubspot',
            content: 'Adding CTAs and tracking',
            delay: 4000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-202',
          title: 'Create email campaign for feature launch',
          status: 'in-progress',
          assignee: 'BA',
          progress: 70,
        },
      },
      {
        id: 'testing',
        phase: 'A/B Testing Setup',
        description: 'Configuring test variants',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'hubspot',
            content: 'Creating subject line variants',
          },
          {
            type: 'update',
            target: 'hubspot',
            content: 'Setting up CTA testing',
            delay: 1500,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-202',
          title: 'Create email campaign for feature launch',
          status: 'in-progress',
          assignee: 'BA',
          progress: 85,
        },
      },
      {
        id: 'launch',
        phase: 'Review & Launch',
        description: 'Scheduling campaign',
        duration: 3000,
        actions: [
          {
            type: 'complete',
            target: 'hubspot',
            content: 'Scheduling campaign for launch',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-202',
          title: 'Create email campaign for feature launch',
          status: 'done',
          assignee: 'BA',
          progress: 100,
        },
        slackMessage: {
          author: 'Sophia',
          content: '✅ Email campaign scheduled!',
          attachments: {
            type: 'metrics',
            content: [
              'Total recipients: 2,595',
              'Personalization score: 94%',
              'Predicted open rate: 42%',
              'Predicted CTR: 8.5%',
              'Launch: Tuesday 9 AM EST',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'api-docs',
    category: 'content',
    employee: 'Sophia',
    title: 'Update help documentation for API changes',
    description: 'v2.0 API has 15 breaking changes',
    estimatedTime: '30 minutes',
    steps: [
      {
        id: 'analysis',
        phase: 'Change Analysis',
        description: 'Reviewing API changelog',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'docs',
            content: 'Reviewing API changelog and deprecated methods',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-203',
          title: 'Update API documentation',
          status: 'in-progress',
          assignee: 'BA',
          progress: 20,
        },
      },
      {
        id: 'planning',
        phase: 'Documentation Planning',
        description: 'Creating doc structure',
        duration: 3000,
        actions: [
          {
            type: 'notify',
            target: 'slack',
            content:
              'Found 15 breaking changes, 23 new endpoints. Creating migration guide',
          },
        ],
        slackMessage: {
          author: 'Sophia',
          content:
            'Found 15 breaking changes, 23 new endpoints. Creating migration guide',
          attachments: {
            type: 'list',
            content: [
              'Doc structure:',
              '• Breaking changes guide',
              '• New endpoint reference',
              '• Code migration examples',
              '• FAQ section',
            ],
          },
        },
        linearUpdate: {
          ticketId: 'VOL-203',
          title: 'Update API documentation',
          status: 'in-progress',
          assignee: 'BA',
          progress: 35,
        },
      },
      {
        id: 'update',
        phase: 'Content Update',
        description: 'Updating documentation pages',
        duration: 6000,
        actions: [
          {
            type: 'update',
            target: 'docs',
            content: 'Updating 47 documentation pages',
          },
          {
            type: 'create',
            target: 'docs',
            content: 'Adding code examples in 5 languages',
            delay: 3000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-203',
          title: 'Update API documentation',
          status: 'in-progress',
          assignee: 'BA',
          progress: 70,
        },
      },
      {
        id: 'review',
        phase: 'Technical Review',
        description: 'Engineering validation',
        duration: 3000,
        actions: [
          {
            type: 'update',
            target: 'docs',
            content: 'Engineering team validates accuracy',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-203',
          title: 'Update API documentation',
          status: 'in-progress',
          assignee: 'BA',
          progress: 85,
        },
      },
      {
        id: 'publishing',
        phase: 'Publishing',
        description: 'Deploying documentation',
        duration: 3000,
        actions: [
          {
            type: 'complete',
            target: 'docs',
            content: 'Deploying to docs.volition.ai',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-203',
          title: 'Update API documentation',
          status: 'done',
          assignee: 'BA',
          progress: 100,
        },
        slackMessage: {
          author: 'Sophia',
          content: '✅ API v2.0 documentation live!',
          attachments: {
            type: 'status',
            content: [
              '47 pages updated',
              '15 breaking changes documented',
              '23 new endpoints added',
              'Code examples: 5 languages',
              'Interactive API explorer added',
            ],
          },
        },
      },
    ],
  },
]

// Sales workflows
export const SALES_WORKFLOWS: TaskWorkflow[] = [
  {
    id: 'qualify-leads',
    category: 'sales',
    employee: 'Jordan',
    title: "Qualify leads from yesterday's webinar",
    description: '247 attendees from "AI in DevOps" webinar',
    estimatedTime: '15 minutes',
    steps: [
      {
        id: 'import',
        phase: 'Lead Import',
        description: 'Importing attendee list',
        duration: 2000,
        actions: [
          {
            type: 'update',
            target: 'hubspot',
            content: 'Importing attendee list to HubSpot',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-301',
          title: 'Qualify webinar leads',
          status: 'in-progress',
          assignee: 'AA',
          progress: 20,
        },
      },
      {
        id: 'scoring',
        phase: 'Scoring Analysis',
        description: 'Applying BANT criteria',
        duration: 4000,
        actions: [
          {
            type: 'analyze',
            target: 'hubspot',
            content: 'Applying BANT criteria and lead scoring',
          },
          {
            type: 'notify',
            target: 'slack',
            content: 'Found 43 MQLs: 12 Enterprise, 19 Mid-market, 12 SMB',
            delay: 2500,
          },
        ],
        slackMessage: {
          author: 'Jordan',
          content: 'Found 43 MQLs from webinar analysis',
          attachments: {
            type: 'metrics',
            content: [
              'Total attendees: 247',
              'Qualified leads: 43',
              '• Enterprise: 12',
              '• Mid-market: 19',
              '• SMB: 12',
              'Conversion rate: 17.4%',
            ],
          },
        },
        linearUpdate: {
          ticketId: 'VOL-301',
          title: 'Qualify webinar leads',
          status: 'in-progress',
          assignee: 'AA',
          progress: 45,
        },
      },
      {
        id: 'segmentation',
        phase: 'Segmentation',
        description: 'Creating targeted lists',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'hubspot',
            content: 'Creating segmented lists by temperature',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-301',
          title: 'Qualify webinar leads',
          status: 'in-progress',
          assignee: 'AA',
          progress: 60,
        },
      },
      {
        id: 'outreach',
        phase: 'Personalized Outreach',
        description: 'Drafting personalized emails',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'hubspot',
            content: 'Drafting personalized emails for hot leads',
          },
          {
            type: 'create',
            target: 'hubspot',
            content: 'Scheduling calls for AEs',
            delay: 1500,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-301',
          title: 'Qualify webinar leads',
          status: 'in-progress',
          assignee: 'AA',
          progress: 80,
        },
      },
      {
        id: 'crm-update',
        phase: 'CRM Update',
        description: 'Updating lead scores',
        duration: 3000,
        actions: [
          {
            type: 'update',
            target: 'hubspot',
            content: 'Updating lead scores and follow-up tasks',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-301',
          title: 'Qualify webinar leads',
          status: 'done',
          assignee: 'AA',
          progress: 100,
        },
        slackMessage: {
          author: 'Jordan',
          content: '✅ Webinar leads qualified and assigned!',
          attachments: {
            type: 'status',
            content: [
              'Hot leads: 8 (calls scheduled)',
              'Warm leads: 21 (email sequences)',
              'Nurture: 14 (added to drip)',
              'Next actions created: 43',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'competitor-research',
    category: 'sales',
    employee: 'Jordan',
    title: 'Research competitor pricing for Enterprise deals',
    description: 'Prospect asking for comparison with GitHub Copilot, Tabnine',
    estimatedTime: '20 minutes',
    steps: [
      {
        id: 'collection',
        phase: 'Data Collection',
        description: 'Gathering competitor data',
        duration: 4000,
        actions: [
          {
            type: 'analyze',
            target: 'docs',
            content: 'Scraping competitor pricing pages',
          },
          {
            type: 'analyze',
            target: 'docs',
            content: 'Analyzing feature matrices and G2 comparisons',
            delay: 2000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-302',
          title: 'Competitor pricing research',
          status: 'in-progress',
          assignee: 'AA',
          progress: 30,
        },
      },
      {
        id: 'matrix',
        phase: 'Comparison Matrix',
        description: 'Creating detailed comparison',
        duration: 4000,
        actions: [
          {
            type: 'create',
            target: 'docs',
            content: 'Creating feature and pricing comparison matrix',
          },
          {
            type: 'notify',
            target: 'slack',
            content: 'Cintra offers 40% more value at Enterprise tier',
            delay: 2500,
          },
        ],
        slackMessage: {
          author: 'Jordan',
          content: 'Cintra offers 40% more value at Enterprise tier',
          attachments: {
            type: 'list',
            content: [
              'Key advantages:',
              '• 5 AI employees vs 1 copilot',
              '• Full automation vs suggestions',
              '• Custom workflows included',
              '• 24/7 support vs business hours',
              '• No seat limits vs per-user pricing',
            ],
          },
        },
        linearUpdate: {
          ticketId: 'VOL-302',
          title: 'Competitor pricing research',
          status: 'in-progress',
          assignee: 'AA',
          progress: 55,
        },
      },
      {
        id: 'battle-card',
        phase: 'Battle Card Creation',
        description: 'Building sales battle card',
        duration: 4000,
        actions: [
          {
            type: 'create',
            target: 'docs',
            content: 'Building comprehensive battle card',
          },
          {
            type: 'update',
            target: 'docs',
            content: 'Adding win/loss insights and objection handling',
            delay: 2000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-302',
          title: 'Competitor pricing research',
          status: 'in-progress',
          assignee: 'AA',
          progress: 75,
        },
      },
      {
        id: 'presentation',
        phase: 'Presentation Prep',
        description: 'Creating exec materials',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'docs',
            content: 'Creating exec summary and ROI projections',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-302',
          title: 'Competitor pricing research',
          status: 'in-progress',
          assignee: 'AA',
          progress: 90,
        },
      },
      {
        id: 'delivery',
        phase: 'Delivery',
        description: 'Sharing with sales team',
        duration: 2000,
        actions: [
          {
            type: 'complete',
            target: 'docs',
            content: 'Sharing battle card with sales team',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-302',
          title: 'Competitor pricing research',
          status: 'done',
          assignee: 'AA',
          progress: 100,
        },
        slackMessage: {
          author: 'Jordan',
          content: '✅ Competitive analysis complete!',
          attachments: {
            type: 'status',
            content: [
              'Battle card created',
              'ROI calculator: 287% over 3 years',
              'Win rate vs competitors: 68%',
              'Objection responses: 15 scenarios',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'crm-updates',
    category: 'sales',
    employee: 'Jordan',
    title: 'Update CRM with meeting notes from demos',
    description: '8 demos completed yesterday',
    estimatedTime: '12 minutes',
    steps: [
      {
        id: 'collection',
        phase: 'Note Collection',
        description: 'Gathering meeting notes',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'hubspot',
            content: 'Gathering notes from 8 AEs and transcribing recordings',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-303',
          title: 'Update CRM with demo notes',
          status: 'in-progress',
          assignee: 'AA',
          progress: 25,
        },
      },
      {
        id: 'extraction',
        phase: 'Data Extraction',
        description: 'Extracting key points',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'hubspot',
            content: 'Extracting pain points, features, objections, next steps',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-303',
          title: 'Update CRM with demo notes',
          status: 'in-progress',
          assignee: 'AA',
          progress: 45,
        },
      },
      {
        id: 'updates',
        phase: 'CRM Updates',
        description: 'Updating opportunities',
        duration: 6000,
        actions: [
          {
            type: 'update',
            target: 'hubspot',
            content: 'Updating opportunity stages and summaries',
          },
          {
            type: 'create',
            target: 'hubspot',
            content: 'Setting follow-up tasks and linking collateral',
            delay: 3000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-303',
          title: 'Update CRM with demo notes',
          status: 'in-progress',
          assignee: 'AA',
          progress: 70,
        },
      },
      {
        id: 'actions',
        phase: 'Action Items',
        description: 'Creating follow-up tasks',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'hubspot',
            content: 'Creating 23 follow-up tasks and assigning to team',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-303',
          title: 'Update CRM with demo notes',
          status: 'in-progress',
          assignee: 'AA',
          progress: 85,
        },
      },
      {
        id: 'analytics',
        phase: 'Analytics',
        description: 'Updating pipeline forecast',
        duration: 2000,
        actions: [
          {
            type: 'complete',
            target: 'hubspot',
            content: 'Updating pipeline forecast and identifying trends',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-303',
          title: 'Update CRM with demo notes',
          status: 'done',
          assignee: 'AA',
          progress: 100,
        },
        slackMessage: {
          author: 'Jordan',
          content: '✅ CRM fully updated with demo insights!',
          attachments: {
            type: 'metrics',
            content: [
              'Demos analyzed: 8',
              'Pipeline value: $487K',
              'Avg deal size: $61K',
              'Close probability: 42%',
              'Next actions: 23',
            ],
          },
        },
      },
    ],
  },
]

// Operations workflows
export const OPERATIONS_WORKFLOWS: TaskWorkflow[] = [
  {
    id: 'aws-audit',
    category: 'operations',
    employee: 'Quinn',
    title: 'Audit AWS costs and identify savings',
    description: 'AWS bill increased 40% last month',
    estimatedTime: '25 minutes',
    steps: [
      {
        id: 'analysis',
        phase: 'Cost Analysis',
        description: 'Analyzing AWS Cost Explorer',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'aws',
            content: 'Connecting to AWS Cost Explorer',
          },
          {
            type: 'notify',
            target: 'slack',
            content:
              'Found it! 67% of increase from forgotten dev environments',
            delay: 2000,
          },
        ],
        slackMessage: {
          author: 'Quinn',
          content: 'Found it! 67% of increase from forgotten dev environments',
        },
        linearUpdate: {
          ticketId: 'VOL-401',
          title: 'Audit AWS costs',
          status: 'in-progress',
          assignee: 'MA',
          progress: 25,
        },
      },
      {
        id: 'waste',
        phase: 'Waste Identification',
        description: 'Identifying unused resources',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'aws',
            content: 'Scanning for unused EC2, EBS, and RDS resources',
          },
        ],
        slackMessage: {
          author: 'Quinn',
          content: 'Identified significant waste:',
          attachments: {
            type: 'metrics',
            content: [
              '14 unused EC2 instances: $3,400/month',
              '8 unattached EBS volumes: $890/month',
              'Overprovisioned RDS: $2,100/month',
              'Total waste: $6,390/month',
            ],
          },
        },
        linearUpdate: {
          ticketId: 'VOL-401',
          title: 'Audit AWS costs',
          status: 'in-progress',
          assignee: 'MA',
          progress: 45,
        },
      },
      {
        id: 'plan',
        phase: 'Savings Plan',
        description: 'Creating action plan',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'docs',
            content: 'Creating comprehensive savings plan',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-401',
          title: 'Audit AWS costs',
          status: 'in-progress',
          assignee: 'MA',
          progress: 60,
        },
      },
      {
        id: 'implementation',
        phase: 'Implementation',
        description: 'Terminating unused resources',
        duration: 6000,
        actions: [
          {
            type: 'update',
            target: 'aws',
            content: 'Terminating unused resources',
          },
          {
            type: 'update',
            target: 'aws',
            content: 'Scheduling auto-shutdown for dev environments',
            delay: 2000,
          },
          {
            type: 'create',
            target: 'aws',
            content: 'Implementing tagging strategy',
            delay: 4000,
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-401',
          title: 'Audit AWS costs',
          status: 'in-progress',
          assignee: 'MA',
          progress: 80,
        },
      },
      {
        id: 'monitoring',
        phase: 'Monitoring Setup',
        description: 'Creating cost alerts',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'aws',
            content: 'Creating cost alerts and dashboard',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-401',
          title: 'Audit AWS costs',
          status: 'in-progress',
          assignee: 'MA',
          progress: 90,
        },
      },
      {
        id: 'documentation',
        phase: 'Documentation',
        description: 'Documenting changes',
        duration: 2000,
        actions: [
          {
            type: 'complete',
            target: 'docs',
            content: 'Creating runbook and documenting changes',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-401',
          title: 'Audit AWS costs',
          status: 'done',
          assignee: 'MA',
          progress: 100,
        },
        slackMessage: {
          author: 'Quinn',
          content: '✅ AWS cost optimization complete!',
          attachments: {
            type: 'metrics',
            content: [
              'Monthly savings: $6,390',
              'Annual savings: $76,680',
              'Resources terminated: 22',
              'Auto-shutdown enabled',
              'Cost alerts configured',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'api-monitoring',
    category: 'operations',
    employee: 'Quinn',
    title: 'Set up monitoring alerts for the API',
    description: 'API experiencing intermittent issues',
    estimatedTime: '20 minutes',
    steps: [
      {
        id: 'metrics',
        phase: 'Metrics Definition',
        description: 'Identifying key metrics',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'datadog',
            content: 'Identifying response time, error rate, volume metrics',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-402',
          title: 'Set up API monitoring',
          status: 'in-progress',
          assignee: 'MA',
          progress: 20,
        },
      },
      {
        id: 'configuration',
        phase: 'DataDog Configuration',
        description: 'Setting up monitors',
        duration: 6000,
        actions: [
          {
            type: 'create',
            target: 'datadog',
            content: 'Configuring response time alerts',
          },
          {
            type: 'create',
            target: 'datadog',
            content: 'Setting error rate thresholds',
            delay: 2000,
          },
          {
            type: 'notify',
            target: 'slack',
            content: 'Configured 12 monitors covering all critical paths',
            delay: 4000,
          },
        ],
        slackMessage: {
          author: 'Quinn',
          content: 'Configured 12 monitors covering all critical paths',
          attachments: {
            type: 'list',
            content: [
              'Alert thresholds:',
              '• Response time > 500ms for 5 min',
              '• Error rate > 1% (warning)',
              '• Error rate > 5% (critical)',
              '• Request volume anomaly detection',
            ],
          },
        },
        linearUpdate: {
          ticketId: 'VOL-402',
          title: 'Set up API monitoring',
          status: 'in-progress',
          assignee: 'MA',
          progress: 50,
        },
      },
      {
        id: 'dashboard',
        phase: 'Dashboard Creation',
        description: 'Building monitoring dashboard',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'datadog',
            content: 'Building real-time dashboard with SLO tracking',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-402',
          title: 'Set up API monitoring',
          status: 'in-progress',
          assignee: 'MA',
          progress: 70,
        },
      },
      {
        id: 'routing',
        phase: 'Alert Routing',
        description: 'Configuring PagerDuty',
        duration: 3000,
        actions: [
          {
            type: 'update',
            target: 'datadog',
            content: 'Configuring PagerDuty integration and escalation',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-402',
          title: 'Set up API monitoring',
          status: 'in-progress',
          assignee: 'MA',
          progress: 85,
        },
      },
      {
        id: 'documentation',
        phase: 'Documentation',
        description: 'Creating runbooks',
        duration: 3000,
        actions: [
          {
            type: 'complete',
            target: 'docs',
            content: 'Creating runbook for each alert',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-402',
          title: 'Set up API monitoring',
          status: 'done',
          assignee: 'MA',
          progress: 100,
        },
        slackMessage: {
          author: 'Quinn',
          content: '✅ API monitoring fully configured!',
          attachments: {
            type: 'status',
            content: [
              '12 monitors active',
              'SLO: 99.9% uptime',
              'MTTR target: <5 minutes',
              'Escalation policy set',
              'Runbooks documented',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'deployment-docs',
    category: 'operations',
    employee: 'Quinn',
    title: 'Document the deployment process',
    description: 'New engineers struggling with deployment',
    estimatedTime: '18 minutes',
    steps: [
      {
        id: 'mapping',
        phase: 'Process Mapping',
        description: 'Mapping deployment flow',
        duration: 3000,
        actions: [
          {
            type: 'analyze',
            target: 'docs',
            content: 'Mapping current deployment flow across 5 environments',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-403',
          title: 'Document deployment process',
          status: 'in-progress',
          assignee: 'MA',
          progress: 20,
        },
      },
      {
        id: 'creation',
        phase: 'Documentation Creation',
        description: 'Writing step-by-step guide',
        duration: 6000,
        actions: [
          {
            type: 'create',
            target: 'docs',
            content: 'Writing comprehensive deployment guide',
          },
          {
            type: 'notify',
            target: 'slack',
            content: 'Created 20-page deployment guide with diagrams',
            delay: 4000,
          },
        ],
        slackMessage: {
          author: 'Quinn',
          content: 'Created 20-page deployment guide with diagrams',
          attachments: {
            type: 'list',
            content: [
              'Guide sections:',
              '• Local development setup',
              '• GitHub Actions workflow',
              '• Staging deployment',
              '• Production deployment',
              '• Rollback procedures',
            ],
          },
        },
        linearUpdate: {
          ticketId: 'VOL-403',
          title: 'Document deployment process',
          status: 'in-progress',
          assignee: 'MA',
          progress: 50,
        },
      },
      {
        id: 'automation',
        phase: 'Automation Opportunities',
        description: 'Identifying manual steps',
        duration: 3000,
        actions: [
          {
            type: 'create',
            target: 'code',
            content: 'Creating deployment scripts and validation checks',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-403',
          title: 'Document deployment process',
          status: 'in-progress',
          assignee: 'MA',
          progress: 70,
        },
      },
      {
        id: 'review',
        phase: 'Review & Testing',
        description: 'Team validation',
        duration: 3000,
        actions: [
          {
            type: 'update',
            target: 'docs',
            content: 'Team validates documentation',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-403',
          title: 'Document deployment process',
          status: 'in-progress',
          assignee: 'MA',
          progress: 85,
        },
      },
      {
        id: 'publishing',
        phase: 'Publishing',
        description: 'Publishing to wiki',
        duration: 2000,
        actions: [
          {
            type: 'complete',
            target: 'docs',
            content: 'Publishing to team wiki and scheduling training',
          },
        ],
        linearUpdate: {
          ticketId: 'VOL-403',
          title: 'Document deployment process',
          status: 'done',
          assignee: 'MA',
          progress: 100,
        },
        slackMessage: {
          author: 'Quinn',
          content: '✅ Deployment documentation complete!',
          attachments: {
            type: 'status',
            content: [
              '20-page guide published',
              'Quick reference card created',
              'Training scheduled: Thursday 2PM',
              'Automated 5 manual steps',
              'Onboarding time: 4hr → 30min',
            ],
          },
        },
      },
    ],
  },
]

// Combine all workflows
export const ALL_WORKFLOWS: TaskWorkflow[] = [
  ...ENGINEERING_WORKFLOWS,
  ...CONTENT_WORKFLOWS,
  ...SALES_WORKFLOWS,
  ...OPERATIONS_WORKFLOWS,
]

// Helper function to get workflow by ID
export function getWorkflowById(id: string): TaskWorkflow | undefined {
  return ALL_WORKFLOWS.find((workflow) => workflow.id === id)
}

// Helper function to get workflows by category
export function getWorkflowsByCategory(category: TaskCategory): TaskWorkflow[] {
  return ALL_WORKFLOWS.filter((workflow) => workflow.category === category)
}

// Helper function to get workflows by employee
export function getWorkflowsByEmployee(employee: EmployeeName): TaskWorkflow[] {
  return ALL_WORKFLOWS.filter((workflow) => workflow.employee === employee)
}

// Achievement and leaderboard types
export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
}

export interface LeaderboardEntry {
  employee: string
  avatar: string
  points: number
  tasksToday: number
  streak: number
  topAchievement: Achievement
}
