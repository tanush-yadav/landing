'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Calendar
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/navigation';
import { BlogPost } from '@/lib/types';
import { getPostBySlug } from '@/lib/data/blog-posts';
import { animations } from '@/lib/design-system';
import '@/styles/blog-post.css';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (params.slug && typeof params.slug === 'string') {
      const foundPost = getPostBySlug(params.slug);
      setPost(foundPost || null);
      setIsLoading(false);
    }
  }, [params.slug]);

  // Reading progress indicator
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentProgress = (window.scrollY / totalHeight) * 100;
    setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="max-w-[680px] mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-100 rounded-lg mb-6 w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded mb-8 w-1/2"></div>
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="max-w-[680px] mx-auto px-6 text-center">
            <h1 className="font-display text-4xl text-gray-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <button 
              onClick={() => router.push('/blog')} 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-900 z-50">
        <div 
          className="h-full bg-gray-900 transition-all duration-150 ease-out"
          style={{ 
            width: `${readingProgress}%`
          }}
        />
      </div>

      {/* Back Button */}
      <div className="pt-24 md:pt-28 pb-6">
        <div className="max-w-[680px] mx-auto px-5 sm:px-6">
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            <span>Back to blog</span>
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header>
        <div className="max-w-[680px] mx-auto px-5 sm:px-6">
          <motion.div
            initial={animations.fadeIn.initial}
            animate={animations.fadeIn.animate}
          >
            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              {post.title}
            </h1>

            {/* Subtitle/Excerpt */}
            {post.excerpt && (
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mb-10 sm:mb-12">
              <span className="font-medium text-gray-700">{post.author.name}</span>
              <span className="hidden sm:inline">•</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span className="hidden sm:inline">•</span>
              <span>{post.readTime} min read</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-12 sm:mb-16">
          <div className="max-w-[860px] mx-auto px-5 sm:px-6">
            <div className="relative h-[280px] sm:h-[400px] md:h-[480px] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 860px) 860px, 860px"
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="pb-16 sm:pb-24">
        <div className="max-w-[680px] mx-auto px-5 sm:px-6">
          <div className="prose-content">
            {post.content.split('\n\n').map((paragraph, index) => {
              // Check if it's a heading
              if (paragraph.startsWith('# ')) {
                return (
                  <h1 key={index} className="font-display text-2xl sm:text-3xl mt-10 mb-4 text-gray-900 tracking-tight">
                    {paragraph.replace('# ', '')}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="font-display text-xl sm:text-2xl mt-10 mb-4 text-gray-900 tracking-tight">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="font-display text-lg sm:text-xl mt-8 mb-4 text-gray-900 tracking-tight">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              
              // Check if it's a code block
              if (paragraph.startsWith('```')) {
                const lines = paragraph.split('\n');
                const language = lines[0].replace('```', '').trim() || 'javascript';
                const code = lines.slice(1, -1).join('\n');
                return (
                  <div key={index} className="relative group my-6 sm:my-8 -mx-5 sm:mx-0">
                    <div className="sm:rounded-t-lg bg-gray-50 border-y sm:border border-gray-200">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                        <span className="text-xs font-medium text-gray-600">{language}</span>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-[13px] sm:text-sm font-mono text-gray-800 leading-relaxed">
                          {code}
                        </code>
                      </pre>
                    </div>
                  </div>
                );
              }
              
              // Check if it's a list
              if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                const items = paragraph.split('\n').filter(item => item.trim());
                return (
                  <ul key={index} className="mb-6 space-y-2 pl-5">
                    {items.map((item, i) => (
                      <li key={i} className="text-base sm:text-lg leading-[1.75] sm:leading-[1.8] text-gray-700 list-disc">
                        {item.replace(/^[-*]\s/, '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              
              if (paragraph.match(/^\d+\. /)) {
                const items = paragraph.split('\n').filter(item => item.trim());
                return (
                  <ol key={index} className="mb-6 space-y-2 pl-5">
                    {items.map((item, i) => (
                      <li key={i} className="text-base sm:text-lg leading-[1.75] sm:leading-[1.8] text-gray-700 list-decimal">
                        {item.replace(/^\d+\.\s/, '')}
                      </li>
                    ))}
                  </ol>
                );
              }
              
              // Check if it's a blockquote
              if (paragraph.startsWith('>')) {
                return (
                  <blockquote key={index} className="my-6 sm:my-8 pl-5 sm:pl-6 border-l-3 sm:border-l-4 border-gray-300">
                    <p className="text-base sm:text-lg leading-[1.75] sm:leading-[1.8] text-gray-600 italic">
                      {paragraph.replace(/^>\s?/, '')}
                    </p>
                  </blockquote>
                );
              }
              
              // Regular paragraph with bold text support
              const formattedText = paragraph
                .split(/\*\*(.*?)\*\*/g)
                .map((part, i) => 
                  i % 2 === 0 ? part : <strong key={i} className="font-semibold text-gray-900">{part}</strong>
                );
              
              return (
                <p key={index} className="mb-6 text-base sm:text-lg leading-[1.75] sm:leading-[1.8] text-gray-700">
                  {formattedText}
                </p>
              );
            })}
          </div>
        </div>
      </article>

      {/* Back to Blog */}
      <section className="py-12 sm:py-16 border-t border-gray-100">
        <div className="max-w-[680px] mx-auto px-5 sm:px-6 text-center">
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Articles</span>
          </button>
        </div>
      </section>
    </main>
  );
}