'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out Sophia',
    features: [
      '100 voice minutes/month',
      '1,000 words generated',
      '3 integrations',
      'Basic voice training',
      'Email support',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$49',
    period: '/month',
    description: 'For founders scaling their content',
    features: [
      '1,000 voice minutes/month',
      'Unlimited words generated',
      'All integrations',
      'Advanced voice training',
      'Custom writing styles',
      'Priority support',
      'API access',
    ],
    cta: 'Start Growing',
    popular: true,
  },
  {
    name: 'Scale',
    price: '$199',
    period: '/month',
    description: 'For teams and agencies',
    features: [
      'Unlimited voice minutes',
      'Unlimited everything',
      'Team collaboration',
      'Multiple voice profiles',
      'White-label options',
      'Custom integrations',
      'Dedicated success manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

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
            Usage-based pricing that{' '}
            <em className="font-serif italic bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              scales
            </em>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start free, upgrade when you need more power
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-white rounded-full border border-gray-200">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                billingPeriod === 'monthly'
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                billingPeriod === 'yearly'
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div 
                className={`h-full bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-purple-500 shadow-lg scale-[1.02]' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-bold text-gray-900">
                      {billingPeriod === 'yearly' && plan.price !== '$0'
                        ? `$${Math.floor(parseInt(plan.price.slice(1)) * 0.8)}`
                        : plan.price}
                    </span>
                    {plan.period !== 'forever' && (
                      <span className="text-gray-500">
                        {billingPeriod === 'yearly' ? '/month' : plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-6 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                      : 'bg-black hover:bg-gray-900 text-white'
                  }`}
                  onClick={() => window.location.href = '/sophia/onboarding'}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600">
            All plans include SSL, 99.9% uptime SLA, and GDPR compliance
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Questions? <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Chat with our team</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}