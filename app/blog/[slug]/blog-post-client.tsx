'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bookmark, Heart, Share2 } from 'lucide-react';
import { getDefaultBlogImage } from '@/lib/blog-defaults';
import DOMPurify from 'isomorphic-dompurify';
interface BlogPostData {
  title: string;
  description?: string;
  excerpt?: string;
  date: string;
  author: string;
  slug: string;
  category?: string;
  featuredImage?: string;
  readTime?: number;
  content: string;
  htmlContent: string;
  authorAvatar?: string;
  image?: string;
  tags?: string[];
  contentHtml?: string;
}

interface BlogPostClientProps {
  post: BlogPostData;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Get hero image URL - use featured image if available, otherwise use random default
  const heroImageUrl = post.featuredImage || post.image || getDefaultBlogImage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Show/hide header based on scroll direction
      if (currentScrollY > 200) {
        if (currentScrollY < lastScrollY.current) {
          setShowHeader(true);
        } else {
          setShowHeader(false);
        }
      } else {
        setShowHeader(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // Error sharing - handled silently
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Sticky Header */}
      <AnimatePresence>
        {showHeader && (
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100"
          >
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/blog"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} />
                </Link>
                <div>
                  <h1 className="font-display text-lg font-semibold line-clamp-1">
                    {post.title}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {post.author} · {post.readTime} min read
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-2 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${
                    bookmarked ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
                  }`}
                  aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  aria-pressed={bookmarked}
                >
                  <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="Share article"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <article className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author Section */}
            <div className="flex items-center justify-between pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                {post.authorAvatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={post.authorAvatar}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.date)} · {post.readTime} min read
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-2 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${
                    bookmarked ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
                  }`}
                  aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  aria-pressed={bookmarked}
                >
                  <Bookmark size={24} fill={bookmarked ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="Share article"
                >
                  <Share2 size={24} />
                </button>
              </div>
            </div>
          </header>

          {/* Hero Image - Always show, use default if needed */}
          <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden">
            <Image
              src={heroImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div 
            ref={contentRef}
            className="prose prose-lg prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.htmlContent || '') }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Interaction Bar */}
          <div className="flex items-center justify-between mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all min-h-[48px] ${
                  liked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
                aria-label={liked ? 'Unlike article' : 'Like article'}
                aria-pressed={liked}
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                <span className="font-medium">
                  {liked ? 'Liked' : 'Like'}
                </span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-100 rounded-full text-gray-700 transition-colors min-h-[48px]"
                aria-label="Share article"
              >
                <Share2 size={20} />
                <span className="font-medium">Share</span>
              </button>
            </div>
            
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-3 rounded-full transition-all min-h-[48px] min-w-[48px] flex items-center justify-center ${
                bookmarked 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-700'
              }`}
              aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
              aria-pressed={bookmarked}
            >
              <Bookmark size={24} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>


          {/* Navigation */}
          <nav className="flex justify-between items-center mt-16 pt-12 border-t border-gray-200">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
            >
              Back to top
            </button>
          </nav>
        </div>
      </article>
    </>
  );
}