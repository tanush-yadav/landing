'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  FileText,
  BookOpen,
  ShoppingBag,
  ExternalLink,
  Loader2,
  Check,
  AlertCircle,
  Users,
  Link2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type DetectionStatus = 'idle' | 'analyzing' | 'ready' | 'error'

interface WebsiteUrls {
  main: string
  docs?: string
  blog?: string
  product?: string
  about?: string
}

interface BrandWebsiteProps {
  onUpdate?: (key: string, value: any) => void
  data?: any
  setSophiaMessage?: (message: string) => void
  onReadyToContinue?: (isReady: boolean) => void
}

export default function BrandWebsite({
  onUpdate,
  data,
  setSophiaMessage,
  onReadyToContinue,
}: BrandWebsiteProps) {
  const [websiteUrl, setWebsiteUrl] = useState(data?.websiteUrl || '')
  const [detectedUrls, setDetectedUrls] = useState<WebsiteUrls>(
    data?.detectedUrls || { main: '' }
  )
  const [detectionStatus, setDetectionStatus] =
    useState<DetectionStatus>('idle')
  const [selectedUrls, setSelectedUrls] = useState<string[]>(
    data?.selectedUrls || []
  )
  const [isValidUrl, setIsValidUrl] = useState(true)

  useEffect(() => {
    if (setSophiaMessage) {
      setSophiaMessage(
        "Enter your website URL and I'll learn your brand voice from your content."
      )
    }
  }, [setSophiaMessage])

  useEffect(() => {
    if (detectionStatus === 'ready' && selectedUrls.length > 0) {
      onReadyToContinue?.(true)
      setSophiaMessage?.(
        `Perfect! ${selectedUrls.length} sources selected. Ready to continue!`
      )
    } else {
      onReadyToContinue?.(false)
    }
  }, [
    detectionStatus,
    selectedUrls.length,
    onReadyToContinue,
    setSophiaMessage,
  ])

  const validateUrl = (url: string) => {
    if (!url) return true
    try {
      const urlToTest = url.startsWith('http') ? url : `https://${url}`
      new URL(urlToTest)
      return true
    } catch {
      return false
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setWebsiteUrl(url)
    setIsValidUrl(validateUrl(url))
    onUpdate?.('websiteUrl', url)
  }

  const detectUrls = async () => {
    if (!websiteUrl || !isValidUrl) return

    setDetectionStatus('analyzing')
    setSophiaMessage?.('Analyzing your website...')

    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const baseUrl = websiteUrl.startsWith('http')
      ? websiteUrl
      : `https://${websiteUrl}`
    const detected: WebsiteUrls = {
      main: baseUrl,
      about: `${baseUrl}/about`,
      blog: `${baseUrl}/blog`,
      product: `${baseUrl}/product`,
      docs: `${baseUrl}/docs`,
    }

    // Auto-select main sources
    const autoSelected = [detected.main, detected.about, detected.blog].filter(
      Boolean
    )

    setDetectedUrls(detected)
    setSelectedUrls(autoSelected)
    setDetectionStatus('ready')

    onUpdate?.('detectedUrls', detected)
    onUpdate?.('selectedUrls', autoSelected)
  }

  const toggleUrlSelection = (url: string) => {
    const updated = selectedUrls.includes(url)
      ? selectedUrls.filter((u) => u !== url)
      : [...selectedUrls, url]

    setSelectedUrls(updated)
    onUpdate?.('selectedUrls', updated)
  }

  const sourceTypes = [
    { key: 'main', label: 'Website', icon: Globe },
    { key: 'about', label: 'About', icon: Users },
    { key: 'blog', label: 'Blog', icon: FileText },
    { key: 'product', label: 'Product', icon: ShoppingBag },
    { key: 'docs', label: 'Docs', icon: BookOpen },
  ]

  return (
    <div className="max-w-2xl mx-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-medium text-slate-900">
          Tell me about your brand
        </h2>
        <p className="text-slate-500">
          Enter your website URL and I'll learn your brand voice
        </p>
      </div>

      {/* URL Input */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="url"
              value={websiteUrl}
              onChange={handleUrlChange}
              placeholder="Enter your website (e.g., example.com)"
              className={cn(
                'w-full pl-11 pr-4 py-3 rounded-lg border bg-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-50',
                !isValidUrl && websiteUrl
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500'
              )}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && websiteUrl && isValidUrl) {
                  detectUrls()
                }
              }}
            />
            {!isValidUrl && websiteUrl && (
              <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
          <button
            onClick={detectUrls}
            disabled={
              !websiteUrl || !isValidUrl || detectionStatus === 'analyzing'
            }
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all duration-150 flex items-center gap-2 min-w-[120px] justify-center',
              !websiteUrl || !isValidUrl || detectionStatus === 'analyzing'
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : detectionStatus === 'ready'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            )}
          >
            {detectionStatus === 'analyzing' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : detectionStatus === 'ready' ? (
              <>
                <Check className="w-4 h-4" />
                Ready
              </>
            ) : (
              'Analyze'
            )}
          </button>
        </div>
        {!isValidUrl && websiteUrl && (
          <p className="text-sm text-red-600">Please enter a valid URL</p>
        )}
      </div>

      {/* Content Sources - Clean Grid */}
      {detectionStatus === 'ready' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="font-medium text-lg font-display text-slate-900">
            Select content sources
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sourceTypes.map((sourceType) => {
              const url = detectedUrls[sourceType.key as keyof WebsiteUrls]
              if (!url) return null

              const Icon = sourceType.icon
              const isSelected = selectedUrls.includes(url)

              return (
                <button
                  key={sourceType.key}
                  onClick={() => toggleUrlSelection(url)}
                  className={cn(
                    'p-4 rounded-lg border text-left transition-all duration-150 flex items-center gap-3',
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  )}
                >
                  <Icon className="w-5 h-5 text-slate-500" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">
                      {sourceType.label}
                    </div>
                    <div className="text-xs text-slate-400 truncate">{url}</div>
                  </div>
                  <div
                    className={cn(
                      'w-4 h-4 rounded border flex items-center justify-center',
                      isSelected
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-slate-300'
                    )}
                  >
                    {isSelected && (
                      <Check
                        className="w-2.5 h-2.5 text-white"
                        strokeWidth={3}
                      />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Error State - Minimal */}
      {detectionStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
        >
          <AlertCircle className="w-8 h-8 mx-auto text-red-400 mb-3" />
          <h3 className="font-medium text-red-900 mb-2">Analysis Failed</h3>
          <p className="text-sm text-red-700 mb-4">
            Couldn't analyze your website. Please try again.
          </p>
          <button
            onClick={() => setDetectionStatus('idle')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  )
}
