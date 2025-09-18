'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Video,
  Mic,
  MessageSquare,
  FileText,
  Users,
  Loader2,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'

// Integration types
export type ConnectionStatus = 'not_connected' | 'connecting' | 'connected' | 'error'

export interface Integration {
  id: string
  name: string
  description: string
  category: 'meeting' | 'transcript' | 'communication'
  icon: React.ReactNode
  color: string
  logoUrl?: string
  connectionMethod?: 'oauth' | 'api_key' | 'webhook'
}

export interface IntegrationConnection {
  integrationId: string
  status: ConnectionStatus
  error?: string
  connectedAt?: Date
}

export interface IntegrationsGridProps {
  onUpdate?: (key: string, value: any) => void
  data?: {
    connections?: Record<string, IntegrationConnection>
  }
  setSophiaMessage?: (message: string) => void
}

// Integration configurations
const integrations: Integration[] = [
  // Meeting tools
  {
    id: 'gong',
    name: 'Gong',
    description: 'Connect your Gong account to import sales call insights',
    category: 'meeting',
    icon: <Video className="w-5 h-5" />,
    color: 'bg-purple-500',
    connectionMethod: 'oauth',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Sync meeting recordings and transcripts from Zoom',
    category: 'meeting',
    icon: <Video className="w-5 h-5" />,
    color: 'bg-blue-500',
    connectionMethod: 'oauth',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Import Teams meetings and collaboration insights',
    category: 'meeting',
    icon: <Users className="w-5 h-5" />,
    color: 'bg-indigo-600',
    connectionMethod: 'oauth',
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    description: 'Access Google Meet recordings and transcripts',
    category: 'meeting',
    icon: <Video className="w-5 h-5" />,
    color: 'bg-green-500',
    connectionMethod: 'oauth',
  },
  // Transcript tools
  {
    id: 'otter',
    name: 'Otter.ai',
    description: 'Sync AI-powered meeting notes and transcripts',
    category: 'transcript',
    icon: <Mic className="w-5 h-5" />,
    color: 'bg-cyan-500',
    connectionMethod: 'api_key',
  },
  {
    id: 'rev',
    name: 'Rev',
    description: 'Import professional transcriptions from Rev',
    category: 'transcript',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-orange-500',
    connectionMethod: 'api_key',
  },
  {
    id: 'sonix',
    name: 'Sonix',
    description: 'Connect automated transcription from Sonix',
    category: 'transcript',
    icon: <Mic className="w-5 h-5" />,
    color: 'bg-pink-500',
    connectionMethod: 'api_key',
  },
  // Communication tools
  {
    id: 'slack',
    name: 'Slack',
    description: 'Analyze conversations and extract insights from Slack',
    category: 'communication',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'bg-purple-600',
    connectionMethod: 'oauth',
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Import community discussions from Discord',
    category: 'communication',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'bg-indigo-500',
    connectionMethod: 'webhook',
  },
]

