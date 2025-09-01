import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/navigation';

export default function NotFound() {
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
          <Link 
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}