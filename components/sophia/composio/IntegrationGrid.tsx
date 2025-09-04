'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const integrations = [
  { name: 'Notion', category: 'Productivity' },
  { name: 'Linear', category: 'Project Management' },
  { name: 'Slack', category: 'Communication' },
  { name: 'Twitter', category: 'Social Media' },
  { name: 'LinkedIn', category: 'Social Media' },
  { name: 'Medium', category: 'Publishing' },
  { name: 'Substack', category: 'Publishing' },
  { name: 'Gmail', category: 'Email' },
  { name: 'Google Docs', category: 'Documents' },
  { name: 'WordPress', category: 'CMS' },
  { name: 'GitHub', category: 'Development' },
  { name: 'Discord', category: 'Communication' },
  { name: 'Telegram', category: 'Communication' },
  { name: 'Airtable', category: 'Database' },
  { name: 'Zapier', category: 'Automation' },
  { name: 'HubSpot', category: 'CRM' },
]

export default function IntegrationGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 bg-[#FAF9F7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            Connect in{' '}
            <em className="font-serif italic bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              one click
            </em>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sophia integrates with your entire stack, no engineering required
          </p>
        </motion.div>

        {/* Integration Grid */}
        <div className="relative">
          {/* Connection Lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {hoveredIndex !== null && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {integrations.map((_, index) => {
                  if (index === hoveredIndex) return null
                  const hoveredRow = Math.floor(hoveredIndex / 4)
                  const hoveredCol = hoveredIndex % 4
                  const currentRow = Math.floor(index / 4)
                  const currentCol = index % 4
                  
                  // Calculate positions
                  const x1 = hoveredCol * 25 + 12.5
                  const y1 = hoveredRow * 25 + 12.5
                  const x2 = currentCol * 25 + 12.5
                  const y2 = currentRow * 25 + 12.5
                  
                  return (
                    <line
                      key={index}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  )
                })}
              </motion.g>
            )}
          </svg>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                  {/* Placeholder for logo */}
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-transparent bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text">
                      {integration.name[0]}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {integration.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {integration.category}
                  </p>
                  
                  {/* Connected Indicator */}
                  <motion.div
                    className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="text-xs text-green-600 font-medium">
                      ✓ Ready to connect
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* More Integrations Coming */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500">
              + 30 more integrations •{' '}
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                Request an integration
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}