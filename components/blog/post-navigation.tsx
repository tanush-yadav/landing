/**
 * Post Navigation Component
 * Provides next/previous post navigation with enhanced UX
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { trackBlogInteraction } from '@/lib/blog-interlinking';
import { cn } from '@/lib/design-system';

interface PostNavigationProps {
  currentPost: BlogPost;
  previousPost?: BlogPost;
  nextPost?: BlogPost;
  className?: string;
}

const PostNavigation: React.FC<PostNavigationProps> = ({
  currentPost,
  previousPost,
  nextPost,
  className
}) => {
  const handleNavigationClick = (targetPost: BlogPost, direction: 'previous' | 'next') => {
    trackBlogInteraction(targetPost.slug, 'view', {
      source: 'post_navigation',
      direction,
      currentPostSlug: currentPost.slug
    });
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav 
      data-testid="post-navigation"
      className={cn(
        'py-12 border-t border-gray-200',
        className
      )}
    >
      <div className="grid gap-8 md:grid-cols-2">
        {/* Previous Post */}
        {previousPost ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={`/blog/${previousPost.slug}`}
              onClick={() => handleNavigationClick(previousPost, 'previous')}
              data-testid="prev-post-link"
              className="group block h-full"
            >
              <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-transparent transition-all duration-300 transform hover:-translate-y-1 h-full">
                {/* Direction Indicator */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-white/50">
                    <ArrowLeft className="h-3.5 w-3.5 text-indigo-600" />
                    <span className="text-xs font-semibold text-gray-700">Previous</span>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={previousPost.featuredImage || '/images/blog/default-hero.jpg'}
                    alt={previousPost.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Meta */}
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {previousPost.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{previousPost.readTime} min</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                    {previousPost.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                    {previousPost.excerpt}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(previousPost.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ) : (
          <div /> // Empty div to maintain grid layout
        )}

        {/* Next Post */}
        {nextPost ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(!previousPost && 'md:col-start-2')} // Start from second column if no previous post
          >
            <Link
              href={`/blog/${nextPost.slug}`}
              onClick={() => handleNavigationClick(nextPost, 'next')}
              data-testid="next-post-link"
              className="group block h-full"
            >
              <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-transparent transition-all duration-300 transform hover:-translate-y-1 h-full">
                {/* Direction Indicator */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-white/50">
                    <span className="text-xs font-semibold text-gray-700">Next</span>
                    <ArrowRight className="h-3.5 w-3.5 text-indigo-600" />
                  </div>
                </div>

                {/* Featured Image */}
                <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={nextPost.featuredImage || '/images/blog/default-hero.jpg'}
                    alt={nextPost.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Meta */}
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {nextPost.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{nextPost.readTime} min</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                    {nextPost.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                    {nextPost.excerpt}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(nextPost.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ) : (
          <div /> // Empty div to maintain grid layout
        )}
      </div>

      {/* Back to Blog Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-8"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
        >
          <span>← Back to All Articles</span>
        </Link>
      </motion.div>
    </nav>
  );
};

export default PostNavigation;