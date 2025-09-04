'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react'

const speechBubbleMessages = [
  "Hi! I'm Sophia, your AI content agent",
  "I learn how you think and write",
  "Let's create something amazing together",
  "Your voice, amplified by AI"
]

export default function HeroSection() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % speechBubbleMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sophia Character with Speech Bubble */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative w-48 h-48 mx-auto mb-8"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/images/sophia-agent.png"
              alt="Sophia AI Agent"
              width={192}
              height={192}
              className="object-contain"
              priority
            />
            
            {/* Sparkles around Sophia */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{
                rotate: -360,
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
            </motion.div>
          </motion.div>

          {/* Animated Speech Bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage}
              className="absolute -top-4 right-1/2 transform translate-x-1/2 md:translate-x-32 bg-white rounded-2xl shadow-lg px-6 py-3 max-w-xs"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 rotate-45 w-4 h-4 bg-white" />
              <p className="text-sm font-medium text-gray-700 relative z-10">
                {speechBubbleMessages[currentMessage]}
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
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            Meet{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sophia
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
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
            className="group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200"
          >
            Start Building My Brain
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Link
            href="#demo"
            className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors"
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
    </section>
  )
}