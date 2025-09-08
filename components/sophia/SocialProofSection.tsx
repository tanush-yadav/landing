'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: number
  author: string
  role: string
  company: string
  content: string
  rating: number
  sophiaReaction: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    author: 'Alex Thompson',
    role: 'CEO',
    company: 'TechStart Inc',
    content: 'Sophia transformed how I share knowledge. What used to take hours now takes minutes, and it sounds exactly like me.',
    rating: 5,
    sophiaReaction: '🥰'
  },
  {
    id: 2,
    author: 'Maria Garcia',
    role: 'Content Lead',
    company: 'GrowthLabs',
    content: 'The voice matching is uncanny. My audience can\'t tell the difference between content I write and what Sophia creates.',
    rating: 5,
    sophiaReaction: '✨'
  },
  {
    id: 3,
    author: 'James Chen',
    role: 'Founder',
    company: 'DataFlow',
    content: 'Finally, an AI that understands context and nuance. Sophia gets my technical explanations right every time.',
    rating: 5,
    sophiaReaction: '🚀'
  },
  {
    id: 4,
    author: 'Sarah Williams',
    role: 'Marketing Director',
    company: 'ScaleUp',
    content: 'Sophia helped us 10x our content output without sacrificing quality. It\'s like having a whole content team.',
    rating: 5,
    sophiaReaction: '💪'
  },
  {
    id: 5,
    author: 'David Park',
    role: 'VP Engineering',
    company: 'CloudBase',
    content: 'The integration with our tools was seamless. Sophia just plugged in and started creating value immediately.',
    rating: 5,
    sophiaReaction: '🎯'
  },
  {
    id: 6,
    author: 'Lisa Anderson',
    role: 'Founder',
    company: 'CreativeAI',
    content: 'I was skeptical at first, but Sophia truly captures my voice. It\'s like having a digital twin that writes for me.',
    rating: 5,
    sophiaReaction: '🤝'
  }
]

export default function SocialProofSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Innovators
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Join thousands of founders who trust Sophia with their voice
          </p>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-gray-600">4.9/5 from 1000+ users</p>
        </motion.div>

        {/* Scrolling Testimonials */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <motion.div
            className="flex gap-6"
            animate={{
              x: isPaused ? 0 : [-1400, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[400px]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: (index % testimonials.length) * 0.1 }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 h-full hover:shadow-xl transition-all duration-300">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{testimonial.author}</p>
                        <p className="text-xs text-gray-600">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>

                    {/* Sophia Reaction */}
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/sophia-agent.png"
                        alt="Sophia reaction"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      <span className="text-lg">{testimonial.sophiaReaction}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">10K+</p>
            <p className="text-sm text-gray-600 mt-1">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">1M+</p>
            <p className="text-sm text-gray-600 mt-1">Content Created</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">50M+</p>
            <p className="text-sm text-gray-600 mt-1">Words Generated</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">98%</p>
            <p className="text-sm text-gray-600 mt-1">Satisfaction Rate</p>
          </div>
        </motion.div>

        {/* Social Interactions */}
        <motion.div
          className="mt-12 flex justify-center items-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">12.5K Likes</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Join Community</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}