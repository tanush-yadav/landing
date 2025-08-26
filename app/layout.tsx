import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}