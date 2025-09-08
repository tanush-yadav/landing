'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  ExternalLink,
  Loader2,
  Twitter,
  Linkedin,
  Github,
  Globe,
  MessageSquare,
  Video,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Connection status types (matching IntegrationsGrid pattern)
type ConnectionStatus = 'not_connected' | 'connecting' | 'connected' | 'error'

// Social platform examples with real platforms
const socialPlatforms = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    description: 'Professional networking and thought leadership',
    color: '#0077B5',
    category: 'Professional',
    audience: 'Professionals & B2B',
    preview: `"Share insights about your industry expertise, connect with like-minded professionals, and build your thought leadership presence. LinkedIn is perfect for business-focused content and professional networking."`,
    sampleTitle:
      'The Future of Remote Work: Insights from 5 Years of Experience',
    contentStyle: 'Professional, insightful, industry-focused, authoritative',
    toneElements: [
      'Expertise',
      'Leadership',
      'Industry Insights',
      'Networking',
    ],
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: Twitter,
    description: 'Real-time conversations and quick insights',
    color: '#1DA1F2',
    category: 'Microblogging',
    audience: 'Diverse & Global',
    preview: `"Engage in real-time conversations, share quick insights, and participate in trending topics. Twitter is ideal for timely commentary, brief thoughts, and connecting with a global audience."`,
    sampleTitle:
      "Just shipped our new feature! Here's what I learned about user feedback...",
    contentStyle: 'Conversational, timely, concise, engaging',
    toneElements: ['Real-time', 'Conversational', 'Trending', 'Quick insights'],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Video,
    description: 'Educational and entertainment video content',
    color: '#FF0000',
    category: 'Video',
    audience: 'Visual Learners',
    preview: `"Create educational content, tutorials, and engaging videos that help your audience learn and grow. YouTube is perfect for in-depth explanations and visual storytelling."`,
    sampleTitle: 'How I Built a SaaS Product in 30 Days: Complete Walkthrough',
    contentStyle: 'Educational, visual, in-depth, storytelling',
    toneElements: ['Educational', 'Visual', 'Tutorials', 'Storytelling'],
  },
]

interface SocialPresenceProps {
  onUpdate?: (key: string, value: unknown) => void
  data?: Record<string, unknown>
  setSophiaMessage?: (message: string) => void
}

export default function SocialPresence({
  onUpdate,
  data,
  setSophiaMessage,
}: SocialPresenceProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    (data?.selectedPlatforms as string[]) || []
  )

  // Track connection states for each platform (matching IntegrationsGrid pattern)
  const [connectionStates, setConnectionStates] = useState<
    Record<string, ConnectionStatus>
  >({})
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null)
  const [selectedPreview, setSelectedPreview] = useState<
    (typeof socialPlatforms)[0] | null
  >(null)

  useEffect(() => {
    if (setSophiaMessage) {
      setSophiaMessage(
        'Connect your social platforms so I can learn your communication style across channels'
      )
    }
  }, [setSophiaMessage])

  // Handle platform connection (matching IntegrationsGrid logic)
  const handlePlatformClick = async (platform: (typeof socialPlatforms)[0]) => {
    const currentStatus = connectionStates[platform.id] || 'not_connected'

    // If already connected, disconnect
    if (currentStatus === 'connected') {
      setConnectionStates((prev) => ({
        ...prev,
        [platform.id]: 'not_connected',
      }))

      const updated = selectedPlatforms.filter((p) => p !== platform.id)
      setSelectedPlatforms(updated)

      if (onUpdate) {
        onUpdate('selectedPlatforms', updated)
      }

      if (setSophiaMessage) {
        setSophiaMessage(`Disconnected from ${platform.name}`)
      }
      return
    }

    // Start connection process
    setConnectionStates((prev) => ({
      ...prev,
      [platform.id]: 'connecting',
    }))

    if (setSophiaMessage) {
      setSophiaMessage(`Connecting to ${platform.name}...`)
    }

    // Simulate connection delay (replace with actual connection logic)
    setTimeout(() => {
      setConnectionStates((prev) => ({
        ...prev,
        [platform.id]: 'connected',
      }))

      const updated = [...selectedPlatforms, platform.id]
      setSelectedPlatforms(updated)

      if (onUpdate) {
        onUpdate('selectedPlatforms', updated)
      }

      if (setSophiaMessage) {
        const connectedCount = updated.length
        setSophiaMessage(
          `Successfully connected to ${platform.name}! ${connectedCount} ${
            connectedCount === 1 ? 'platform' : 'platforms'
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
          Where do you share your thoughts?
        </h2>
        <p className="font-body text-base text-slate-500">
          Connect your social platforms to help me understand your communication
          style and voice.
        </p>
      </div>

      {/* Minimal Status matching IntegrationsGrid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-body text-sm text-slate-500">
            {selectedPlatforms.length} of {socialPlatforms.length} connected
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              Connect
            </span>
          </div>
        </div>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{
              width: `${
                (selectedPlatforms.length / socialPlatforms.length) * 100
              }%`,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Platforms Grid (2/3 width) */}
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon
              const isConnected = connectionStates[platform.id] === 'connected'
              const isConnecting =
                connectionStates[platform.id] === 'connecting'
              const isHovered = hoveredPlatform === platform.id

              return (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: socialPlatforms.indexOf(platform) * 0.05,
                  }}
                  onMouseEnter={() => {
                    setHoveredPlatform(platform.id)
                    setSelectedPreview(platform)
                  }}
                  onMouseLeave={() => setHoveredPlatform(null)}
                >
                  <button
                    onClick={() => handlePlatformClick(platform)}
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
                        : `Click to connect to ${platform.name}`
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
                            <Check
                              className="w-3 h-3 text-white"
                              strokeWidth={3}
                            />
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
                              color: isConnected ? platform.color : '#94a3b8',
                            }}
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className="space-y-1">
                        <h3 className="font-display text-base font-medium text-slate-900 flex items-center gap-2">
                          {platform.name}
                          {isConnected && (
                            <span className="text-xs font-body font-normal text-green-600">
                              Connected
                            </span>
                          )}
                        </h3>
                        <p className="font-body text-sm text-slate-500">
                          {platform.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="px-2 py-1 bg-slate-100 rounded-full">
                            {platform.category}
                          </span>
                          <span>{platform.audience}</span>
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
                              Click to connect and analyze your content style
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
      </div>

      {/* Footer matching IntegrationsGrid */}
      {/* <div className="pt-6 border-t border-slate-100 space-y-3">
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
          Connect your social platforms to analyze your communication patterns
          and content style. This helps Sophia understand how you engage with
          different audiences across channels.{' '}
          <a
            href="/privacy"
            className="text-slate-600 hover:text-slate-900 transition-colors duration-150 underline underline-offset-2"
          >
            View our privacy policy
          </a>
        </p>
      </div> */}
    </div>
  )
}
