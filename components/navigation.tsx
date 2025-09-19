'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import Link from 'next/link'
import { Menu, X, Sparkles, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CALENDAR_LINK, CTA_TEXT } from '@/lib/constants'

const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems: Array<{
    label: string
    href: string
    icon: string
    description: string
  }> = [
    // { label: 'Agents', href: '/agents', icon: '🤖', description: 'Meet our AI team' },
    // {
    //   label: 'Sophia',
    //   href: '/sophia',
    //   icon: '✨',
    //   description: 'AI employee',
    // },
    // {
    //   label: 'Blog',
    //   href: '/blog',
    //   icon: '📚',
    //   description: 'Latest insights',
    // },
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
            'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            // Premium glassmorphism with subtle shadows
            isScrolled
              ? 'mt-3 mx-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200/50 shadow-premium'
              : 'mt-4 mx-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/30 shadow-lg',
            // Responsive width
            'w-full max-w-6xl'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-200',
              // Premium spacing
              isScrolled ? 'h-14 px-6' : 'h-16 px-8'
            )}
          >
            {/* Premium Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/"
                className={cn(
                  'flex items-center gap-2 text-xl font-semibold transition-all duration-200',
                  'text-slate-900 hover:text-slate-700'
                )}
                aria-label="Cintra Home"
              >
                Cintra
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
          

            {/* Premium Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className={cn(
                'inline-flex md:hidden items-center justify-center rounded-xl p-2.5 transition-all duration-200',
                'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:ring-offset-2',
                'text-slate-700 hover:bg-slate-100/50 hover:text-slate-900'
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
        {/* Premium Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Premium Mobile Menu Panel */}
        <div
          className={cn(
            'absolute right-4 top-4 bottom-4 w-full max-w-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            'bg-white/98 backdrop-blur-2xl border border-slate-200/60 shadow-premium-xl',
            'rounded-3xl overflow-hidden',
            isMobileMenuOpen
              ? 'translate-x-0 scale-100 opacity-100'
              : 'translate-x-full scale-95 opacity-0'
          )}
        >
          {/* Premium Header */}
          <div className="flex h-16 items-center justify-between px-6 bg-gradient-to-r from-white/60 to-white/40 border-b border-slate-200/30">
            <Link
              href="/"
              className="text-xl font-semibold text-slate-900 hover:text-slate-700 transition-all duration-200"
              onClick={closeMobileMenu}
            >
              Cintra
            </Link>
            <button
              onClick={closeMobileMenu}
              className="rounded-xl p-2 text-slate-700 hover:bg-slate-100/50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:ring-offset-0 transition-all duration-200"
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
                  className="block px-4 py-3.5 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-xl transition-all duration-200 hover:translate-x-1"
                  onClick={closeMobileMenu}
                  aria-label={item.label}
                >
                  <span className="inline-flex items-center gap-2">
                    {item.label === 'Sophia' && (
                      <Sparkles className="w-5 h-5 text-purple-500" />
                    )}
                    <span>{item.label}</span>
                    {item.label === 'Sophia' && (
                      <span className="ml-1 inline-flex items-center rounded-full bg-purple-50 text-purple-700 text-[10px] font-semibold px-1.5 py-0.5 ring-1 ring-purple-200 animate-pulse">
                        New
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>

            {/* Premium CTA Button - Mobile */}
            <div className="pt-4 border-t border-slate-200/30">
              <Link
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-slate-900 text-white text-base font-medium rounded-xl shadow-premium hover:shadow-premium-lg hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200"
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
