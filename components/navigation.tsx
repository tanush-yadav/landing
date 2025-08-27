'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const primaryNavItems = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Security', href: '/security' },
    { label: 'Careers', href: '/careers' },
    { label: 'Enterprise', href: '/enterprise' },
  ]

  const secondaryNavItems = [
    { label: 'Docs', href: '/docs' },
    { label: 'Community', href: '/community' },
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
      <header
        className={cn(
          'fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out',
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        )}
      >
        <nav className={cn(
          'transition-all duration-500 ease-out',
          // Enhanced glassy card styling that changes on scroll
          isScrolled 
            ? 'mt-4 mx-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl shadow-black/10 ring-1 ring-gray-200/20' 
            : 'mt-6 mx-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 ring-1 ring-white/20',
          // Responsive width
          'w-[calc(100vw-2rem)] max-w-5xl'
        )}>
          <div className={cn(
            'flex items-center justify-between transition-all duration-300',
            // Adaptive padding based on scroll state
            isScrolled ? 'h-14 px-6' : 'h-16 px-6'
          )}>
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className={cn(
                  'text-xl font-bold transition-all duration-300 hover:scale-105',
                  isScrolled ? 'text-gray-900' : 'text-gray-900 drop-shadow-sm font-semibold'
                )}
                aria-label="Volition Home"
              >
                Volition
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {/* Primary Nav */}
              <div className="flex items-center space-x-1">
                {primaryNavItems.map((item) => (
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

              {/* Glassy Divider */}
              <div className={cn(
                'mx-4 h-5 w-px transition-colors duration-300',
                isScrolled ? 'bg-gray-300/60' : 'bg-gray-400/40'
              )} />

              {/* Secondary Nav */}
              <div className="flex items-center space-x-1 mr-4">
                {secondaryNavItems.map((item) => (
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
                
              {/* Login Button with Glassy Effect */}
              <Link
                href="/login"
                className={cn(
                  'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300',
                  'hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
                  isScrolled
                    ? 'bg-gray-900/90 text-white hover:bg-gray-900 shadow-lg shadow-gray-900/20 focus:ring-gray-500'
                    : 'bg-gray-900/80 text-white hover:bg-gray-900/90 backdrop-blur-sm border border-gray-700/30 shadow-lg shadow-gray-900/20 focus:ring-gray-400'
                )}
              >
                Login
                <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
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
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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
            isMobileMenuOpen ? 'translate-x-0 scale-100' : 'translate-x-full scale-95'
          )}
        >
          {/* Header with glassy effect */}
          <div className="flex h-16 items-center justify-between px-6 bg-gradient-to-r from-white/50 to-white/30 border-b border-gray-200/40">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:scale-105 transition-transform duration-200"
              onClick={closeMobileMenu}
            >
              Volition
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
            {/* Primary Nav - Mobile */}
            <div className="space-y-2">
              {primaryNavItems.map((item) => (
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

            {/* Glassy Divider */}
            <hr className="border-gray-200/60 mx-2" />

            {/* Secondary Nav - Mobile */}
            <div className="space-y-2">
              {secondaryNavItems.map((item) => (
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

            {/* Login Button - Mobile with glassy effect */}
            <Link
              href="/login"
              className="block w-full text-center rounded-xl bg-gray-900/90 px-4 py-3 text-base font-semibold text-white hover:bg-gray-900 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-0 transition-all duration-200 shadow-lg shadow-gray-900/20"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
})

Navigation.displayName = 'Navigation'

export default Navigation