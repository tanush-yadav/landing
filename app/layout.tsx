import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans, Fraunces } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-outfit',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  title: 'Codegen - Ticket to PR in minutes',
  description: 'Ship faster with full codebase context. Transform tickets into pull requests with AI-powered code generation.',
  keywords: 'code generation, AI, development tools, pull requests, automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable} ${fraunces.variable}`}>
      <body className={`${outfit.className} min-h-screen`}>
        {/* Skip Navigation Link - Accessible but visually hidden until focused */}
        <a 
          href="#main" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}