/**
 * BlogCard Component
 * 
 * Individual blog post card with glassmorphic design following the existing design system
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, ArrowRight, Share2, Twitter, Linkedin, Link2 } from 'lucide-react';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { cn, animations } from '@/lib/design-system';

interface BlogCardProps {
  post: BlogPost;
  onReadMore?: (slug: string) => void;
  priority?: boolean; // For image loading priority
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  onReadMore, 
  priority = false,
  className 
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on share buttons
    if ((e.target as HTMLElement).closest('.share-menu')) {
      return;
    }
    if (onReadMore) {
      onReadMore(post.slug);
    }
  };

  const handleShare = (e: React.MouseEvent, platform: 'twitter' | 'linkedin' | 'copy') => {
    e.stopPropagation();
    
    const url = typeof window !== 'undefined' 
      ? `${window.location.origin}/blog/${post.slug}` 
      : '';
    const text = `${post.title} - ${post.excerpt}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // Show brief feedback
        setShowShareMenu(false);
        break;
    }
  };

  return (
    <motion.article
      data-testid="blog-card"
      className={cn(
        // Base card styling with glassmorphic effect and GPU acceleration
        'group relative overflow-hidden rounded-2xl border border-white/20',
        'bg-white/80 backdrop-blur-md shadow-lg',
        'hover:shadow-2xl hover:border-indigo-200',
        'transition-all duration-300 cursor-pointer',
        'will-change-transform transform-gpu',
        // Mobile touch target optimization
        'min-h-[48px] p-0',
        '-webkit-tap-highlight-color-transparent',
        'active:bg-gray-50/50',
        className
      )}
      initial={animations.fadeIn.initial}
      animate={animations.fadeIn.animate}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        } 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
    >
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Category Badge with Glassmorphic Design */}
          <div className="absolute top-4 left-4">
            <motion.span 
              data-testid="category"
              className={cn(
                'inline-flex items-center px-3 py-1.5',
                'rounded-lg backdrop-blur-md bg-gradient-to-r from-white/90 to-white/70',
                'border border-white/50 shadow-sm',
                'hover:shadow-md hover:scale-105 transition-all duration-200'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {post.category}
              </span>
            </motion.span>
          </div>
          
          {/* Share Button */}
          <div className="absolute top-4 right-4 share-menu">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setShowShareMenu(!showShareMenu);
              }}
              className={cn(
                'p-2 rounded-lg backdrop-blur-md bg-white/90',
                'border border-white/50 shadow-sm',
                'hover:shadow-md hover:scale-105 transition-all duration-200',
                'min-h-[32px] min-w-[32px]',
                '-webkit-tap-highlight-color-transparent'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="h-4 w-4 text-gray-600" />
            </motion.button>
            
            {/* Share Menu */}
            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'absolute top-12 right-0 z-20',
                    'bg-white/95 backdrop-blur-md rounded-lg shadow-xl',
                    'border border-white/50 p-2',
                    'flex flex-col gap-1 min-w-[120px]'
                  )}
                >
                  <button
                    onClick={(e) => handleShare(e, 'twitter')}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors min-h-[32px]"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </button>
                  <button
                    onClick={(e) => handleShare(e, 'linkedin')}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors min-h-[32px]"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </button>
                  <button
                    onClick={(e) => handleShare(e, 'copy')}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors min-h-[32px]"
                  >
                    <Link2 className="h-4 w-4" />
                    Copy Link
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 
          data-testid="post-title"
          className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200"
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p 
          data-testid="post-excerpt"
          className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3"
        >
          {post.excerpt}
        </p>

        {/* Tags with Enhanced Glassmorphic Design */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <motion.span
              key={tag}
              data-testid="tag"
              className={cn(
                'inline-flex items-center px-3 py-1',
                'rounded-md backdrop-blur-sm bg-gradient-to-r from-gray-50/90 to-gray-100/70',
                'border border-gray-200/50 shadow-sm',
                'hover:shadow-md hover:scale-105 transition-all duration-200'
              )}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs font-medium bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                {tag}
              </span>
            </motion.span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Author and Meta Information */}
        <div data-testid="author-info" className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Author Avatar */}
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
              <Image
                data-testid="author-avatar"
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            
            {/* Author Info */}
            <div className="flex flex-col">
              <span 
                data-testid="author-name"
                className="text-sm font-medium text-gray-900"
              >
                {post.author.name}
              </span>
              <span 
                data-testid="author-bio"
                className="text-xs text-gray-500 line-clamp-1"
              >
                {post.author.bio}
              </span>
            </div>
          </div>

          {/* Read More Arrow */}
          <div className="flex items-center text-indigo-600 group-hover:text-indigo-700 transition-colors">
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span data-testid="publish-date">
                {formatDate(post.publishedAt)}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span data-testid="read-time">
                {post.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </motion.article>
  );
};

export default BlogCard;