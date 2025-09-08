'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  popular?: boolean
  color: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Perfect for solo founders getting started',
    features: [
      '5 content pieces per month',
      '3 integration connections',
      'Basic voice training',
      'Email support',
      'Standard templates'
    ],
    cta: 'Start Free Trial',
    color: 'from-gray-400 to-gray-500'
  },
  {
    name: 'Growth',
    price: '$299',
    period: '/month',
    description: 'For growing teams and content needs',
    features: [
      'Unlimited content creation',
      'All integrations included',
      'Advanced voice matching',
      'Priority support',
      'Custom templates',
      'Team collaboration',
      'Analytics dashboard'
    ],
    cta: 'Start Free Trial',
    popular: true,
    color: 'from-blue-500 to-purple-600'
  },
  {
    name: 'Scale',
    price: 'Custom',
    period: '',
    description: 'Enterprise-grade features and support',
    features: [
      'Everything in Growth',
      'Custom integrations',
      'Dedicated success manager',
      'SLA guarantees',
      'Advanced security features',
      'API access',
      'White-label options'
    ],
    cta: 'Contact Sales',
    color: 'from-purple-500 to-pink-500'
  }
]

export default function PricingPreview() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Choose the plan that fits your content creation needs
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">14-day free trial • No credit card required</span>
          </div>
        </motion.div>

        {/* Pricing Cards - Equal Height Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 equal-height-grid">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className="relative flex h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -4 }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-blue-700 to-purple-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 shadow-md">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card - Enhanced with micro-interactions */}
              <div className={`bg-white rounded-2xl ${tier.popular ? 'ring-2 ring-blue-600 shadow-lg' : 'border border-gray-200'} p-6 sm:p-8 h-full flex flex-col hover:shadow-xl transition-all duration-200 hover:scale-[1.01] card-interactive`}>
                {/* Header */}
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent mb-2`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    {tier.period && <span className="text-gray-600">{tier.period}</span>}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {tier.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  size="lg"
                  variant={tier.popular ? 'primary' : 'secondary'}
                  className={`w-full touch-target transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    tier.popular 
                      ? 'bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white shadow-md hover:shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 hover:shadow-md'
                  }`}
                >
                  {tier.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-600 mb-6">
            All plans include core Sophia features. Upgrade or downgrade anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-gray-700">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-gray-700">No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-gray-700">Secure payment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}