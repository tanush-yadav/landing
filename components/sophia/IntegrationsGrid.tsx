'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Link2, Loader2, AlertCircle, ExternalLink } from 'lucide-react'
import {
  SiZoom,
} from 'react-icons/si'
import {
  Mic,
  Video,
  Headphones,
  FileAudio,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Connection types
type ConnectionType = 'oauth' | 'url' | 'api'
type ConnectionStatus = 'not_connected' | 'connecting' | 'connected' | 'error'

// Meeting and transcript integration data
const integrations = [
  {
    id: 'gong',
    name: 'Gong',
    icon: Users,
    description: 'Revenue intelligence platform',
    color: '#FF6B35',
    connectionType: 'oauth' as ConnectionType,
    helpText: 'Connect via Gong OAuth',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    icon: SiZoom,
    description: 'Video conferencing platform',
    color: '#2D8CFF',
    connectionType: 'oauth' as ConnectionType,
    helpText: 'Sign in with Zoom',
  },
  {
    id: 'circleback',
    name: 'Circleback',
    icon: Video,
    description: 'AI meeting assistant',
    color: '#6366F1',
    connectionType: 'api' as ConnectionType,
    helpText: 'Enter API key',
  },
  {
    id: 'fireflies',
    name: 'Fireflies',
    icon: FileAudio,
    description: 'AI notetaker for meetings',
    color: '#FF4785',
    connectionType: 'oauth' as ConnectionType,
    helpText: 'Authorize with Fireflies',
  },
  {
    id: 'otter',
    name: 'Otter.ai',
    icon: Headphones,
    description: 'AI meeting transcription',
    color: '#00D4AA',
    connectionType: 'oauth' as ConnectionType,
    helpText: 'Connect Otter.ai account',
  },
]

interface IntegrationsGridProps {
  onUpdate?: (key: string, value: any) => void
  data?: any
  setSophiaMessage?: (message: string) => void
}

export default function IntegrationsGrid({
  onUpdate,
  data,
  setSophiaMessage,
}: IntegrationsGridProps) {
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(
    data?.selectedIntegrations || []
  )

  // Track connection states for each integration
  const [connectionStates, setConnectionStates] = useState<
    Record<string, ConnectionStatus>
  >({})
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(
    null
  )
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  useEffect(() => {
    if (setSophiaMessage) {
      setSophiaMessage(
        'Click on any integration to connect your meeting platforms with Sophia'
      )
    }
  }, [setSophiaMessage])

  // Simulate connection process (replace with actual OAuth/API logic)
  const handleIntegrationClick = async (
    integration: (typeof integrations)[0]
  ) => {
    const currentStatus = connectionStates[integration.id] || 'not_connected'

    // If already connected, disconnect
    if (currentStatus === 'connected') {
      setConnectionStates((prev) => ({
        ...prev,
        [integration.id]: 'not_connected',
      }))

      const updated = selectedIntegrations.filter((i) => i !== integration.id)
      setSelectedIntegrations(updated)

      if (onUpdate) {
        onUpdate('selectedIntegrations', updated)
      }

      if (setSophiaMessage) {
        setSophiaMessage(`Disconnected from ${integration.name}`)
      }
      return
    }

    // Start connection process
    setConnectionStates((prev) => ({
      ...prev,
      [integration.id]: 'connecting',
    }))

    if (setSophiaMessage) {
      setSophiaMessage(`Connecting to ${integration.name}...`)
    }

    // Simulate connection delay (replace with actual connection logic)
    setTimeout(() => {
      setConnectionStates((prev) => ({
        ...prev,
        [integration.id]: 'connected',
      }))

      const updated = [...selectedIntegrations, integration.id]
      setSelectedIntegrations(updated)

      if (onUpdate) {
        onUpdate('selectedIntegrations', updated)
      }

      if (setSophiaMessage) {
        const connectedCount = updated.length
        setSophiaMessage(
          `Successfully connected to ${integration.name}! ${connectedCount} ${
            connectedCount === 1 ? 'tool' : 'tools'
          } connected.`
        )
      }
    }, 1500)
  }

  const getConnectionIcon = (type: ConnectionType) => {
    switch (type) {
      case 'oauth':
        return ExternalLink
      case 'url':
        return Link2
      case 'api':
        return Link2
      default:
        return Link2
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Clean Header */}
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-medium text-slate-900">
          Connect Your Workspace
        </h2>
        <p className="font-body text-base text-slate-500">
          We will learn from your transcripts, customer calls, discovery calls, sales calls.
        </p>
      </div>

      {/* Minimal Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-body text-sm text-slate-500">
            {selectedIntegrations.length} of {integrations.length} connected
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              OAuth
            </span>
            <span className="flex items-center gap-1">
              <Link2 className="w-3 h-3" />
              URL/API
            </span>
          </div>
        </div>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{
              width: `${
                (selectedIntegrations.length / integrations.length) * 100
              }%`,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Professional Integration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon
          const ConnectionIcon = getConnectionIcon(integration.connectionType)
          const isConnected = connectionStates[integration.id] === 'connected'
          const isConnecting = connectionStates[integration.id] === 'connecting'
          const isHovered = hoveredIntegration === integration.id

          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: integrations.indexOf(integration) * 0.05,
              }}
              onMouseEnter={() => setHoveredIntegration(integration.id)}
              onMouseLeave={() => setHoveredIntegration(null)}
            >
              <button
                onClick={() => handleIntegrationClick(integration)}
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
                    : integration.helpText
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
                        <ConnectionIcon className="w-4 h-4 text-slate-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Minimal Card Content */}
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
                          color: isConnected ? integration.color : '#94a3b8',
                        }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-medium text-slate-900 flex items-center gap-2">
                      {integration.name}
                      {isConnected && (
                        <span className="text-xs font-body font-normal text-green-600">
                          Connected
                        </span>
                      )}
                    </h3>
                    <p className="font-body text-sm text-slate-500">
                      {integration.description}
                    </p>
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
                          Click to {integration.helpText.toLowerCase()}
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

      {/* Professional Footer with Connection Info */}
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
          Click any integration card to connect. Your data remains secure and
          private. All integrations use industry-standard encryption and you
          maintain full control over permissions.
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
