import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AgentDetailPage from '@/app/agents/[id]/page'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'junior-engineer' }),
  notFound: jest.fn(),
}))

describe('AgentDetailPage', () => {
  const mockAgent = {
    id: 'junior-engineer',
    name: 'Alex',
    role: 'Junior Engineer',
    status: 'active',
    currentTask: 'Fixing authentication bug in production...',
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
    description: 'Alex is our dedicated junior engineer, specializing in bug fixes, code reviews, and test writing.',
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
  }

  it('should display agent name and role prominently', () => {
    render(<AgentDetailPage />)
    
    expect(screen.getByText('Alex')).toBeInTheDocument()
    expect(screen.getByText('Junior Engineer')).toBeInTheDocument()
  })

  it('should show agent description', () => {
    render(<AgentDetailPage />)
    
    expect(screen.getByText(/dedicated junior engineer/)).toBeInTheDocument()
  })

  it('should display agent statistics', () => {
    render(<AgentDetailPage />)
    
    expect(screen.getByText('147')).toBeInTheDocument()
    expect(screen.getByText('Tasks Completed')).toBeInTheDocument()
    expect(screen.getByText('3.5 mins')).toBeInTheDocument()
    expect(screen.getByText('Avg Time')).toBeInTheDocument()
    expect(screen.getByText('98%')).toBeInTheDocument()
    expect(screen.getByText('Efficiency')).toBeInTheDocument()
  })

  it('should list agent capabilities', () => {
    render(<AgentDetailPage />)
    
    expect(screen.getByText('Capabilities')).toBeInTheDocument()
    expect(screen.getByText(/Code review and pull request analysis/)).toBeInTheDocument()
    expect(screen.getByText(/Unit test creation and maintenance/)).toBeInTheDocument()
    expect(screen.getByText(/Bug identification and fixing/)).toBeInTheDocument()
  })

  it('should show technologies the agent works with', () => {
    render(<AgentDetailPage />)
    
    expect(screen.getByText('Technologies')).toBeInTheDocument()
    expect(screen.getByText('JavaScript/TypeScript')).toBeInTheDocument()
    expect(screen.getByText('React/Next.js')).toBeInTheDocument()
    expect(screen.getByText('Jest/Testing Library')).toBeInTheDocument()
  })

  it('should display recent projects', () => {
    render(<AgentDetailPage />)
    
    expect(screen.getByText('Recent Projects')).toBeInTheDocument()
    expect(screen.getByText('Authentication System Overhaul')).toBeInTheDocument()
    expect(screen.getByText(/Fixed critical security vulnerabilities/)).toBeInTheDocument()
    expect(screen.getByText(/Improved security for 10,000\+ users/)).toBeInTheDocument()
  })

  it('should have a delegate task CTA button', () => {
    render(<AgentDetailPage />)
    
    const delegateButton = screen.getByRole('button', { name: /Delegate Task to Alex/i })
    expect(delegateButton).toBeInTheDocument()
  })

  it('should have a back to team link', () => {
    render(<AgentDetailPage />)
    
    const backLink = screen.getByRole('link', { name: /Back to Team/i })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/agents')
  })

  it('should display agent avatar', () => {
    render(<AgentDetailPage />)
    
    const avatar = screen.getByAltText('Alex - Junior Engineer')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', expect.stringContaining('alex-agent.png'))
  })

  it('should show working status indicator', () => {
    render(<AgentDetailPage />)
    
    expect(screen.getByText('Working')).toBeInTheDocument()
  })
})