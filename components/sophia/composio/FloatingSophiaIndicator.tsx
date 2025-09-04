'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'

interface FloatingSophiaIndicatorProps {
  scrollYProgress: MotionValue<number>
}

export default function FloatingSophiaIndicator({ scrollYProgress }: FloatingSophiaIndicatorProps) {
  // Transform scroll progress to position
  const y = useTransform(scrollYProgress, [0, 1], [100, 600])
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.div
      className="fixed right-8 z-50 pointer-events-none"
      style={{ y, opacity, scale }}
    >
      <div className="relative">
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Sophia Container */}
        <motion.div
          className="relative w-16 h-16 bg-white rounded-full shadow-2xl border-2 border-purple-200 flex items-center justify-center"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Sophia Image */}
          <Image
            src="/images/sophia-agent.png"
            alt="Sophia"
            width={40}
            height={40}
            className="object-contain"
          />

          {/* Sparkle Indicator */}
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
          </motion.div>
        </motion.div>

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-300"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </div>
    </motion.div>
  )
}