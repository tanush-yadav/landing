/**
 * BlogCard Component
 * 
 * Individual blog post card with glassmorphic design following the existing design system
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { cn, animations, glassMorphism } from '@/lib/design-system';

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
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Engineering': 'bg-blue-500',
      'Content': 'bg-purple-500',
      'Sales': 'bg-green-500',
      'Operations': 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const handleCardClick = () => {
    if (onReadMore) {
      onReadMore(post.slug);
    }
  };

  return (
    <motion.article
      data-testid="blog-card"
      className={cn(
        // Base card styling with glassmorphic effect
        'group relative overflow-hidden rounded-2xl border border-white/20',
        'bg-white/80 backdrop-blur-md shadow-lg',
        'hover:shadow-xl hover:-translate-y-1',
        'transition-all duration-300 cursor-pointer',
        'will-change-transform',
        className
      )}
      initial={animations.fadeIn.initial}
      animate={animations.fadeIn.animate}
      whileHover={{ 
        y: -4, 
        transition: { duration: 0.2, ease: 'easeOut' } 
      }}
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
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span 
              data-testid="category"
              className={cn(
                'inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded-full',
                getCategoryColor(post.category)
              )}
            >
              {post.category}
            </span>
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

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              data-testid="tag"
              className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag}
            </span>
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