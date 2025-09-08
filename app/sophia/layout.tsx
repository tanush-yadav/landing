import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sophia - AI Content Agent | Cintra',
  description: 'Meet Sophia, your AI agent that learns your brain and creates authentic content in your voice. Transform how you create content with AI-powered voice matching.',
  keywords: 'Sophia AI, content agent, AI writing assistant, voice matching, content creation, AI content generator, authentic content, personal AI agent',
  openGraph: {
    title: 'Sophia - Your AI Content Agent',
    description: 'AI agent that learns your brain and creates authentic content in your voice',
    url: 'https://cintra.run/sophia',
    siteName: 'Cintra',
    type: 'website',
    images: [
      {
        url: '/images/sophia-agent.png',
        width: 1200,
        height: 630,
        alt: 'Sophia AI Agent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sophia - Your AI Content Agent',
    description: 'AI agent that learns your brain and creates authentic content in your voice',
    images: ['/images/sophia-agent.png'],
  },
}

export default function SophiaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}