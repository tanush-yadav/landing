/**
 * Pattern Showcase Component
 *
 * This file demonstrates the standardized patterns for building components
 * in the Cintra codebase. Use these as reference when creating new components.
 */

import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  cn,
  animations,
  glassMorphism,
  gradients,
  typography,
  type Size,
  type Variant,
} from '@/lib/design-system'
import { Button, Input } from '@/components/ui'
import type { BaseComponentProps } from '@/lib/types'

// ==============================================================================
// PATTERN 1: Basic Component Structure
// ==============================================================================

interface ExampleComponentProps extends BaseComponentProps {
  title: string
  variant?: Variant
  size?: Size
  onAction?: () => void
}

export const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  onAction,
  className,
  children,
  ...props
}) => {
  // State management
  const [isActive, setIsActive] = useState(false)

  // Memoized values
  const computedValue = useMemo(() => {
    return `${title}-${variant}-${size}`
  }, [title, variant, size])

  // Callbacks
  const handleClick = useCallback(() => {
    setIsActive((prev) => !prev)
    onAction?.()
  }, [onAction])

  return (
    <motion.div
      className={cn(
        'p-4 rounded-lg',
        isActive && 'ring-2 ring-primary-500',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      {...animations.fadeIn}
      {...props}
    >
      <h3 className={typography.h3}>{title}</h3>
      <p className={typography.body}>{computedValue}</p>
      {children}
    </motion.div>
  )
}

// ==============================================================================
// PATTERN 2: Compound Component Pattern
// ==============================================================================

interface CompoundComponentProps extends BaseComponentProps {
  title?: string
}

interface CompoundComponent extends React.FC<CompoundComponentProps> {
  Header: typeof CompoundHeader
  Body: typeof CompoundBody
  Footer: typeof CompoundFooter
}

const CompoundHeader: React.FC<BaseComponentProps> = ({
  children,
  className,
}) => (
  <div className={cn('mb-4 pb-4 border-b border-neutral-200', className)}>
    {children}
  </div>
)

const CompoundBody: React.FC<BaseComponentProps> = ({
  children,
  className,
}) => <div className={cn('mb-4', className)}>{children}</div>

const CompoundFooter: React.FC<BaseComponentProps> = ({
  children,
  className,
}) => (
  <div className={cn('mt-4 pt-4 border-t border-neutral-200', className)}>
    {children}
  </div>
)

export const CompoundComponent: CompoundComponent = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={cn('p-6 bg-white rounded-lg shadow-md', className)}>
      {title && <h2 className={typography.h2}>{title}</h2>}
      {children}
    </div>
  )
}

CompoundComponent.Header = CompoundHeader
CompoundComponent.Body = CompoundBody
CompoundComponent.Footer = CompoundFooter

// ==============================================================================
// PATTERN 3: Animation Pattern
// ==============================================================================

export const AnimatedCard: React.FC<BaseComponentProps> = ({
  children,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn('relative overflow-hidden rounded-xl', className)}
      style={glassMorphism.light}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Gradient background animation */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{ background: gradients.primary }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  )
}

// ==============================================================================
// PATTERN 4: Form Pattern with Validation
// ==============================================================================

interface FormExampleProps extends BaseComponentProps {
  onSubmit?: (data: FormData) => void
}

interface FormData {
  email: string
  message: string
}

export const FormExample: React.FC<FormExampleProps> = ({
  onSubmit,
  className,
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.message) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validateForm()) return

      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        onSubmit?.(formData)
        setFormData({ email: '', message: '' })
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, validateForm, onSubmit]
  )

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      <div>
        <label
          htmlFor="pattern-showcase-email"
          className="mb-1.5 block text-sm font-medium text-neutral-700"
        >
          Email
        </label>
        <Input
          id="pattern-showcase-email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="your@email.com"
          aria-invalid={Boolean(errors.email)}
          className={cn(
            'bg-white text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-offset-2',
            errors.email && 'border-red-500 focus-visible:ring-red-500'
          )}
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          Message
        </label>
        <textarea
          className={cn(
            'w-full rounded-lg border bg-white px-4 py-2.5',
            'text-neutral-900 placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            errors.message ? 'border-red-500' : 'border-neutral-300'
          )}
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Your message..."
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Submit'}
      </Button>
    </form>
  )
}

// ==============================================================================
// PATTERN 5: List with Animation Pattern
// ==============================================================================

interface ListItem {
  id: string
  title: string
  description: string
  status: 'pending' | 'active' | 'completed'
}

interface AnimatedListProps extends BaseComponentProps {
  items: ListItem[]
  onItemClick?: (item: ListItem) => void
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  onItemClick,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
              delay: index * 0.05,
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            whileHover={{ x: 4 }}
            onClick={() => onItemClick?.(item)}
            className={cn(
              'p-4 bg-white rounded-lg border cursor-pointer transition-colors',
              'hover:border-primary-300 hover:bg-primary-50/50',
              item.status === 'active' && 'border-primary-500 bg-primary-50',
              item.status === 'completed' && 'opacity-60'
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-neutral-900">{item.title}</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  {item.description}
                </p>
              </div>
              <StatusIndicator status={item.status} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

const StatusIndicator: React.FC<{ status: ListItem['status'] }> = ({
  status,
}) => {
  const statusConfig = {
    pending: { color: 'bg-gray-400', label: 'Pending', pulse: false },
    active: { color: 'bg-blue-500', label: 'Active', pulse: true },
    completed: { color: 'bg-green-500', label: 'Completed', pulse: false },
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={cn('w-2 h-2 rounded-full', config.color)} />
        {config.pulse && (
          <div
            className={cn(
              'absolute inset-0 w-2 h-2 rounded-full animate-ping',
              config.color,
              'opacity-75'
            )}
          />
        )}
      </div>
      <span className="text-xs text-neutral-600">{config.label}</span>
    </div>
  )
}

// ==============================================================================
// PATTERN 6: Modal/Dialog Pattern
// ==============================================================================

interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={cn(
              'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              'bg-white rounded-xl shadow-2xl z-50',
              'max-w-md w-full mx-4',
              className
            )}
          >
            {title && (
              <div className="px-6 py-4 border-b border-neutral-200">
                <h2 className="text-xl font-semibold text-neutral-900">
                  {title}
                </h2>
              </div>
            )}
            <div className="px-6 py-4">{children}</div>
            <div className="px-6 py-4 border-t border-neutral-200 flex justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={onClose}>
                Confirm
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Display names for debugging
ExampleComponent.displayName = 'ExampleComponent'
CompoundComponent.displayName = 'CompoundComponent'
AnimatedCard.displayName = 'AnimatedCard'
FormExample.displayName = 'FormExample'
AnimatedList.displayName = 'AnimatedList'
Modal.displayName = 'Modal'
StatusIndicator.displayName = 'StatusIndicator'
