'use client'

import { useState, FormEvent, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>({ status: 'idle' })
  const [touched, setTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const successTimeoutRef = useRef<NodeJS.Timeout>()

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current)
      }
    }
  }, [])

  // Email validation
  const validateEmail = (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(email)
  }

  const isValidEmail = validateEmail(email)
  const showError = touched && email && !isValidEmail

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Mark as touched for validation
    setTouched(true)
    
    // Validate email
    if (!isValidEmail) {
      setFormState({ 
        status: 'error', 
        message: 'Please enter a valid email address' 
      })
      inputRef.current?.focus()
      return
    }

    // Start loading
    setFormState({ status: 'loading' })

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, randomly succeed or fail
      const shouldSucceed = Math.random() > 0.1 // 90% success rate for demo
      
      if (shouldSucceed) {
        setFormState({ 
          status: 'success',
          message: "You're all set! Check your email to confirm." 
        })
        setEmail('')
        setTouched(false)
        
        // Reset to idle after 5 seconds
        successTimeoutRef.current = setTimeout(() => {
          setFormState({ status: 'idle' })
        }, 5000)
      } else {
        throw new Error('Subscription failed')
      }
    } catch (error) {
      setFormState({ 
        status: 'error',
        message: 'Something went wrong. Please try again.' 
      })
      
      // Reset error after 3 seconds
      setTimeout(() => {
        setFormState({ status: 'idle' })
      }, 3000)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    // Clear error when user starts typing
    if (formState.status === 'error') {
      setFormState({ status: 'idle' })
    }
  }

  const handleBlur = () => {
    setTouched(true)
  }

  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Simple, clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto max-w-2xl"
        >
          {/* Main card */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100">
            <div className="px-8 py-12 sm:px-12 sm:py-16">
              <AnimatePresence mode="wait">
                {formState.status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      You're subscribed!
                    </h3>
                    <p className="text-gray-600">
                      {formState.message}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Heading */}
                    <div className="text-center mb-8">
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Stay in the loop
                      </h2>
                      <p className="text-lg text-gray-600">
                        Get the latest updates on AI workforce automation delivered to your inbox.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="sr-only">
                          Email address
                        </label>
                        <div className="relative">
                          <input
                            ref={inputRef}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleBlur}
                            disabled={formState.status === 'loading'}
                            className={`
                              block w-full px-4 py-3 pr-12 text-base text-gray-900 
                              placeholder-gray-500 bg-white border rounded-lg
                              transition-all duration-200
                              focus:outline-none focus:ring-2 focus:ring-offset-2
                              disabled:opacity-50 disabled:cursor-not-allowed
                              ${showError 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                              }
                            `}
                            placeholder="Enter your email"
                            aria-label="Email address"
                            aria-invalid={showError}
                            aria-describedby={showError ? 'email-error' : undefined}
                          />
                          {showError && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        
                        {/* Error message */}
                        <AnimatePresence>
                          {showError && (
                            <motion.p
                              id="email-error"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 text-sm text-red-600"
                              role="alert"
                            >
                              Please enter a valid email address
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* API Error message */}
                        <AnimatePresence>
                          {formState.status === 'error' && formState.message && !showError && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 text-sm text-red-600"
                              role="alert"
                            >
                              {formState.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        type="submit"
                        disabled={formState.status === 'loading' || (touched && !isValidEmail)}
                        className={`
                          group relative w-full flex items-center justify-center
                          px-6 py-3 text-base font-medium text-white
                          bg-indigo-600 rounded-lg shadow-sm
                          transition-all duration-200
                          hover:bg-indigo-700 hover:shadow-md
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600
                        `}
                        aria-busy={formState.status === 'loading'}
                      >
                        <span className="flex items-center">
                          {formState.status === 'loading' ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Subscribing...
                            </>
                          ) : (
                            <>
                              Subscribe
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                      </button>
                    </form>

                    {/* Privacy note */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Trust indicators - outside the card for cleaner design */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500"
          >
            <span className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              No spam, ever
            </span>
            <span className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              Weekly updates
            </span>
            <span className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              Unsubscribe anytime
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}