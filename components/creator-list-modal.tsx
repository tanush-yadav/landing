'use client'

import {
  useEffect,
  useRef,
  useState,
  type FC,
  type FormEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/design-system'

type PrimaryActionResult = void | { success?: boolean; error?: string | null }

export interface CreatorListModalProps {
  open: boolean
  onClose: () => void
  onPrimaryAction?: (
    payload: { website: string; workEmail: string }
  ) => PrimaryActionResult | Promise<PrimaryActionResult>
}

const overlayVariants = {
  hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(12px)',
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
  },
}

const dialogVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
}

const contentVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  }
}

const emailPattern = /.+@.+\..+/
const WEBSITE_PREFIX = 'https://'

const buildFullWebsite = (value: string) => {
  const sanitized = value.trim().replace(/^https?:\/\//i, '')
  return sanitized.length > 0 ? `${WEBSITE_PREFIX}${sanitized}` : ''
}

const isValidWebsite = (value: string) => {
  if (!value) return false
  try {
    // eslint-disable-next-line no-new
    new URL(value)
    return true
  } catch {
    return false
  }
}

const inboxHighlights = [
  '12 to 15 vetted creators for your niche',
  'Links, audience notes, and sample posts',
  'Price range and a first message template',
  'Contact info ready to reach out',
]

export const CreatorListModal: FC<CreatorListModalProps> = ({
  open,
  onClose,
  onPrimaryAction,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const websiteInputRef = useRef<HTMLInputElement | null>(null)
  const workEmailInputRef = useRef<HTMLInputElement | null>(null)
  const hasMountedRef = useRef(false)
  const [website, setWebsite] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [submissionState, setSubmissionState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const resetFormState = ({ shouldFocus }: { shouldFocus?: boolean } = {}) => {
    setWebsite('')
    setWorkEmail('')
    setShowErrors(false)
    setSubmissionState('idle')
    setSubmissionError(null)

    if (shouldFocus) {
      window.setTimeout(() => {
        websiteInputRef.current?.focus()
      }, 20)
    }
  }

  useEffect(() => {
    if (!hasMountedRef.current) {
      containerRef.current = document.createElement('div')
      containerRef.current.setAttribute('data-modal-root', 'creator-list')
      document.body.appendChild(containerRef.current)
      hasMountedRef.current = true
    }

    return () => {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current)
        containerRef.current = null
        hasMountedRef.current = false
      }
    }
  }, [])

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      resetFormState({ shouldFocus: false })
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    const focusTimer = window.setTimeout(() => {
      websiteInputRef.current?.focus()
    }, 20)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(focusTimer)
    }
  }, [open, onClose])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedWebsite = website.trim()
    const trimmedEmail = workEmail.trim()

    const fullWebsite = buildFullWebsite(trimmedWebsite)
    const isWebsiteValid = isValidWebsite(fullWebsite)
    const isEmailValid = emailPattern.test(trimmedEmail)

    if (!isWebsiteValid || !isEmailValid) {
      setShowErrors(true)
      if (!isWebsiteValid) {
        websiteInputRef.current?.focus()
      } else if (!isEmailValid) {
        workEmailInputRef.current?.focus()
      }
      return
    }

    setSubmissionState('submitting')
    setSubmissionError(null)

    try {
      const result = await onPrimaryAction?.({
        website: fullWebsite,
        workEmail: trimmedEmail,
      })

      const didSucceed = result === undefined || result.success !== false

      if (didSucceed) {
        setSubmissionState('success')
        return
      }

      setSubmissionError(result?.error || 'We could not save your request. Please try again.')
      setSubmissionState('error')
    } catch (error) {
      console.error('Failed to submit creator list request', error)
      setSubmissionError('We ran into an issue saving your request. Please try again.')
      setSubmissionState('error')
    }
  }

  const fullWebsite = buildFullWebsite(website)
  const sanitizedEmail = workEmail.trim()
  const isWebsiteStructurallyValid = isValidWebsite(fullWebsite)
  const isEmailValid = emailPattern.test(sanitizedEmail)
  const websiteHasError = showErrors && !isWebsiteStructurallyValid
  const emailHasError = showErrors && !isEmailValid
  const websiteErrorMessage = websiteHasError
    ? 'Add your site after the prefix so we can personalize the list.'
    : undefined
  const emailErrorMessage = emailHasError
    ? 'Enter a valid work email so we can send your creator list.'
    : undefined
  const isSubmitting = submissionState === 'submitting'
  const isSubmitDisabled =
    !isWebsiteStructurallyValid || !isEmailValid || isSubmitting

  const modalContent = (
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden="true"
            onClick={onClose}
          />

          <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="creator-modal-heading"
              className={cn(
                'relative w-full max-w-2xl',
                'max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-6rem)]',
                'overflow-hidden rounded-3xl',
                'bg-gradient-to-b from-white to-gray-50/50',
                'border border-gray-200/50',
                'shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)]'
              )}
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                boxShadow: '0 32px 64px -12px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04), inset 0 1px 0 0 rgba(255,255,255,0.9)'
              }}
            >
              {/* Premium gradient overlay at top */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

              {/* Close button - elegant and well-positioned */}
              <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    "group flex h-10 w-10 items-center justify-center",
                    "rounded-xl bg-white/80 backdrop-blur-md",
                    "border border-gray-200/60",
                    "text-gray-500 shadow-sm",
                    "transition-all duration-200",
                    "hover:bg-white hover:border-gray-300",
                    "hover:text-gray-700 hover:shadow-md hover:scale-105",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                  )}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </motion.button>
              </div>

              {/* Scrollable content wrapper */}
              <div className="overflow-y-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-6rem)] custom-scrollbar">
                <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">

                  {/* Header Section with premium styling */}
                  <motion.div
                    className="flex flex-col gap-5"
                    variants={contentVariants}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className={cn(
                          "flex h-14 w-14 flex-shrink-0 items-center justify-center",
                          "rounded-2xl bg-gradient-to-br from-purple-600 via-purple-600 to-indigo-600",
                          "shadow-[0_8px_32px_-8px_rgba(147,51,234,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2)]",
                          "relative overflow-hidden"
                        )}
                        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/10" />
                        <Sparkles className="h-7 w-7 text-white relative z-10" />
                      </motion.div>
                      <div className="flex-1 pr-8">
                        <h2
                          id="creator-modal-heading"
                          className={cn(
                            "text-2xl sm:text-3xl lg:text-[32px]",
                            "font-bold text-gray-900 font-display",
                            "leading-[1.2] tracking-tight",
                            "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
                            "bg-clip-text text-transparent"
                          )}
                        >
                          Get a ready-to-activate creator list in 24 hours
                        </h2>
                      </div>
                    </div>
                    <p className="text-base sm:text-[17px] leading-relaxed text-gray-600 font-sans pr-8">
                      Paste your site, set your niche, and we&apos;ll surface verified creators already moving product for audiences like yours. You get attribution-ready profiles and outreach sequences without lifting a finger.
                    </p>
                  </motion.div>

                  {submissionState === 'success' ? (
                    <motion.div
                      className="mt-10 flex flex-col gap-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="relative rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50/50 to-green-50 border border-green-200/50 p-6">
                        <div className="flex items-start gap-4">
                          <motion.span
                            className={cn(
                              "flex h-12 w-12 flex-shrink-0 items-center justify-center",
                              "rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600",
                              "text-white shadow-[0_8px_32px_-8px_rgba(34,197,94,0.4)]"
                            )}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                          >
                            <Check className="h-6 w-6" aria-hidden="true" />
                          </motion.span>
                          <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-green-700 mb-1">
                              Success
                            </p>
                            <h3 className="text-xl font-bold text-gray-900 sm:text-2xl font-display">
                              You&apos;re on the list!
                            </h3>
                            <p className="mt-3 text-base leading-relaxed text-gray-600 font-sans">
                              Our team is already lining up vetted partners. Expect your inbox at{' '}
                              <span className="font-semibold text-gray-900 bg-green-100 px-2 py-0.5 rounded">
                                {sanitizedEmail || 'your email'}
                              </span>{' '}
                              to get a personalized list with outreach scripts within 24 hours.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <Button
                          type="button"
                          onClick={() => {
                            onClose()
                          }}
                          className={cn(
                            "h-12 px-8",
                            "bg-gradient-to-r from-purple-600 to-indigo-600",
                            "hover:from-purple-700 hover:to-indigo-700",
                            "text-white font-medium",
                            "shadow-[0_8px_32px_-8px_rgba(147,51,234,0.4)]",
                            "transition-all duration-200",
                            "hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,0.5)]",
                            "hover:scale-[1.02] active:scale-[0.98]"
                          )}
                        >
                          Back to the site
                        </Button>
                        <button
                          type="button"
                          onClick={() => resetFormState({ shouldFocus: true })}
                          className={cn(
                            "h-12 px-6",
                            "text-sm font-medium text-gray-600",
                            "transition-all duration-200",
                            "hover:text-gray-900",
                            "focus-visible:outline-none focus-visible:ring-2",
                            "focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                          )}
                        >
                          Submit another request
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="mt-8 flex flex-col gap-7"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="flex flex-col gap-6">
                        {/* Website Input */}
                        <motion.div
                          className="flex flex-col gap-2.5"
                          variants={contentVariants}
                        >
                          <label
                            htmlFor="modal-website"
                            className="text-sm font-semibold text-gray-900 flex items-center gap-2"
                          >
                            Your Website
                            <span className="text-xs font-normal text-gray-500">(Required)</span>
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                              <span
                                aria-hidden="true"
                                className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded"
                              >
                                https://
                              </span>
                            </div>
                            <input
                              id="modal-website"
                              ref={websiteInputRef}
                              type="text"
                              inputMode="url"
                              autoCapitalize="none"
                              autoCorrect="off"
                              placeholder="yourbrand.com"
                              value={website}
                              onChange={(event) =>
                                setWebsite(event.target.value.replace(/^https?:\/\//i, ''))
                              }
                              className={cn(
                                'w-full h-14 rounded-xl bg-white pl-24 pr-4',
                                'text-gray-900 placeholder:text-gray-400',
                                'text-base font-medium',
                                'border transition-all duration-200',
                                'focus:outline-none focus:ring-2 focus:ring-offset-0',
                                'shadow-sm hover:shadow-md',
                                websiteHasError
                                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30'
                                  : 'border-gray-200 hover:border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 bg-white',
                                isSubmitting ? 'pointer-events-none opacity-60' : ''
                              )}
                              disabled={isSubmitting}
                            />
                            {websiteErrorMessage && (
                              <motion.p
                                className="mt-2.5 text-sm text-red-600 font-medium flex items-center gap-1.5"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                                {websiteErrorMessage}
                              </motion.p>
                            )}
                          </div>
                        </motion.div>

                        {/* Email Input */}
                        <motion.div
                          className="flex flex-col gap-2.5"
                          variants={contentVariants}
                        >
                          <label
                            htmlFor="modal-work-email"
                            className="text-sm font-semibold text-gray-900 flex items-center gap-2"
                          >
                            Work Email
                            <span className="text-xs font-normal text-gray-500">(Required)</span>
                          </label>
                          <div className="relative group">
                            <input
                              id="modal-work-email"
                              ref={workEmailInputRef}
                              type="email"
                              inputMode="email"
                              autoCapitalize="none"
                              autoCorrect="off"
                              placeholder="name@company.com"
                              value={workEmail}
                              onChange={(event) => setWorkEmail(event.target.value)}
                              className={cn(
                                'w-full h-14 rounded-xl bg-white px-5',
                                'text-gray-900 placeholder:text-gray-400',
                                'text-base font-medium',
                                'border transition-all duration-200',
                                'focus:outline-none focus:ring-2 focus:ring-offset-0',
                                'shadow-sm hover:shadow-md',
                                emailHasError
                                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30'
                                  : 'border-gray-200 hover:border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 bg-white',
                                isSubmitting ? 'pointer-events-none opacity-60' : ''
                              )}
                              disabled={isSubmitting}
                            />
                            {emailErrorMessage && (
                              <motion.p
                                className="mt-2.5 text-sm text-red-600 font-medium flex items-center gap-1.5"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                                {emailErrorMessage}
                              </motion.p>
                            )}
                          </div>
                        </motion.div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 mt-2">
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          <Button
                            type="submit"
                            className={cn(
                              "w-full h-14",
                              "bg-gradient-to-r from-purple-600 to-indigo-600",
                              "hover:from-purple-700 hover:to-indigo-700",
                              "text-white font-semibold text-base",
                              "shadow-[0_8px_32px_-8px_rgba(147,51,234,0.4)]",
                              "transition-all duration-200",
                              "hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,0.5)]",
                              "disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100",
                              "relative overflow-hidden"
                            )}
                            disabled={isSubmitDisabled}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              {isSubmitting ? (
                                <>
                                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                                  <span>Sending your request...</span>
                                </>
                              ) : (
                                <>
                                  <span>Get My Creator List</span>
                                  <Sparkles className="h-4 w-4" />
                                </>
                              )}
                            </span>
                          </Button>
                        </motion.div>

                        <button
                          type="button"
                          onClick={onClose}
                          className={cn(
                            "h-11 text-sm font-medium text-gray-600",
                            "transition-all duration-200",
                            "hover:text-gray-900 hover:bg-gray-50 rounded-xl",
                            "focus-visible:outline-none focus-visible:ring-2",
                            "focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                          )}
                          disabled={isSubmitting}
                        >
                          Maybe later
                        </button>

                        {submissionState === 'error' && submissionError && (
                          <motion.div
                            className="mt-2 p-4 rounded-xl bg-red-50 border border-red-200/50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-sm text-red-800 font-medium flex items-start gap-2">
                              <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                              {submissionError}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.form>
                  )}

                  {/* Features Section */}
                  <motion.div
                    className="mt-10 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30 p-6 sm:p-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 px-3">
                        What You&apos;ll Receive
                      </p>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl font-display text-center mb-6">
                      Your personalized creator list includes:
                    </h3>
                    <ul className="space-y-3 text-left">
                      {inboxHighlights.map((item, index) => (
                        <motion.li
                          key={item}
                          className="flex items-start gap-3.5 group"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                        >
                          <span className={cn(
                            "mt-0.5 flex h-8 w-8 flex-none items-center justify-center",
                            "rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600",
                            "text-white shadow-[0_4px_16px_-4px_rgba(147,51,234,0.3)]",
                            "group-hover:shadow-[0_6px_20px_-4px_rgba(147,51,234,0.4)]",
                            "transition-all duration-200 group-hover:scale-110"
                          )}>
                            <Check className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="text-[15px] leading-relaxed text-gray-700 font-sans pt-1">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div
                      className="mt-6 rounded-xl border border-purple-200/50 bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 px-4 py-3.5"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm font-medium text-purple-900 text-center">
                        <Sparkles className="inline-block w-4 h-4 mr-1.5 -mt-0.5" />
                        <span className="font-semibold">Bonus:</span> Let us handle the outreach for you
                      </p>
                    </motion.div>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )

  if (containerRef.current) {
    return createPortal(modalContent, containerRef.current)
  }

  return null
}

CreatorListModal.displayName = 'CreatorListModal'
