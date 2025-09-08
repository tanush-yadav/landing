'use client'

import { useState, useEffect } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

interface FloatingSophiaProps {
  scrollYProgress: MotionValue<number>
}

export default function FloatingSophia({ scrollYProgress }: FloatingSophiaProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  // Transform scroll progress to Sophia's position and rotation
  const sophiaY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const sophiaRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, -10])
  const sophiaScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  // Track mouse position for eye movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    // Show Sophia after a delay
    const timer = setTimeout(() => setIsVisible(true), 1000)

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [])

  // Calculate progress height before any returns
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed right-8 top-1/2 z-50 pointer-events-none hidden lg:block"
      style={{
        y: sophiaY,
        rotate: sophiaRotate,
        scale: sophiaScale,
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Sophia Container */}
        <div className="relative w-20 h-20">
          <Image
            src="/images/sophia-agent.png"
            alt="Sophia following scroll"
            width={80}
            height={80}
            className="object-contain"
          />
          
          {/* Eyes that follow mouse */}
          <motion.div
            className="absolute top-[30%] left-[30%] w-2 h-2"
            style={{
              x: mousePosition.x * 0.1,
              y: mousePosition.y * 0.1,
            }}
          >
            <div className="flex gap-2">
              <div className="w-1 h-1 bg-blue-600 rounded-full" />
              <div className="w-1 h-1 bg-blue-600 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Floating particles */}
        <motion.div
          className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full"
          animate={{
            y: [-5, 5, -5],
            x: [-2, 2, -2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full"
          animate={{
            y: [5, -5, 5],
            x: [2, -2, 2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Scroll progress indicator */}
      <motion.div
        className="absolute -left-8 top-1/2 transform -translate-y-1/2"
        style={{ opacity: sophiaScale }}
      >
        <div className="h-20 w-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"
            style={{
              height: progressHeight
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}