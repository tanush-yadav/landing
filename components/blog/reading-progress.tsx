/**
 * Reading Progress Component
 * Shows reading progress bar and tracks user engagement
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getReadingProgress, trackBlogInteraction } from '@/lib/blog-interlinking';
import { cn } from '@/lib/design-system';

interface ReadingProgressProps {
  postSlug: string;
  className?: string;
  position?: 'top' | 'bottom';
  showPercentage?: boolean;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({
  postSlug,
  className,
  position = 'top',
  showPercentage = false
}) => {
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(Date.now());
  const [lastTrackedProgress, setLastTrackedProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentProgress = getReadingProgress();
      setProgress(currentProgress);

      // Track progress milestones (25%, 50%, 75%, 100%)
      const milestones = [25, 50, 75, 100];
      const currentMilestone = milestones.find(
        milestone => 
          currentProgress >= milestone && 
          lastTrackedProgress < milestone
      );

      if (currentMilestone) {
        const timeSpent = Date.now() - startTime;
        trackBlogInteraction(postSlug, 'scroll', {
          scrollPercentage: currentMilestone,
          timeOnPage: timeSpent,
          milestone: true
        });
        setLastTrackedProgress(currentMilestone);
      }
    };

    // Initial progress
    updateProgress();

    // Add scroll listener
    const handleScroll = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      // Track final reading session
      const finalProgress = getReadingProgress();
      const totalTime = Date.now() - startTime;
      
      if (totalTime > 5000) { // Only track if spent more than 5 seconds
        trackBlogInteraction(postSlug, 'scroll', {
          scrollPercentage: finalProgress,
          timeOnPage: totalTime,
          sessionEnd: true
        });
      }
    };
  }, [postSlug, startTime, lastTrackedProgress]);

  const progressBarClasses = cn(
    'fixed z-50 transition-all duration-200 ease-out',
    position === 'top' ? 'top-0 left-0 right-0 h-1' : 'bottom-0 left-0 right-0 h-1',
    className
  );

  return (
    <>
      {/* Progress Bar */}
      <div 
        data-testid="reading-progress"
        data-progress={Math.round(progress)}
        className={progressBarClasses}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
        
        {/* Glow effect */}
        <motion.div
          className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-purple-400/50 to-transparent blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 5 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Optional percentage display */}
      {showPercentage && progress > 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-4 right-4 z-40 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1.5 shadow-lg"
        >
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </>
  );
};

export default ReadingProgress;