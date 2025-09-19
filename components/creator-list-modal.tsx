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
import { Check, X } from 'lucide-react'
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
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const dialogVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
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
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-12">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden="true"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="creator-modal-heading"
            className={cn(
              'relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-gray-100',
              'bg-white shadow-2xl shadow-gray-900/10',
              'px-6 py-8 sm:px-10 sm:py-10 text-left'
            )}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-gray-200 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-500/20">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3a9 9 0 100 18 9 9 0 000-18zM9.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 5.25a6.75 6.75 0 014.144 12.022 4.5 4.5 0 00-8.288 0A6.75 6.75 0 0112 5.25z"
                      fill="currentColor"
                      opacity={0.7}
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2
                    id="creator-modal-heading"
                    className="text-2xl font-bold text-gray-900 sm:text-3xl font-display leading-tight"
                  >
                    Get a ready-to-activate creator list in 24 hours
                  </h2>
                </div>
              </div>
              <p className="text-base leading-relaxed text-gray-600 font-sans">
                Paste your site, set your niche, and we'll surface verified creators already moving product for audiences like yours. You get attribution-ready profiles and outreach sequences without lifting a finger.
              </p>
            </div>

            {submissionState === 'success' ? (
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/20">
                    <Check className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-1">
                      Success
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl font-display">
                      You're on the list!
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-gray-600 font-sans">
                      Our team is already lining up vetted partners. Expect your inbox at <span className="font-medium text-gray-900">{sanitizedEmail || 'your email'}</span> to get a personalized list with outreach scripts within 24 hours.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Button
                    type="button"
                    onClick={() => {
                      onClose()
                    }}
                    className="h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium shadow-xl shadow-purple-500/25 transition-all duration-200 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02]"
                  >
                    Back to the site
                  </Button>
                  <button
                    type="button"
                    onClick={() => resetFormState({ shouldFocus: true })}
                    className="h-12 px-6 text-sm font-medium text-gray-600 transition-all duration-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="modal-website"
                      className="text-sm font-semibold text-gray-900"
                    >
                      Your Website
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <span
                          aria-hidden="true"
                          className="text-sm font-medium text-gray-500"
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
                          'w-full h-12 rounded-lg bg-white pl-20 pr-4 text-gray-900 placeholder:text-gray-400',
                          'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200',
                          'border-2 text-base font-medium',
                          websiteHasError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-200 hover:border-gray-300 focus:border-purple-500',
                          isSubmitting ? 'pointer-events-none opacity-60' : ''
                        )}
                        disabled={isSubmitting}
                      />
                      {websiteErrorMessage && (
                        <p className="mt-2 text-sm text-red-600 font-medium">{websiteErrorMessage}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="modal-work-email"
                      className="text-sm font-semibold text-gray-900"
                    >
                      Work Email
                    </label>
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
                        'w-full h-12 rounded-lg bg-white px-4 text-gray-900 placeholder:text-gray-400',
                        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200',
                        'border-2 text-base font-medium',
                        emailHasError
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-200 hover:border-gray-300 focus:border-purple-500',
                        isSubmitting ? 'pointer-events-none opacity-60' : ''
                      )}
                      disabled={isSubmitting}
                    />
                    {emailErrorMessage && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{emailErrorMessage}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium text-base shadow-xl shadow-purple-500/25 transition-all duration-200 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100"
                    disabled={isSubmitDisabled}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                        Sending your request...
                      </span>
                    ) : (
                      'Get My Creator List'
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-10 text-sm font-medium text-gray-600 transition-all duration-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    disabled={isSubmitting}
                  >
                    Maybe later
                  </button>
                  {submissionState === 'error' && submissionError && (
                    <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-red-800 font-medium">{submissionError}</p>
                    </div>
                  )}
                </div>
              </form>
            )}

            <div className="mt-10 rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-white px-6 py-6 sm:px-8 sm:py-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                What You'll Receive
              </p>
              <h3 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl font-display">
                Your personalized creator list includes:
              </h3>
              <ul className="mt-5 space-y-4 text-left">
                {inboxHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-base leading-relaxed text-gray-700 font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg border-2 border-dashed border-purple-200 bg-purple-50 px-4 py-3">
                <p className="text-sm font-medium text-purple-900">
                  <span className="font-semibold">Bonus:</span> Let us handle the outreach for you
                </p>
              </div>
            </div>
          </motion.div>
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
