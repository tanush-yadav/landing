import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import BlogPageClient from '@/components/blog/blog-page-client'
import { BlogListStructuredData } from '@/components/blog/blog-structured-data'
import { getAllPosts, getCategoriesWithCounts } from '@/lib/content-loader.server'

export const metadata: Metadata = {
  title: 'Blog - Cintra | AI Automation Insights & Best Practices',
  description: 'Discover the latest insights on AI automation, agentic workflows, and team productivity. Learn how leading teams are transforming their work with AI-powered solutions.',
  keywords: 'AI automation, agentic workflows, team productivity, AI agents, workflow automation, productivity tips, AI best practices',
  authors: [{ name: 'Cintra Team' }],
  openGraph: {
    title: 'Cintra Blog - AI Automation Insights',
    description: 'Latest insights on AI automation, agentic workflows, and team productivity from the Cintra team.',
    type: 'website',
    url: 'https://cintra.ai/blog',
    images: [
      {
        url: '/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'Cintra Blog - AI Automation Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cintra Blog - AI Automation Insights',
    description: 'Latest insights on AI automation, agentic workflows, and team productivity.',
    images: ['/og-blog.png'],
  },
  alternates: {
    canonical: 'https://cintra.ai/blog',
  },
}

export default function BlogPage() {
  // Get posts from the server-side content loader
  const blogPosts = getAllPosts();
  const blogCategories = getCategoriesWithCounts();

  return (
    <>
      <BlogListStructuredData posts={blogPosts} />
      <main className="min-h-screen">
        <Navigation />
        <BlogPageClient 
          initialPosts={blogPosts} 
          categories={blogCategories} 
        />
      </main>
    </>
  )
}