'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  ExternalLink,
  Loader2,
  Globe,
  FileText,
  BookOpen,
  Users,
  Target,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Connection status types (matching IntegrationsGrid pattern)
type ConnectionStatus = 'not_connected' | 'connecting' | 'connected' | 'error'

// Brand narrative examples with real companies and their voices
const brandNarratives = [
  {
    id: 'nike-inspiration',
    name: 'Nike',
    tagline: 'Just Do It',
    icon: Target,
    description: 'Inspirational achievement and perseverance',
    color: '#FF6B35',
    category: 'Sports/Lifestyle',
    audience: 'Athletes & Dreamers',
    preview: `"We believe that everyone is an athlete. If you have a body, you are an athlete. Our job is to help you unleash your potential, push your limits, and achieve greatness you never thought possible."`,
    sampleTitle: 'Why Your Next Challenge Is Your Greatest Opportunity',
    brandVoice: 'Bold, motivational, empowering, action-oriented',
    toneElements: ['Achievement', 'Determination', 'Excellence', 'Inspiration'],
  },
  {
    id: 'apple-innovation',
    name: 'Apple',
    tagline: 'Think Different',
    icon: BookOpen,
    description: 'Elegant simplicity and innovation',
    color: '#2D8CFF',
    category: 'Technology',
    audience: 'Creative Professionals',
    preview: `"We're not just creating products. We're crafting experiences that seamlessly integrate into your life, anticipate your needs, and empower you to create, connect, and explore in ways you never imagined."`,
    sampleTitle: 'The Beautiful Intersection of Technology and Humanity',
    brandVoice: 'Elegant, visionary, human-centered, premium',
    toneElements: ['Innovation', 'Craftsmanship', 'Intuition', 'Excellence'],
  },
  {
    id: 'patagonia-purpose',
    name: 'Patagonia',
    tagline: 'Build the best product, cause no unnecessary harm',
    icon: Globe,
    description: 'Environmental responsibility and outdoor adventure',
    color: '#6366F1',
    category: 'Outdoor/Sustainability',
    audience: 'Conscious Consumers',
    preview: `"We're in business to save our home planet. Every decision we make, every product we create, and every story we tell serves this mission. Adventure is our vehicle, but responsibility is our destination."`,
    sampleTitle: 'Why Doing Less Can Mean Achieving More',
    brandVoice: 'Authentic, purposeful, rugged, environmentally conscious',
    toneElements: ['Responsibility', 'Adventure', 'Authenticity', 'Purpose'],
  },
  {
    id: 'stripe-builders',
    name: 'Stripe',
    tagline: 'Increase the GDP of the internet',
    icon: Users,
    description: 'Empowering internet entrepreneurs',
    color: '#FF4785',
    category: 'Fintech',
    audience: 'Entrepreneurs & Developers',
    preview: `"We build economic infrastructure for the internet. Our tools help ambitious companies scale their revenue and reach. Behind every transaction is a dream, a business, and people working to build something meaningful."`,
    sampleTitle: "Building the Financial Rails for Tomorrow's Economy",
    brandVoice: 'Technical, empowering, growth-focused, accessible',
    toneElements: ['Growth', 'Innovation', 'Accessibility', 'Empowerment'],
  },
  {
    id: 'airbnb-belonging',
    name: 'Airbnb',
    tagline: 'Belong Anywhere',
    icon: Globe,
    description: 'Creating connection and belonging',
    color: '#00D4AA',
    category: 'Travel/Community',
    audience: 'Global Travelers',
    preview: `"Travel isn't just about the destination. It's about the connections you make, the stories you collect, and the sense of belonging you find in unexpected places. We're creating a world where anyone can belong anywhere."`,
    sampleTitle: 'How Strangers Become Friends: The Science of Belonging',
    brandVoice: 'Warm, inclusive, community-focused, experiential',
    toneElements: ['Connection', 'Hospitality', 'Discovery', 'Community'],
  },
  {
    id: 'tesla-future',
    name: 'Tesla',
    tagline: 'Accelerating sustainable transport',
    icon: Target,
    description: 'Revolutionary sustainability and innovation',
    color: '#8B5CF6',
    category: 'Automotive/Energy',
    audience: 'Early Adopters',
    preview: `"We're not just building cars. We're reimagining transportation, energy, and humanity's relationship with technology. Every innovation brings us closer to a sustainable future that seemed impossible just yesterday."`,
    sampleTitle: "Why the Impossible Is Just Engineering We Haven't Solved Yet",
    brandVoice: 'Visionary, disruptive, mission-driven, forward-thinking',
    toneElements: [
      'Innovation',
      'Sustainability',
      'Disruption',
      'Future-focused',
    ],
  },
]

interface BrandNarrativesProps {
  onUpdate?: (key: string, value: any) => void
  data?: any
  setSophiaMessage?: (message: string) => void
}

export default function BrandNarratives({
  onUpdate,
  data,
  setSophiaMessage,
}: BrandNarrativesProps) {
  const [selectedNarratives, setSelectedNarratives] = useState<string[]>(
    data?.selectedNarratives || []
  )

  // Track connection states for each narrative (matching IntegrationsGrid pattern)
  const [connectionStates, setConnectionStates] = useState<
    Record<string, ConnectionStatus>
  >({})
  const [hoveredNarrative, setHoveredNarrative] = useState<string | null>(null)
  const [selectedPreview, setSelectedPreview] = useState<
    (typeof brandNarratives)[0] | null
  >(null)

  useEffect(() => {
    if (setSophiaMessage) {
      setSophiaMessage(
        "Choose brand voices that inspire you - I'll learn from their narrative style"
      )
    }
  }, [setSophiaMessage])

  // Handle narrative connection (matching IntegrationsGrid logic)
  const handleNarrativeClick = async (
    narrative: (typeof brandNarratives)[0]
  ) => {
    const currentStatus = connectionStates[narrative.id] || 'not_connected'

    // If already connected, disconnect
    if (currentStatus === 'connected') {
      setConnectionStates((prev) => ({
        ...prev,
        [narrative.id]: 'not_connected',
      }))

      const updated = selectedNarratives.filter((n) => n !== narrative.id)
      setSelectedNarratives(updated)

      if (onUpdate) {
        onUpdate('selectedNarratives', updated)
      }

      if (setSophiaMessage) {
        setSophiaMessage(`Disconnected from ${narrative.name} brand voice`)
      }
      return
    }

    // Start connection process
    setConnectionStates((prev) => ({
      ...prev,
      [narrative.id]: 'connecting',
    }))

    if (setSophiaMessage) {
      setSophiaMessage(`Analyzing ${narrative.name}'s brand narrative...`)
    }

    // Simulate connection delay (replace with actual connection logic)
    setTimeout(() => {
      setConnectionStates((prev) => ({
        ...prev,
        [narrative.id]: 'connected',
      }))

      const updated = [...selectedNarratives, narrative.id]
      setSelectedNarratives(updated)

      if (onUpdate) {
        onUpdate('selectedNarratives', updated)
      }

      if (setSophiaMessage) {
        const connectedCount = updated.length
        setSophiaMessage(
          `Successfully connected to ${narrative.name}! ${connectedCount} ${
            connectedCount === 1 ? 'narrative' : 'narratives'
          } analyzed.`
        )
      }
    }, 1500)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Clean Header matching IntegrationsGrid */}
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-medium text-slate-900">
          What brand voices inspire you?
        </h2>
        <p className="font-body text-base text-slate-500">
          Select brand narratives to learn their storytelling style and develop
          your unique voice.
        </p>
      </div>

      {/* Minimal Status matching IntegrationsGrid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-body text-sm text-slate-500">
            {selectedNarratives.length} of {brandNarratives.length} connected
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              Analyze
            </span>
          </div>
        </div>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{
              width: `${
                (selectedNarratives.length / brandNarratives.length) * 100
              }%`,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Narratives Grid (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {brandNarratives.map((narrative) => {
              const Icon = narrative.icon
              const isConnected = connectionStates[narrative.id] === 'connected'
              const isConnecting =
                connectionStates[narrative.id] === 'connecting'
              const isHovered = hoveredNarrative === narrative.id

              return (
                <motion.div
                  key={narrative.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: brandNarratives.indexOf(narrative) * 0.05,
                  }}
                  onMouseEnter={() => {
                    setHoveredNarrative(narrative.id)
                    setSelectedPreview(narrative)
                  }}
                  onMouseLeave={() => setHoveredNarrative(null)}
                >
                  <button
                    onClick={() => handleNarrativeClick(narrative)}
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
                        : `Click to analyze ${narrative.name}'s brand narrative`
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
                              color: isConnected ? narrative.color : '#94a3b8',
                            }}
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className="space-y-1">
                        <h3 className="font-display text-base font-medium text-slate-900 flex items-center gap-2">
                          {narrative.name}
                          {isConnected && (
                            <span className="text-xs font-body font-normal text-green-600">
                              Connected
                            </span>
                          )}
                        </h3>
                        <p className="font-body text-sm text-slate-600">
                          {narrative.tagline}
                        </p>
                        <p className="font-body text-sm text-slate-500">
                          {narrative.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="px-2 py-1 bg-slate-100 rounded-full">
                            {narrative.category}
                          </span>
                          <span>{narrative.audience}</span>
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
                              Click to analyze their brand narrative
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
          <h3 className="font-display text-lg font-medium text-slate-900 mb-4">
            Brand Voice Preview
          </h3>
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
                        {selectedPreview.tagline}
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
                        Brand Voice
                      </h5>
                      <p className="font-body text-sm text-slate-700">
                        {selectedPreview.brandVoice}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-body text-xs font-medium text-slate-600 uppercase tracking-wide">
                        Tone Elements
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {selectedPreview.toneElements.map((element) => (
                          <span
                            key={element}
                            className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                          >
                            {element}
                          </span>
                        ))}
                      </div>
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
                      Preview Brand Voice
                    </h4>
                    <p className="font-body text-sm text-slate-500">
                      Hover over a brand to preview their narrative style
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
            <span>Analyzing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-slate-300" />
            <span>Not connected</span>
          </div>
        </div>
        <p className="font-body text-xs text-slate-500 leading-relaxed">
          Connect to brand narratives to analyze their storytelling techniques and voice. This helps Sophia understand your preferred narrative style and develop your unique brand voice.{' '}
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
