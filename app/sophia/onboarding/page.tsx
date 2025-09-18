'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import IntegrationsSetup from './components/IntegrationsSetup'
import WhatYouConsume from './components/WhatYouConsume'
import BrandNarratives from './components/BrandNarratives'
import SocialPresence from './components/SocialPresence'
import StyleGuide from './components/StyleGuide'
import ContentTypes from './components/ContentTypes'
import DeliveryPreferences from './components/DeliveryPreferences'
import {
  Check,
  ChevronRight,
  Sparkles,
  BookOpen,
  Palette,
  Users,
  PenTool,
  Package,
  Send,
  Video,
} from 'lucide-react'

// Step configuration
const steps = [
  {
    id: 0,
    title: 'Connect Tools',
    description: 'Import meeting transcripts and conversations',
    icon: <Video className="w-5 h-5" />,
    component: IntegrationsSetup,
  },
  {
    id: 1,
    title: 'What You Read',
    description: 'Select publications that inspire your writing',
    icon: <BookOpen className="w-5 h-5" />,
    component: WhatYouConsume,
  },
  {
    id: 2,
    title: 'Brand Voice',
    description: 'Define your storytelling preferences',
    icon: <Palette className="w-5 h-5" />,
    component: BrandNarratives,
  },
  {
    id: 3,
    title: 'Social Presence',
    description: 'Connect social platforms for voice analysis',
    icon: <Users className="w-5 h-5" />,
    component: SocialPresence,
  },
  {
    id: 4,
    title: 'Style Guide',
    description: 'Set your writing tone and style',
    icon: <PenTool className="w-5 h-5" />,
    component: StyleGuide,
  },
  {
    id: 5,
    title: 'Content Types',
    description: 'Choose what content to create',
    icon: <Package className="w-5 h-5" />,
    component: ContentTypes,
  },
  {
    id: 6,
    title: 'Delivery',
    description: 'Set up content delivery preferences',
    icon: <Send className="w-5 h-5" />,
    component: DeliveryPreferences,
  },
]

// Placeholder components for steps that don't exist yet
const PlaceholderStep: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
        <p className="text-slate-600 mb-8">{description}</p>
        <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
          <p className="text-slate-500">Coming soon...</p>
        </div>
      </motion.div>
    </div>
  </div>
)

// Create wrapper components for steps that don't exist
const WhatYouConsume = (props: any) => (
  <PlaceholderStep title="What You Consume" description="Select Substack publications and content sources that inspire your writing" {...props} />
)

const BrandNarratives = (props: any) => (
  <PlaceholderStep title="Brand Narratives" description="Define your brand voice and storytelling preferences" {...props} />
)

const SocialPresence = (props: any) => (
  <PlaceholderStep title="Social Presence" description="Connect your social media accounts for voice analysis" {...props} />
)

const StyleGuide = (props: any) => (
  <PlaceholderStep title="Style Guide" description="Set your preferred writing style, tone, and formatting preferences" {...props} />
)

const ContentTypes = (props: any) => (
  <PlaceholderStep title="Content Types" description="Choose the types of content you want Sophia to help you create" {...props} />
)

const DeliveryPreferences = (props: any) => (
  <PlaceholderStep title="Delivery Preferences" description="Configure how and when you want to receive your content" {...props} />
)

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [stepData, setStepData] = useState<Record<number, any>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load saved progress from localStorage
  useEffect(() => {
    const savedStep = localStorage.getItem('sophia_onboarding_step')
    const savedData = localStorage.getItem('sophia_onboarding_data')

    if (savedStep) {
      setCurrentStep(parseInt(savedStep))
    }

    if (savedData) {
      setStepData(JSON.parse(savedData))
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('sophia_onboarding_step', currentStep.toString())
    localStorage.setItem('sophia_onboarding_data', JSON.stringify(stepData))
  }, [currentStep, stepData])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setIsTransitioning(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 300)
    } else {
      // Complete onboarding
      completeOnboarding()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1)
        setIsTransitioning(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 300)
    }
  }

  const handleStepUpdate = (key: string, value: any) => {
    setStepData((prev) => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        [key]: value,
      },
    }))
  }

  const handleStepClick = (stepIndex: number) => {
    // Only allow navigation to completed steps
    if (stepIndex < currentStep) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(stepIndex)
        setIsTransitioning(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 300)
    }
  }

  const completeOnboarding = async () => {
    // Save final data
    localStorage.setItem('sophia_onboarding_complete', 'true')
    localStorage.setItem('sophia_profile', JSON.stringify(stepData))

    // Navigate to dashboard or success page
    router.push('/sophia/dashboard')
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Progress Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Mobile Progress */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-900">Sophia Setup</span>
              </div>
              <span className="text-sm text-slate-600">
                {currentStep + 1} of {steps.length}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              />
            </div>
          </div>

          {/* Desktop Progress Steps */}
          <div className="hidden sm:block">
            <nav aria-label="Progress">
              <ol className="flex items-center space-x-2 md:space-x-4">
                {steps.map((step, index) => (
                  <li key={step.id} className="flex items-center">
                    <button
                      onClick={() => handleStepClick(index)}
                      disabled={index > currentStep}
                      className={cn(
                        'group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                        index === currentStep && 'bg-blue-50 text-blue-700',
                        index < currentStep && 'hover:bg-slate-50 text-slate-700 cursor-pointer',
                        index > currentStep && 'text-slate-400 cursor-not-allowed'
                      )}
                      aria-current={index === currentStep ? 'step' : undefined}
                      aria-label={`Step ${index + 1}: ${step.title}`}
                    >
                      <span
                        className={cn(
                          'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200',
                          index === currentStep && 'border-blue-500 bg-blue-500 text-white',
                          index < currentStep && 'border-green-500 bg-green-500 text-white',
                          index > currentStep && 'border-slate-300 bg-white text-slate-400'
                        )}
                      >
                        {index < currentStep ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </span>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium">{step.title}</p>
                        <p className="text-xs opacity-75">{step.description}</p>
                      </div>
                    </button>
                    {index < steps.length - 1 && (
                      <ChevronRight className="mx-2 w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: currentStep > 0 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentStep > 0 ? -20 : 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CurrentStepComponent
              data={stepData[currentStep]}
              onUpdate={handleStepUpdate}
              onNext={handleNext}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip/Exit Option */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-4 z-10"
      >
        <button
          onClick={() => {
            if (confirm('Are you sure you want to exit setup? Your progress will be saved.')) {
              router.push('/sophia')
            }
          }}
          className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          aria-label="Exit setup"
        >
          Save & Exit
        </button>
      </motion.div>
    </div>
  )
}