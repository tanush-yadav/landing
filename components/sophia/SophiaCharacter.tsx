'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export type SophiaEmotion = 'default' | 'confused' | 'thinking' | 'thumbs-up' | 'writing'

interface SophiaCharacterProps {
  emotion?: SophiaEmotion
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  showSparkles?: boolean
  floatingAnimation?: boolean
  className?: string
  autoRotateEmotions?: boolean
  rotationInterval?: number
  onEmotionChange?: (emotion: SophiaEmotion) => void
  presentationMode?: 'default' | 'hero' | 'compact'
  showPulse?: boolean
}

const emotionPaths: Record<SophiaEmotion, string> = {
  'default': '/images/sophia-agent.png',
  'confused': '/images/sophia-reactions/confused.jpeg',
  'thinking': '/images/sophia-reactions/thinking.jpeg',
  'thumbs-up': '/images/sophia-reactions/thumbs-up.jpeg',
  'writing': '/images/sophia-reactions/writing.jpeg'
}

const sizeMap = {
  small: { width: 96, height: 96, sparkleSize: 'w-3 h-3' },
  medium: { width: 144, height: 144, sparkleSize: 'w-4 h-4' },
  large: { width: 192, height: 192, sparkleSize: 'w-6 h-6' },
  xlarge: { width: 256, height: 256, sparkleSize: 'w-8 h-8' }
}

export default function SophiaCharacter({
  emotion = 'default',
  size = 'medium',
  showSparkles = true,
  floatingAnimation = true,
  className = '',
  autoRotateEmotions = false,
  rotationInterval = 5000,
  onEmotionChange,
  presentationMode = 'default',
  showPulse = false
}: SophiaCharacterProps) {
  const [currentEmotion, setCurrentEmotion] = useState<SophiaEmotion>(emotion)
  const [imageError, setImageError] = useState(false)
  const dimensions = sizeMap[size]

  useEffect(() => {
    if (!autoRotateEmotions) {
      setCurrentEmotion(emotion)
      return
    }

    const emotions = Object.keys(emotionPaths) as SophiaEmotion[]
    let currentIndex = emotions.indexOf(currentEmotion)

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % emotions.length
      const newEmotion = emotions[currentIndex]
      setCurrentEmotion(newEmotion)
      onEmotionChange?.(newEmotion)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [autoRotateEmotions, rotationInterval, emotion, onEmotionChange])

  const floatingVariants = {
    floating: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    static: {
      y: 0
    },
    bounce: {
      y: [0, -8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const sparkleVariants = {
    animate: (custom: number) => ({
      rotate: custom === 0 ? 360 : -360,
      scale: [1, 1.3, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: custom === 0 ? 3 : 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom * 0.5
      }
    })
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Pulse effect for hero mode */}
      {showPulse && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          style={{ filter: 'blur(20px)' }}
        />
      )}
      
      <motion.div
        className="relative"
        variants={floatingAnimation ? floatingVariants : undefined}
        animate={floatingAnimation ? (presentationMode === 'hero' ? "bounce" : "floating") : "static"}
        whileHover={floatingAnimation ? { scale: 1.05 } : { scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEmotion}
            initial={{ opacity: 0, scale: 0.9, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 180 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200
            }}
          >
            <Image
              src={emotionPaths[currentEmotion]}
              alt={`Sophia ${currentEmotion}`}
              width={dimensions.width}
              height={dimensions.height}
              className={`object-contain rounded-2xl transition-all duration-300 ${
                presentationMode === 'hero' 
                  ? 'drop-shadow-[0_20px_50px_rgba(59,130,246,0.15)]' 
                  : 'drop-shadow-2xl'
              }`}
              priority
              quality={90}
              onError={() => setImageError(true)}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            />
          </motion.div>
        </AnimatePresence>

        {showSparkles && (
          <>
            <motion.div
              className={`absolute -top-2 -right-2 ${dimensions.sparkleSize} text-yellow-400 drop-shadow-lg`}
              custom={0}
              variants={sparkleVariants}
              animate="animate"
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
            <motion.div
              className={`absolute -bottom-2 -left-2 ${dimensions.sparkleSize} text-blue-400 drop-shadow-lg`}
              custom={1}
              variants={sparkleVariants}
              animate="animate"
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
            <motion.div
              className={`absolute top-1/2 -right-3 ${dimensions.sparkleSize} text-purple-400 drop-shadow-lg`}
              custom={2}
              variants={sparkleVariants}
              animate="animate"
            >
              <Sparkles className="w-full h-full scale-75" />
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}