/**
 * BlogCard Component
 * 
 * Minimal, clean blog post card inspired by Stripe, Linear, and Vercel
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { cn } from '@/lib/design-system';
import { getDefaultBlogImage } from '@/lib/blog-defaults';

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  priority = false,
  className 
}) => {
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get image URL - use featured image if available, otherwise use random default
  const imageUrl = post.featuredImage || getDefaultBlogImage();

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <motion.article
        data-testid="blog-card"
        className={cn(
          // Clean white card with subtle shadow
          'bg-white rounded-xl overflow-hidden',
          'shadow-sm hover:shadow-md',
          'transition-shadow duration-200',
          'cursor-pointer',
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Featured Image - Always show, use default if needed */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-50">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content - Clean typography focus */}
        <div className="p-6">
          {/* Category - Simple, no animations */}
          <div className="flex items-center gap-2 mb-3">
            <span 
              data-testid="category"
              className="text-xs font-medium text-indigo-600 uppercase tracking-wider"
            >
              {post.category}
            </span>
            <span className="text-gray-300">•</span>
            <span 
              data-testid="read-time"
              className="text-xs text-gray-500"
            >
              {post.readTime} min read
            </span>
          </div>

          {/* Title - Using display font for prominence */}
          <h2 
            data-testid="post-title"
            className={cn(
              "font-display text-2xl font-semibold text-gray-900 mb-2",
              "line-clamp-2 group-hover:text-indigo-600",
              "transition-colors duration-200"
            )}
          >
            {post.title}
          </h2>

          {/* Excerpt - Clean description */}
          <p 
            data-testid="post-excerpt"
            className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-2"
          >
            {post.excerpt}
          </p>

          {/* Footer - Minimal meta info */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              {/* Author Avatar with Gradient Background */}
              <div className="relative group">
                {/* Gradient Background Blur */}
                <div className="absolute inset-0 rounded-xl blur-lg opacity-60 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-purple-500/20 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Avatar Container */}
                <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <Image
                    data-testid="author-avatar"
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover transition-all duration-500"
                    style={{ objectPosition: '50% 15%' }}
                    sizes="40px"
                  />
                </div>
              </div>
              
              {/* Author Name & Date */}
              <div>
                <p 
                  data-testid="author-name"
                  className="text-sm font-medium text-gray-900"
                >
                  {post.author.name}
                </p>
                <p 
                  data-testid="publish-date"
                  className="text-xs text-gray-500"
                >
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>

            {/* Read arrow - Subtle indicator */}
            <div className="text-gray-400 group-hover:text-indigo-600 transition-colors duration-200">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard;