/**
 * Newsletter Popup Component
 * 
 * Modern newsletter subscription popup with exit intent detection
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles, Gift, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/design-system';

interface NewsletterPopupProps {
  delay?: number; // Delay before showing popup (in ms)
  exitIntent?: boolean; // Enable exit intent detection
  scrollTrigger?: number; // Show after scrolling X% of page
  onClose?: () => void;
  onSubscribe?: (email: string) => Promise<void>;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({
  delay = 5000,
  exitIntent = true,
  scrollTrigger = 50,
  onClose,
  onSubscribe
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if user has already seen/dismissed the popup
    const dismissed = localStorage.getItem('newsletter_dismissed');
    const subscribed = localStorage.getItem('newsletter_subscribed');
    
    if (dismissed || subscribed) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let hasTriggered = false;

    // Delay trigger
    const showWithDelay = () => {
      if (!hasTriggered && !hasBeenShown) {
        timeoutId = setTimeout(() => {
          setIsVisible(true);
          setHasBeenShown(true);
          hasTriggered = true;
        }, delay);
      }
    };

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (exitIntent && e.clientY <= 0 && !hasTriggered && !hasBeenShown) {
        setIsVisible(true);
        setHasBeenShown(true);
        hasTriggered = true;
      }
    };

    // Scroll trigger
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage >= scrollTrigger && !hasTriggered && !hasBeenShown) {
        setIsVisible(true);
        setHasBeenShown(true);
        hasTriggered = true;
      }
    };

    // Mobile exit intent (back button detection)
    const handlePopState = () => {
      if (!hasTriggered && !hasBeenShown) {
        setIsVisible(true);
        setHasBeenShown(true);
        hasTriggered = true;
        // Push state again to keep user on page
        window.history.pushState(null, '', window.location.href);
      }
    };

    // Set up event listeners
    showWithDelay();
    
    if (exitIntent) {
      document.addEventListener('mouseleave', handleMouseLeave);
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
    }
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [delay, exitIntent, scrollTrigger, hasBeenShown]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter_dismissed', 'true');
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      if (onSubscribe) {
        await onSubscribe(email);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setStatus('success');
      localStorage.setItem('newsletter_subscribed', 'true');
      
      // Auto-close after success
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Popup Container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={cn(
                "relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto",
                "transform-gpu" // GPU acceleration
              )}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            >
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-50" />
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className={cn(
                  "absolute top-4 right-4 z-10 p-2 rounded-full",
                  "bg-white/80 backdrop-blur-sm hover:bg-white",
                  "text-gray-500 hover:text-gray-700",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500"
                )}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="relative p-8 sm:p-10">
                {status === 'success' ? (
                  // Success State
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <CheckCircle className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      You&apos;re all set! 🎉
                    </h3>
                    <p className="text-gray-600">
                      Welcome to our community. Check your inbox for a confirmation email.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Icon */}
                    <motion.div
                      className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6"
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <Mail className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                      className="text-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Stay in the Loop
                        <motion.span
                          className="inline-block ml-2"
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <Sparkles className="h-6 w-6 text-yellow-500 inline" />
                        </motion.span>
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Get weekly insights on AI automation and productivity delivered to your inbox.
                      </p>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                      className="mb-6 space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {[
                        '✨ Exclusive AI tips & tricks',
                        '🚀 Early access to new features',
                        '📚 Free resources & guides',
                        '🎁 Special offers for subscribers'
                      ].map((benefit, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center text-sm text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setStatus('idle');
                            setErrorMessage('');
                          }}
                          placeholder="Enter your email"
                          className={cn(
                            "w-full px-4 py-3 pl-12 rounded-xl",
                            "bg-gray-50 border-2",
                            "placeholder:text-gray-400 text-gray-900",
                            "focus:outline-none focus:ring-4 focus:ring-indigo-500/20",
                            "transition-all duration-200",
                            status === 'error' 
                              ? "border-red-500 focus:border-red-500" 
                              : "border-gray-200 focus:border-indigo-500"
                          )}
                          disabled={status === 'loading'}
                        />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>

                      {status === 'error' && (
                        <motion.p
                          className="text-sm text-red-600"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errorMessage}
                        </motion.p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        className={cn(
                          "w-full py-3 px-6 rounded-xl font-semibold",
                          "bg-gradient-to-r from-indigo-600 to-purple-600",
                          "text-white shadow-lg",
                          "hover:from-indigo-700 hover:to-purple-700",
                          "focus:outline-none focus:ring-4 focus:ring-indigo-500/20",
                          "transition-all duration-200",
                          "disabled:opacity-50 disabled:cursor-not-allowed",
                          "group"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {status === 'loading' ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Subscribing...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Gift className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                            Get Free Updates
                          </span>
                        )}
                      </motion.button>
                    </form>

                    {/* Privacy note */}
                    <motion.p
                      className="text-xs text-center text-gray-500 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      No spam, unsubscribe anytime. We respect your privacy.
                    </motion.p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
