import { Metadata } from 'next'
import { HeroSection } from '@/components/alex/hero-section'
import { AlexAgentProfile } from '@/types/alex-agent'

// Mock data for Alex agent - in production this would come from an API
const alexProfile: AlexAgentProfile = {
  id: 'alex-001',
  name: 'Alex',
  avatar: '/images/agents/alex.webp',
  tagline: 'Your AI Code Review Assistant',
  description: 'Alex reviews every PR in seconds, catches bugs before they reach production, and ensures code quality 24/7. Never miss a critical issue again.',
  capabilities: [
    {
      id: 'cap-1',
      title: 'Code Review',
      description: 'Automated PR reviews with detailed feedback',
      icon: '🔍',
      category: 'review'
    },
    {
      id: 'cap-2',
      title: 'Bug Detection',
      description: 'Catches potential bugs and security issues',
      icon: '🐛',
      category: 'analysis'
    },
    {
      id: 'cap-3',
      title: 'Style Checking',
      description: 'Ensures consistent code style',
      icon: '✨',
      category: 'review'
    },
    {
      id: 'cap-4',
      title: 'Performance',
      description: 'Identifies performance bottlenecks',
      icon: '⚡',
      category: 'analysis'
    }
  ],
  specializations: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Go'],
  version: '2.0.0',
  status: 'active'
}

export const metadata: Metadata = {
  title: 'Alex - AI Code Review Assistant | Cintra',
  description: 'Meet Alex, your AI code review assistant. Reviews PRs in seconds, catches bugs, ensures code quality, and works 24/7 with your team.',
  keywords: ['AI code review', 'automated PR review', 'code quality', 'bug detection', 'Alex agent'],
  openGraph: {
    title: 'Alex - AI Code Review Assistant',
    description: 'Automated code reviews that never miss a bug. Alex reviews every PR in seconds.',
    images: ['/images/agents/alex-og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex - AI Code Review Assistant',
    description: 'Automated code reviews that never miss a bug.',
    images: ['/images/agents/alex-twitter.png'],
  },
}

export default function AlexAgentPage() {
  const handleOnboard = () => {
    // In production, this would trigger the actual onboarding flow
    console.log('Starting Alex onboarding process...')
  }

  return (
    <main className="min-h-screen">
      <HeroSection 
        profile={alexProfile}
        onOnboardClick={handleOnboard}
        analyticsEnabled={process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'}
      />
      
      {/* Placeholder for additional sections */}
      <section id="onboarding-section" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Simple 2-Step Onboarding</h2>
          <p className="text-gray-600">Get Alex up and running in less than 5 minutes</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Alex vs Junior Developer</h2>
          <p className="text-gray-600">See how Alex compares to traditional code review</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">How Alex Works</h2>
          <p className="text-gray-600">Multiple ways to interact with your AI assistant</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Alex&apos;s Workflow</h2>
          <p className="text-gray-600">See how Alex&apos;s sub-agents work together</p>
        </div>
      </section>
    </main>
  )
}