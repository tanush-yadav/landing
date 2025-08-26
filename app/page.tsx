import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import IntegrationShowcase from '@/components/integration-showcase'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Integration Showcase Section */}
      <IntegrationShowcase />
      
      {/* Placeholder section to demonstrate scroll behavior */}
      <section className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Build with confidence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI understands your entire codebase, ensuring generated code follows your patterns and conventions.
          </p>
        </div>
      </section>

      {/* Another placeholder section */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enterprise ready
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            SOC 2 Type II certified with advanced security features to keep your code safe.
          </p>
        </div>
      </section>
    </main>
  )
}