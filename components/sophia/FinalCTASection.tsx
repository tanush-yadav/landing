'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, FileText, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FinalCTASection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden" ref={containerRef}>
      {/* Background Decorations */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Sophia Animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block relative"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/images/sophia-agent.png"
              alt="Sophia ready to help"
              width={120}
              height={120}
              className="object-contain mx-auto"
            />
            {/* Sparkles around Sophia */}
            <motion.div
              className="absolute -top-2 -left-2"
              animate={{
                rotate: 360,
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -right-2"
              animate={{
                rotate: -360,
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready to{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Amplify Your Voice?
          </span>
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Join thousands of founders who are creating authentic content at scale with Sophia. 
          Start your free trial today and see the difference AI-powered content creation can make.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200"
          >
            Start Building My Brain
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Link
            href="#demo"
            className="px-8 py-6 text-lg font-semibold bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group"
          >
            <Calendar className="w-5 h-5" />
            Book a Demo
            <ArrowRight className="w-5 h-5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>

        {/* Documentation Link */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="underline underline-offset-4">View Documentation</span>
          </Link>
        </motion.div>

        {/* Final Sophia Message */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-block relative">
            <div className="bg-white rounded-2xl shadow-lg px-6 py-4">
              <p className="text-gray-700 italic flex items-center gap-2">
                <Image
                  src="/images/sophia-agent.png"
                  alt="Sophia"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                &ldquo;I can&apos;t wait to help you create amazing content!&rdquo;
              </p>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}