'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import IntegrationShowcase from '@/components/integration-showcase'
// import InteractiveDemo from '@/components/interactive-demo-v2'
import InteractiveDemo from '@/components/interactive-demo'
import LiveOperationsCenter from '@/components/live-operations-center'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero
        onDemoTrigger={() => {
          // Scroll to demo section
          const demoSection = document.getElementById('demo-section')
          if (demoSection) {
            demoSection.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      />

      {/* Interactive Demo Section with Gamification */}
      <InteractiveDemo />

      {/* Live Operations Center */}
      <LiveOperationsCenter />

      {/* Integration Showcase Section */}
      <IntegrationShowcase />

      {/* Features Section */}
      <section className="min-h-screen bg-linear-bg-primary flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Built for Enterprise Scale
          </h2>
          <p className="text-xl text-linear-text-secondary max-w-2xl mx-auto mb-12">
            Volition AI employees integrate seamlessly with your existing
            workflows, tools, and security requirements.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-linear-bg-secondary rounded-xl p-6 border border-linear-border-subtle">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                SOC 2 Type II Certified
              </h3>
              <p className="text-linear-text-secondary text-sm">
                Enterprise-grade security and compliance for your most sensitive
                data
              </p>
            </div>
            <div className="bg-linear-bg-secondary rounded-xl p-6 border border-linear-border-subtle">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                10x Faster Delivery
              </h3>
              <p className="text-linear-text-secondary text-sm">
                Complete complex tasks in minutes, not days or weeks
              </p>
            </div>
            <div className="bg-linear-bg-secondary rounded-xl p-6 border border-linear-border-subtle">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                24/7 Autonomous Work
              </h3>
              <p className="text-linear-text-secondary text-sm">
                AI employees work around the clock, never missing a deadline
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
