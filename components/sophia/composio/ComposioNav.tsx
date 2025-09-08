'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function ComposioNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/sophia" className="flex items-center gap-2">
            <Image
              src="/images/sophia-agent.png"
              alt="Sophia"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-xl font-bold text-gray-900">Sophia</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Features
            </Link>
            <Link href="#integrations" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Integrations
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="#demo" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Demo
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/sophia/login" className="hidden sm:inline-block text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Log in
            </Link>
            <Button
              onClick={() => window.location.href = '/sophia/onboarding'}
              className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-lg font-medium transition-all duration-200"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}