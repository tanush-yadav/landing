/**
 * BlogStructuredData Component
 *
 * Adds JSON-LD structured data for blog posts for better SEO
 */

import { BlogPost } from '@/lib/types'

interface BlogStructuredDataProps {
  post: BlogPost
  url: string
}

export default function BlogStructuredData({
  post,
  url,
}: BlogStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage
      ? `https://cintra.ai${post.featuredImage}`
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      description: post.author.bio,
      image: post.author.avatar
        ? `https://cintra.ai${post.author.avatar}`
        : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cintra',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cintra.ai/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(' ').length,
    timeRequired: `PT${post.readTime}M`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function BlogListStructuredData({ posts }: { posts: BlogPost[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Cintra Blog',
    description:
      'Latest insights on AI automation, agentic workflows, and team productivity.',
    url: 'https://cintra.ai/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Cintra',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cintra.ai/logo.png',
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `https://cintra.ai/blog/${post.slug}`,
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
