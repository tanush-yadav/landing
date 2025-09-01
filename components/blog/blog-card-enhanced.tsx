/**
 * Enhanced BlogCard Component
 * 
 * Modern blog card with advanced micro-interactions and animations
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar, Eye, Heart, Bookmark, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { cn } from '@/lib/design-system';
import { getDefaultBlogImage } from '@/lib/blog-defaults';

interface EnhancedBlogCardProps {
  post: BlogPost;
  priority?: boolean;
  variant?: 'default' | 'featured' | 'compact';
  showInteractions?: boolean;
  className?: string;
}

const EnhancedBlogCard: React.FC<EnhancedBlogCardProps> = ({ 
  post, 
  priority = false,
  variant = 'default',
  showInteractions = true,
  className 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get image URL
  const imageUrl = post.featuredImage || getDefaultBlogImage();

  // Check if post is new (within 7 days)
  const isNew = () => {
    const date = typeof post.publishedAt === 'string' 
      ? new Date(post.publishedAt) 
      : post.publishedAt;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const cardVariants = {
    default: 'h-full',
    featured: 'h-full lg:col-span-2 lg:row-span-2',
    compact: 'h-full max-h-[300px]'
  };

  const imageHeightVariants = {
    default: 'h-48',
    featured: 'h-64 lg:h-96',
    compact: 'h-32'
  };

  return (
    <motion.article
      data-testid="enhanced-blog-card"
      className={cn(
        'relative group cursor-pointer',
        cardVariants[variant],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className={cn(
          'relative h-full bg-white rounded-2xl overflow-hidden',
          'border border-gray-200/50 shadow-sm',
          'hover:shadow-2xl hover:border-transparent',
          'transition-all duration-500 ease-out',
          'transform-gpu' // Enable GPU acceleration
        )}>
          
          {/* Featured Image with Parallax Effect */}
          <div className={cn(
            'relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200',
            imageHeightVariants[variant]
          )}>
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
            )}
            
            {/* New Badge */}
            {isNew() && (
              <motion.div
                className="absolute top-4 left-4 z-20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 blur-md opacity-75 animate-pulse" />
                  <div className="relative px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg">
                    ✨ NEW
                  </div>
                </div>
              </motion.div>
            )}

            {/* Category Badge with Glassmorphism */}
            <motion.div
              className="absolute top-4 right-4 z-20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-white/50 shadow-lg">
                <span className="text-xs font-semibold text-indigo-600">
                  {post.category}
                </span>
              </div>
            </motion.div>

            {/* Image with Zoom Effect */}
            <motion.div
              className="relative w-full h-full"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority={priority}
                sizes={variant === 'featured' 
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                }
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Quick Actions (visible on hover) */}
            {showInteractions && (
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute bottom-4 right-4 flex gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLiked(!isLiked);
                      }}
                      className={cn(
                        "p-2 rounded-lg backdrop-blur-md transition-all duration-200",
                        isLiked 
                          ? "bg-red-500 text-white" 
                          : "bg-white/90 text-gray-700 hover:bg-white"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                    </motion.button>
                    
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsBookmarked(!isBookmarked);
                      }}
                      className={cn(
                        "p-2 rounded-lg backdrop-blur-md transition-all duration-200",
                        isBookmarked 
                          ? "bg-indigo-500 text-white" 
                          : "bg-white/90 text-gray-700 hover:bg-white"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
                    </motion.button>
                    
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        // Share functionality
                      }}
                      className="p-2 bg-white/90 text-gray-700 rounded-lg backdrop-blur-md hover:bg-white transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Content Section with Better Typography */}
          <div className={cn(
            "p-6",
            variant === 'compact' && "p-4"
          )}>
            {/* Meta Information */}
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              {post.views && (
                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{post.views.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Title with Hover Effect */}
            <h2 className={cn(
              "font-display font-bold text-gray-900 mb-3",
              "line-clamp-2 group-hover:text-indigo-600",
              "transition-colors duration-300",
              variant === 'featured' ? "text-2xl lg:text-3xl" : "text-xl",
              variant === 'compact' && "text-lg"
            )}>
              {post.title}
            </h2>

            {/* Excerpt */}
            {variant !== 'compact' && (
              <p className={cn(
                "text-gray-600 leading-relaxed mb-4",
                variant === 'featured' ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"
              )}>
                {post.excerpt}
              </p>
            )}

            {/* Tags */}
            {variant !== 'compact' && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200 transition-colors duration-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Footer with Author */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                {/* Enhanced Avatar */}
                <div className="relative">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                      style={{ objectPosition: '50% 15%' }}
                      sizes="40px"
                    />
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {post.author.name}
                  </p>
                  {post.author.role && (
                    <p className="text-xs text-gray-500">
                      {post.author.role}
                    </p>
                  )}
                </div>
              </div>

              {/* Read More Arrow with Animation */}
              <motion.div
                className="text-indigo-600"
                animate={{
                  x: isHovered ? 5 : 0,
                  rotate: isHovered ? 45 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default EnhancedBlogCard;