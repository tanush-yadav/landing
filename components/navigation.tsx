'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navigation = () => {
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className={cn(
                  'text-2xl font-bold transition-colors',
                  isScrolled ? 'text-gray-900' : 'text-white'
                )}
                aria-label="Codegen Home"
              >
                Codegen
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Primary Nav */}
              <div className="flex items-center space-x-6">
                {primaryNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:opacity-80',
                      isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className={cn(
                'h-5 w-px',
                isScrolled ? 'bg-gray-300' : 'bg-white/20'
              )} />

              {/* Secondary Nav */}
              <div className="flex items-center space-x-6">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:opacity-80',
                      isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Login Button */}
                <Link
                  href="/login"
                  className={cn(
                    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2',
                    isScrolled
                      ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
                      : 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-white'
                  )}
                >
                  Login
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className={cn(
                'inline-flex md:hidden items-center justify-center rounded-md p-2 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
                  : 'text-white hover:bg-white/10 focus:ring-white'
              )}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          className={cn(
            'absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transition-transform duration-300',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900"
              onClick={closeMobileMenu}
            >
              Codegen
            </Link>
            <button
              onClick={closeMobileMenu}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="px-4 py-6 space-y-6">
            {/* Primary Nav - Mobile */}
            <div className="space-y-4">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Secondary Nav - Mobile */}
            <div className="space-y-4">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Login Button - Mobile */}
            <Link
              href="/login"
              className="block w-full text-center rounded-md bg-primary-600 px-4 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navigation