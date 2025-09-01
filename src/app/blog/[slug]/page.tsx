import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostData, getRelatedPosts } from '@/lib/markdown';
import BlogPostClient from './BlogPostClient';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const description = post.excerpt || `Read "${post.title}" by ${post.author}`;
  const imageUrl = post.image || '/images/og-default.jpg';

  return {
    title: `${post.title} | Volition Labs`,
    description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostData(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}