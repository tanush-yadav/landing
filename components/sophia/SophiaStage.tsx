'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SophiaStageProps {
  children: ReactNode
  variant?: 'floating' | 'standing' | 'presenting'
  showLights?: boolean
  showStage?: boolean
  className?: string
}

export default function SophiaStage({
  children,
  variant = 'standing',
  showLights = true,
  showStage = true,
  className = ''
}: SophiaStageProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Stage lighting effects */}
      {showLights && (
        <>
          {/* Spotlight from above */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-blue-200/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Side lights */}
          <motion.div
            className="absolute top-1/2 -left-20 transform -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-300/20 to-transparent rounded-full blur-2xl pointer-events-none"
            animate={{
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          <motion.div
            className="absolute top-1/2 -right-20 transform -translate-y-1/2 w-64 h-64 bg-gradient-to-l from-blue-300/20 to-transparent rounded-full blur-2xl pointer-events-none"
            animate={{
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}
      
      {/* Stage/Platform */}
      {showStage && variant === 'standing' && (
        <>
          {/* Stage surface */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-4 bg-gradient-to-r from-gray-200/50 via-gray-100/50 to-gray-200/50 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          {/* Stage depth/3D effect */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-2 bg-gradient-to-r from-gray-300/30 via-gray-200/30 to-gray-300/30 rounded-full blur-sm"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transform: 'translateX(-50%) translateY(2px)' }}
          />
          
          {/* Dynamic shadow */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-black/20 rounded-full blur-lg"
            animate={{
              scaleX: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
      
      {/* Floating particles for presenting mode */}
      {variant === 'presenting' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
              initial={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100
              }}
              animate={{
                x: Math.random() * 200 - 100,
                y: [0, -50, 0],
                opacity: [0.6, 0.2, 0.6]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}