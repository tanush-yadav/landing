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
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/design-system'

export interface CreatorListModalProps {
  open: boolean
  onClose: () => void
  onPrimaryAction?: (payload: { website: string; workEmail: string }) => void
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
      setWebsite('')
      setWorkEmail('')
      setShowErrors(false)
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    onPrimaryAction?.({ website: fullWebsite, workEmail: trimmedEmail })
    onClose()
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
  const isSubmitDisabled = !isWebsiteStructurallyValid || !isEmailValid

  const modalContent = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-12">
          <motion.div
            className="absolute inset-0 bg-white/80 backdrop-blur-md"
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
              'relative z-10 w-full max-w-2xl h-3/4 overflow-y-auto rounded-3xl border border-gray-200',
              'bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-sm',
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-200/50">
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
                    opacity={0.65}
                  />
                </svg>
              </div>
              <div>
              
                <h2
                  id="creator-modal-heading"
                  className="mt-1 text-lg font-bold font-display text-gray-900 sm:text-2xl"
                >
                  Get a ready-to-activate creator list in 24 hours
                </h2>
              </div>
            </div>

            <p className="mt-6 text-md leading-relaxed text-gray-600 sm:text-md font-sans">
              Paste your site, set your niche, and we will surface verified creators already moving product for audiences like yours. You get attribution-ready profiles and outreach sequences without lifting a finger.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="modal-website"
                    className="text-sm font-medium text-gray-700"
                  >
                    Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <span
                        aria-hidden="true"
                        className="text-sm font-medium text-gray-400"
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
                        'w-full h-12 rounded-xl bg-gray-50 pl-20 pr-4 text-gray-900 placeholder:text-gray-400',
                        'focus:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-colors',
                        'border text-sm',
                        websiteHasError
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                      )}
                    />
                    {websiteErrorMessage && (
                      <p className="mt-2 text-sm text-red-600">{websiteErrorMessage}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="modal-work-email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Work email
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
                      'w-full h-12 rounded-xl bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400',
                      'focus:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-colors',
                      'border text-sm',
                      emailHasError
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    )}
                  />
                  {emailErrorMessage && (
                    <p className="mt-2 text-sm text-red-600">{emailErrorMessage}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200/50 transition-all hover:shadow-xl hover:shadow-indigo-300/50 disabled:opacity-50 disabled:shadow-none"
                  disabled={isSubmitDisabled}
                >
                  Get my creator list
                </Button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  No thanks
                </button>
              </div>
            </form>

            <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50/70 px-6 py-6 sm:px-8 sm:py-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                After you connect
              </p>
              <h3 className="mt-2 text-xl font-bold font-display text-gray-900 sm:text-2xl">
                What lands in your inbox
              </h3>
              <ul className="mt-5 space-y-4 text-left">
                {inboxHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-200/50">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-md leading-relaxed text-gray-600 font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-white/70 px-4 py-3 text-sm text-gray-600 font-sans">
                Optional: we run outreach for you.
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
