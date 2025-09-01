import { Metadata } from 'next'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'Blog - Cintra',
  description: 'Latest insights on AI automation, agentic workflows, and team productivity.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Latest insights on AI automation, agentic workflows, and team productivity.
            </p>
            <div className="bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl p-8 shadow-xl">
              <p className="text-gray-700">
                Our blog is coming soon. We&apos;ll share insights about AI automation, 
                best practices for agentic workflows, and tips for improving team productivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}