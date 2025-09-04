'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ExternalLink, Loader2, BookOpen, TrendingUp, Users, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

// Connection status types (matching IntegrationsGrid pattern)
type ConnectionStatus = 'not_connected' | 'connecting' | 'connected' | 'error'

// Real Substack publications with actual writers and content
const substackPublications = [
  {
    id: 'morning-brew',
    name: 'Morning Brew',
    author: 'Morning Brew Team',
    url: 'https://morningbrew.com',
    icon: TrendingUp,
    description: 'Business news made enjoyable',
    color: '#FF6B35',
    category: 'Business',
    subscribers: '4M+',
    preview: `"The business world is complex, but it doesn't have to be complicated. We break down the biggest stories in business, tech, and finance into witty, easily digestible content that helps you start your day smarter."`,
    sampleTitle: 'The AI race heats up as tech giants battle for dominance',
    writingStyle: 'Conversational, witty, data-driven'
  },
  {
    id: 'the-hustle',
    name: 'The Hustle',
    author: 'The Hustle Team',
    url: 'https://thehustle.co',
    icon: Users,
    description: 'Stories behind trending business, tech, and culture',
    color: '#2D8CFF',
    category: 'Business',
    subscribers: '2M+',
    preview: `"We dig into the stories behind the headlines. Why did that startup raise $100M? What's the real story behind that viral TikTok trend? We find the interesting angles others miss."`,
    sampleTitle: 'How a college dropout built a $2B empire selling fidget spinners',
    writingStyle: 'Investigative, story-driven, accessible'
  },
  {
    id: 'stratechery',
    name: 'Stratechery',
    author: 'Ben Thompson',
    url: 'https://stratechery.com',
    icon: BookOpen,
    description: 'Analysis of tech strategy and platforms',
    color: '#6366F1',
    category: 'Technology',
    subscribers: '100K+',
    preview: `"Technology is reshaping every industry, but understanding why requires more than just tracking the news. I analyze the strategy behind tech companies' moves and what it means for the future of business."`,
    sampleTitle: 'The End of the Beginning: Apple\'s AI Strategy',
    writingStyle: 'Deep analysis, strategic thinking, first principles'
  },
  {
    id: 'platformer',
    name: 'Platformer',
    author: 'Casey Newton',
    url: 'https://platformer.news',
    icon: Mail,
    description: 'Democracy, free speech, and the future of the internet',
    color: '#00D4AA',
    category: 'Technology',
    subscribers: '50K+',
    preview: `"The internet is where democracy lives or dies in the 21st century. I cover the platforms that shape our discourse, the policies that govern them, and the people fighting for our digital rights."`,
    sampleTitle: 'Inside Twitter\'s transformation into X: A platform in crisis',
    writingStyle: 'Investigative journalism, policy-focused, accessible'
  },
  {
    id: 'money-stuff',
    name: 'Money Stuff',
    author: 'Matt Levine',
    url: 'https://bloomberg.com/opinion/authors/levine-matt',
    icon: TrendingUp,
    description: 'Finance explained with humor and insight',
    color: '#FF4785',
    category: 'Finance',
    subscribers: '200K+',
    preview: `"Finance is weird and complicated, but it's also deeply human. I try to explain what's happening in markets, why people make the decisions they do, and why finance is simultaneously very important and pretty absurd."`,
    sampleTitle: 'Crypto Is Having a Normal One',
    writingStyle: 'Witty, educational, insider perspective'
  },
  {
    id: 'heather-cox-richardson',
    name: 'Letters from an American',
    author: 'Heather Cox Richardson',
    url: 'https://heathercoxrichardson.substack.com',
    icon: BookOpen,
    description: 'Daily historical perspective on current events',
    color: '#8B5CF6',
    category: 'Politics',
    subscribers: '1M+',
    preview: `"To understand today's politics, we need to understand how we got here. Every day, I connect current events to the deeper currents of American history, showing how the present moment fits into our longer story."`,
    sampleTitle: 'The Historical Echoes of Today\'s Political Moment',
    writingStyle: 'Historical context, thoughtful analysis, educational'
  },
]

