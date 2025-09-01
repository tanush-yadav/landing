'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight, Sparkles, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CALENDAR_LINK, CTA_TEXT } from '@/lib/constants'

const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    // { label: 'Agents', href: '/agents', icon: '🤖', description: 'Meet our AI team' },
    {
      label: 'Blog',
      href: '/blog',
      icon: '📚',
      description: 'Latest insights',
    },
  ]

  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY

    // Determine if scrolled
    setIsScrolled(currentScrollY > 10)

    // Show/hide logic
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down & past 100px
      setIsVisible(false)
    } else {
      // Scrolling up or at top
      setIsVisible(true)
    }

    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [controlNavbar])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex justify-center',
          'transform-gpu' // GPU acceleration
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        <nav
          className={cn(
            'transition-all duration-500 ease-out',
            // Enhanced glassy card styling that changes on scroll
            isScrolled
              ? 'mt-2 mx-3 sm:mt-4 sm:mx-4 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-none md:shadow-2xl shadow-black/10 ring-1 ring-gray-200/20'
              : 'mt-3 mx-3 sm:mt-6 sm:mx-4 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-xl border border-white/40 shadow-none md:shadow-xl shadow-black/5 ring-1 ring-white/20',
            // Responsive width
            'w-full max-w-5xl'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-300',
              // Adaptive padding based on scroll state
              isScrolled ? 'h-12 px-4 sm:h-14 sm:px-6' : 'h-14 px-4 sm:h-16 sm:px-6'
            )}
          >
            {/* Enhanced Logo with Animation */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className={cn(
                  'flex items-center gap-2 text-xl font-bold transition-all duration-300',
                  isScrolled
                    ? 'text-gray-900'
                    : 'text-gray-900 drop-shadow-sm font-semibold'
                )}
                aria-label="Cintra Home"
              >
                Cintra
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {/* Simplified Nav */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:scale-105',
                      isScrolled
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/20 drop-shadow-sm font-medium'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                className="ml-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={CALENDAR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
                    'text-sm font-semibold transition-all duration-300',
                    'shadow-lg hover:shadow-xl',
                    isScrolled
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 backdrop-blur-sm'
                  )}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{CTA_TEXT}</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className={cn(
                'inline-flex md:hidden items-center justify-center rounded-xl p-2.5 transition-all duration-300',
                'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100/60 focus:ring-gray-500'
                  : 'text-gray-700 hover:bg-white/20 backdrop-blur-sm drop-shadow-sm focus:ring-gray-400'
              )}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Enhanced Backdrop with stronger blur */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Glassy Menu Panel */}
        <div
          className={cn(
            'absolute right-4 top-4 bottom-4 w-full max-w-sm transition-all duration-300',
            'bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-2xl shadow-black/10',
            'rounded-2xl overflow-hidden',
            isMobileMenuOpen
              ? 'translate-x-0 scale-100'
              : 'translate-x-full scale-95'
          )}
        >
          {/* Header with glassy effect */}
          <div className="flex h-16 items-center justify-between px-6 bg-gradient-to-r from-white/50 to-white/30 border-b border-gray-200/40">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:scale-105 transition-transform duration-200"
              onClick={closeMobileMenu}
            >
              Cintra
            </Link>
            <button
              onClick={closeMobileMenu}
              className="rounded-xl p-2 text-gray-700 hover:bg-gray-100/60 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-0 transition-all duration-200"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Content */}
          <nav className="px-6 py-6 space-y-6">
            {/* Simplified Nav - Mobile */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/60 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button - Mobile */}
            <div className="pt-4 border-t border-gray-200/40">
              <Link
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <Calendar className="w-5 h-5" />
                <span>{CTA_TEXT}</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
})

Navigation.displayName = 'Navigation'

export default Navigation
