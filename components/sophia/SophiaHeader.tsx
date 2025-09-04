'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ScrollLink from './ScrollLink'

export default function SophiaHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#integrations', label: 'Integrations' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#demo', label: 'Demo' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo and Back */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Back to Cintra</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <Image
                src="/images/sophia-agent.png"
                alt="Sophia"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-bold text-lg text-gray-900">Sophia</span>
            </div>
          </div>

          {/* Center - Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </ScrollLink>
            ))}
          </nav>

          {/* Right - CTA */}
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              className="hidden sm:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </ScrollLink>
              ))}
              <Button
                size="sm"
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Get Started
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}