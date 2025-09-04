'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Lock, Database, UserCheck, Award, Eye } from 'lucide-react'
import Image from 'next/image'

interface TrustSignal {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  sophiaReaction: string
}

const trustSignals: TrustSignal[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'SOC 2 Type II',
    description: 'Enterprise-grade security audited annually',
    badge: 'Certified',
    sophiaReaction: 'Your data is safe with me!'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'GDPR Compliant',
    description: 'Full compliance with European data protection',
    badge: 'Compliant',
    sophiaReaction: 'Privacy first, always!'
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'No Training on Your Data',
    description: 'Your content never trains AI models',
    badge: 'Guaranteed',
    sophiaReaction: 'Your secrets stay yours!'
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: 'API Only Access',
    description: 'Read-only permissions, no data modification',
    badge: 'Read-Only',
    sophiaReaction: 'I only observe, never change!'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'ISO 27001',
    description: 'International security management standard',
    badge: 'Certified',
    sophiaReaction: 'Top-tier security!'
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Full Transparency',
    description: 'See exactly what data Sophia accesses',
    badge: 'Transparent',
    sophiaReaction: 'Nothing hidden!'
  }
]

export default function TrustSignalsSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trust & Security First
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your data security is our top priority. Sophia is built with enterprise-grade protection.
          </p>
        </motion.div>

        {/* Trust Signals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustSignals.map((signal, index) => (
            <motion.div
              key={signal.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 h-full">
                {/* Badge */}
                {signal.badge && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {signal.badge}
                  </div>
                )}

                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {signal.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {signal.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {signal.description}
                </p>

                {/* Sophia Reaction on Hover */}
                <motion.div
                  className="absolute -bottom-2 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-3 py-2">
                    <Image
                      src="/images/sophia-agent.png"
                      alt="Sophia"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    <span className="text-xs text-gray-700 italic">
                      {signal.sophiaReaction}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Stats */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">256-bit</p>
              <p className="text-sm text-gray-600 mt-1">AES Encryption</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">99.9%</p>
              <p className="text-sm text-gray-600 mt-1">Uptime SLA</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">24/7</p>
              <p className="text-sm text-gray-600 mt-1">Security Monitoring</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600 mt-1">Data Breaches</p>
            </div>
          </div>
        </motion.div>

        {/* Compliance Logos */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center items-center gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-gray-400 font-semibold text-sm">TRUSTED BY</div>
          {['SOC2', 'GDPR', 'ISO', 'CCPA', 'HIPAA'].map((compliance, index) => (
            <motion.div
              key={compliance}
              className="bg-white rounded-lg shadow-sm px-6 py-3 text-gray-600 font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {compliance}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}