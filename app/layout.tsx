import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
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
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}