const IntegrationCard: React.FC<{
  integration: Integration
  connection?: IntegrationConnection
  onConnect: (integrationId: string) => void
  index: number
}> = ({ integration, connection, onConnect, index }) => {
  const status = connection?.status || 'not_connected'
  const [isHovered, setIsHovered] = useState(false)

  const statusConfig = {
    not_connected: {
      label: 'Connect',
      icon: <ChevronRight className="w-4 h-4" />,
      className: 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600',
      borderClass: 'border-slate-200 hover:border-blue-300',
    },
    connecting: {
      label: 'Connecting...',
      icon: <Loader2 className="w-4 h-4 animate-spin" />,
      className: 'bg-blue-50 text-blue-600',
      borderClass: 'border-blue-300 animate-pulse',
    },
    connected: {
      label: 'Connected',
      icon: <Check className="w-4 h-4" />,
      className: 'bg-green-50 text-green-600',
      borderClass: 'border-green-300',
    },
    error: {
      label: 'Error',
      icon: <AlertCircle className="w-4 h-4" />,
      className: 'bg-red-50 text-red-600',
      borderClass: 'border-red-300',
    },
  }

  const config = statusConfig[status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <button
        onClick={() => onConnect(integration.id)}
        disabled={status === 'connecting' || status === 'connected'}
        className={cn(
          'relative w-full p-4 sm:p-5 rounded-xl border-2 transition-all duration-200',
          'bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-75',
          config.borderClass,
          status === 'connected' && 'bg-green-50/30'
        )}
        aria-label={`${status === 'connected' ? 'Connected to' : 'Connect to'} ${integration.name}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center text-white',
                integration.color
              )}
            >
              {integration.icon}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">{integration.name}</h3>
              <span className="text-xs text-slate-500 capitalize">
                {integration.category.replace('_', ' ')}
              </span>
            </div>
          </div>
          {status === 'connected' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 text-left line-clamp-2">
          {integration.description}
        </p>

        {/* Connection Status */}
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium',
              config.className
            )}
          >
            {config.icon}
            <span>{config.label}</span>
            {status === 'not_connected' && isHovered && (
              <ExternalLink className="w-3 h-3 ml-1" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Error Message */}
        {status === 'error' && connection?.error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 text-xs text-red-600 text-left"
          >
            {connection.error}
          </motion.p>
        )}

        {/* Connected timestamp */}
        {status === 'connected' && connection?.connectedAt && (
          <p className="mt-2 text-xs text-slate-500 text-left">
            Connected {new Date(connection.connectedAt).toLocaleDateString()}
          </p>
        )}
      </button>

      {/* Sparkle effect for connected items */}
      {status === 'connected' && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-2 -right-2 text-yellow-500"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
      )}
    </motion.div>
  )
}

export const IntegrationsGrid: React.FC<IntegrationsGridProps> = ({
  onUpdate,
  data,
  setSophiaMessage,
}) => {
  const [connections, setConnections] = useState<Record<string, IntegrationConnection>>(
    data?.connections || {}
  )

  const handleConnect = useCallback(
    async (integrationId: string) => {
      const integration = integrations.find((i) => i.id === integrationId)
      if (!integration) return

      // Update local state
      setConnections((prev) => ({
        ...prev,
        [integrationId]: {
          integrationId,
          status: 'connecting',
        },
      }))

      // Notify parent
      onUpdate?.('connections', {
        ...connections,
        [integrationId]: {
          integrationId,
          status: 'connecting',
        },
      })

      // Set Sophia message
      setSophiaMessage?.(`Great choice! Let me connect to ${integration.name} for you...`)

      // Simulate connection process
      setTimeout(() => {
        const newConnection: IntegrationConnection = {
          integrationId,
          status: 'connected',
          connectedAt: new Date(),
        }

        setConnections((prev) => ({
          ...prev,
          [integrationId]: newConnection,
        }))

        onUpdate?.('connections', {
          ...connections,
          [integrationId]: newConnection,
        })

        setSophiaMessage?.(`Perfect! I've connected to ${integration.name}. Your data is being synced.`)
      }, 2000)
    },
    [connections, onUpdate, setSophiaMessage]
  )

  const connectedCount = Object.values(connections).filter(
    (c) => c.status === 'connected'
  ).length

  const categories = ['meeting', 'transcript', 'communication'] as const

  return (
    <div className="w-full space-y-6">
      {/* Progress indicator */}
      {connectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-lg p-4 border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                {connectedCount} integration{connectedCount !== 1 ? 's' : ''} connected
              </span>
            </div>
            <span className="text-xs text-blue-600">
              {Math.round((connectedCount / integrations.length) * 100)}% complete
            </span>
          </div>
          <div className="mt-2 w-full bg-blue-100 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(connectedCount / integrations.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-blue-500 h-2 rounded-full"
            />
          </div>
        </motion.div>
      )}

      {/* Integration categories */}
      {categories.map((category) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900 capitalize flex items-center space-x-2">
            {category === 'meeting' && <Video className="w-5 h-5 text-slate-600" />}
            {category === 'transcript' && <Mic className="w-5 h-5 text-slate-600" />}
            {category === 'communication' && <MessageSquare className="w-5 h-5 text-slate-600" />}
            <span>{category.replace('_', ' ')} Tools</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter((integration) => integration.category === category)
              .map((integration, index) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  connection={connections[integration.id]}
                  onConnect={handleConnect}
                  index={index}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default IntegrationsGrid