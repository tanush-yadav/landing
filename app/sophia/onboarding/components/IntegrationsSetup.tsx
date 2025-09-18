'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import IntegrationsGrid from '@/components/sophia/IntegrationsGrid'
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Info,
  Shield,
  Zap,
  RefreshCw,
} from 'lucide-react'
import Image from 'next/image'

interface IntegrationsSetupProps {
  onUpdate?: (key: string, value: any) => void
  data?: any
  onNext?: () => void
  onBack?: () => void
}

export const IntegrationsSetup: React.FC<IntegrationsSetupProps> = ({
  onUpdate,
  data,
  onNext,
  onBack,
}) => {
  const [sophiaMessage, setSophiaMessage] = useState(
    "Hi! I'm Sophia. Let's connect your favorite tools so I can learn from your conversations and help you create amazing content!"
  )
  const [connections, setConnections] = useState(data?.connections || {})
  const [showTooltip, setShowTooltip] = useState(false)

  const connectedCount = Object.values(connections).filter(
    (c: any) => c.status === 'connected'
  ).length

  const handleUpdate = (key: string, value: any) => {
    if (key === 'connections') {
      setConnections(value)
    }
    onUpdate?.(key, value)
  }

  useEffect(() => {
    // Show tooltip after a delay
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Sophia Onboarding</h1>
                <p className="text-sm text-slate-600">Step 1 of 7: Connect Your Tools</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">Progress</span>
                <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '14.3%' }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  />
                </div>
                <span className="text-sm font-medium text-slate-900">1/7</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sophia Companion Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              {/* Sophia Avatar and Message */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-start space-x-4">
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0"
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-2">Sophia says:</h3>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={sophiaMessage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-slate-600 leading-relaxed"
                      >
                        {sophiaMessage}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Benefits Card */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span>Why connect your tools?</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      I'll learn from your meeting transcripts to understand your voice
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      Extract key insights from conversations automatically
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      Generate content that matches your communication style
                    </span>
                  </li>
                </ul>
              </div>

              {/* Security Note */}
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-600">
                      Your data is encrypted and secure. We only access content you explicitly share.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content Area */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
              {/* Section Header */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                  Connect Your Tools
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Select the tools you use for meetings, transcripts, and team communication.
                  Sophia will learn from these to create content in your unique voice.
                </p>
              </div>

              {/* Quick Tips */}
              <AnimatePresence>
                {showTooltip && connectedCount === 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-200"
                  >
                    <div className="flex items-start space-x-2">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900 font-medium mb-1">
                          Quick tip
                        </p>
                        <p className="text-sm text-blue-700">
                          Start by connecting your most-used meeting tool. You can always add more later!
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Integrations Grid */}
              <IntegrationsGrid
                onUpdate={handleUpdate}
                data={{ connections }}
                setSophiaMessage={setSophiaMessage}
              />

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0"
              >
                <button
                  onClick={onBack}
                  className="w-full sm:w-auto px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium"
                  aria-label="Go back"
                >
                  ← Back
                </button>

                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <button
                    onClick={() => onNext?.()}
                    disabled={connectedCount === 0}
                    className={cn(
                      'w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-200',
                      'flex items-center justify-center space-x-2',
                      'focus:outline-none focus:ring-2 focus:ring-offset-2',
                      connectedCount > 0
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    )}
                    aria-label={connectedCount > 0 ? 'Continue to next step' : 'Connect at least one tool to continue'}
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {connectedCount > 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="hidden sm:flex items-center space-x-1 text-green-600"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Great start!</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Skip Option */}
              {connectedCount === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-4 text-center"
                >
                  <button
                    onClick={() => {
                      setSophiaMessage("No problem! You can connect your tools anytime from settings.")
                      onNext?.()
                    }}
                    className="text-sm text-slate-500 hover:text-slate-700 underline underline-offset-2"
                  >
                    Skip for now
                  </button>
                </motion.div>
              )}
            </div>

            {/* Mobile Progress (shown at bottom on mobile) */}
            <div className="sm:hidden mt-6 bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Step 1 of 7</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '14.3%' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900">14%</span>
                </div>
              </div>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  )
}

export default IntegrationsSetup