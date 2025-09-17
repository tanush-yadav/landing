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

    const isWebsiteValid = trimmedWebsite.length > 0
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

    onPrimaryAction?.({ website: trimmedWebsite, workEmail: trimmedEmail })
    onClose()
  }

  const websiteHasError = showErrors && website.trim().length === 0
  const emailHasError = showErrors && !emailPattern.test(workEmail.trim())
  const websiteErrorMessage = websiteHasError
    ? 'Please enter your website so we can personalize the list.'
    : undefined
  const emailErrorMessage = emailHasError
    ? 'Enter a valid work email so we can send your creator list.'
    : undefined

  const modalContent = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-12">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
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
              'relative z-10 w-full max-w-lg rounded-3xl border border-linear-border-strong',
              'bg-linear-bg-primary/95 shadow-[0_40px_120px_-40px_rgba(16,24,40,0.6)] backdrop-blur-xl',
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-linear-border-default bg-linear-bg-secondary/80 text-linear-text-secondary transition-colors duration-200 hover:text-linear-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-linear-bg-primary"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 via-indigo-500 to-purple-600 text-white shadow-lg">
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
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-linear-text-tertiary">
                  Creator action plan
                </p>
                <h2
                  id="creator-modal-heading"
                  className="mt-1 text-2xl font-semibold text-linear-text-primary sm:text-3xl"
                >
                  Get a ready-to-activate creator list in 24 hours
                </h2>
              </div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-linear-text-secondary sm:text-lg">
              Paste your site, set your niche, and we will surface verified creators already moving product for audiences like yours. You get attribution-ready profiles and outreach sequences without lifting a finger.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="modal-website"
                    className="text-sm font-medium text-linear-text-tertiary"
                  >
                    Website
                  </label>
                  <Input
                    id="modal-website"
                    ref={websiteInputRef}
                    type="url"
                    inputMode="url"
                    autoCapitalize="none"
                    autoCorrect="off"
                    placeholder="yourbrand.com"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    error={websiteErrorMessage}
                    className={cn(
                      'h-12 rounded-xl bg-linear-bg-secondary/80 text-linear-text-primary placeholder:text-linear-text-tertiary focus:ring-offset-2 focus:ring-offset-linear-bg-primary',
                      websiteHasError
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-linear-border-default focus:ring-indigo-500'
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="modal-work-email"
                    className="text-sm font-medium text-linear-text-tertiary"
                  >
                    Work email
                  </label>
                  <Input
                    id="modal-work-email"
                    ref={workEmailInputRef}
                    type="email"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    placeholder="name@company.com"
                    value={workEmail}
                    onChange={(event) => setWorkEmail(event.target.value)}
                    error={emailErrorMessage}
                    className={cn(
                      'h-12 rounded-xl bg-linear-bg-secondary/80 text-linear-text-primary placeholder:text-linear-text-tertiary focus:ring-offset-2 focus:ring-offset-linear-bg-primary',
                      emailHasError
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-linear-border-default focus:ring-indigo-500'
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="h-14 rounded-2xl text-lg font-semibold"
                  fullWidth
                  disabled={
                    website.trim().length === 0 ||
                    !emailPattern.test(workEmail.trim())
                  }
                >
                  Get my creator list
                </Button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm font-medium text-linear-text-tertiary transition-colors duration-200 hover:text-linear-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-linear-bg-primary"
                >
                  No thanks
                </button>
              </div>
            </form>

            <div className="mt-10 rounded-2xl border border-linear-border-default bg-linear-bg-secondary/70 px-6 py-6 sm:px-8 sm:py-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-linear-text-tertiary">
                After you connect
              </p>
              <h3 className="mt-2 text-xl font-semibold text-linear-text-primary sm:text-2xl">
                What lands in your inbox
              </h3>
              <ul className="mt-5 space-y-4 text-left">
                {inboxHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-primary-500 via-indigo-500 to-purple-600 text-white shadow-lg">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-base leading-relaxed text-linear-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-dashed border-linear-border-strong bg-linear-bg-primary/70 px-4 py-3 text-sm text-linear-text-secondary">
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
