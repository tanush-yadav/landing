/**
 * Bookmark Button Component
 * Allows users to bookmark/unbookmark blog posts with local persistence
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { isPostBookmarked, trackBlogInteraction } from '@/lib/blog-interlinking';
import { cn } from '@/lib/design-system';

interface BookmarkButtonProps {
  postSlug: string;
  postTitle?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'floating';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  postSlug,
  postTitle,
  className,
  variant = 'default',
  showLabel = true,
  size = 'md'
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check initial bookmark status
    const checkBookmarkStatus = () => {
      const bookmarked = isPostBookmarked(postSlug);
      setIsBookmarked(bookmarked);
      setIsLoading(false);
    };

    checkBookmarkStatus();

    // Listen for storage changes (if user bookmarks in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'blog_preferences') {
        checkBookmarkStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [postSlug]);

  const handleBookmarkToggle = async () => {
    if (isLoading) return;

    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);

    // Track the bookmark action
    trackBlogInteraction(postSlug, 'bookmark', {
      action: newBookmarkState ? 'add' : 'remove',
      title: postTitle
    });

    // Show feedback tooltip
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const variantClasses = {
    default: 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm',
    minimal: 'bg-transparent hover:bg-gray-100',
    floating: 'bg-white/90 backdrop-blur-md border border-white/50 shadow-lg hover:shadow-xl'
  };

  if (isLoading) {
    return (
      <div className={cn(
        'rounded-lg animate-pulse bg-gray-200',
        sizeClasses[size],
        className
      )}>
        <div className={cn('bg-gray-300 rounded', iconSizes[size])} />
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        data-testid="bookmark-button"
        data-bookmarked={isBookmarked}
        onClick={handleBookmarkToggle}
        className={cn(
          'relative rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
          sizeClasses[size],
          variantClasses[variant],
          isBookmarked 
            ? 'text-indigo-600 bg-indigo-50 border-indigo-200' 
            : 'text-gray-600 hover:text-gray-900',
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isBookmarked ? 'Remove bookmark' : 'Bookmark this post'}
      >
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            {isBookmarked ? (
              <motion.div
                key="bookmarked"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
              >
                <BookmarkCheck className={cn(iconSizes[size], 'fill-current')} />
              </motion.div>
            ) : (
              <motion.div
                key="not-bookmarked"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Bookmark className={iconSizes[size]} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {showLabel && size !== 'sm' && (
            <span className="text-sm font-medium">
              {isBookmarked ? 'Saved' : 'Save'}
            </span>
          )}
        </div>

        {/* Animated background effect */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-indigo-100 -z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isBookmarked ? 1 : 0, 
            opacity: isBookmarked ? 0.3 : 0 
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              {isBookmarked ? '✨ Bookmarked!' : '🗑️ Removed'}
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookmarkButton;