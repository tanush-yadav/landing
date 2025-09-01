import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  getPostBySlug, 
  getAllPosts, 
  getPostNavigation 
} from '@/lib/content-loader.server';
import EnhancedBlogPostClient from '@/components/blog/enhanced-blog-post-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Cintra Blog',
    };
  }
  
  return {
    title: `${post.title} | Cintra Blog`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toString(),
      authors: [post.author.name],
      images: post.featuredImage ? [post.featuredImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ highlight?: string }>;
}

export default async function BlogPostPage({
  params,
  searchParams,
}: BlogPostPageProps) {
  const { slug } = await params;
  const { highlight } = await searchParams;
  
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Get all posts for related posts functionality
  const allPosts = getAllPosts();
  
  // Get navigation posts
  const { previous, next } = getPostNavigation(slug);
  
  // Parse highlight terms from query params
  const highlightTerms = highlight 
    ? decodeURIComponent(highlight).split(' ').filter(term => term.length > 0)
    : [];

  return (
    <EnhancedBlogPostClient
      post={post}
      allPosts={allPosts}
      previousPost={previous}
      nextPost={next}
      highlightTerms={highlightTerms}
    />
  );
}