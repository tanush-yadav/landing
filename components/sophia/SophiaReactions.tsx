'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const stepMessages = {
  0: { image: 'thinking', message: "Let's connect your tools..." },
  1: { image: 'writing', message: "Tell me how you communicate..." },
  2: { image: 'thinking', message: "What content inspires you?" },
  3: { image: 'writing', message: "Share your brand story..." },
  4: { image: 'thinking', message: "Show me your social presence..." },
  5: { image: 'thumbs-up', message: "Your style is unique!" },
  6: { image: 'writing', message: "Pick a compelling title..." },
  7: { image: 'writing', message: "Let's craft your content..." },
  8: { image: 'thumbs-up', message: "Almost there!" },
  9: { image: 'thumbs-up', message: "Perfect! You're all set!" },
}

const reactionImages = {
  thinking: '/images/sophia-reactions/thinking.jpeg',
  writing: '/images/sophia-reactions/writing.jpeg',
  'thumbs-up': '/images/sophia-reactions/thumbs-up.jpeg',
  confused: '/images/sophia-reactions/confused.jpeg',
}

interface SophiaReactionsProps {
  className?: string
  currentStep?: number
  isTyping?: boolean
}

export default function SophiaReactions({ className, currentStep = 0, isTyping = false }: SophiaReactionsProps) {
  const [showTypingIndicator, setShowTypingIndicator] = useState(false)
  
  // Get the appropriate message and image for the current step
  const stepData = stepMessages[currentStep as keyof typeof stepMessages] || {
    image: 'thinking',
    message: "I'm here to help!"
  }
  
  const currentImage = reactionImages[stepData.image as keyof typeof reactionImages]

  useEffect(() => {
    if (isTyping) {
      setShowTypingIndicator(true)
      const timer = setTimeout(() => setShowTypingIndicator(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isTyping, currentStep])

  return (
    <div className={cn("fixed bottom-6 left-6 z-30", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="flex items-end gap-3"
        >
          {/* Sophia Reaction Image */}
          <motion.div 
            className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={currentImage}
              alt="Sophia"
              width={96}
              height={96}
              className="object-cover w-full h-full"
              priority
            />
          </motion.div>

          {/* Speech Bubble */}
          <AnimatePresence mode="wait">
            {!showTypingIndicator ? (
              <motion.div
                key={`message-${currentStep}`}
                initial={{ scale: 0, opacity: 0, x: -10 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="relative bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2.5 max-w-[200px]"
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[5px] w-2.5 h-2.5 bg-white border-l border-b border-gray-200 rotate-45" />
                <p className="text-sm text-gray-700 relative z-10">
                  {stepData.message}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="typing"
                initial={{ scale: 0, opacity: 0, x: -10 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 max-w-[200px]"
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[5px] w-2.5 h-2.5 bg-white border-l border-b border-gray-200 rotate-45" />
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}