'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import { getAgentById } from '@/lib/data/agents'
import { CALENDAR_LINK } from '@/lib/constants'
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Activity,
  Zap,
  Calendar,
  Code2,
  Trophy,
  Clock,
  Target,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AgentDetailPage() {
  const params = useParams()
  const agentId = params?.id as string
  const agent = getAgentById(agentId)

  if (!agent) {
    notFound()
  }


  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-neutral-50/50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Team</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Agent Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Agent Header */}
              <div className="flex items-start gap-6 mb-8">
                {/* Avatar */}
                <div className="relative">
                  <div
                    className={cn(
                      'absolute inset-0 rounded-2xl blur-xl opacity-60',
                      'bg-gradient-to-br',
                      agent.avatarGradient
                    )}
                  />
                  <div
                    className={cn(
                      'relative w-24 h-24 rounded-2xl overflow-hidden',
                      'bg-gradient-to-br',
                      agent.gradient,
                      'shadow-xl'
                    )}
                  >
                    <Image
                      src={agent.avatarUrl}
                      alt={`${agent.name} - ${agent.role}`}
                      fill
                      className="object-cover"
                      style={{ objectPosition: '50% 1%' }}
                    />
                    {agent.status === 'active' && (
                      <div className="absolute bottom-1 right-1">
                        <div className="relative">
                          <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg" />
                          <motion.div
                            className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name and Status */}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-3">
                    {agent.name}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  </h1>
                  <p className="text-xl text-neutral-600 mb-3">{agent.role}</p>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <span className="text-sm text-neutral-500 font-medium">Working</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                {agent.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.entries(agent.stats).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl border border-neutral-200 p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-neutral-900">{value}</p>
                    <p className="text-xs text-neutral-500 mt-1 capitalize">
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .toLowerCase()
                        .replace(/^./, (str) => str.toUpperCase())}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'inline-flex items-center gap-2 px-8 py-4',
                  'bg-gradient-to-r text-white font-semibold rounded-lg',
                  agent.gradient,
                  'shadow-xl hover:shadow-2xl transition-all duration-300'
                )}
              >
                <Calendar className="w-5 h-5" />
                <span>Delegate Task to {agent.name}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Right Column - Capabilities & Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8"
            >
              {/* Capabilities */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Capabilities
                </h2>
                <ul className="space-y-3">
                  {agent.capabilities.map((capability, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{capability}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-600" />
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {agent.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Recent Projects */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Recent Projects
                </h2>
                <div className="space-y-4">
                  {agent.recentProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-l-2 border-neutral-200 pl-4 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-neutral-900">{project.title}</h3>
                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {project.date}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-2">{project.description}</p>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-600">{project.impact}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Current Activity */}
              <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Current Activity
                </h2>
                <p className="text-neutral-700 mb-3">{agent.currentTask}</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-1.5 h-1.5 bg-neutral-400 rounded-full"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-neutral-400 rounded-full"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-neutral-400 rounded-full"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                  <span className="text-xs text-neutral-500">Processing...</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-white to-neutral-50"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Work with {agent.name}?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let {agent.name} handle your {agent.role.toLowerCase()} tasks while you focus on strategic work.
          </p>
          <motion.a
            href={CALENDAR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule a Demo</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </motion.section>
    </main>
  )
}