'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import SophiaReactions from '@/components/sophia/SophiaReactions'
import ProgressIndicator from './components/ProgressIndicator'

// Step One Components
import BrandWebsite from './components/StepOne/BrandWebsite'
import IntegrationsSetup from './components/StepOne/IntegrationsSetup'
import WhatYouConsume from './components/StepOne/WhatYouConsume'
import BrandNarratives from './components/StepOne/BrandNarratives'
import SocialPresence from './components/StepOne/SocialPresence'
import StyleGuide from './components/StepOne/StyleGuide'
import BrandGlossary from './components/StepOne/BrandGlossary'

// Step Two Components
import TitleSelector from './components/StepTwo/TitleSelector'
import ContentEditor from './components/StepTwo/ContentEditor'
import CookingAnimation from './components/StepTwo/CookingAnimation'

// Step Three Components
import DeliveryOptions from './components/StepThree/DeliveryOptions'

const TOTAL_STEPS = 12 // 8 sub-steps in Step 1 (including brand website and glossary), 2 in Step 2, 1 cooking, 1 in Step 3

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState({})
  const [isCooking, setIsCooking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [sophiaMessage, setSophiaMessage] = useState(
    "Welcome! Let's get to know each other better."
  )

  useEffect(() => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem('sophia-onboarding-progress')
    if (savedProgress) {
      const { step, data } = JSON.parse(savedProgress)
      setCurrentStep(step)
      setOnboardingData(data)
    }
  }, [])

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem(
      'sophia-onboarding-progress',
      JSON.stringify({ step: currentStep, data: onboardingData })
    )
  }, [currentStep, onboardingData])

  const handleNext = () => {
    setIsTyping(true)
    setTimeout(() => setIsTyping(false), 1000)

    if (currentStep === 8) {
      // After content editor, show cooking animation
      setIsCooking(true)
      setTimeout(() => {
        setIsCooking(false)
        setCurrentStep(currentStep + 1)
      }, 5000)
    } else {
      setCurrentStep(Math.min(currentStep + 1, TOTAL_STEPS - 1))
    }
  }

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 0))
  }

  const updateData = (key: string, value: any) => {
    setOnboardingData((prev) => ({ ...prev, [key]: value }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BrandWebsite
            onUpdate={updateData}
            data={onboardingData}
            setSophiaMessage={setSophiaMessage}
          />
        )
      case 1:
        return (
          <IntegrationsSetup
            onUpdate={updateData}
            data={onboardingData}
            setSophiaMessage={setSophiaMessage}
          />
        )
      case 2:
        return (
          <WhatYouConsume
            onUpdate={updateData}
            data={onboardingData}
            setSophiaMessage={setSophiaMessage}
          />
        )
      case 3:
        return (
          <BrandNarratives
            onUpdate={updateData}
            data={onboardingData}
            setSophiaMessage={setSophiaMessage}
          />
        )
      case 4:
        return (
          <SocialPresence
            onUpdate={updateData}
            data={onboardingData}
            setSophiaMessage={setSophiaMessage}
          />
        )
      case 5:
        return (
          <StyleGuide
            onUpdate={updateData}
            data={onboardingData}
            setSophiaMessage={setSophiaMessage}
          />
        )
      case 6:
        return (
          <BrandGlossary
            onUpdate={updateData}
            data={onboardingData}
            setSophiaMessage={setSophiaMessage}
          />
        )
      case 7:
        return (
          <TitleSelector
            onUpdate={updateData}
            data={onboardingData}
            setSophiaMessage={setSophiaMessage}
          />
        )
      case 8:
        return (
          <ContentEditor
            onUpdate={updateData}
            data={onboardingData}
            setSophiaMessage={setSophiaMessage}
          />
        )
      case 9:
        return (
          <DeliveryOptions
            onUpdate={updateData}
            data={onboardingData}
            setSophiaMessage={setSophiaMessage}
          />
        )
      default:
        return null
    }
  }

  const getStepTitle = () => {
    if (currentStep <= 6) return "Share Your Brain's Context"
    if (currentStep <= 8) return 'Your First Fire Piece'
    return 'How Do You Want This Dish Served?'
  }

  const getMainStep = () => {
    if (currentStep <= 6) return 1
    if (currentStep <= 8) return 2
    return 3
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {isCooking ? (
          <CookingAnimation />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen"
          >
            {/* Clean Header */}
            <div className="bg-white border-b border-gray-200">
              <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Link
                      href="/sophia"
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-150"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div className="h-6 w-px bg-gray-300" />
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">
                        Share your brain's context
                      </h1>
                      <p className="text-sm text-gray-500">
                        Step {getMainStep()} of 3
                      </p>
                    </div>
                  </div>
                  <ProgressIndicator
                    currentStep={currentStep}
                    totalSteps={TOTAL_STEPS}
                  />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12 pb-32">
              {/* Step Title */}
              {/* <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {getStepTitle()}
                </h2>
                <p className="text-gray-600">
                  Let's personalize your experience with Sophia
                </p>
              </div> */}

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 min-h-[400px]"
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-150',
                    currentStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentStep === TOTAL_STEPS - 1}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-150',
                    currentStep === TOTAL_STEPS - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  )}
                >
                  {currentStep === 7 ? 'Generate Content' : 'Continue'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sophia Reactions at Bottom */}
            <SophiaReactions currentStep={currentStep} isTyping={isTyping} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
