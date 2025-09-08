'use client'

import { motion } from 'framer-motion'
import { Twitter, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    handle: '@sarahchen',
    role: 'Founder, TechStart',
    content: "Sophia literally changed how I create content. What used to take me 3 hours now takes 15 minutes. And it actually sounds like ME.",
    avatar: 'SC',
    verified: true,
  },
  {
    name: 'Michael Rodriguez',
    handle: '@mrodriguez',
    role: 'CEO, DataFlow',
    content: "I was skeptical about AI content until Sophia. It learned my voice in a week and now handles all my blog posts and newsletters.",
    avatar: 'MR',
    verified: true,
  },
  {
    name: 'Emily Thompson',
    handle: '@ethompson',
    role: 'Founder, GrowthLab',
    content: "The voice training is incredible. Sophia captures not just what I say, but HOW I say it. My audience can't tell the difference.",
    avatar: 'ET',
    verified: true,
  },
  {
    name: 'David Park',
    handle: '@davidpark',
    role: 'Co-founder, DevTools Inc',
    content: "Best investment for content creation. Sophia helps me maintain a consistent presence without burning out.",
    avatar: 'DP',
    verified: true,
  },
  {
    name: 'Lisa Martinez',
    handle: '@lisamartinez',
    role: 'Founder, MarketPulse',
    content: "Game changer for founder-led content. I speak my thoughts, Sophia turns them into polished articles. Magic.",
    avatar: 'LM',
    verified: true,
  },
  {
    name: 'James Wilson',
    handle: '@jwilson',
    role: 'CEO, CloudScale',
    content: "Sophia understands context better than any AI I've tried. It remembers previous conversations and builds on them.",
    avatar: 'JW',
    verified: true,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
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
            Founders{' '}
            <em className="font-serif italic text-gray-400">love</em>
            {' '}Sophia
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of founders creating authentic content at scale
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.handle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-transparent bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      {testimonial.verified && (
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{testimonial.handle}</p>
                  </div>
                </div>
                <Twitter className="w-5 h-5 text-gray-400" />
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling Testimonials Feed */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`scroll-${index}`}
                className="flex-shrink-0 bg-[#FAF9F7] rounded-xl p-4 w-80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-transparent bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.handle}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {testimonial.content}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Fix for Check icon
function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}