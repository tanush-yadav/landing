import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/data/blog-posts'

interface BlogPostLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Cintra',
      description: 'The blog post you are looking for could not be found.',
    }
  }

  const seoTitle = post.seo?.metaTitle || `${post.title} - Cintra`
  const seoDescription = post.seo?.metaDescription || post.excerpt
  const seoKeywords = post.seo?.keywords || post.tags
  const canonicalUrl = post.seo?.canonicalUrl || `https://cintra.run/blog/${post.slug}`
  
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'Cintra',
      type: 'article',
      publishedTime: typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt.toISOString(),
      modifiedTime: typeof post.updatedAt === 'string' 
        ? post.updatedAt 
        : typeof post.updatedAt === 'undefined' 
          ? (typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt.toISOString())
          : post.updatedAt.toISOString(),
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: post.featuredImage ? [post.featuredImage] : [],
      creator: post.author.socialLinks?.twitter,
    },
    other: {
      'article:author': post.author.name,
      'article:published_time': typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt.toISOString(),
      'article:modified_time': typeof post.updatedAt === 'string' 
        ? post.updatedAt 
        : typeof post.updatedAt === 'undefined' 
          ? (typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt.toISOString())
          : post.updatedAt.toISOString(),
      'article:section': post.category,
      'article:tag': post.tags.join(','),
    },
  }
}

export default function BlogPostLayout({
  children,
}: BlogPostLayoutProps) {
  return <>{children}</>
}