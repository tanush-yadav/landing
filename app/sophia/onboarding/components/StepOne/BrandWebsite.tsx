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
  Search,
  Link2,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

type DetectionStatus = 'idle' | 'detecting' | 'detected' | 'error'

interface WebsiteUrls {
  main: string
  docs?: string
  blog?: string
  product?: string
  api?: string
  about?: string
}

interface BrandWebsiteProps {
  onUpdate?: (key: string, value: any) => void
  data?: any
  setSophiaMessage?: (message: string) => void
}

export default function BrandWebsite({
  onUpdate,
  data,
  setSophiaMessage,
}: BrandWebsiteProps) {
  const [websiteUrl, setWebsiteUrl] = useState(data?.websiteUrl || '')
  const [detectedUrls, setDetectedUrls] = useState<WebsiteUrls>(
    data?.detectedUrls || { main: '' }
  )
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>('idle')
  const [selectedUrls, setSelectedUrls] = useState<string[]>(
    data?.selectedUrls || []
  )
  const [isValidUrl, setIsValidUrl] = useState(true)

  useEffect(() => {
    if (setSophiaMessage) {
      setSophiaMessage('Enter your website URL and I\'ll discover all your content sources')
    }
  }, [setSophiaMessage])

  // Validate URL format
  const validateUrl = (url: string) => {
    if (!url) return true // Empty is valid (not submitted yet)
    
    try {
      // Add protocol if missing
      const urlToTest = url.startsWith('http') ? url : `https://${url}`
      new URL(urlToTest)
      return true
    } catch {
      return false
    }
  }

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setWebsiteUrl(url)
    setIsValidUrl(validateUrl(url))
    
    if (onUpdate) {
      onUpdate('websiteUrl', url)
    }
  }

  // Simulate URL detection (replace with actual detection logic)
  const detectUrls = async () => {
    if (!websiteUrl || !isValidUrl) return

    setDetectionStatus('detecting')
    
    if (setSophiaMessage) {
      setSophiaMessage('Analyzing your website structure...')
    }

    // Simulate detection delay
    setTimeout(() => {
      // Format URL with protocol
      const baseUrl = websiteUrl.startsWith('http') 
        ? websiteUrl 
        : `https://${websiteUrl}`

      // Simulate detected URLs based on common patterns
      const detected: WebsiteUrls = {
        main: baseUrl,
        docs: `${baseUrl}/docs`,
        blog: `${baseUrl}/blog`,
        product: `${baseUrl}/product`,
        api: `${baseUrl}/api`,
        about: `${baseUrl}/about`
      }

      setDetectedUrls(detected)
      setDetectionStatus('detected')
      
      // Auto-select main URL
      setSelectedUrls([baseUrl])
      
      if (onUpdate) {
        onUpdate('detectedUrls', detected)
        onUpdate('selectedUrls', [baseUrl])
      }

      if (setSophiaMessage) {
        setSophiaMessage('I found multiple content sources on your website! Select the ones you want me to learn from.')
      }
    }, 2000)
  }

  // Handle URL selection
  const toggleUrlSelection = (url: string) => {
    const updated = selectedUrls.includes(url)
      ? selectedUrls.filter(u => u !== url)
      : [...selectedUrls, url]
    
    setSelectedUrls(updated)
    
    if (onUpdate) {
      onUpdate('selectedUrls', updated)
    }

    if (setSophiaMessage) {
      const count = updated.length
      setSophiaMessage(`${count} ${count === 1 ? 'source' : 'sources'} selected for analysis`)
    }
  }

  // URL type configuration
  const urlTypes = [
    {
      key: 'main',
      label: 'Main Website',
      icon: Globe,
      color: '#2563eb',
      description: 'Your primary website and landing pages'
    },
    {
      key: 'docs',
      label: 'Documentation',
      icon: BookOpen,
      color: '#7c3aed',
      description: 'Technical docs and API references'
    },
    {
      key: 'blog',
      label: 'Blog',
      icon: FileText,
      color: '#dc2626',
      description: 'Articles and thought leadership content'
    },
    {
      key: 'product',
      label: 'Product',
      icon: ShoppingBag,
      color: '#16a34a',
      description: 'Product pages and feature descriptions'
    },
    {
      key: 'api',
      label: 'API Docs',
      icon: Link2,
      color: '#ea580c',
      description: 'API documentation and developer guides'
    },
    {
      key: 'about',
      label: 'About',
      icon: Globe,
      color: '#0891b2',
      description: 'Company story and team information'
    }
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-medium text-slate-900">
          Tell me about your brand
        </h2>
        <p className="font-body text-base text-slate-500">
          Enter your website URL and I'll discover all your content sources to learn your brand voice
        </p>
      </div>

      {/* URL Input Section */}
      <div className="space-y-4">
        <div className="relative">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="url"
                value={websiteUrl}
                onChange={handleUrlChange}
                placeholder="Enter your website (e.g., example.com)"
                className={cn(
                  "w-full pl-11 pr-4 py-3 rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-150",
                  !isValidUrl 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500",
                  "focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
              disabled={!websiteUrl || !isValidUrl || detectionStatus === 'detecting'}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all duration-150 flex items-center gap-2",
                !websiteUrl || !isValidUrl || detectionStatus === 'detecting'
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md"
              )}
            >
              {detectionStatus === 'detecting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Analyze
                </>
              )}
            </button>
          </div>
          {!isValidUrl && websiteUrl && (
            <p className="mt-2 text-sm text-red-600">
              Please enter a valid URL (e.g., example.com or https://example.com)
            </p>
          )}
        </div>
      </div>

      {/* Detected URLs Grid */}
      {detectionStatus === 'detected' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-medium text-slate-900">
              Discovered Content Sources
            </h3>
            <span className="text-sm text-slate-500">
              {selectedUrls.length} of {Object.keys(detectedUrls).length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {urlTypes.map((urlType) => {
              const url = detectedUrls[urlType.key as keyof WebsiteUrls]
              if (!url) return null

              const Icon = urlType.icon
              const isSelected = selectedUrls.includes(url)

              return (
                <motion.div
                  key={urlType.key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: urlTypes.indexOf(urlType) * 0.05 }}
                >
                  <button
                    onClick={() => toggleUrlSelection(url)}
                    className={cn(
                      "relative w-full p-4 rounded-lg border text-left transition-all duration-150 group",
                      isSelected
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    )}
                  >
                    {/* Selection Indicator */}
                    <div className="absolute top-4 right-4">
                      <div className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150",
                        isSelected 
                          ? "bg-blue-500 border-blue-500" 
                          : "border-slate-300 bg-white group-hover:border-slate-400"
                      )}>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Icon
                          className="w-6 h-6 transition-colors duration-150"
                          style={{ color: isSelected ? urlType.color : '#94a3b8' }}
                        />
                        <div>
                          <h4 className="font-display text-sm font-medium text-slate-900">
                            {urlType.label}
                          </h4>
                          {isSelected && (
                            <span className="text-xs text-green-600">
                              Selected
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 pr-8">
                        {urlType.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate">{url}</span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Helper Text */}
      {detectionStatus === 'detected' && (
        <div className="pt-6 border-t border-slate-100">
          <p className="font-body text-xs text-slate-500 leading-relaxed">
            I'll analyze the selected sources to understand your brand voice, tone, and messaging style. 
            Your content remains private and secure throughout the process.{' '}
            <a
              href="/privacy"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-150 underline underline-offset-2"
            >
              View our privacy policy
            </a>
          </p>
        </div>
      )}

      {/* Initial State */}
      {detectionStatus === 'idle' && websiteUrl && (
        <div className="bg-slate-50 rounded-lg p-8 border-2 border-dashed border-slate-200 text-center">
          <Globe className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <p className="text-sm text-slate-600">
            Click "Analyze" to discover your website's content sources
          </p>
        </div>
      )}
    </div>
  )
}