interface WhatYouConsumeProps {
  onUpdate?: (key: string, value: any) => void
  data?: any
  setSophiaMessage?: (message: string) => void
}

export default function WhatYouConsume({
  onUpdate,
  data,
  setSophiaMessage,
}: WhatYouConsumeProps) {
  const [selectedPublications, setSelectedPublications] = useState<string[]>(
    data?.selectedPublications || []
  )

  // Track connection states for each publication (matching IntegrationsGrid pattern)
  const [connectionStates, setConnectionStates] = useState<
    Record<string, ConnectionStatus>
  >({})
  const [hoveredPublication, setHoveredPublication] = useState<string | null>(
    null
  )
  const [selectedPreview, setSelectedPreview] = useState<typeof substackPublications[0] | null>(null)

  useEffect(() => {
    if (setSophiaMessage) {
      setSophiaMessage(
        'Click on any newsletter to connect and learn from their writing style'
      )
    }
  }, [setSophiaMessage])

  // Handle publication connection (matching IntegrationsGrid logic)
  const handlePublicationClick = async (
    publication: (typeof substackPublications)[0]
  ) => {
    const currentStatus = connectionStates[publication.id] || 'not_connected'

    // If already connected, disconnect
    if (currentStatus === 'connected') {
      setConnectionStates((prev) => ({
        ...prev,
        [publication.id]: 'not_connected',
      }))

      const updated = selectedPublications.filter((p) => p !== publication.id)
      setSelectedPublications(updated)

      if (onUpdate) {
        onUpdate('selectedPublications', updated)
      }

      if (setSophiaMessage) {
        setSophiaMessage(`Disconnected from ${publication.name}`)
      }
      return
    }

    // Start connection process
    setConnectionStates((prev) => ({
      ...prev,
      [publication.id]: 'connecting',
    }))

    if (setSophiaMessage) {
      setSophiaMessage(`Connecting to ${publication.name}...`)
    }

    // Simulate connection delay (replace with actual connection logic)
    setTimeout(() => {
      setConnectionStates((prev) => ({
        ...prev,
        [publication.id]: 'connected',
      }))

      const updated = [...selectedPublications, publication.id]
      setSelectedPublications(updated)

      if (onUpdate) {
        onUpdate('selectedPublications', updated)
      }

      if (setSophiaMessage) {
        const connectedCount = updated.length
        setSophiaMessage(
          `Successfully connected to ${publication.name}! ${connectedCount} ${
            connectedCount === 1 ? 'newsletter' : 'newsletters'
          } connected.`
        )
      }
    }, 1500)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Clean Header matching IntegrationsGrid */}
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-medium text-slate-900">
          What content inspires you?
        </h2>
        <p className="font-body text-base text-slate-500">
          Select Substack newsletters to learn your writing preferences and discover your unique voice.
        </p>
      </div>

      {/* Minimal Status matching IntegrationsGrid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-body text-sm text-slate-500">
            {selectedPublications.length} of {substackPublications.length} connected
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              Subscribe
            </span>
          </div>
        </div>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{
              width: `${
                (selectedPublications.length / substackPublications.length) * 100
              }%`,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Publications Grid (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {substackPublications.map((publication) => {
              const Icon = publication.icon
              const isConnected = connectionStates[publication.id] === 'connected'
              const isConnecting = connectionStates[publication.id] === 'connecting'
              const isHovered = hoveredPublication === publication.id

              return (
                <motion.div
                  key={publication.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: substackPublications.indexOf(publication) * 0.05,
                  }}
                  onMouseEnter={() => {
                    setHoveredPublication(publication.id)
                    setSelectedPreview(publication)
                  }}
                  onMouseLeave={() => setHoveredPublication(null)}
                >
                  <button
                    onClick={() => handlePublicationClick(publication)}
                    disabled={isConnecting}
                    className={cn(
                      'relative w-full p-6 bg-white rounded-lg border text-left transition-all duration-150 group',
                      isConnected
                        ? 'border-blue-500 shadow-sm'
                        : isConnecting
                        ? 'border-slate-300 cursor-wait'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm',
                      'cursor-pointer'
                    )}
                    title={
                      isConnected
                        ? `Connected. Click to disconnect`
                        : `Click to connect to ${publication.name}`
                    }
                  >
                    {/* Connection Status Indicator */}
                    <div className="absolute top-6 right-6">
                      <AnimatePresence mode="wait">
                        {isConnecting ? (
                          <motion.div
                            key="connecting"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                          </motion.div>
                        ) : isConnected ? (
                          <motion.div
                            key="connected"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="not-connected"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="w-4 h-4 text-slate-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Card Content */}
                    <div className="space-y-3">
                      {/* Icon with connection state */}
                      <div className="relative">
                        {Icon && (
                          <Icon
                            className={cn(
                              'w-8 h-8 transition-all duration-150',
                              isConnecting && 'opacity-50'
                            )}
                            style={{
                              color: isConnected ? publication.color : '#94a3b8',
                            }}
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className="space-y-1">
                        <h3 className="font-display text-base font-medium text-slate-900 flex items-center gap-2">
                          {publication.name}
                          {isConnected && (
                            <span className="text-xs font-body font-normal text-green-600">
                              Connected
                            </span>
                          )}
                        </h3>
                        <p className="font-body text-sm text-slate-600">
                          By {publication.author}
                        </p>
                        <p className="font-body text-sm text-slate-500">
                          {publication.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="px-2 py-1 bg-slate-100 rounded-full">
                            {publication.category}
                          </span>
                          <span>{publication.subscribers} subscribers</span>
                        </div>
                        {/* Helper text on hover */}
                        <AnimatePresence>
                          {isHovered && !isConnected && !isConnecting && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.15 }}
                              className="font-body text-xs text-slate-400"
                            >
                              Click to connect and learn from their style
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Preview Panel (1/3 width) */}
        <div className="lg:col-span-1">
          <h3 className="font-display text-lg font-medium text-slate-900 mb-4">Writing Preview</h3>
          <div className="sticky top-6">
            <AnimatePresence mode="wait">
              {selectedPreview ? (
                <motion.div
                  key={selectedPreview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg p-6 border border-slate-200 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <selectedPreview.icon
                      className="w-8 h-8"
                      style={{ color: selectedPreview.color }}
                    />
                    <div>
                      <h4 className="font-display text-base font-medium text-slate-900">
                        {selectedPreview.name}
                      </h4>
                      <p className="font-body text-sm text-slate-600">
                        By {selectedPreview.author}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <BookOpen className="w-4 h-4 text-slate-400 mb-2" />
                      <p className="font-body text-sm text-slate-700 italic">
                        {selectedPreview.preview}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-body text-xs font-medium text-slate-600 uppercase tracking-wide">
                        Sample Title
                      </h5>
                      <p className="font-body text-sm text-slate-900">
                        "{selectedPreview.sampleTitle}"
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-body text-xs font-medium text-slate-600 uppercase tracking-wide">
                        Writing Style
                      </h5>
                      <p className="font-body text-sm text-slate-700">
                        {selectedPreview.writingStyle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-50 rounded-lg p-6 border-2 border-dashed border-slate-300 text-center space-y-3"
                >
                  <BookOpen className="w-12 h-12 mx-auto text-slate-400" />
                  <div>
                    <h4 className="font-display text-base font-medium text-slate-600">
                      Preview Content
                    </h4>
                    <p className="font-body text-sm text-slate-500">
                      Hover over a newsletter to preview their writing style
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer matching IntegrationsGrid */}
      <div className="pt-6 border-t border-slate-100 space-y-3">
        <div className="flex items-start gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </div>
            <span>Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            <span>Connecting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-slate-300" />
            <span>Not connected</span>
          </div>
        </div>
        <p className="font-body text-xs text-slate-500 leading-relaxed">
          Connect to newsletters to analyze their writing style and voice. This helps Sophia understand your content preferences and develop your unique writing voice.{' '}
          <a
            href="/privacy"
            className="text-slate-600 hover:text-slate-900 transition-colors duration-150 underline underline-offset-2"
          >
            View our privacy policy
          </a>
        </p>
      </div>
    </div>
  )
}