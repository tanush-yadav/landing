import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

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
      <head>
        <Script
          defer
          data-domain="cintra.run"
          src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PRENL31DQR"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PRENL31DQR');
          `}
        </Script>
      </head>
      <body className={`${outfit.className} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}