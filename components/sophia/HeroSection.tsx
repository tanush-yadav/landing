'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle } from 'lucide-react'
import SophiaCharacter, { SophiaEmotion } from './SophiaCharacter'

const speechBubbleMessages: { text: string; emotion: SophiaEmotion }[] = [
  { text: "Hi! I'm Sophia, your AI content agent", emotion: 'default' },
  { text: "I learn how you think and write", emotion: 'thinking' },
  { text: "Let's create something amazing together", emotion: 'thumbs-up' },
  { text: "Your voice, amplified by AI", emotion: 'writing' }
]

export default function HeroSection() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState<SophiaEmotion>('default')
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        const next = (prev + 1) % speechBubbleMessages.length
        setCurrentEmotion(speechBubbleMessages[next].emotion)
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleStartBuilding = () => {
    setIsNavigating(true)
    // Add a small delay for the animation
    setTimeout(() => {
      router.push('/sophia/onboarding')
    }, 300)
  }

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 md:py-24"
      animate={{ opacity: isNavigating ? 0.8 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Sophia Character with Speech Bubble */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isNavigating ? 0 : 1, 
            y: isNavigating ? -20 : 0,
            scale: isNavigating ? 1.1 : 1
          }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-8">
            <SophiaCharacter
              emotion={currentEmotion}
              size="large"
              floatingAnimation={!isNavigating}
              showSparkles={true}
            />
          </div>

          {/* Animated Speech Bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage}
              className="absolute -top-4 right-1/2 transform translate-x-1/2 md:translate-x-32 bg-white rounded-2xl shadow-lg px-6 py-3 max-w-xs transition-all duration-200 hover:shadow-xl"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 rotate-45 w-4 h-4 bg-white" />
              <p className="text-sm font-medium text-gray-700 relative z-10">
                {speechBubbleMessages[currentMessage].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Main Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-display font-bold text-gray-900 mb-6">
            Meet{' '}
            <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
              Sophia
            </span>
          </h1>
          <p className="text-body-lg md:text-heading-5 text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Your AI agent that learns your brain and creates authentic content in your voice
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={handleStartBuilding}
            disabled={isNavigating}
            className="group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 touch-target btn-interactive"
          >
            {isNavigating ? (
              <>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Taking you to onboarding...
                </motion.span>
              </>
            ) : (
              <>
                Start Building My Brain
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
          <Link
            href="#demo"
            className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] px-6 py-3 rounded-lg hover:bg-gray-50 touch-target-sm"
          >
            <MessageCircle className="w-5 h-5" />
            See Sophia in action
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}