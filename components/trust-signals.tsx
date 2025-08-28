'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Users, CheckCircle2, Lock, TrendingUp } from 'lucide-react'

const trustItems = [
  {
    icon: Shield,
    label: 'SOC 2 Type II',
    description: 'Enterprise-grade security',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Users,
    label: '10,000+ Teams',
    description: 'Trust our platform daily',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Award,
    label: '99.9% Uptime',
    description: 'Guaranteed reliability',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Lock,
    label: 'Bank-level Encryption',
    description: '256-bit AES encryption',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: TrendingUp,
    label: '3x ROI',
    description: 'Average customer return',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: CheckCircle2,
    label: 'GDPR Compliant',
    description: 'Privacy first approach',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
]

export function TrustSignals() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of teams who rely on our AI agents to transform their workflows
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div className="text-center p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                  <div className={`inline-flex p-3 rounded-lg ${item.bgColor} mb-3`}>
                    <Icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {item.label}
                  </h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Customer Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-center text-sm text-gray-500 mb-8">
            Trusted by teams at world-class companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
              <div
                key={company}
                className="text-2xl font-bold text-gray-400"
                aria-label={`${company} logo`}
              >
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}