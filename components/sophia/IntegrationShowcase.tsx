'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { 
  FileText, MessageSquare, Video, Calendar, 
  Code, Database, Globe, Mail,
  BookOpen, Music, Chrome, Github
} from 'lucide-react'

interface Integration {
  name: string
  icon: React.ReactNode
  color: string
  ring: number
  angle: number
}

const integrations: Integration[] = [
  // Primary Sources (Ring 1)
  { name: 'Notion', icon: <FileText className="w-6 h-6" />, color: 'bg-gray-800', ring: 1, angle: 0 },
  { name: 'Zoom', icon: <Video className="w-6 h-6" />, color: 'bg-blue-500', ring: 1, angle: 90 },
  { name: 'Drive', icon: <Database className="w-6 h-6" />, color: 'bg-green-500', ring: 1, angle: 180 },
  { name: 'Slack', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-purple-500', ring: 1, angle: 270 },
  
  // Social (Ring 2)
  { name: 'LinkedIn', icon: <Globe className="w-5 h-5" />, color: 'bg-blue-600', ring: 2, angle: 45 },
  { name: 'Twitter', icon: <MessageSquare className="w-5 h-5" />, color: 'bg-sky-400', ring: 2, angle: 135 },
  { name: 'GitHub', icon: <Github className="w-5 h-5" />, color: 'bg-gray-900', ring: 2, angle: 225 },
  { name: 'Email', icon: <Mail className="w-5 h-5" />, color: 'bg-red-500', ring: 2, angle: 315 },
  
  // Consumption (Ring 3)
  { name: 'Kindle', icon: <BookOpen className="w-4 h-4" />, color: 'bg-orange-500', ring: 3, angle: 30 },
  { name: 'Spotify', icon: <Music className="w-4 h-4" />, color: 'bg-green-400', ring: 3, angle: 90 },
  { name: 'Chrome', icon: <Chrome className="w-4 h-4" />, color: 'bg-yellow-500', ring: 3, angle: 150 },
  { name: 'Calendar', icon: <Calendar className="w-4 h-4" />, color: 'bg-indigo-500', ring: 3, angle: 210 },
  { name: 'Code', icon: <Code className="w-4 h-4" />, color: 'bg-pink-500', ring: 3, angle: 270 },
]

export default function IntegrationShowcase() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const getOrbitRadius = (ring: number) => {
    const radiuses = [0, 120, 200, 280] // Distance from center for each ring
    return radiuses[ring]
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Connects to Everything
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sophia integrates with all your tools to learn from every interaction
          </p>
        </motion.div>

        {/* Orbital Integration Display */}
        <motion.div
          className="relative h-[600px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Center - Sophia */}
          <motion.div
            className="absolute z-20"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center">
                <Image
                  src="/images/sophia-agent.png"
                  alt="Sophia at center"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" />
            </div>
          </motion.div>

          {/* Orbital Rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute border border-gray-200 rounded-full"
              style={{
                width: `${getOrbitRadius(ring) * 2}px`,
                height: `${getOrbitRadius(ring) * 2}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { 
                opacity: 0.3, 
                scale: 1,
                rotate: ring % 2 === 0 ? 360 : -360
              } : {}}
              transition={{ 
                opacity: { duration: 0.6, delay: ring * 0.2 },
                scale: { duration: 0.6, delay: ring * 0.2 },
                rotate: { duration: 60 + ring * 10, repeat: Infinity, ease: "linear" }
              }}
            />
          ))}

          {/* Integration Icons */}
          {integrations.map((integration, index) => {
            const radius = getOrbitRadius(integration.ring)
            const angleInRadians = (integration.angle * Math.PI) / 180
            const x = Math.cos(angleInRadians) * radius
            const y = Math.sin(angleInRadians) * radius

            return (
              <motion.div
                key={integration.name}
                className="absolute"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5 + index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Integration Icon */}
                  <div className={`w-12 h-12 ${integration.color} rounded-xl shadow-lg flex items-center justify-center text-white cursor-pointer`}>
                    {integration.icon}
                  </div>

                  {/* Tooltip on Hover */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {integration.name}
                    </div>
                  </div>

                  {/* Connection Line to Center */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-px bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-left"
                    style={{
                      height: '1px',
                      width: `${radius}px`,
                      transform: `translate(-50%, -50%) rotate(${integration.angle + 180}deg)`,
                    }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
                  />
                </motion.div>
              </motion.div>
            )
          })}

          {/* Sophia Reactions to Hover - Add small reaction bubbles */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <p className="text-sm text-gray-500 italic">
              Hover over integrations to see connections
            </p>
          </motion.div>
        </motion.div>

        {/* Integration Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">20+</p>
            <p className="text-sm text-gray-600 mt-1">Native Integrations</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">∞</p>
            <p className="text-sm text-gray-600 mt-1">API Connections</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">24/7</p>
            <p className="text-sm text-gray-600 mt-1">Always Learning</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}